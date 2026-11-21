#!/usr/bin/env node
// Metrics audit (step 8). Read-only: it only runs queries and fetches insight
// results from PostHog. It never changes PostHog, never deletes, and never
// loads the site.
//
// For every dashboard tile (plus the saved insights the memo uses) it puts the
// number PostHog shows next to a raw count computed here from the events, and
// flags any difference. It also lists exposures and signups per variant,
// persons per utm_source, internal/test or unattributed traffic, and survey
// answers by person. Results are appended to docs/metrics-audit.md as a dated
// section, with a diff against the previous run.
//
// Usage:
//   node scripts/metrics-audit.mjs                   append a new run
//   node scripts/metrics-audit.mjs --note "after D-029"
//   node scripts/metrics-audit.mjs --dry             print only, write nothing
//
// Exit code: 0 = clean, 3 = something in the Summary needs attention, 1/2 = error.
//
// Needs POSTHOG_PERSONAL_API_KEY (read scopes: query, insight, dashboard,
// experiment) in the environment or in .env (gitignored). Output carries
// person IDs only, never emails or distinct IDs.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs', 'metrics-audit.md');
const LABELS = join(ROOT, 'scripts', 'metrics-audit.labels.json');

// ---- Fixed facts (docs/tracking-plan.md, D-025, D-026) ----------------------
const PROJECT = 741778;
const API = `https://us.posthog.com/api/projects/${PROJECT}`;
const DASHBOARD_ID = 2381553;
const EXPERIMENT_ID = 612484;
const FLAG = 'hero-framing';
const EXPERIMENT_START = '2026-11-19 17:48:18'; // UTC, 14:48 BRT (D-026)
const INSIGHT_START = '2026-11-19 18:00:00'; // UTC, 15:00 BRT (D-025)
const SURVEY_ID = '01a1ef17-b69e-0000-336f-3ef067316d59';
const SURVEY_ANSWER = '$survey_response_dc9030ae-22f8-4519-a037-86d6b878a113';
// Saved insights the memo reads that aren't dashboard tiles.
// After D-040 the old funnels KK0a37NQ and dRTNVtm9 leave the dashboard but stay
// saved; they're still audited here. d1JCOgLG is listed until it's a tile.
const EXTRA_INSIGHTS = ['lQ1PbGvG', 'oMvaY0hy', 'd9eeKWIG', 'KK0a37NQ', 'dRTNVtm9', 'd1JCOgLG'];
// D-034: welcome_email is returning signups, not a channel.
const NON_CHANNEL_SOURCES = ['welcome_email'];

// ---- Args and key ------------------------------------------------------------
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const noteIdx = args.indexOf('--note');
const NOTE = noteIdx >= 0 ? args[noteIdx + 1] ?? '' : '';

function readKey() {
	if (process.env.POSTHOG_PERSONAL_API_KEY) return process.env.POSTHOG_PERSONAL_API_KEY.trim();
	const file = join(ROOT, '.env');
	if (!existsSync(file)) return '';
	for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
		const i = line.indexOf('=');
		if (i > 0 && line.slice(0, i).trim() === 'POSTHOG_PERSONAL_API_KEY')
			return line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
	}
	return '';
}
const KEY = readKey();
if (!KEY) {
	console.error('POSTHOG_PERSONAL_API_KEY is missing (environment or .env).');
	process.exit(2);
}
const headers = { Authorization: `Bearer ${KEY}`, 'content-type': 'application/json' };

async function api(path, init = {}) {
	const r = await fetch(`${API}${path}`, { ...init, headers });
	const text = await r.text();
	if (!r.ok) throw new Error(`${init.method ?? 'GET'} ${path} → ${r.status}: ${text.slice(0, 300)}`);
	return JSON.parse(text);
}
// POST /query/ only runs a query; it changes nothing in the project.
const query = (q) => api('/query/', { method: 'POST', body: JSON.stringify({ query: q, refresh: 'force_blocking' }) });
async function hogql(sql) {
	const j = await query({ kind: 'HogQLQuery', query: sql });
	return j.results.map((row) => Object.fromEntries(j.columns.map((c, i) => [c, row[i]])));
}

// ---- What counts as test traffic (D-029, D-037, D-038, D-063, localhost, /preview/) --
const isTrue = (expr) => `ifNull(lower(toString(${expr})) = 'true', 0)`;
// D-063: the owner-test cohort (empty unless an owner test can't be caught by
// email or is_internal) and the two automated headless-Chrome visits, mirrored
// from the project test-account filter.
const OWNER_COHORT = 747567;
const AUTOMATED = ['836fe88c-eb65-5e90-b897-69b497b5398e', '3257de69-5499-5a0e-9628-f26fda7bbc69'];
// A returning signup opening the welcome email on another device: not a new
// visitor, so it's kept out of the experiment like welcome_email landings are
// kept out of the visitor tiles (D-034, D-063).
const RETURNING_DEVICE = ['de17f0f0-d3d7-5bf5-a5bb-de54d4f26633'];
const REASONS = {
	owner_test: `person_id IN COHORT ${OWNER_COHORT}`,
	automated: `toString(person_id) IN (${AUTOMATED.map((id) => `'${id}'`).join(', ')})`,
	returning_device: `toString(person_id) IN (${RETURNING_DEVICE.map((id) => `'${id}'`).join(', ')})`,
	internal_person: isTrue('person.properties.is_internal'),
	test_user: isTrue('person.properties.$internal_or_test_user'),
	internal_event: isTrue('properties.is_internal'),
	test_email: `(ifNull(toString(person.properties.email), '') ILIKE '%example.com%' OR ifNull(toString(person.properties.email), '') ILIKE '%gbcrespo10%' OR ifNull(toString(person.properties.email), '') ILIKE '%gbcre.eng%')`,
	localhost: `(ifNull(toString(properties.$host), '') ILIKE '%localhost%' OR ifNull(toString(properties.$host), '') ILIKE '%127.0.0.1%')`,
	preview_host: `ifNull(toString(properties.$host), '') ILIKE '%.shiftpatch-concept.pages.dev%'`, // D-038
	preview: `ifNull(toString(properties.$pathname), '') ILIKE '%/preview/%'`,
};

