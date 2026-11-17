// A/B hero copy (D-001, D-010). Both variants keep the same structure so
// only the pain differs. Change one, check the other still matches.
export type Variant = 'a' | 'b';

export const hero: Record<Variant, { headline: string; support: string }> = {
	a: {
		headline: 'Stop paying a premium for short-notice shifts.',
		support:
			"When a shift opens up at the last minute, the fix is usually overtime or an agency. ShiftPatch is an idea we're testing for filling those shifts without the extra cost.",
	},
	b: {
		headline: "Stop phoning around to fill tonight's shift.",
		support:
			"When a shift opens up at the last minute, someone ends up working down a call list. ShiftPatch is an idea we're testing for getting the open shift to the right nurses without the calls.",
	},
};

// Shared across variants, not part of the test.
export const ctaLabel = 'Join the early list';
