# Step 6 notes

Things to do in step 6, carried over from earlier steps.

## Before sharing the links (2026-11-19, 15:00 BRT, D-025)

1. **6d, clean test data first:** delete the test persons and the test survey answers listed in `docs/reviews/step-4-posthog-review.md` (part D, 14 survey answers by person id), plus every step 5 test signup listed in `docs/step-5-notes.md`. Cookieless test visitors without a person record can't be deleted; they're dated before launch and filtered out by the launch date (D-021).
2. **Launch the experiment** "Hero framing: money vs time" (id 612484) **right before sending the `personal_network` link**. It stays DRAFT until then. Launching sets its start date to that moment (D-021).
3. Then share `https://shiftpatch-concept.pages.dev/go/personal_network`.

## Reading the results

- Read every number from 2026-11-19 18:00 UTC (15:00 BRT), with test accounts filtered (D-025). The saved insights already do this (`docs/tracking-plan.md`).
- The channel headline is buyer signups ÷ visitors per `utm_source` (`opzPWguM`). The funnel (`KK0a37NQ`) undercounts visitors who accept cookies (D-023).
- Use `hero_variant` for A/B breakdowns outside the experiment (D-022). A/B results are directional only. Visitors who accept may count twice in exposures (D-023). The memo says both.

## Status (2026-11-19)

- **6d:** 18 test persons deleted (D-025). test6 and the hotmail test person kept.
- **Launched:** experiment 612484 is running from 17:48:18 UTC (D-026). Insights read from 18:00 UTC.
- **Open after launch:** the iOS lost-batch fix (D-026 finding 2), the follow-up emails for the 6a runs (+2h, +6h), and deleting test rows from the Google Sheet.

## Step 8: metrics and dashboard validation (2026-11-20)

Decisions D-029 to D-038. The audit is `npm run audit` (`scripts/metrics-audit.mjs`). It only reads PostHog, and appends a dated section with a diff to `docs/metrics-audit.md`. Agents: `.claude/agents/metrics-auditor.md` (before and after every change) and `.claude/agents/metrics-verifier.md` (once, at the end).

### What changed

- **Test-account filter** (project setting): direct conditions instead of the stale cohort 728308 (D-029). It also checks the event's own `is_internal` (D-037), excludes preview-deploy hosts, and excludes the Hotmail test address (D-038). This took the owner out of every tile.
- **Tiles:**
  - Funnel step 1 is the action "Landed" (D-030).
  - A second funnel with all signups (D-036).
  - `welcome_email` is out of the acquisition tiles (D-034).
  - The A/B cross-check counts only exposed events (D-031).
  - Every tile and the experiment have a caption with its start time and known limits.
- **Code, live from about 2026-11-20 13:51 UTC (10:51 BRT):**
  - The exposure, `$pageview` and `landing_page_viewed` go out only once the page is actually seen (D-035).
  - `/go/` doesn't count prefetches or link-preview bots (D-033).
  - Owner-tested on the preview with `?internal=1`. The exposure properties are identical to the old code's.
- **Cleanup** (D-032, D-038): 13 pre-launch test profiles queued for deletion with their events and recordings, from `docs/cleanup-list.md`. The 3 D-025 provider-test profiles stay.

### Reading the numbers for the memo

- **Start times:** the experiment counts from 14:48 BRT, 19 Nov (17:48:18 UTC). Insights count from 15:00 BRT (18:00 UTC).
- **Exposures:** a visitor who accepts cookies counts twice at funnel step 1 and as 2 exposures. Both arms are affected the same way (D-023, D-030, D-031).
- **Signups by variant:** for counts outside the experiment, use only events that carry `$feature/hero-framing` (D-031, `oMvaY0hy`).
- **Visits and clicks before 10:51 BRT, 20 Nov** may include prefetch, preview and background-tab loads. Visits and clicks after it don't. iPhone long-press previews still count as clicks (D-026).
- **The unattributed direct visit** `836fe88c…` (19 Nov 19:14 UTC) might be the owner (not confirmed). It's labeled and kept. It's the "(none)" visitor on the traffic tiles.
- **Survey:** read the answers from launch. Pre-launch test answers without a person record can't be deleted (D-032).
- **No significance.** Every number is a count from a handful of visitors.

### Before Sunday's memo

- Run `npm run audit` once more with no changes. The Summary must say every tile matches its raw count.
- Check that the 13 queued deletions finished (People, and the audit's "before launch" survey line).

## Step 9: the funnel the brief asks for (2026-11-20)

Decisions D-040 to D-044. The dashboard now fits on one screen:
- **Row 1:** the stage funnel `d1JCOgLG` (Landed → form started → signed up → welcome email opened → email link clicked, by channel) next to the experiment.
- **Row 2:** the channel table `opzPWguM` (visitors, all and buyer signups, hero clicks, both rates), then traffic and link clicks.

The old funnels `KK0a37NQ` and `dRTNVtm9` stay saved, off the dashboard. The captions are one sentence each, and the limits are listed in the dashboard description (D-043). The audit covers the new funnel and the rate formulas.