// ---- Pull the post-launch events once; everything else is computed here -----
async function loadEvents() {
	const reasonCols = Object.entries(REASONS).map(([k, v]) => `${v} AS r_${k}`).join(',\n  ');
	const rows = await hogql(`
SELECT
  toString(uuid) AS uuid, toString(timestamp) AS ts, event, toString(person_id) AS pid,
  toString(properties.utm_source) AS utm_source, toString(properties.channel) AS channel,
  toString(properties.hero_variant) AS hero_variant,
  isNotNull(properties.\`$feature/hero-framing\`) AS has_flag_prop,
  toString(properties.$feature_flag) AS feature_flag,
  toString(properties.$feature_flag_response) AS flag_response,
  ${isTrue('properties.exposure_resent_after_consent')} AS resent,
  ${isTrue('properties.is_buyer_role')} AS buyer,
  toString(properties.role) AS role,
  toString(properties.$survey_id) AS survey_id,
  toString(properties.\`${SURVEY_ANSWER}\`) AS answer,
  toString(properties.$browser) AS browser, toString(properties.$os) AS os,
  toString(properties.$host) AS host, toString(properties.$lib) AS lib,
  ${reasonCols}
FROM events
WHERE timestamp >= toDateTime('${EXPERIMENT_START}', 'UTC')
  AND event NOT IN ('$autocapture', '$web_vitals', '$pageleave', '$set', '$snapshot', '$opt_in')
ORDER BY timestamp
LIMIT 50000`);
	if (rows.length >= 50000) throw new Error('Event pull hit the 50000-row limit; the audit would be incomplete.');
	for (const e of rows) {
		for (const k of ['utm_source', 'channel', 'hero_variant', 'feature_flag', 'flag_response', 'role', 'survey_id', 'answer', 'browser', 'os', 'host', 'lib'])
			if (e[k] === null || e[k] === '' || e[k] === 'null') e[k] = null;
		e.t = Date.parse(e.ts.replace(' ', 'T') + (e.ts.endsWith('Z') ? '' : 'Z'));
		e.reasons = Object.keys(REASONS).filter((k) => Number(e[`r_${k}`]) === 1);
		e.clean = e.reasons.length === 0;
		e.buyer = Number(e.buyer) === 1;
		e.resent = Number(e.resent) === 1;
		e.has_flag_prop = Number(e.has_flag_prop) === 1;
	}
	return rows;
}

const utc = (s) => Date.parse(s.replace(' ', 'T') + 'Z');
const NONE = '(none)';
const bd = (v) => (v === null || v === undefined || v === '' || v === '$$_posthog_breakdown_null_$$' ? NONE : String(v));
const uniqBy = (events, keyFn) => {
	const m = new Map();
	for (const e of events) {
		const k = keyFn(e);
		if (!m.has(k)) m.set(k, new Set());
		m.get(k).add(e.pid);
	}
	return Object.fromEntries([...m].map(([k, s]) => [k, s.size]));
};
const countBy = (events, keyFn) => {
	const m = {};
	for (const e of events) m[keyFn(e)] = (m[keyFn(e)] ?? 0) + 1;
	return m;
};
const isVolume = (e) => e.event === 'survey sent' && e.survey_id === SURVEY_ID;
const isSignup = (e) => e.event === 'signup_form_submitted';
const isChannel = (e) => !NON_CHANNEL_SOURCES.includes(e.utm_source);

// Per-person ordered funnel, 1-day window, first-touch breakdown on step 1.
function funnel(ev, isStep2) {
	const from = utc(INSIGHT_START);
	const DAY = 86400e3;
	const byPerson = new Map();
	for (const e of ev) if (e.t >= from) (byPerson.get(e.pid) ?? byPerson.set(e.pid, []).get(e.pid)).push(e);
	const out = {};
	for (const list of byPerson.values()) {
		let best = null;
		for (const s1 of list.filter((e) => e.event === 'landing_page_viewed' || e.event === 'cookie_banner_answered')) {
			let reached = 1;
			const s2 = list.find((e) => isStep2(e) && e.t >= s1.t && e.t <= s1.t + DAY);
			if (s2) {
				reached = 2;
				if (list.find((e) => isVolume(e) && e.t >= s2.t && e.t <= s1.t + DAY)) reached = 3;
			}
			if (!best || reached > best.reached) best = { reached, b: bd(s1.utm_source) };
		}
		if (!best) continue;
		for (let s = 1; s <= best.reached; s++) out[`step${s}|${best.b}`] = (out[`step${s}|${best.b}`] ?? 0) + 1;
	}
	return out;
}

// Generic per-person ordered funnel: steps[0] is step 1; each later step must
// come after the previous one and within `windowMs` of step 1. Breakdown is the
// utm_source of the step 1 event (PostHog "attributed to step 1", D-040), or
// none when the tile has no breakdown (every row then lands under "(none)").
const isLanded = (e) => e.event === 'landing_page_viewed' || e.event === 'cookie_banner_answered';
function stageFunnel(ev, steps, windowMs, { breakdown = true } = {}) {
	const from = utc(INSIGHT_START);
	const byPerson = new Map();
	for (const e of ev) if (e.t >= from) (byPerson.get(e.pid) ?? byPerson.set(e.pid, []).get(e.pid)).push(e);
	const out = {};
	for (const list of byPerson.values()) {
		let best = null;
		for (const s1 of list.filter(steps[0])) {
			let reached = 1;
			let t = s1.t;
			for (const step of steps.slice(1)) {
				const hit = list.find((e) => step(e) && e.t >= t && e.t <= s1.t + windowMs);
				if (!hit) break;
				reached++;
				t = hit.t;
			}
			if (!best || reached > best.reached) best = { reached, b: breakdown ? bd(s1.utm_source) : NONE };
		}
		if (!best) continue;
		for (let n = 1; n <= best.reached; n++) out[`step${n}|${best.b}`] = (out[`step${n}|${best.b}`] ?? 0) + 1;
	}
	return out;
}

