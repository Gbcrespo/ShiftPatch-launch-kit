export const contactEmail = 'shiftpatchsurvey@gmail.com';

// Signup form roles (D-008). Order is the order shown.
export const roles = [
	'Director of nursing / CNO',
	'Nurse manager',
	'Staffing or scheduling coordinator',
	'Finance or operations',
	'Nurse',
	'Other',
	'Just helping test',
] as const;

// Thank-you survey (D-004).
export const surveyQuestion =
	'How many short-notice shifts does your facility fill in a typical month?';
export const surveyAnswers = [
	'Fewer than 5',
	'5–15',
	'16–30',
	'31–60',
	'More than 60',
	"I don't know",
] as const;
