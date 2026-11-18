// Same-origin proxy for PostHog (D-018), so ad blockers that block PostHog's
// own domains don't drop events. The browser SDK uses api_host '/sp'.
//   /sp/static/*  -> us-assets.i.posthog.com (SDK extensions: recorder, surveys)
//   /sp/*         -> us.i.posthog.com        (events, flags, config)
// The visitor's IP is forwarded so geo and the cookieless hash stay correct.

const API_HOST = 'us.i.posthog.com';
const ASSET_HOST = 'us-assets.i.posthog.com';
const PREFIX = '/sp';

export const onRequest: PagesFunction = async ({ request }) => {
	const url = new URL(request.url);
	const path = url.pathname.slice(PREFIX.length) || '/';
	const host = path.startsWith('/static/') ? ASSET_HOST : API_HOST;
	const target = new URL(`https://${host}${path}${url.search}`);

	const headers = new Headers(request.headers);
	headers.delete('cookie');
	headers.set('host', host);
	const ip = request.headers.get('cf-connecting-ip');
	if (ip) headers.set('x-forwarded-for', ip);

	const init: RequestInit = {
		method: request.method,
		headers,
		redirect: 'follow',
	};
	if (request.method !== 'GET' && request.method !== 'HEAD') {
		init.body = await request.arrayBuffer();
	}

	const response = await fetch(target.toString(), init);
	// Drop any upstream cookies; PostHog's SDK manages its own storage.
	const out = new Response(response.body, response);
	out.headers.delete('set-cookie');
	return out;
};