// ---- Raw counts per tile (target definitions) --------------------------------
// Each returns { "series|breakdown": number }. They use the *target*
// definitions decided in step 8, so a tile still waiting for its change shows
// a mismatch on purpose until the change is applied:
//   D-029 test filter, D-030 "Landed" first step, D-031 exposure-property
//   filter on the A/B cross-check, D-034 welcome_email out of acquisition.
const RAW = {
	KK0a37NQ: {
		about: 'Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).',
		fn: (ev) => funnel(ev, (e) => isSignup(e) && e.buyer),
	},
	dRTNVtm9: {
		about: 'Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).',
		fn: (ev) => funnel(ev, isSignup),
	},
	d1JCOgLG: {
		about: 'Stage funnel (D-040, D-063), per person, ordered, 7-day window: Landed with utm_source not welcome_email → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Totals only, no breakdown, as the tile shows them.',
		fn: (ev) =>
			stageFunnel(
				ev,
				[(e) => isLanded(e) && isChannel(e), (e) => e.event === 'signup_form_started', isSignup, (e) => e.event === 'welcome_email_opened', (e) => e.event === 'welcome_email_link_clicked'],
				7 * 86400e3,
				{ breakdown: false },
			),
	},
	'9s0dwQbs': {
		about: 'Channel table (D-060, SQL tile): per channel label, unique persons with landing_page_viewed (visitors), signup_form_submitted (signups) and buyer signups, plus both rates rounded to whole percent; welcome_email excluded.',
		fn: (ev) => {
			const LABEL = { personal_network: 'Personal network (shared link)', linkedin: 'LinkedIn (organic)', linkedin_ads: 'LinkedIn Ads', fonl_annual_2027: 'FONL Annual 2027' };
			const ch = (e) => (e.utm_source ? LABEL[e.utm_source] ?? e.utm_source : 'Direct (no tracked link)');
			const w = ev.filter((e) => e.t >= utc(INSIGHT_START) && isChannel(e));
			const V = uniqBy(w.filter((e) => e.event === 'landing_page_viewed'), ch);
			const S = uniqBy(w.filter(isSignup), ch);
			const B = uniqBy(w.filter((e) => isSignup(e) && e.buyer), ch);
			const out = {};
			for (const k of new Set([...Object.keys(V), ...Object.keys(S)])) {
				const v = V[k] ?? 0;
				Object.assign(out, {
					[`visitors|${k}`]: v,
					[`signups|${k}`]: S[k] ?? 0,
					[`signup_rate|${k}`]: v ? Math.round((100 * (S[k] ?? 0)) / v) : 0,
					[`buyer_signups|${k}`]: B[k] ?? 0,
					[`buyer_rate|${k}`]: v ? Math.round((100 * (B[k] ?? 0)) / v) : 0,
				});
			}
			return out;
		},
	},
	opzPWguM: {
		about: 'Channel table (D-042): unique persons per utm_source (welcome_email excluded) for visitors (landing_page_viewed), all signups, buyer signups and hero clicks, plus all signups ÷ visitors and buyer signups ÷ visitors.',
		fn: (ev) => {
			const w = ev.filter((e) => e.t >= utc(INSIGHT_START) && isChannel(e));
			const out = {};
			const per = (list) => uniqBy(list, (e) => bd(e.utm_source));
			const A = per(w.filter((e) => e.event === 'landing_page_viewed'));
			const B = per(w.filter(isSignup));
			const C = per(w.filter((e) => isSignup(e) && e.buyer));
			const D = per(w.filter((e) => e.event === 'hero_cta_clicked'));
			const keys = new Set([...Object.keys(A), ...Object.keys(B), ...Object.keys(C), ...Object.keys(D)]);
			const ratio = (x, y) => (y ? Math.round((x / y) * 10000) / 10000 : 0);
			for (const k of keys) {
				Object.assign(out, {
					[`Visitors|${k}`]: A[k] ?? 0,
					[`All signups|${k}`]: B[k] ?? 0,
					[`Buyer signups|${k}`]: C[k] ?? 0,
					[`Hero clicks|${k}`]: D[k] ?? 0,
					[`All signups ÷ visitors|${k}`]: ratio(B[k] ?? 0, A[k] ?? 0),
					[`Buyer signups ÷ visitors|${k}`]: ratio(C[k] ?? 0, A[k] ?? 0),
				});
			}
			return out;
		},
	},
	dBS4IKQb: {
		about: 'Unique persons with landing_page_viewed per utm_source (welcome_email excluded).',
		fn: (ev) => {
			const w = ev.filter((e) => e.t >= utc(INSIGHT_START) && e.event === 'landing_page_viewed' && isChannel(e));
			return Object.fromEntries(Object.entries(uniqBy(w, (e) => bd(e.utm_source))).map(([b, n]) => [`Visitors|${b}`, n]));
		},
	},
	ZS0Uhz2p: {
		about: 'Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".',
		fn: (ev) => {
			const w = ev.filter((e) => e.t >= utc(INSIGHT_START) && e.event === 'channel_link_clicked' && isChannel(e));
			return Object.fromEntries(Object.entries(countBy(w, (e) => bd(e.channel))).map(([b, n]) => [`Link clicks|${b}`, n]));
		},
	},
	lQ1PbGvG: {
		about: 'Unique persons answering the volume question, per answer.',
		fn: (ev) => {
			const w = ev.filter((e) => e.t >= utc(INSIGHT_START) && isVolume(e));
			return Object.fromEntries(Object.entries(uniqBy(w, (e) => bd(e.answer))).map(([b, n]) => [`Respondents|${b}`, n]));
		},
	},
	oMvaY0hy: {
		about: 'Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).',
		fn: (ev) => {
			const w = ev.filter((e) => e.t >= utc(INSIGHT_START) && e.has_flag_prop);
			const out = {};
			const add = (name, list) => Object.entries(uniqBy(list, (e) => bd(e.hero_variant))).forEach(([b, n]) => (out[`${name}|${b}`] = n));
			add('Visitors', w.filter((e) => e.event === 'landing_page_viewed'));
			add('Buyer-role signups', w.filter((e) => isSignup(e) && e.buyer));
			add('All signups', w.filter(isSignup));
			return out;
		},
	},
	d9eeKWIG: {
		about: 'Unique persons with signup_form_submitted per role × utm_source.',
		fn: (ev) => {
			const w = ev.filter((e) => e.t >= utc(INSIGHT_START) && isSignup(e));
			return Object.fromEntries(Object.entries(uniqBy(w, (e) => `${bd(e.role)}::${bd(e.utm_source)}`)).map(([b, n]) => [`Signups|${b}`, n]));
		},
	},
};

