// PostHog setup (D-016, D-017, D-018, D-064). Event names: docs/tracking-plan.md.
//
// Tracking model (D-064): no cookies and no consent banner. PostHog keeps one
// random ID in local storage (`persistence: 'localStorage'`), so a visitor is
// one person from the first event, and identify() at signup links that ID to
// the email. Session replay runs with every input masked. A visitor can stop
// analytics on their device from the privacy page; anyone who chose "No
// thanks" under the old banner (D-002) keeps that choice.
import posthog from 'posthog-js';
import { analyticsConfig, buyerRoles } from '../data/analytics';
import type { Variant } from '../data/hero';

type Page = 'landing' | 'preview' | 'other';

let started = false;

export function startAnalytics(page: Page): typeof posthog {
	if (started) return posthog;
	started = true;

	clearConsentEraCookie();
	posthog.init(analyticsConfig.token, {
		api_host: '/sp',
		ui_host: 'https://us.posthog.com',
		defaults: '2026-08-30',
		// Everything in local storage, nothing in a cookie (D-064).
		persistence: 'localStorage',
		person_profiles: 'identified_only',
		// Replay never captures typed text.
		session_recording: { maskAllInputs: true },
		// Page views are sent by hand once the page is really visible (D-035),
		// so prefetched, prerendered and background-tab loads don't count.
		// $pageleave is switched on at that moment too, so a page nobody saw
		// sends no $pageleave either.
		capture_pageview: false,
		capture_pageleave: false,
	});

	// Local development counts as internal too: the experiment's test-account
	// filter only reliably excludes people marked internal (verified in step 4).
	const isLocal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
	if (isLocal || new URLSearchParams(location.search).get('internal') === '1') markInternal();
	registerUtms();
	if (page === 'preview') posthog.register({ is_preview: true });
	whenVisible(() => {
		posthog.capture('$pageview');
		posthog.set_config({ capture_pageleave: true });
	});

	return posthog;
}

// Before D-064, visitors who accepted cookies got PostHog's first-party
// cookie. Delete it once, so "no cookies" is true for returning visitors too.
// PostHog already keeps the same ID in local storage, so the visitor stays the
// same person.
function clearConsentEraCookie() {
	const name = `ph_${analyticsConfig.token}_posthog`;
	if (!document.cookie.includes(name)) return;
	const gone = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
	document.cookie = gone;
	document.cookie = `${gone}; domain=${location.hostname}`;
}

// Runs callbacks, in order, once the page is really seen (D-035): not while
// it's prerendering (document.prerendering) and not while it's hidden (a
// background tab or a prefetch). Each callback runs at most once per load.
const visibleQueue: Array<() => void> = [];
let pageSeen = false;

function isSeen() {
	return !(document as Document & { prerendering?: boolean }).prerendering && document.visibilityState === 'visible';
}

function flushVisible() {
	if (pageSeen || !isSeen()) return;
	pageSeen = true;
	document.removeEventListener('visibilitychange', flushVisible);
	document.removeEventListener('prerenderingchange', flushVisible);
	for (const fn of visibleQueue.splice(0)) fn();
}

if (typeof document !== 'undefined') {
	document.addEventListener('visibilitychange', flushVisible);
	document.addEventListener('prerenderingchange', flushVisible);
}

export function whenVisible(fn: () => void) {
	if (pageSeen) return fn();
	visibleQueue.push(fn);
	flushVisible();
}

/** Resolve the hero variant from the `hero-framing` flag (D-018). */
export function resolveHeroVariant(onVariant: (v: Variant) => void, timeoutMs = 2500) {
	let done = false;
	const finish = (v: Variant) => {
		if (done) return;
		done = true;
		posthog.register({ hero_variant: v });
		onVariant(v);
	};
	posthog.onFeatureFlags(() => {
		// Flags reload after identify; the variant is fixed once shown.
		if (done) return;
		// Read the variant now, without the exposure, so the headline renders
		// exactly as before (D-035).
		const flag = posthog.getFeatureFlag(analyticsConfig.flagKey, { send_event: false });
		if (flag === 'control' || flag === analyticsConfig.testVariant) {
			posthog.register({ [`$feature/${analyticsConfig.flagKey}`]: flag });
			// Once the page is seen, read the flag again with the event on: the
			// SDK sends the same $feature_flag_called it always has, with all its
			// properties, and PostHog derives $experiment_exposure from it. Only
			// if the value still matches what was shown.
			whenVisible(() => {
				const key = analyticsConfig.flagKey;
				if (posthog.getFeatureFlag(key, { send_event: false }) !== flag) return;
				posthog.getFeatureFlag(key);
			});
			finish(flag === 'control' ? 'a' : 'b');
		}
	});
	// If flags can't load (blocked or offline), show A with no exposure, so the
	// visitor is left out of the experiment rather than miscounted.
	setTimeout(() => finish('a'), timeoutMs);
}

export function registerProps(properties: Record<string, unknown>) {
	posthog.register(properties);
}

export function track(event: string, properties: Record<string, unknown> = {}) {
	posthog.capture(event, properties);
}

function isBuyerRole(role: string) {
	return (buyerRoles as readonly string[]).includes(role);
}

/**
 * Signup (D-016, D-064): send the signup, then identify() by lowercased email,
 * so this visit and the later email events are one person.
 */
export function identifySignup(rawEmail: string, role: string) {
	const email = rawEmail.trim().toLowerCase();
	const person = { email, role, is_buyer_role: isBuyerRole(role) };
	posthog.capture('signup_form_submitted', { role, is_buyer_role: person.is_buyer_role });
	posthog.identify(email, person);
}

/** API-mode survey (D-017): our own UI, PostHog's survey events. */
const surveySubmissionId =
	typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now());

export function surveyShown() {
	posthog.capture('survey shown', { $survey_id: analyticsConfig.volumeSurveyId });
}

export function surveySent(answer: string) {
	const { volumeSurveyId, volumeQuestionId, volumeQuestion } = analyticsConfig;
	posthog.capture('survey sent', {
		$survey_id: volumeSurveyId,
		$survey_submission_id: surveySubmissionId,
		$survey_completed: true,
		$survey_questions: [{ id: volumeQuestionId, question: volumeQuestion }],
		[`$survey_response_${volumeQuestionId}`]: answer,
	});
}

/** Privacy page button (D-064): stop analytics and replay on this device. */
export function stopAnalyticsOnThisDevice() {
	posthog.stopSessionRecording();
	posthog.opt_out_capturing();
}

export function analyticsStopped() {
	return posthog.has_opted_out_capturing();
}

function registerUtms() {
	const params = new URLSearchParams(location.search);
	const utms: Record<string, string> = {};
	for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
		const value = params.get(key);
		if (value) utms[key] = value;
	}
	if (Object.keys(utms).length) posthog.register(utms);
}

/** Owner's own devices (4f): /?internal=1 marks this device as internal. */
function markInternal() {
	posthog.register({ is_internal: true });
	posthog.setPersonProperties({ is_internal: true });
	posthog.setInternalOrTestUser();
}
