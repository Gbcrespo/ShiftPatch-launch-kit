# Tracking plan

The single source of truth for event names (D-018). Any event a hypothesis, dashboard or experiment uses must be listed here. New events are proposed, decided and logged in `docs/decisions.md` before they're added.

Naming rule (CLAUDE.md): snake_case, object_verb, past tense. PostHog's own built-in events keep PostHog's names and are listed separately.

PostHog project: ShiftPatch (US, project 741778). Events go through our own proxy at `/sp`.

## Funnel

The dashboard's stage funnel (insight `d1JCOgLG`, D-040). It counts people, in order, within a 7-day window from step 1, from 2026-11-19 18:00 UTC. It's broken down by the `utm_source` of step 1.

| # | Stage | Event | Notes |
| :--- | :--- | :--- | :--- |
| 1 | Landed | action "Landed" (492050) = `landing_page_viewed` OR `cookie_banner_answered` | A visitor who accepts cookies counts twice here (D-030) |
| 2 | Form started | `signup_form_started` | |
| 3 | Signed up (all roles) | `signup_form_submitted` | Buyer roles are split out in the channel table and the experiment |
| 4 | Welcome email opened | `welcome_email_opened` | Joins only for visitors who accepted cookies (D-026). Can be an automatic open (Apple Mail, Gmail image proxy) |
| 5 | Email link clicked | `welcome_email_link_clicked` | |

Events that aren't funnel stages, and where they're shown instead:
- **`channel_link_clicked`** has its own tile, "Channels: link clicks" (`ZS0Uhz2p`). The `/go/` click is a server event, and it can't be joined to the visit that follows it (D-022).
- **`hero_cta_clicked`** is a column (unique persons per channel) in "Channels: signup rate per visitor" (`opzPWguM`). Visitors who scroll straight to the form are real, so it isn't a funnel step (D-041).
- **`survey sent`** (the volume question) appears in the experiment's secondary metric and in `lQ1PbGvG`.

## Our events

| Event | Fires when | Where | Properties |
| :--- | :--- | :--- | :--- |
| `landing_page_viewed` | The landing page (`/`) is actually seen (not prerendering, not a hidden or background tab) and the variant is known. Since 2026-11-20 13:51 UTC (D-035); before that it fired on load | browser | `hero_variant`, utm_* |
| `hero_cta_clicked` | "Join the early list" button in the hero is clicked | browser | `hero_variant` |
| `signup_form_started` | First input or change in the email or role field (once per page load) | browser | `hero_variant`, `field` (`email` or `role`) |
| `signup_form_submitted` | The signup form passes validation. **Primary A/B metric** (filtered to `is_buyer_role = true`, D-009) | browser | `role`, `is_buyer_role`, `hero_variant` |
| `cookie_banner_answered` | Accept or No thanks clicked on the consent banner | browser | `choice` (`accepted` or `declined`) |
| `channel_link_clicked` | Someone opens a tracked `/go/<channel>` link, before the redirect. Since 2026-11-20 13:51 UTC, prefetches and link-preview bots get the redirect but no event (D-033) | server (Pages Function) | `channel`, `utm_source`, `utm_medium`, `utm_campaign` |

## PostHog built-in events (names set by PostHog)

| Event | Used for |
| :--- | :--- |
| `$pageview` | Every page view. Since D-035 sent by our code (not automatically) once the page is actually seen; `$pageleave` only after that |
| `$feature_flag_called` | Experiment exposure for flag `hero-framing`, sent by posthog-js once the page is seen (D-035). PostHog derives `$experiment_exposure` from it on the server; the experiment reads `$experiment_exposure` |
| `$identify` | Sent by `identify()` at signup (D-016) |
| `survey shown` / `survey sent` | The volume question (API-mode survey, D-017) and the feedback widget |
| `$autocapture`, `$snapshot` (replay, only after consent) | Background context, not used in hypotheses |

## Properties on every event (super properties)

