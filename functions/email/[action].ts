// Step 5c (D-024): the email function.
//   POST /email/sent         Apps Script reports a send (HMAC-signed) -> welcome_email_sent
//   GET  /email/open         1x1 image in the welcome email            -> welcome_email_opened
//   GET  /email/click        the survey link in all three emails       -> welcome_email_link_clicked, then redirect to the Google Form
//   GET  /email/unsubscribe  confirm page (link scanners only GET, so nobody is unsubscribed by accident)
//   POST /email/unsubscribe  marks the contact unsubscribed in the Sheet via Apps Script
// Links carry e=<base64url email> and t=<HMAC token for that email and action>,
// so events and unsubscribes can't be forged.
import {
	captureForEmail,
	hmacHex,
	linkToken,
	normalizeEmail,
	safeEqual,
	type EmailEnv,
} from '../_shared/server';

const GIF = Uint8Array.from(atob('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'), (c) =>
	c.charCodeAt(0),
);
const MAX_SKEW_MS = 10 * 60 * 1000;
const SURVEY_URL = 'https://forms.gle/Trhg58CsaBRQ6bCn6';

export const onRequest: PagesFunction<EmailEnv> = async (ctx) => {
	const { request, params, env } = ctx;
	const action = String(params.action ?? '');
	if (!env.EMAIL_SECRET) return new Response('Not configured', { status: 503 });

	if (action === 'sent' && request.method === 'POST') return sent(ctx);
	if (action === 'open' && request.method === 'GET') return open(ctx);
	if (action === 'click' && request.method === 'GET') return click(ctx);
	if (action === 'unsubscribe') return unsubscribe(ctx);
	return new Response('Not found', { status: 404 });
};

type Ctx = EventContext<EmailEnv, string, Record<string, unknown>>;

/** Verify a signed {payload, signature} body from Apps Script. */
async function readSigned(request: Request, secret: string): Promise<Record<string, unknown> | null> {
	try {
		const { payload, signature } = (await request.json()) as { payload?: string; signature?: string };
		if (typeof payload !== 'string' || typeof signature !== 'string') return null;
		if (!safeEqual(await hmacHex(secret, payload), signature.toLowerCase())) return null;
		const data = JSON.parse(payload) as Record<string, unknown>;
		if (typeof data.ts !== 'number' || Math.abs(Date.now() - data.ts) > MAX_SKEW_MS) return null;
		return data;
	} catch {
		return null;
	}
}

async function sent({ request, env, waitUntil }: Ctx): Promise<Response> {
	const data = await readSigned(request, env.EMAIL_SECRET);
	const email = data && normalizeEmail(data.email);
	if (!data || !email) return new Response('Forbidden', { status: 403 });
	if (data.step === 'welcome') {
		waitUntil(captureForEmail('welcome_email_sent', email, { email_step: 'welcome' }, request));
	}
	return new Response('ok');
}

/** Read e= and t= from a link and check the token. Returns the email, or null. */
async function verifiedEmail(url: URL, secret: string, action: string): Promise<string | null> {
	const email = normalizeEmail(decodeB64Url(url.searchParams.get('e') ?? ''));
	const token = (url.searchParams.get('t') ?? '').toLowerCase();
	if (!email || !token) return null;
	return safeEqual(await linkToken(secret, email, action), token) ? email : null;
}

async function open({ request, env, waitUntil }: Ctx): Promise<Response> {
	const email = await verifiedEmail(new URL(request.url), env.EMAIL_SECRET, 'open');
	if (email) waitUntil(captureForEmail('welcome_email_opened', email, { email_step: 'welcome' }, request));
	return new Response(GIF, {
		headers: { 'content-type': 'image/gif', 'cache-control': 'no-store, max-age=0' },
	});
}

async function click({ request, env, waitUntil }: Ctx): Promise<Response> {
	const url = new URL(request.url);
	const email = await verifiedEmail(url, env.EMAIL_SECRET, 'click');
	// Fixed destination (no open redirect): the 5-question Google Form survey (D-052).
	// All three emails use this link, so email_step is 'welcome' for every click (D-053).
	const target = new URL(SURVEY_URL);
	if (email) {
		waitUntil(
			captureForEmail('welcome_email_link_clicked', email, { email_step: 'welcome', link: 'qualification_survey' }, request),
		);
	}
	return new Response(null, { status: 302, headers: { location: target.toString(), 'cache-control': 'no-store' } });
}

async function unsubscribe({ request, env }: Ctx): Promise<Response> {
	const url = new URL(request.url);
	const email = await verifiedEmail(url, env.EMAIL_SECRET, 'unsubscribe');
	if (!email) return page('This link isn’t valid', '<p>The unsubscribe link looks incomplete. Reply to any of our emails and we’ll take you off the list.</p>', 400);

	if (request.method === 'GET') {
		return page(
			'Unsubscribe from ShiftPatch emails',
			`<p>Stop the ShiftPatch emails to <strong>${escapeHtml(email)}</strong>?</p>
			<form method="post"><button class="button" type="submit">Unsubscribe</button></form>`,
		);
	}
	if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

	const payload = JSON.stringify({ action: 'unsubscribe', email, ts: Date.now() });
	const signature = await hmacHex(env.EMAIL_SECRET, payload);
	const res = await fetch(env.APPS_SCRIPT_URL, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ payload, signature }),
		redirect: 'follow',
	}).catch(() => null);

	if (!res || !res.ok) {
		return page('Something went wrong', '<p>We couldn’t update the list just now. Reply to any of our emails with “unsubscribe” and we’ll remove you by hand.</p>', 502);
	}
	return page('You’re unsubscribed', '<p>You won’t get any more ShiftPatch emails. Thanks for having a look.</p>');
}

function decodeB64Url(value: string): string {
	try {
		const b64 = value.replace(/-/g, '+').replace(/_/g, '/');
		const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
		return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
	} catch {
		return '';
	}
}

function escapeHtml(s: string): string {
	return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function page(title: string, body: string, status = 200): Response {
	const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>${title} | ShiftPatch</title>
<style>body{margin:0;background:#f7f4ec;color:#1f2a44;font:1.0625rem/1.6 system-ui,-apple-system,'Segoe UI',sans-serif}main{max-width:34rem;margin:3rem auto;padding:0 1rem}h1{font-family:Georgia,serif;font-weight:600;font-size:1.75rem;line-height:1.2}.button{min-height:2.75rem;padding:.7rem 1.4rem;border:0;border-radius:4px;background:#2f6f6a;color:#fff;font:600 1.0625rem/1.3 inherit;cursor:pointer}a{color:#24564f}</style></head>
<body><main><h1>${title}</h1>${body}<p><a href="/">Back to ShiftPatch</a></p></main></body></html>`;
	return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}
