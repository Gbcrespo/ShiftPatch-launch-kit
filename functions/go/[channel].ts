// Tracked channel links (step 4c, D-019): /go/<channel> sends
// `channel_link_clicked` to PostHog, then redirects to the landing page with
// UTM tags. One entry per channel the owner picked, plus personal_network.
//
// The event is cookieless (no cookie is read or set). It carries the visitor's
// IP and user agent, so PostHog hashes it to the same daily person as the
// landing visit that follows (docs/tracking-plan.md, "Identity").

const TOKEN = 'phc_w5EPh6vnwRLUWfxVBLPytjzNXCU4Ju3xYrx5SCj8FxeA';
const CAPTURE_URL = 'https://us.i.posthog.com/i/v0/e/';
const CAMPAIGN = 'prelaunch-2026-11';

const CHANNELS: Record<string, { medium: string }> = {
	personal_network: { medium: 'referral' }, // this week's 10–15 visits
	direct_outreach: { medium: 'outreach' }, // ready, not sent this week
	linkedin: { medium: 'social' }, // ready, not posted this week
	fonl_annual_2027: { medium: 'event' }, // Florida events only (D-020); Nov 3–5, 2027
	linkedin_ads: { medium: 'paid_social' }, // LinkedIn Sponsored Content (D-028); runs only after the A/B is read
};

export const onRequestGet: PagesFunction = async ({ request, params, waitUntil }) => {
	const channel = String(params.channel ?? '').toLowerCase();
	const config = CHANNELS[channel];
	const url = new URL(request.url);
	if (!config) return Response.redirect(`${url.origin}/`, 302);

	const utm = { utm_source: channel, utm_medium: config.medium, utm_campaign: CAMPAIGN };
	const target = new URL('/', url.origin);
	for (const [k, v] of Object.entries(utm)) target.searchParams.set(k, v);
	// Pass through an optional content tag, e.g. /go/linkedin?c=post1
	const content = url.searchParams.get('c');
	if (content) target.searchParams.set('utm_content', content.slice(0, 64));

	const ip = request.headers.get('cf-connecting-ip') ?? undefined;
	const ua = request.headers.get('user-agent') ?? '';
	// Prefetches and link-preview fetchers get the same redirect but send no
	// event (D-033), so they don't count as clicks.
	if (isPrefetchOrPreview(request.headers, ua)) return redirect(target);
	const event = {
		api_key: TOKEN,
		event: 'channel_link_clicked',
		distinct_id: '$posthog_cookieless',
		timestamp: new Date().toISOString(),
		properties: {
			channel,
			...utm,
			...(content ? { utm_content: content.slice(0, 64) } : {}),
			$cookieless_mode: true,
			$process_person_profile: false,
			$ip: ip,
			$raw_user_agent: ua,
			$host: url.host,
			$current_url: url.toString(),
			$lib: 'shiftpatch-go-function',
		},
	};

	waitUntil(
		fetch(CAPTURE_URL, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'user-agent': ua,
				...(ip ? { 'x-forwarded-for': ip } : {}),
			},
			body: JSON.stringify(event),
		}).catch(() => undefined),
	);

	return redirect(target);
};

const redirect = (target: URL) =>
	new Response(null, {
		status: 302,
		headers: { location: target.toString(), 'cache-control': 'no-store' },
	});

// Link-preview and crawler user agents (chat apps, social networks, search).
// In-app browsers such as "LinkedInApp" or "Instagram" are real visitors and
// don't match. iMessage previews identify as facebookexternalhit + Twitterbot.
const PREVIEW_UA =
	/facebookexternalhit|facebot|twitterbot|linkedinbot|slackbot|slack-imgproxy|whatsapp|telegrambot|discordbot|skypeuripreview|applebot|googlebot|bingbot|redditbot|pinterestbot|embedly|iframely|headlesschrome|\bbot\b|crawler|spider/i;

function isPrefetchOrPreview(headers: Headers, ua: string) {
	const purpose = `${headers.get('sec-purpose') ?? ''} ${headers.get('purpose') ?? ''} ${headers.get('x-purpose') ?? ''} ${headers.get('x-moz') ?? ''}`.toLowerCase();
	if (/prefetch|prerender|preview/.test(purpose)) return true;
	return ua.trim() === '' || PREVIEW_UA.test(ua);
}
