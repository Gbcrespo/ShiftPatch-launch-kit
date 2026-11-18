# Step 6 notes

Things to do in step 6, carried over from earlier steps.

## Before sharing the links (2026-11-19, 12:00 BRT)

1. **6d, clean test data first:** delete the test persons and the test survey answers listed in `docs/reviews/step-4-posthog-review.md` (part D, 14 survey answers by person id), plus every step 5 test signup listed in `docs/step-5-notes.md`. Cookieless test visitors without a person record can't be deleted; they're dated before launch and filtered out by the launch date (D-021).
2. **Launch the experiment** "Hero framing: money vs time" (id 612484) **right before sending the `personal_network` link**. It stays DRAFT until then. Launching sets its start date to that moment (D-021).
3. Then share `https://shiftpatch-concept.pages.dev/go/personal_network`.

## Reading the results

- Read every number from 2026-11-19 15:00 UTC, with test accounts filtered (D-021). The saved insights already do this (`docs/tracking-plan.md`).
- The channel headline is buyer signups ÷ visitors per `utm_source` (`opzPWguM`). The funnel (`KK0a37NQ`) undercounts visitors who accept cookies (D-023).
- Use `hero_variant` for A/B breakdowns outside the experiment (D-022). A/B results are directional only. Visitors who accept may count twice in exposures (D-023). The memo says both.