| Property | Values | Notes |
| :--- | :--- | :--- |
| `hero_variant` | `a` (money) / `b` (time) | Set from the `hero-framing` flag. Readable copy of `$feature/hero-framing` |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` | from the URL | Set when the visit arrives with UTM tags (e.g. from `/go/<channel>`) |
| `is_preview` | `true` | Only on `/preview/a` and `/preview/b`, which are excluded from analysis |
| `is_internal` | `true` | Only on the owner's own devices (`/?internal=1`), excluded by the test-account filter |
| `$feature/hero-framing` | `control` / `time` | Set by PostHog when the flag is read; we re-register it after consent (see Identity) |

## Survey properties (PostHog's names)

| Property | On | Notes |
| :--- | :--- | :--- |
| `$survey_id` | `survey shown`, `survey sent` | Volume question: `01a1ef17-b69e-0000-336f-3ef067316d59` |
| `$survey_response_dc9030ae-22f8-4519-a037-86d6b878a113` | `survey sent` | The volume answer (one of the six D-004 labels). Break `survey sent` down by this property to see answers |
| `$survey_submission_id`, `$survey_completed`, `$survey_questions` | `survey sent` | Required by PostHog's API-survey contract |

## Identity (verified in step 4)

- **No choice yet, or "No thanks":** PostHog cookieless mode. The person is a server-side daily hash of IP, user agent and host (`distinct_id` starts with `cookieless_`). Nothing is stored on the device except posthog-js's consent marker. `identify()` doesn't work here, so `signup_form_submitted` sets `email`, `role` and `is_buyer_role` as person properties instead (D-016 fallback).
- **"Accept":** posthog-js swaps the cookieless ID for a new cookie ID. We re-register `hero_variant`, `$feature/hero-framing` and the UTM tags, and re-send one `$feature_flag_called` (with `exposure_resent_after_consent: true`) for the variant the visitor actually saw. At signup, `identify(email)` runs.
- **`channel_link_clicked`** is sent by the server (the `/go/<channel>` function) as a cookieless event with the visitor's IP and user agent, so PostHog hashes it to the same daily person as the landing visit that follows. It can be a funnel step only for visitors who haven't accepted cookies before the click; read it on its own (Trends, broken down by `channel`) for anything else.

## Person properties

| Property | Set by | Notes |
| :--- | :--- | :--- |
| `email` | `identify()` at signup | distinct_id = lowercased email (D-016) |
| `role`, `is_buyer_role` | `identify()` at signup | Buyer roles per D-009 |
| `is_internal` | `/?internal=1` | Owner's devices |

## Feature flag and experiment

- **Analysis window starts 2026-11-19 18:00 UTC (15:00 BRT)**, the launch time (D-025, replacing D-021's 15:00 UTC). Anything earlier is testing. Use this as `date_from` in every insight.
- **Variant source of truth: `hero_variant`** (D-022). Don't break anything down by `$feature/hero-framing`: it can flip after Accept or `identify()`. Exposures and the experiment are unaffected.
- **Don't split `$pageview` by `hero_variant`.** Before D-035 it never had it (it fired before the flag answered); since D-035 it has it only when the flag answered before the page was seen. Use `landing_page_viewed` for anything split by variant (D-022), and only events that carry `$feature/hero-framing` (D-031).
- **Channel numbers:** rates computed from unique people per event, by `utm_source` (buyer-role signups ÷ visitors). Accept moves a visitor to a new person (D-022, D-023). Since D-030 the per-person funnels start at "Landed", so a visitor who accepts is counted twice at step 1 instead of being dropped.

### Saved insights (all from 2026-11-19 18:00 UTC, test accounts filtered)

| Insight | Short id | For |
| :--- | :--- | :--- |
| Channels: signup rate per visitor (all roles and buyers) | `opzPWguM` | H1–H3 headline; dashboard (D-042): visitors, all and buyer signups, hero clicks, signups ÷ visitors |
| Funnel: channel → signup → welcome email (by utm_source) | `d1JCOgLG` | dashboard stage funnel (D-040) |
| Channels: funnel visit → buyer signup → volume answer (by utm_source) | `KK0a37NQ` | saved, off the dashboard since D-040 |
| Channels: link clicks (by channel) | `ZS0Uhz2p` | H1–H3 clicks |
| Signups by role (by utm_source) | `d9eeKWIG` | H2 |
| A/B: buyer-signup rate per visitor (by hero_variant) | `oMvaY0hy` | A/B cross-check |
| Volume question answers (pricing input) | `lQ1PbGvG` | D-004/D-005 |
| Channels: traffic (visitors by utm_source) | `dBS4IKQb` | step 6 dashboard |
| Channels: funnel visit → any signup → volume answer (by utm_source) | `dRTNVtm9` | saved, off the dashboard since D-040 |

**Dashboard "ShiftPatch launch"** (id 2381553, D-040 to D-044): it fits on one screen. Row 1: the stage funnel `d1JCOgLG` next to the experiment 612484 results. Row 2: the channel table `opzPWguM`, then traffic `dBS4IKQb` and link clicks `ZS0Uhz2p`. Each tile has a one-sentence caption, and the known limits are listed in the dashboard description (D-043). `opzPWguM`, `dBS4IKQb` and `ZS0Uhz2p` exclude `utm_source = welcome_email` (D-034). `oMvaY0hy` counts only events with `$feature/hero-framing` (D-031).

**Test-account filter** (project setting, D-029, D-037, D-038): person `is_internal` ≠ true, person `$internal_or_test_user` ≠ true, person `email` not containing `example.com`, `gbcrespo10` or `gbcre.eng`, event `is_internal` ≠ true, `$host` not localhost/127.0.0.1 and not containing `.shiftpatch-concept.pages.dev` (preview deploys), `$pathname` not `/preview/`. Known limits and where each is captioned: D-039. Check it with `npm run audit` (`scripts/metrics-audit.mjs`, read-only), which appends to `docs/metrics-audit.md`. Every tile starts at 18:00 UTC with test accounts filtered; the experiment counts from its launch.

- Flag `hero-framing`: `control` = Variant A (money), `time` = Variant B (time), 50/50.
- Experiment "Hero framing: money vs time". Primary metric: `signup_form_submitted` where `is_buyer_role = true`. Secondary metrics: all `signup_form_submitted`, and `survey sent` for the volume question.

## Email events (step 5, D-024)

Sent by the `/email/<action>` Cloudflare function, with `distinct_id` = the contact's lowercased email. Visitors who accepted cookies were identified by that email at signup (D-016), so these join the same person. Visitors who declined can't be joined: they have no person record and no email on their events, so their email events count as totals only (D-026).

| Event | Fires when | Where | Properties |
| :--- | :--- | :--- | :--- |
| `welcome_email_sent` | Apps Script has sent the welcome email (signed call to `/email/sent`) | server | `email_step` (`welcome`) |
| `welcome_email_opened` | The welcome email's 1×1 image loads (`/email/open`). Inflated: Apple Mail and Gmail's image proxy load images automatically | server | `email_step` |
| `welcome_email_link_clicked` | The welcome email's "How it would work" link is clicked (`/email/click`, then a redirect to `/?utm_source=welcome_email…#how-heading`). The honest engagement number | server | `email_step`, `link` (`how_it_would_work`) |

Follow-up emails aren't tracked in PostHog. Their send times are in the Google Sheet (D-024).
