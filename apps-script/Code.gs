/**
 * ShiftPatch email sequence (step 5, D-024). Runs inside the ShiftPatch Gmail as a
 * Google Apps Script web app.
 *
 * - The site's /api/contact function POSTs a signed signup here. The script adds a
 *   row to the "Contacts" sheet and sends the welcome email right away.
 * - A time trigger (every 10 minutes) sends follow-up 1 at +2 h and follow-up 2 at +6 h.
 * - Each send is reported to the site's /email/sent function (signed), which logs
 *   welcome_email_sent in PostHog.
 * - The site's /email/unsubscribe function POSTs a signed unsubscribe, which marks
 *   the row. Unsubscribed rows get nothing more.
 *
 * Script properties (Project settings > Script properties), never in this file:
 *   EMAIL_SECRET  same value as the Cloudflare env var EMAIL_SECRET
 *   SITE_URL      https://shiftpatch-concept.pages.dev
 *   SIGNER_NAME   the first name that signs the emails
 *   SHEET_ID      set automatically by setup()
 */

var FOLLOW_UP_1_AFTER_MS = 2 * 60 * 60 * 1000; // +2 hours
var FOLLOW_UP_2_AFTER_MS = 6 * 60 * 60 * 1000; // +6 hours
var MAX_SKEW_MS = 10 * 60 * 1000;
var HEADERS = ['signed_up_at', 'email', 'role', 'hero_variant', 'status', 'welcome_sent_at', 'follow_up_1_sent_at', 'follow_up_2_sent_at', 'unsubscribed_at'];

// ---------------------------------------------------------------------------
// Email copy: DRAFT, needs the owner's approval before setup() is run.
// {{name}} = SIGNER_NAME. {{how_link}} and {{unsubscribe_link}} are filled in per contact.
// ---------------------------------------------------------------------------
var COPY = {
  welcome: {
    subject: 'Thanks for joining the ShiftPatch list',
    body: [
      'Hi,',
      '',
      'Thanks for signing up. A quick note on where this stands: ShiftPatch is an idea we\'re testing, not a product. Nothing is built yet.',
      '',
      'The idea is simple. When a shift opens up at the last minute, the manager posts it once, and it goes to your own staff and float-pool nurses who\'ve said they\'d like extra hours. One of them picks it up, and the manager can see who\'s covering.',
      '',
      'If you want the slightly longer version, it\'s here: {{how_link}}',
      '',
      'Over the next few hours I\'ll send two short notes, each with one question. Reply whenever you like. It comes straight to me.',
      '',
      '{{name}}',
      'ShiftPatch (a pre-launch concept)',
    ],
  },
  followUp1: {
    subject: 'One question about last-minute shifts',
    body: [
      'Hi again,',
      '',
      'One question, if you have a minute: think of the last time a shift opened up at short notice. How did it get filled, and how long did it take?',
      '',
      'Just hit reply. A sentence or two is plenty.',
      '',
      '{{name}}',
      'ShiftPatch (a pre-launch concept)',
    ],
  },
  followUp2: {
    subject: 'Would 15 minutes be possible?',
    body: [
      'Hi,',
      '',
      'Last note from me. I\'m talking to people who deal with short-notice shifts, to find out whether ShiftPatch is worth building at all.',
      '',
      'Would you be open to a 15-minute call sometime in the next two weeks? Reply with a time that suits you, or just "no thanks" and I won\'t ask again.',
      '',
      '{{name}}',
      'ShiftPatch (a pre-launch concept)',
    ],
  },
  footer: 'You\'re getting this because you joined the ShiftPatch early list. Unsubscribe: {{unsubscribe_link}}',
};

// ---------------------------------------------------------------------------
// Setup: run once from the editor after setting the script properties.
// ---------------------------------------------------------------------------
function setup() {
  var props = PropertiesService.getScriptProperties();
  ['EMAIL_SECRET', 'SITE_URL', 'SIGNER_NAME'].forEach(function (k) {
    if (!props.getProperty(k)) throw new Error('Set the script property ' + k + ' first.');
  });
  if (!props.getProperty('SHEET_ID')) {
    var ss = SpreadsheetApp.create('ShiftPatch email list');
    ss.getSheets()[0].setName('Contacts').appendRow(HEADERS);
    props.setProperty('SHEET_ID', ss.getId());
  }
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'sendDueFollowUps') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('sendDueFollowUps').timeBased().everyMinutes(10).create();
  Logger.log('Ready. Sheet: ' + SpreadsheetApp.openById(props.getProperty('SHEET_ID')).getUrl());
}

// ---------------------------------------------------------------------------
// Web app entry point (signed calls from the site's Cloudflare functions).
// ---------------------------------------------------------------------------
function doPost(e) {
  var props = PropertiesService.getScriptProperties();
  try {
    var outer = JSON.parse(e.postData.contents);
    if (hmacHex_(outer.payload, props.getProperty('EMAIL_SECRET')) !== String(outer.signature).toLowerCase()) {
      return reply_({ ok: false, error: 'bad_signature' });
    }
    var data = JSON.parse(outer.payload);
    if (Math.abs(Date.now() - data.ts) > MAX_SKEW_MS) return reply_({ ok: false, error: 'stale' });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      if (data.action === 'contact') return reply_(addContact_(data));
      if (data.action === 'unsubscribe') return reply_(unsubscribe_(data.email));
      return reply_({ ok: false, error: 'unknown_action' });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  }
}

