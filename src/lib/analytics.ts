// PostHog setup (D-002, D-016, D-017, D-018). Event names: docs/tracking-plan.md.
//
// Consent model (D-002): every visitor is counted without cookies (PostHog
// cookieless mode) until they choose. "Accept" switches to cookies and turns on
// session replay with all inputs masked. "No thanks" stays cookieless.
import posthog from 'posthog-js';
import { analyticsConfig, buyerRoles } from '../data/analytics';
import type { Variant } from '../data/hero';

type Page = 'landing' | 'preview' | 'other';

let started = false;

export function startAnalytics(page: Page): typeof posthog {
	if (started) return posthog;
	started = true;

	posthog.init(analyticsConfig.token, {
		api_host: '/sp',
		ui_host: 'https://us.posthog.com',
		defaults: '2026-08-30',
		// Cookieless for everyone until they accept (D-002).
		cookieless_mode: 'on_reject',
		opt_out_capturing_by_default: true,
		person_profiles: 'identified_only',
		// Replay only after consent, never with typed text.
		disable_session_recording: true,
		session_recording: { maskAllInputs: true },
	});

	// Local development counts as internal too: the experiment's test-account
	// filter only reliably excludes people marked internal (verified in step 4).
	const isLocal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
	if (isLocal || new URLSearchParams(location.search).get('internal') === '1') markInternal();
	// Register after any opt-in above: opting in resets the SDK's properties.
	registerUtms();
	if (page === 'preview') keep({ is_preview: true });
	if (posthog.get_explicit_consent_status() === 'granted') posthog.startSessionRecording();

	return posthog;
}

export function consentStatus() {
	return posthog.get_explicit_consent_status();
}

// What this page load has registered, so it survives the identity reset that
// posthog-js does when a cookieless visitor opts in.
const kept: Record<string, unknown> = {};
let exposedFlagValue: string | null = null;

function keep(properties: Record<string, unknown>) {
	Object.assign(kept, properties);
	posthog.register(properties);
}

export function answerConsent(choice: 'accepted' | 'declined') {
	if (choice === 'accepted') {
		// Opting in replaces the cookieless ID with a new one (posthog-js resets
		// to avoid mixing identities). Re-register this page's properties, and
		// re-send the exposure with the variant the visitor actually saw, so the
		// experiment credits their later signup to the right arm.
		posthog.opt_in_capturing();
		posthog.register(kept);
		if (exposedFlagValue) {
			// Pin the flag to what was shown, so the new ID's own evaluation can't
			// stamp a different variant on later events (stored only with consent).
			posthog.featureFlags.overrideFeatureFlags({
				flags: { [analyticsConfig.flagKey]: exposedFlagValue },
			});
			posthog.capture('$feature_flag_called', {
				$feature_flag: analyticsConfig.flagKey,
				$feature_flag_response: exposedFlagValue,
				exposure_resent_after_consent: true,
			});
		}
		posthog.startSessionRecording();
	} else {
		posthog.opt_out_capturing();
	}
	posthog.capture('cookie_banner_answered', { choice });
}

/** Resolve the hero variant from the `hero-framing` flag (D-018). */
export function resolveHeroVariant(onVariant: (v: Variant) => void, timeoutMs = 2500) {
	let done = false;
	const finish = (v: Variant) => {
		if (done) return;
		done = true;
		keep({ hero_variant: v });
		onVariant(v);
	};
	posthog.onFeatureFlags(() => {
		// Flags reload after identify or consent; the variant is fixed once shown.
		if (done) return;
		// getFeatureFlag sends $feature_flag_called, the experiment exposure.
		const flag = posthog.getFeatureFlag(analyticsConfig.flagKey);
		if (flag === 'control' || flag === analyticsConfig.testVariant) {
			exposedFlagValue = flag;
			keep({ [`$feature/${analyticsConfig.flagKey}`]: flag });
			finish(flag === 'control' ? 'a' : 'b');
		}
	});
	// If flags can't load (blocked or offline), show A with no exposure, so the
	// visitor is left out of the experiment rather than miscounted.
	setTimeout(() => finish('a'), timeoutMs);
}

export function registerProps(properties: Record<string, unknown>) {
	keep(properties);
}

export function track(event: string, properties: Record<string, unknown> = {}) {
	posthog.capture(event, properties);
}

export function isBuyerRole(role: string) {
	return (buyerRoles as readonly string[]).includes(role);
}

/**
 * Signup (D-016). With cookies accepted: identify() by lowercased email, so
 * later email events join this person. Without consent the SDK can't identify
 * a cookieless visitor (verified in the step 4 spike: no $identify, and it
 * resets in-memory state), so the D-016 fallback applies: the signup event
 * sets email and role as person properties on the cookieless person.
 */
export function identifySignup(rawEmail: string, role: string) {
	const email = rawEmail.trim().toLowerCase();
	const person = { email, role, is_buyer_role: isBuyerRole(role) };
	const consented = posthog.get_explicit_consent_status() === 'granted';
	posthog.capture(
		'signup_form_submitted',
		{ role, is_buyer_role: person.is_buyer_role },
		consented ? undefined : { $set: person },
	);
	if (consented) posthog.identify(email, person);
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
	// posthog-js marks the survey as seen in localStorage. Without consent we
	// store nothing on the device (D-002), and our own UI doesn't need the mark.
	if (posthog.get_explicit_consent_status() !== 'granted') {
		try {
			localStorage.removeItem(`seenSurvey_${volumeSurveyId}`);
		} catch {}
	}
}

function registerUtms() {
	const params = new URLSearchParams(location.search);
	const utms: Record<string, string> = {};
	for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
		const value = params.get(key);
		if (value) utms[key] = value;
	}
	if (Object.keys(utms).length) keep(utms);
}

/** Owner's own devices (4f). Visiting /?internal=1 counts as accepting cookies. */
function markInternal() {
	if (posthog.get_explicit_consent_status() !== 'granted') posthog.opt_in_capturing();
	keep({ is_internal: true });
	posthog.setPersonProperties({ is_internal: true });
	posthog.setInternalOrTestUser();
}
