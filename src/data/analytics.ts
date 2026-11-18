// PostHog identifiers (D-018). The project token is public by design: it can
// only send events, not read data.
import { roles, surveyQuestion } from './site';

export const analyticsConfig = {
	token: 'phc_w5EPh6vnwRLUWfxVBLPytjzNXCU4Ju3xYrx5SCj8FxeA',
	flagKey: 'hero-framing',
	// 'control' = Variant A (money), 'time' = Variant B (time).
	testVariant: 'time',
	// API-mode survey for the volume question (D-017), "Volume question
	// (thank-you screen)" in PostHog Surveys.
	volumeSurveyId: '01a1ef17-b69e-0000-336f-3ef067316d59',
	volumeQuestionId: 'dc9030ae-22f8-4519-a037-86d6b878a113',
	volumeQuestion: surveyQuestion,
} as const;

// Buyer roles for the headline A/B number (D-009).
export const buyerRoles = [
	'Director of nursing / CNO',
	'Nurse manager',
	'Staffing or scheduling coordinator',
	'Finance or operations',
] as const satisfies readonly (typeof roles)[number][];
