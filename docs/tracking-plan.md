# Tracking plan

The single source of truth for event names (D-018). Any event a hypothesis, dashboard or experiment uses must be listed here. New events are proposed, decided and logged in `docs/decisions.md` before they're added.

Naming rule (CLAUDE.md): snake_case, object_verb, past tense. PostHog's own built-in events keep PostHog's names and are listed separately.

PostHog project: ShiftPatch (US, project 741778). Events go through our own proxy at `/sp`.

## Funnel

`landing_page_viewed` → `hero_cta_clicked` (optional step) → `signup_form_started` → `signup_form_submitted` → `survey sent` (the volume question)

## Our events

| Event | Fires when | Where | Properties |
| :--- | :--- | :--- | :--- |
| `landing_page_viewed` | The landing page (`/`) loads and the variant is known | browser | `hero_variant`, utm_* |
| `hero_cta_clicked` | "Join the early list" button in the hero is clicked | browser | `hero_variant` |
| `signup_form_started` | First input or change in the email or role field (once per page load) | browser | `hero_variant`, `field` (`email` or `role`) |
| `signup_form_submitted` | The signup form passes validation. **Primary A/B metric** (filtered to `is_buyer_role = true`, D-009) | browser | `role`, `is_buyer_role`, `hero_variant` |
| `cookie_banner_answered` | Accept or No thanks clicked on the consent banner | browser | `choice` (`accepted` or `declined`) |
| `channel_link_clicked` | Someone opens a tracked `/go/<channel>` link, before the redirect | server (Pages Function) | `channel`, `utm_source`, `utm_medium`, `utm_campaign` |

## PostHog built-in events (names set by PostHog)

| Event | Used for |
| :--- | :--- |
| `$pageview` | Every page view, sent automatically |
| `$feature_flag_called` | Experiment exposure for flag `hero-framing` |
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

- Flag `hero-framing`: `control` = Variant A (money), `time` = Variant B (time), 50/50.
- Experiment "Hero framing: money vs time". Primary metric: `signup_form_submitted` where `is_buyer_role = true`. Secondary metrics: all `signup_form_submitted`, and `survey sent` for the volume question.

## Later steps (not built yet)

Email events (step 5) will be added here, named by the same rule, once the email tool is chosen.
