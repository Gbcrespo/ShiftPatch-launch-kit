# Grading checklist

All work from step 4 on is checked against this list (D-013). Each step's summary says which items it covers and which are still open.

## Hypothesis format

Every hypothesis uses this sentence:

> We believe that **[action]** will result in **[outcome]**, validated by **[audience]** using **[measurement]**, because **[rationale]**.

- [ ] Each hypothesis names the number it moves.
- [ ] Each hypothesis says where that number lives in PostHog (the insight, experiment or event).
- [ ] No claim of statistical significance on small samples. Report counts and rates as directional.

## Analytics checklist

- [ ] Every channel has its own UTM-tagged link.
- [ ] The funnel is tracked end to end as real events, from visit to signup to survey answer.
- [ ] Every event named in a hypothesis exists in PostHog.
- [ ] The A/B test is a real PostHog Experiment object, with its feature flag and metric attached.
- [ ] Event names are snake_case, object_verb, past tense (for example `signup_form_submitted`).
- [ ] Session replay is on, with `maskAllInputs: true`.