// ---- Raw experiment numbers (exposure: $experiment_exposure, exclude multi) --
function rawExperiment(ev, metrics) {
	const exp = ev.filter((e) => e.event === '$experiment_exposure' && e.feature_flag === FLAG && e.flag_response);
	const persons = new Map();
	for (const e of exp) {
		const p = persons.get(e.pid) ?? { variants: new Set(), first: e.t, n: 0 };
		p.variants.add(e.flag_response);
		p.first = Math.min(p.first, e.t);
		p.n++;
		persons.set(e.pid, p);
	}
	const out = {};
	const multi = [...persons].filter(([, p]) => p.variants.size > 1).map(([pid]) => pid);
	for (const [pid, p] of persons) {
		if (p.variants.size > 1) continue;
		const v = [...p.variants][0];
		out[`exposures|${v}`] = (out[`exposures|${v}`] ?? 0) + 1;
		const after = ev.filter((e) => e.pid === pid && e.t >= p.first);
		for (const m of metrics) {
			const steps = m.series.map((s) => (e) => {
				if (e.event !== s.event) return false;
				for (const f of s.properties ?? []) {
					if (f.key === 'is_buyer_role' && !e.buyer) return false;
					if (f.key === '$survey_id' && e.survey_id !== String(f.value?.[0] ?? f.value)) return false;
				}
				return true;
			});
			let t = p.first;
			let ok = true;
			for (const step of steps) {
				const hit = after.find((e) => e.t >= t && step(e));
				if (!hit) { ok = false; break; }
				t = hit.t;
			}
			out[`${m.name}|${v}`] = (out[`${m.name}|${v}`] ?? 0) + (ok ? 1 : 0);
		}
	}
	return { out, multi, eventsByVariant: countBy(exp.filter((e) => e.clean), (e) => e.flag_response) };
}

// ---- What PostHog shows -------------------------------------------------------
function flattenInsight(ins) {
	const out = {};
	const kind = ins.query?.source?.kind;
	if (kind === 'FunnelsQuery') {
		const groups = Array.isArray(ins.result?.[0]) ? ins.result : [ins.result ?? []];
		for (const steps of groups)
			for (const s of steps) {
				const b = bd(Array.isArray(s.breakdown_value) ? s.breakdown_value.join('::') : s.breakdown_value);
				out[`step${s.order + 1}|${b}`] = (out[`step${s.order + 1}|${b}`] ?? 0) + s.count;
			}
	} else if (kind === 'HogQLQuery') {
		// SQL tile: rows of values; the first column is the row label. Percent
		// strings like "58%" compare as numbers.
		const cols = ins.columns ?? (ins.query?.tableSettings?.columns ?? []).map((c) => c.column);
		for (const row of ins.result ?? [])
			cols.slice(1).forEach((c, i) => {
				const v = row[i + 1];
				out[`${c}|${row[0]}`] = typeof v === 'string' ? parseFloat(v) : v;
			});
	} else {
		for (const r of ins.result ?? []) {
			const b = Array.isArray(r.breakdown_value) ? r.breakdown_value.map(bd).join('::') : bd(r.breakdown_value);
			const name = r.custom_name ?? r.action?.custom_name ?? r.label;
			out[`${name}|${b}`] = r.aggregated_value ?? r.count;
		}
	}
	return out;
}

async function shownExperiment(exp) {
	const out = {};
	const failures = {};
	for (const m of [...exp.metrics, ...exp.metrics_secondary]) {
		const r = await query({ kind: 'ExperimentQuery', experiment_id: EXPERIMENT_ID, metric: m });
		for (const v of [r.baseline, ...(r.variant_results ?? [])].filter(Boolean)) {
			out[`exposures|${v.key}`] = v.number_of_samples;
			out[`${m.name}|${v.key}`] = v.sum;
			failures[`${m.name}|${v.key}`] = v.validation_failures ?? [];
		}
	}
	return { out, failures };
}

// ---- Compare and render -------------------------------------------------------
function compare(shown, raw, keepZeros = false) {
	const keys = [...new Set([...Object.keys(shown), ...Object.keys(raw)])].sort();
	return keys
		.map((k) => ({ key: k, shown: Math.round(Number(shown[k] ?? 0) * 10000) / 10000, raw: Math.round(Number(raw[k] ?? 0) * 10000) / 10000 }))
		.filter((r) => keepZeros || r.shown !== 0 || r.raw !== 0)
		.map((r) => ({ ...r, ok: r.shown === r.raw }));
}

