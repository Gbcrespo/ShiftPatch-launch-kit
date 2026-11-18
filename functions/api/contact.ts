// Step 5a (D-024): the signup form also adds the contact to the email list.
// The browser posts here after signup_form_submitted; this function adds the
// shared secret and forwards to the Apps Script web app in the ShiftPatch Gmail,
// which stores the row in the Google Sheet and sends the welcome email.
import { normalizeEmail, hmacHex, type EmailEnv } from '../_shared/server';

const ROLES = new Set([
	'Director of nursing / CNO',
	'Nurse manager',
	'Staffing or scheduling coordinator',
	'Finance or operations',
	'Nurse',
	'Other',
	'Just helping test',
]);

export const onRequestPost: PagesFunction<EmailEnv> = async ({ request, env, waitUntil }) => {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return json({ ok: false, error: 'bad_json' }, 400);
	}

	const email = normalizeEmail(body.email);
	const role = typeof body.role === 'string' && ROLES.has(body.role) ? body.role : null;
	const heroVariant = body.hero_variant === 'a' || body.hero_variant === 'b' ? body.hero_variant : null;
	if (!email || !role) return json({ ok: false, error: 'invalid' }, 400);
	if (!env.APPS_SCRIPT_URL || !env.EMAIL_SECRET) return json({ ok: false, error: 'not_configured' }, 503);

	const payload = JSON.stringify({
		action: 'contact',
		email,
		role,
		hero_variant: heroVariant,
		ts: Date.now(),
	});
	const signature = await hmacHex(env.EMAIL_SECRET, payload);

	// Apps Script replies through a redirect; follow it, but don't make the
	// visitor wait for the welcome email to be sent.
	waitUntil(
		fetch(env.APPS_SCRIPT_URL, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ payload, signature }),
			redirect: 'follow',
		}).catch(() => undefined),
	);

	return json({ ok: true }, 202);
};

function json(data: unknown, status: number): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
	});
}