function addContact_(data) {
  var sheet = sheet_();
  var email = String(data.email).trim().toLowerCase();
  if (findRow_(sheet, email)) return { ok: true, duplicate: true }; // never send the welcome twice
  var now = new Date();
  sheet.appendRow([now, email, data.role || '', data.hero_variant || '', 'active', '', '', '', '']);
  var row = sheet.getLastRow();
  send_(email, 'welcome');
  sheet.getRange(row, 6).setValue(new Date());
  return { ok: true };
}

function unsubscribe_(email) {
  var sheet = sheet_();
  var row = findRow_(sheet, String(email).trim().toLowerCase());
  if (row) {
    sheet.getRange(row, 5).setValue('unsubscribed');
    sheet.getRange(row, 9).setValue(new Date());
  }
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Follow-ups (time trigger, every 10 minutes).
// ---------------------------------------------------------------------------
function sendDueFollowUps() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;
  try {
    var sheet = sheet_();
    var values = sheet.getDataRange().getValues();
    var now = Date.now();
    for (var i = 1; i < values.length; i++) {
      var r = values[i];
      var email = r[1], status = r[4], welcomeAt = r[5], fu1At = r[6], fu2At = r[7];
      if (status !== 'active' || !welcomeAt) continue;
      var since = now - new Date(welcomeAt).getTime();
      if (!fu1At && since >= FOLLOW_UP_1_AFTER_MS) {
        send_(email, 'followUp1');
        sheet.getRange(i + 1, 7).setValue(new Date());
      } else if (fu1At && !fu2At && since >= FOLLOW_UP_2_AFTER_MS) {
        send_(email, 'followUp2');
        sheet.getRange(i + 1, 8).setValue(new Date());
      }
    }
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// Sending.
// ---------------------------------------------------------------------------
function send_(email, step) {
  var props = PropertiesService.getScriptProperties();
  var site = props.getProperty('SITE_URL').replace(/\/$/, '');
  var secret = props.getProperty('EMAIL_SECRET');
  var e = Utilities.base64EncodeWebSafe(email, Utilities.Charset.UTF_8).replace(/=+$/, '');
  var link = function (action) {
    return site + '/email/' + action + '?e=' + e + '&t=' + hmacHex_(action + '|' + email, secret);
  };
  var copy = COPY[step];
  var name = props.getProperty('SIGNER_NAME');
  var howUrl = link('click');
  var unsubUrl = link('unsubscribe');
  var source = copy.body.concat(['', '--', COPY.footer]);

  // Plain-text part: full URLs.
  var plain = source.map(function (line) {
    return fill_(line, { name: name, how_link: howUrl, unsubscribe_link: unsubUrl });
  }).join('\n');

  // HTML part that reads like plain text, with short link text.
  // Only the welcome email carries the open pixel.
  var a = function (url, text) { return '<a href="' + url + '" style="color:#24564f">' + text + '</a>'; };
  var htmlVars = { name: escape_(name), how_link: a(howUrl, 'How it would work'), unsubscribe_link: a(unsubUrl, 'Unsubscribe') };
  var html = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#222">' +
    source.map(function (line) { return line ? '<p style="margin:0 0 4px">' + fill_(escape_(line), htmlVars) + '</p>' : '<br>'; }).join('') +
    (step === 'welcome' ? '<img src="' + link('open') + '" width="1" height="1" alt="" style="display:block;border:0">' : '') +
    '</div>';

  GmailApp.sendEmail(email, copy.subject, plain, {
    htmlBody: html,
    name: 'ShiftPatch',
    replyTo: Session.getEffectiveUser().getEmail(),
  });
  notifySent_(site, secret, email, step === 'welcome' ? 'welcome' : step);
}

function notifySent_(site, secret, email, step) {
  var payload = JSON.stringify({ email: email, step: step, ts: Date.now() });
  UrlFetchApp.fetch(site + '/email/sent', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ payload: payload, signature: hmacHex_(payload, secret) }),
    muteHttpExceptions: true,
  });
}

// ---------------------------------------------------------------------------
// Helpers.
// ---------------------------------------------------------------------------
function sheet_() {
  return SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SHEET_ID')).getSheetByName('Contacts');
}

function findRow_(sheet, email) {
  var emails = sheet.getRange(1, 2, sheet.getLastRow(), 1).getValues();
  for (var i = 1; i < emails.length; i++) {
    if (String(emails[i][0]).toLowerCase() === email) return i + 1;
  }
  return 0;
}

function hmacHex_(message, secret) {
  return Utilities.computeHmacSha256Signature(message, secret, Utilities.Charset.UTF_8)
    .map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); })
    .join('');
}

function fill_(text, vars) {
  return text.replace(/\{\{(\w+)\}\}/g, function (_, k) { return vars[k] || ''; });
}

function escape_(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