const table = (head, rows) =>
	rows.length
		? [`| ${head.join(' | ')} |`, `| ${head.map(() => ':---').join(' | ')} |`, ...rows.map((r) => `| ${r.map((c) => String(c ?? '').replace(/\|/g, '\\|')).join(' | ')} |`)].join('\n')
		: '_None._';
const fmtTime = (t) => new Date(t).toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

async function main() {
	const labels = existsSync(LABELS) ? JSON.parse(readFileSync(LABELS, 'utf8')) : {};
	const label = (pid) => labels[pid] ?? '';
	const runAt = new Date();

	const [events, dashboard, exp] = await Promise.all([
		loadEvents(),
		api(`/dashboards/${DASHBOARD_ID}/`),
		api(`/experiments/${EXPERIMENT_ID}/`),
	]);
	const clean = events.filter((e) => e.clean);
	const dirty = events.filter((e) => !e.clean);

	const metrics = {}; // flat snapshot for the next run's diff
	const md = [];
	const mismatches = [];

	md.push(`## Audit ${fmtTime(runAt)}${NOTE ? ` — ${NOTE}` : ''}`, '');
	md.push(
		`Read-only run of \`scripts/metrics-audit.mjs\`. Events from ${EXPERIMENT_START} UTC (experiment start, 14:48 BRT); insight tiles from ${INSIGHT_START} UTC (15:00 BRT). Raw counts leave out internal/test persons, \`is_internal\` events, test emails, localhost and \`/preview/\` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.`,
		'',
	);

	// 1. Tiles
	md.push('### 1. Tiles: PostHog vs raw', '');
	const tiles = (dashboard.tiles ?? []).filter((t) => !t.deleted);
	const insightIds = [...new Set([...tiles.filter((t) => t.insight).map((t) => t.insight.short_id), ...EXTRA_INSIGHTS])];

	// Experiment tile
	if (tiles.some((t) => t.widget?.config?.experimentId === EXPERIMENT_ID)) {
		const shown = await shownExperiment(exp);
		const allMetrics = [...exp.metrics, ...exp.metrics_secondary];
		const raw = rawExperiment(clean, allMetrics);
		// List every metric for both arms, zeros included.
		for (const v of ['control', 'time']) for (const n of ['exposures', ...allMetrics.map((m) => m.name)]) raw.out[`${n}|${v}`] ??= 0;
		const rows = compare(shown.out, raw.out, true);
		md.push(`**Experiment ${EXPERIMENT_ID}** (dashboard tile). Exposure \`${exp.resolved_exposure_event}\`, test accounts filtered: ${exp.exposure_criteria?.filterTestAccounts}, multiple variants: ${exp.exposure_criteria?.multiple_variant_handling}.`, '');
		md.push(table(['Number', 'PostHog', 'Raw', '', 'PostHog hides results because'], rows.map((r) => [r.key, r.shown, r.raw, r.ok ? '✓' : '≠ MISMATCH', (shown.failures[r.key] ?? []).join(', ')])), '');
		for (const r of rows) {
			metrics[`experiment|${r.key}|shown`] = r.shown;
			metrics[`experiment|${r.key}|raw`] = r.raw;
			if (!r.ok) mismatches.push(`experiment: ${r.key} shows ${r.shown}, raw ${r.raw}`);
		}
		if (raw.multi.length) md.push(`Persons excluded for seeing both variants: ${raw.multi.join(', ')}`, '');
	}

	for (const id of insightIds) {
		let res = await api(`/insights/?short_id=${id}&refresh=force_blocking`);
		let ins = res.results?.[0];
		// A throttled refresh can come back with no result; retry once from cache
		// rather than reading the gap as zeros.
		if (ins && !Array.isArray(ins.result)) {
			res = await api(`/insights/?short_id=${id}&refresh=blocking`);
			ins = res.results?.[0];
		}
		if (ins && !Array.isArray(ins.result)) {
			md.push(`**${ins.name}** (\`${id}\`): PostHog returned no result, so this tile couldn't be checked.`, '');
			mismatches.push(`${id}: no result returned by PostHog`);
			continue;
		}
		if (!ins) { md.push(`**${id}**: not found.`, ''); mismatches.push(`${id}: insight not found`); continue; }
		const onDash = tiles.some((t) => t.insight?.short_id === id);
		const def = RAW[id];
		md.push(`**${ins.name}** (\`${id}\`${onDash ? ', dashboard tile' : ', not on the dashboard'}). Test accounts filtered: ${ins.query?.source?.filterTestAccounts}. From ${ins.query?.source?.dateRange?.date_from}.`);
		md.push(`Caption: ${ins.description ? `“${ins.description}”` : '_none_'}`, '');
		if (!def) {
			md.push('_No raw definition in the audit for this tile. Add one to `RAW`._', '');
			mismatches.push(`${id}: no raw definition`);
			continue;
		}
		md.push(`Raw = ${def.about}`, '');
		const rawOut = def.fn(clean);
		const rows = compare(flattenInsight(ins), rawOut);
		// Zero rows are hidden, so check the series names separately: every
		// formula PostHog defines must be one the raw definition computes.
		const formulas = (ins.query?.source?.trendsFilter?.formulaNodes ?? []).map((f) => f.custom_name ?? f.formula);
		const rawNames = new Set(Object.keys(rawOut).map((k) => k.split('|')[0]));
		const unknown = rawNames.size ? formulas.filter((n) => !rawNames.has(n)) : [];
		if (formulas.length) md.push(`Series names: ${formulas.join(', ')}${unknown.length ? ` — **not in the raw definition: ${unknown.join(', ')}**` : ' (all in the raw definition)'}.`, '');
		if (unknown.length) mismatches.push(`${id}: series not in the raw definition: ${unknown.join(', ')}`);
		md.push(table(['Series | breakdown', 'PostHog', 'Raw', ''], rows.map((r) => [r.key, r.shown, r.raw, r.ok ? '✓' : '≠ MISMATCH'])), '');
		for (const r of rows) {
			metrics[`${id}|${r.key}|shown`] = r.shown;
			metrics[`${id}|${r.key}|raw`] = r.raw;
			if (!r.ok) mismatches.push(`${id}: ${r.key} shows ${r.shown}, raw ${r.raw}`);
		}
	}

	// 2. Variants
	md.push('### 2. Exposures and signups per variant', '');
	const flagCalls = events.filter((e) => e.event === '$feature_flag_called' && e.feature_flag === FLAG);
	const exposures = events.filter((e) => e.event === '$experiment_exposure' && e.feature_flag === FLAG);
	const vrows = ['control', 'time'].map((v) => {
		const exp_v = exposures.filter((e) => e.clean && e.flag_response === v);
		const hv = v === 'control' ? 'a' : 'b';
		const sig = clean.filter((e) => isSignup(e) && e.hero_variant === hv && e.has_flag_prop);
		return [v, exp_v.length, new Set(exp_v.map((e) => e.pid)).size, exp_v.filter((e) => e.resent).length, sig.length, sig.filter((e) => e.buyer).length];
	});
	md.push(table(['Variant', '$experiment_exposure events', 'Exposed persons', 'Re-sent after Accept', 'Signups (hero_variant, flag property set)', 'Buyer signups'], vrows), '');
	vrows.forEach(([v, a, b, c, d, e]) => Object.assign(metrics, { [`variant|${v}|exposure_events`]: a, [`variant|${v}|exposed_persons`]: b, [`variant|${v}|resent`]: c, [`variant|${v}|signups`]: d, [`variant|${v}|buyer_signups`]: e }));
	const noResp = flagCalls.filter((e) => !e.flag_response);
	const fallback = clean.filter((e) => e.event === 'landing_page_viewed' && e.t >= utc(EXPERIMENT_START) && !e.has_flag_prop);
	md.push(`- \`$feature_flag_called\` for ${FLAG}: ${flagCalls.length} (with a response: ${flagCalls.length - noResp.length}, empty response: ${noResp.length}). \`$experiment_exposure\`: ${exposures.length}.`);
	md.push(`- Page views shown A by fallback (no flag, no exposure): ${fallback.length}${fallback.length ? ` (${[...new Set(fallback.map((e) => e.pid))].join(', ')})` : ''}.`, '');
	Object.assign(metrics, { 'flag|called': flagCalls.length, 'flag|empty_response': noResp.length, 'flag|experiment_exposure': exposures.length, 'flag|fallback_views': fallback.length });

	// 3. Persons per utm_source
	md.push('### 3. Persons per utm_source (clean, all events since experiment start)', '');
	const pSrc = uniqBy(clean.filter((e) => e.utm_source || e.event === 'landing_page_viewed'), (e) => bd(e.utm_source));
	md.push(table(['utm_source', 'Persons', 'Counted as a channel'], Object.entries(pSrc).sort().map(([s, n]) => [s, n, NON_CHANNEL_SOURCES.includes(s) ? 'no (D-034)' : s === NONE ? 'no (direct)' : 'yes'])), '');
	for (const [s, n] of Object.entries(pSrc)) metrics[`persons_by_source|${s}`] = n;

	// 4. Test / internal / unattributed
	md.push('### 4. Internal, test and unattributed traffic since experiment start', '');
	const dirtyBy = new Map();
	for (const e of dirty) {
		const d = dirtyBy.get(e.pid) ?? { n: 0, reasons: new Set(), first: e.t, last: e.t, events: new Set() };
		d.n++; e.reasons.forEach((r) => d.reasons.add(r)); d.last = e.t; d.events.add(e.event);
		dirtyBy.set(e.pid, d);
	}
	md.push('**Excluded as internal/test** (kept out of the raw counts):', '');
	md.push(table(['Person', 'Label', 'Events', 'Why excluded', 'First', 'Last', 'Event types'], [...dirtyBy].map(([pid, d]) => [pid, label(pid), d.n, [...d.reasons].join(', '), fmtTime(d.first), fmtTime(d.last), [...d.events].join(', ')])), '');
	metrics['test|persons'] = dirtyBy.size;
	metrics['test|events'] = dirty.length;

	const views = clean.filter((e) => e.event === 'landing_page_viewed' || e.event === '$pageview');
	// A person already excluded above isn't listed again, even if one of their
	// events (e.g. an old-code $pageview sent before is_internal) passes.
	const unattributed = [...new Set(views.filter((e) => !e.utm_source && !dirtyBy.has(e.pid)).map((e) => e.pid))];
	md.push('**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):', '');
	md.push(table(['Person', 'Label', 'First view', 'Host', 'Browser / OS'], unattributed.map((pid) => { const f = views.find((e) => e.pid === pid); return [pid, label(pid) || '**UNLABELED**', fmtTime(f.t), f.host ?? '?', `${f.browser ?? '?'} / ${f.os ?? '?'}`]; })), '');
	metrics['unattributed|persons'] = unattributed.length;
	const unlabeled = unattributed.filter((pid) => !label(pid));
	if (unlabeled.length) mismatches.push(`unlabeled unattributed visits: ${unlabeled.join(', ')}`);

	const clicks = clean.filter((e) => e.event === 'channel_link_clicked');
	const orphan = clicks.filter((c) => !clean.some((e) => e.event === 'landing_page_viewed' && e.utm_source === c.channel && e.t >= c.t && e.t <= c.t + 10 * 60e3));
	md.push('**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):', '');
	md.push(table(['Person', 'Label', 'Channel', 'Time'], orphan.map((e) => [e.pid, label(e.pid), e.channel, fmtTime(e.t)])), '');
	metrics['clicks|total'] = clicks.length;
	metrics['clicks|no_visit_after'] = orphan.length;

	// 5. Survey answers by person (all time, flagged pre/post launch)
	md.push('### 5. Volume-question answers by person', '');
	const survey = await hogql(`
SELECT toString(person_id) AS pid, count() AS answers,
  countIf(timestamp >= toDateTime('${INSIGHT_START}', 'UTC')) AS post_launch,
  toString(min(timestamp)) AS first, toString(max(timestamp)) AS last,
  ${Object.entries(REASONS).filter(([k]) => ['internal_person', 'test_user', 'test_email'].includes(k)).map(([k, v]) => `max(${v}) AS r_${k}`).join(', ')},
  max(toString(person_id) IN (SELECT toString(id) FROM persons)) AS has_record
FROM events
WHERE event = 'survey sent' AND properties.$survey_id = '${SURVEY_ID}'
GROUP BY pid ORDER BY first
LIMIT 10000`);
	const post = survey.filter((s) => Number(s.post_launch) > 0);
	const pre = survey.filter((s) => Number(s.post_launch) === 0);
	const sReason = (s) => ['internal_person', 'test_user', 'test_email'].filter((k) => Number(s[`r_${k}`]) === 1).join(', ');
	md.push('**After launch** (these are what the survey tile and memo read):', '');
	md.push(table(['Person', 'Label', 'Answers', 'Test/internal?', 'First', 'Last'], post.map((s) => [s.pid, label(s.pid), s.post_launch, sReason(s) || 'no', fmtTime(Date.parse(s.first.replace(' ', 'T') + 'Z')), fmtTime(Date.parse(s.last.replace(' ', 'T') + 'Z'))])), '');
	const postTest = post.filter((s) => sReason(s));
	// Test answers are already kept off the survey tile by its test filter, so
	// only an unexplained one needs attention: a labeled one is listed above.
	const postTestUnlabeled = postTest.filter((s) => !label(s.pid));
	if (postTestUnlabeled.length) mismatches.push(`unlabeled internal/test survey answers after launch: ${postTestUnlabeled.map((s) => s.pid).join(', ')}`);
	md.push(`**Before launch:** ${pre.reduce((a, s) => a + Number(s.answers), 0)} answers from ${pre.length} persons (${pre.filter((s) => Number(s.has_record) === 1).length} with a person record, ${pre.filter((s) => Number(s.has_record) !== 1).length} cookieless with none, which can't be deleted). Read survey results from ${INSIGHT_START} UTC.`, '');
	Object.assign(metrics, { 'survey|post_launch_persons': post.length, 'survey|post_launch_test_persons': postTest.length, 'survey|pre_launch_answers': pre.reduce((a, s) => a + Number(s.answers), 0), 'survey|pre_launch_persons': pre.length });

	// 6. Checks: leaks past the person filter, flag types, exposure property, hygiene
	md.push('### 6. Checks', '');
	const TILE_EVENTS = ['landing_page_viewed', 'cookie_banner_answered', 'signup_form_submitted', 'survey sent', 'channel_link_clicked', '$experiment_exposure'];
	// a) Persons flagged internal/test *now* whose events, when captured, didn't
	// carry the flag. Person-on-events reads event-time person properties, so
	// the project filter's person conditions can't catch these.
	const leaks = await hogql(`
SELECT toString(person_id) AS pid, toString(timestamp) AS ts, event,
  ${isTrue('properties.is_internal')} AS ev_prop_internal
FROM events
WHERE timestamp >= toDateTime('${EXPERIMENT_START}', 'UTC')
  AND person_id IN (SELECT id FROM persons WHERE ${isTrue('properties.is_internal')} OR ${isTrue('properties.$internal_or_test_user')})
  AND NOT (${isTrue('person.properties.is_internal')} OR ${isTrue('person.properties.$internal_or_test_user')})
ORDER BY timestamp
LIMIT 1000`);
	md.push('**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):', '');
	md.push(table(['Person', 'Label', 'Time', 'Event', 'Reaches a tile?', 'Has event property is_internal'], leaks.map((l) => [l.pid, label(l.pid), l.ts, l.event, TILE_EVENTS.includes(l.event) ? '**yes**' : 'no (not a tile event)', Number(l.ev_prop_internal) ? 'yes' : 'no'])), '');
	// D-037: the filter also checks the event's own is_internal, so only events
	// without it get through.
	const through = leaks.filter((l) => !Number(l.ev_prop_internal));
	const tileLeaks = through.filter((l) => TILE_EVENTS.includes(l.event));
	md.push(`Caught anyway by the event condition \`is_internal\` (D-037): ${leaks.length - through.length}. Getting through both: ${through.length} (${tileLeaks.length} on a tile event).`, '');
	// Only a leak onto a tile event changes a number; the rest are listed above
	// and accepted (D-037): $opt_in from internal marking, old-code $pageview.
	if (tileLeaks.length) mismatches.push(`internal events that pass the whole test filter on a tile event: ${tileLeaks.length}`);
	metrics['check|filter_leak_events'] = leaks.length;
	metrics['check|filter_leak_through_both'] = through.length;
	metrics['check|filter_leak_tile_events'] = tileLeaks.length;

	// b) Stored type of the internal flags (must be Bool for the filter to match).
	const types = await hogql(`
SELECT JSONType(toString(properties), 'is_internal') AS t_internal, JSONType(toString(properties), '$internal_or_test_user') AS t_test, count() AS n
FROM persons WHERE properties.is_internal IS NOT NULL OR properties.$internal_or_test_user IS NOT NULL
GROUP BY t_internal, t_test LIMIT 100`);
	md.push('**b) Stored type of the internal flags on person records:**', '');
	md.push(table(['is_internal', '$internal_or_test_user', 'Persons'], types.map((t) => [t.t_internal, t.t_test, t.n])), '');
	const badType = types.filter((t) => ![t.t_internal, t.t_test].every((x) => x === 'Bool' || x === 'Null'));
	if (badType.length) mismatches.push('internal flags stored as a non-boolean type');

	// c) Every clean landing_page_viewed that followed a flag answer must carry
	// $feature/hero-framing (oMvaY0hy relies on it; re-checked after D-035).
	// All events, internal included: this checks the code, and the owner's
	// ?internal=1 test visits are the only post-change loads at first.
	const answered = events.filter((e) => e.event === '$feature_flag_called' && e.feature_flag === FLAG && e.flag_response);
	const pageViews = events.filter((e) => e.event === 'landing_page_viewed');
	const shouldHave = pageViews.filter((v) => answered.some((a) => a.pid === v.pid && Math.abs(a.t - v.t) <= 60e3));
	const missing = shouldHave.filter((v) => !v.has_flag_prop);
	md.push(`**c) \`$feature/hero-framing\` on page views:** ${pageViews.filter((v) => v.has_flag_prop).length} of ${pageViews.length} \`landing_page_viewed\` (internal included) carry it. ${shouldHave.length} followed a flag answer within 60 s; ${missing.length} of those are missing it${missing.length ? ` (${missing.map((v) => `${v.pid} at ${fmtTime(v.t)}`).join(', ')})` : ''}.`, '');
	if (missing.length) mismatches.push(`landing_page_viewed without $feature/hero-framing after a flag answer: ${missing.length}`);
	metrics['check|views_missing_flag_prop'] = missing.length;

	// d) Hygiene: key source, gitignore, no emails in the labels or this doc.
	const { execFileSync } = await import('node:child_process');
	const ignored = (f) => { try { execFileSync('git', ['check-ignore', '-q', f], { cwd: ROOT }); return true; } catch { return false; } };
	const emailRe = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
	const labelsText = existsSync(LABELS) ? readFileSync(LABELS, 'utf8') : '';
	const docText = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
	const envOk = existsSync(join(ROOT, '.env')) && ignored('.env');
	const hyg = [
		['Key read from', process.env.POSTHOG_PERSONAL_API_KEY ? 'environment variable' : '.env', true],
		['.env exists and is gitignored', envOk ? 'yes' : 'NO', envOk],
		['Labels file has no email address', emailRe.test(labelsText) ? 'NO' : 'yes', !emailRe.test(labelsText)],
		['This audit doc has no email address', emailRe.test(docText) ? 'NO' : 'yes', !emailRe.test(docText)],
	];
	md.push('**d) Hygiene:**', '');
	md.push(table(['Check', 'Result'], hyg.map(([x, y]) => [x, y])), '');
	for (const [x, , ok] of hyg) if (!ok) mismatches.push(`hygiene: ${x}`);

	// 7. Diff vs previous run
	md.push('### 7. Diff against the previous run', '');
	const prevText = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
	const prevJson = [...prevText.matchAll(/<!-- audit-json (.*?) -->/g)].pop()?.[1];
	if (!prevJson) md.push('_First run: nothing to compare._', '');
	else {
		const prev = JSON.parse(prevJson);
		const keys = [...new Set([...Object.keys(prev.metrics), ...Object.keys(metrics)])].sort();
		const moved = keys.filter((k) => (prev.metrics[k] ?? 0) !== (metrics[k] ?? 0)).map((k) => {
			const a = prev.metrics[k] ?? 0, b = metrics[k] ?? 0;
			// tile|series|breakdown|side: a new breakdown value under a series that
			// already existed is traffic; a whole new series or tile is a definition change.
			const parts = k.split('|');
			const seriesSeen = parts.length >= 4 && Object.keys(prev.metrics).some((p) => p.startsWith(`${parts[0]}|${parts[1]}|`));
			if (!(k in prev.metrics)) return [k, '—', b, seriesSeen ? '▲ new breakdown value: check it is real traffic' : 'new key (a tile or series added), not traffic'];
			if (!(k in metrics)) return [k, a, '—', 'key gone (a tile or series removed), not lost data'];
			const cumulative = !k.startsWith('test|') && !k.includes('mismatch');
			const flag = b < a && cumulative ? '▼ UNEXPECTED unless a filter change or deletion explains it' : b > a ? '▲ check it is real traffic' : '▼';
			return [k, a, b, flag];
		});
		md.push(`Previous run: ${prev.runAt}${prev.note ? ` (${prev.note})` : ''}.`, '');
		md.push(moved.length ? table(['Number', 'Before', 'Now', ''], moved) : '_No number moved._', '');
	}

	// Summary
	md.splice(4, 0, '### Summary', '', mismatches.length ? mismatches.map((m) => `- ≠ ${m}`).join('\n') : '- ✓ Every tile matches its raw count. No unlabeled internal/test answers after launch. Every unattributed visit is labeled.', '');
	md.push(`<!-- audit-json ${JSON.stringify({ runAt: fmtTime(runAt), note: NOTE, metrics })} -->`, '', '---', '');

	const section = md.join('\n');
	// Exit 3 when anything needs attention, so a mismatch can't hide behind exit 0.
	if (mismatches.length) process.exitCode = 3;
	if (DRY) { console.log(section); return; }
	const header = '# Metrics audit\n\nAppended by `scripts/metrics-audit.mjs` (read-only; see `.claude/agents/metrics-auditor.md`). Newest run at the bottom. Person IDs only, never emails.\n\n';
	writeFileSync(OUT, (prevText || header) + section);
	console.log(section.split('### 1.')[0]);
	console.log(`Appended to ${OUT}`);
}

main().catch((err) => {
	console.error(err.message);
	process.exit(1);
});
