# Metrics audit

Appended by `scripts/metrics-audit.mjs` (read-only; see `.claude/agents/metrics-auditor.md`). Newest run at the bottom. Person IDs only, never emails.

## Audit 2026-11-20 13:00:00 UTC — baseline, step 8 phase 1, before any change

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ KK0a37NQ: step1|personal_network shows 1, raw 2
- ≠ KK0a37NQ: step1|welcome_email shows 1, raw 0
- ≠ opzPWguM: Visitors|welcome_email shows 1, raw 0
- ≠ dBS4IKQb: Visitors|welcome_email shows 1, raw 0
- ≠ oMvaY0hy: Visitors|a shows 3, raw 1

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per-person funnel. Undercounts visitors who accept cookies (new ID after Accept); read with the rate insight. From launch.”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 1 | 2 | ≠ MISMATCH |
| step1\|welcome_email | 1 | 0 | ≠ MISMATCH |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1-H3 headline. Unique visitors vs buyer-role signups per utm_source. Counts accepted-cookie visitors too. From launch (D-025).”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Visitors\|welcome_email | 1 | 0 | ≠ MISMATCH |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from launch (D-025), test accounts excluded.”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Visitors\|welcome_email | 1 | 0 | ≠ MISMATCH |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, read on its own (D-022). From launch.”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “D-004/D-005 answers from launch, test users filtered (D-022).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A (money) vs B (time) outside the experiment, using hero_variant as the source of truth (D-022). From launch.”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 3 | 1 | ≠ MISMATCH |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings. From launch.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 3 (with a response: 2, empty response: 1). `$experiment_exposure`: 2.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner's main profile (is_internal = true). Kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Local QA clicks from localhost:8799 (step 7 /go/ check) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |

**Unattributed visits** (clean page views with no utm_source):

| Person | Label | First view | Browser / OS |
| :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed direct visit, Chrome on Linux, 2026-11-19 19:14 UTC: possibly the owner, unconfirmed. Kept, not deleted | 2026-11-19 19:14:31 UTC | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | personal_network click with no page view after it: likely a link-preview fetch (unconfirmed, no user agent) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Real visitor 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43.293000 | 2026-11-20 00:27:43.293000 |

**Before launch:** 24 answers from 22 persons (4 with a person record, 18 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Diff against the previous run

_First run: nothing to compare._

<!-- audit-json {"runAt":"2026-11-20 13:00:00 UTC","note":"baseline, step 8 phase 1, before any change","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":1,"KK0a37NQ|step1|personal_network|raw":2,"KK0a37NQ|step1|welcome_email|shown":1,"KK0a37NQ|step1|welcome_email|raw":0,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Visitors|welcome_email|shown":1,"opzPWguM|Visitors|welcome_email|raw":0,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"dBS4IKQb|Visitors|welcome_email|shown":1,"dBS4IKQb|Visitors|welcome_email|raw":0,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":3,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":3,"flag|empty_response":1,"flag|experiment_exposure":2,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":2,"test|events":7,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22}} -->

---
## Audit 2026-11-20 13:02:33 UTC — after D-030 Landed step, D-031 flag-property filter on oMvaY0hy, D-034 welcome_email exclusion, captions; D-029 not yet applied

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ KK0a37NQ: step1|welcome_email shows 1, raw 0
- ≠ oMvaY0hy: Visitors|a shows 2, raw 1

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed (page view or cookie answer): visitors who accept cookies count twice here (D-030, D-023). Step 2 is buyer roles only. Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step1\|welcome_email | 1 | 0 | ≠ MISMATCH |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). (none) = direct, unattributed visits. Quick iOS bounces can be missed (D-026).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. Link previews and prefetches count as clicks (D-026, D-033): read next to visits. welcome_email excluded (D-034).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Directional.”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 2 | 1 | ≠ MISMATCH |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 3 (with a response: 2, empty response: 1). `$experiment_exposure`: 2.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner's main profile (is_internal = true). Kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Local QA clicks from localhost:8799 (step 7 /go/ check) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |

**Unattributed visits** (clean page views with no utm_source):

| Person | Label | First view | Browser / OS |
| :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed direct visit, Chrome on Linux, 2026-11-19 19:14 UTC: possibly the owner, unconfirmed. Kept, not deleted | 2026-11-19 19:14:31 UTC | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | personal_network click with no page view after it: likely a link-preview fetch (unconfirmed, no user agent) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Real visitor 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (4 with a person record, 18 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Diff against the previous run

Previous run: 2026-11-20 13:00:00 UTC (baseline, step 8 phase 1, before any change).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| KK0a37NQ\|step1\|personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|welcome_email\|shown | 1 | 0 | ▼ UNEXPECTED unless a filter change or deletion explains it |
| oMvaY0hy\|Visitors\|a\|shown | 3 | 2 | ▼ UNEXPECTED unless a filter change or deletion explains it |
| opzPWguM\|Visitors\|welcome_email\|shown | 1 | 0 | ▼ UNEXPECTED unless a filter change or deletion explains it |

<!-- audit-json {"runAt":"2026-11-20 13:02:33 UTC","note":"after D-030 Landed step, D-031 flag-property filter on oMvaY0hy, D-034 welcome_email exclusion, captions; D-029 not yet applied","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"KK0a37NQ|step1|welcome_email|shown":1,"KK0a37NQ|step1|welcome_email|raw":0,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":2,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":3,"flag|empty_response":1,"flag|experiment_exposure":2,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":2,"test|events":7,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22}} -->

---
## Audit 2026-11-20 13:14:54 UTC — after D-029 test-account filter (direct conditions), D-036 all-signups funnel, key moved to .env

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed (page view or cookie answer): visitors who accept cookies count twice here (D-030, D-023). Step 2 is buyer roles only. Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: that's buyer signups (D-009, D-036). Accepters count twice at step 1 (D-030).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). (none) = direct, unattributed visits. Quick iOS bounces can be missed (D-026).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. Link previews and prefetches count as clicks (D-026, D-033): read next to visits. welcome_email excluded (D-034).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Directional.”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 3 (with a response: 2, empty response: 1). `$experiment_exposure`: 2.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |

**Unattributed visits** (clean page views with no utm_source):

| Person | Label | First view | Browser / OS |
| :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (4 with a person record, 18 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Null | Bool | 8 |
| Bool | Bool | 4 |

**c) `$feature/hero-framing` on page views:** 1 of 2 clean `landing_page_viewed` carry it. 1 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 13:02:33 UTC (after D-030 Landed step, D-031 flag-property filter on oMvaY0hy, D-034 welcome_email exclusion, captions; D-029 not yet applied).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| KK0a37NQ\|step1\|welcome_email\|shown | 1 | 0 | ▼ UNEXPECTED unless a filter change or deletion explains it |
| check\|filter_leak_events | 0 | 1 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|(none)\|raw | 0 | 1 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|(none)\|shown | 0 | 1 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|raw | 0 | 2 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|shown | 0 | 2 | ▲ check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|raw | 0 | 1 | ▲ check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|shown | 0 | 1 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|raw | 0 | 1 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|shown | 0 | 1 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|a\|shown | 2 | 1 | ▼ UNEXPECTED unless a filter change or deletion explains it |

<!-- audit-json {"runAt":"2026-11-20 13:14:54 UTC","note":"after D-029 test-account filter (direct conditions), D-036 all-signups funnel, key moved to .env","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":3,"flag|empty_response":1,"flag|experiment_exposure":2,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":2,"test|events":7,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":1,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 13:24:39 UTC — after D-037 event-level is_internal condition added to the test-account filter

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed (page view or cookie answer): visitors who accept cookies count twice here (D-030, D-023). Step 2 is buyer roles only. Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: that's buyer signups (D-009, D-036). Accepters count twice at step 1 (D-030).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). (none) = direct, unattributed visits. Quick iOS bounces can be missed (D-026).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. Link previews and prefetches count as clicks (D-026, D-033): read next to visits. welcome_email excluded (D-034).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Directional.”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 3 (with a response: 2, empty response: 1). `$experiment_exposure`: 2.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |

**Unattributed visits** (clean page views with no utm_source):

| Person | Label | First view | Browser / OS |
| :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (4 with a person record, 18 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 1. Getting through both: 0 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Null | Bool | 8 |
| Bool | Bool | 4 |

**c) `$feature/hero-framing` on page views:** 1 of 2 clean `landing_page_viewed` carry it. 1 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 13:14:54 UTC (after D-029 test-account filter (direct conditions), D-036 all-signups funnel, key moved to .env).

_No number moved._

<!-- audit-json {"runAt":"2026-11-20 13:24:39 UTC","note":"after D-037 event-level is_internal condition added to the test-account filter","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":3,"flag|empty_response":1,"flag|experiment_exposure":2,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":2,"test|events":7,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":1,"check|filter_leak_through_both":0,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 13:45:10 UTC — after D-035/D-033 preview tests (owner ?internal=1 visits 13:30–13:37 UTC)

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ unlabeled unattributed visits: 476d4df1-2c74-58c7-82ea-5e520e91571c, c6d3e84a-62e8-505e-8de9-c69f12931a3c
- ≠ internal events that pass the whole test filter: 5 (0 on a tile event)

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed (page view or cookie answer): visitors who accept cookies count twice here (D-030, D-023). Step 2 is buyer roles only. Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: that's buyer signups (D-009, D-036). Accepters count twice at step 1 (D-030).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). (none) = direct, unattributed visits. Quick iOS bounces can be missed (D-026).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. Link previews and prefetches count as clicks (D-026, D-033): read next to visits. welcome_email excluded (D-034).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Directional.”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 7 (with a response: 6, empty response: 1). `$experiment_exposure`: 6.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 |  | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 |  | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c |  | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d |  | 12 | internal_person, test_user, internal_event | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd |  | 14 | internal_person, test_user, internal_event | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 |  | 8 | internal_person, test_user, internal_event | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source):

| Person | Label | First view | Browser / OS |
| :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | Chrome / Linux |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | **UNLABELED** | 2026-11-20 13:30:05 UTC | Chrome / Windows |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | **UNLABELED** | 2026-11-20 13:30:49 UTC | Chrome / Windows |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (4 with a person record, 18 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c |  | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c |  | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c |  | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c |  | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c |  | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d |  | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd |  | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 |  | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |

Caught anyway by the event condition `is_internal` (D-037): 4. Getting through both: 5 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Null | Bool | 8 |
| Bool | Bool | 8 |

**c) `$feature/hero-framing` on page views:** 18 of 19 `landing_page_viewed` (internal included) carry it. 13 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 13:24:39 UTC (after D-037 event-level is_internal condition added to the test-account filter).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| check\|filter_leak_events | 1 | 9 | ▲ check it is real traffic |
| check\|filter_leak_through_both | 0 | 5 | ▲ check it is real traffic |
| flag\|called | 3 | 7 | ▲ check it is real traffic |
| flag\|experiment_exposure | 2 | 6 | ▲ check it is real traffic |
| test\|events | 7 | 46 | ▲ check it is real traffic |
| test\|persons | 2 | 8 | ▲ check it is real traffic |
| unattributed\|persons | 1 | 3 | ▲ check it is real traffic |

<!-- audit-json {"runAt":"2026-11-20 13:45:10 UTC","note":"after D-035/D-033 preview tests (owner ?internal=1 visits 13:30–13:37 UTC)","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":7,"flag|empty_response":1,"flag|experiment_exposure":6,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":8,"test|events":46,"unattributed|persons":3,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":9,"check|filter_leak_through_both":5,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 13:55:14 UTC — after merge to main: D-035 and D-033 live from about 13:51 UTC; captions updated

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ internal events that pass the whole test filter: 5 (0 on a tile event)

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed (page view or cookie answer): visitors who accept cookies count twice here (D-030, D-023). Step 2 is buyer roles only. Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: that's buyer signups (D-009, D-036). Accepters count twice at step 1 (D-030).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov only pages actually seen count (D-035). welcome_email excluded (D-034). (none) = direct. Quick iOS bounces can be missed (D-026).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov, prefetches and preview bots aren't counted (D-033); iPhone long-press previews still are (D-026). Read next to visits. welcome_email excluded (D-034).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Directional.”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 7 (with a response: 6, empty response: 1). `$experiment_exposure`: 6.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 2026-11-20 13:30:05 UTC | f6db5f66.shiftpatch-concept.pages.dev | Chrome / Windows |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (4 with a person record, 18 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |

Caught anyway by the event condition `is_internal` (D-037): 4. Getting through both: 5 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Null | Bool | 8 |
| Bool | Bool | 8 |

**c) `$feature/hero-framing` on page views:** 18 of 19 `landing_page_viewed` (internal included) carry it. 13 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 13:45:10 UTC (after D-035/D-033 preview tests (owner ?internal=1 visits 13:30–13:37 UTC)).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| unattributed\|persons | 3 | 2 | ▼ UNEXPECTED unless a filter change or deletion explains it |

<!-- audit-json {"runAt":"2026-11-20 13:55:14 UTC","note":"after merge to main: D-035 and D-033 live from about 13:51 UTC; captions updated","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":7,"flag|empty_response":1,"flag|experiment_exposure":6,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":8,"test|events":46,"unattributed|persons":2,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":9,"check|filter_leak_through_both":5,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 14:03:01 UTC — after D-038: preview-host and gbcre.eng filter conditions; 13 approved pre-launch test persons queued for deletion

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed (page view or cookie answer): visitors who accept cookies count twice here (D-030, D-023). Step 2 is buyer roles only. Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: that's buyer signups (D-009, D-036). Accepters count twice at step 1 (D-030).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov only pages actually seen count (D-035). welcome_email excluded (D-034). (none) = direct. Quick iOS bounces can be missed (D-026).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov, prefetches and preview bots aren't counted (D-033); iPhone long-press previews still are (D-026). Read next to visits. welcome_email excluded (D-034).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Directional.”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 7 (with a response: 6, empty response: 1). `$experiment_exposure`: 6.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |

Caught anyway by the event condition `is_internal` (D-037): 4. Getting through both: 5 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 5 |

**c) `$feature/hero-framing` on page views:** 18 of 19 `landing_page_viewed` (internal included) carry it. 13 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 13:55:14 UTC (after merge to main: D-035 and D-033 live from about 13:51 UTC; captions updated).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| test\|events | 46 | 47 | ▲ check it is real traffic |
| test\|persons | 8 | 9 | ▲ check it is real traffic |
| unattributed\|persons | 2 | 1 | ▼ UNEXPECTED unless a filter change or deletion explains it |

<!-- audit-json {"runAt":"2026-11-20 14:03:01 UTC","note":"after D-038: preview-host and gbcre.eng filter conditions; 13 approved pre-launch test persons queued for deletion","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":7,"flag|empty_response":1,"flag|experiment_exposure":6,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":9,"test|events":47,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":9,"check|filter_leak_through_both":5,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 14:04:19 UTC — verifier

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed (page view or cookie answer): visitors who accept cookies count twice here (D-030, D-023). Step 2 is buyer roles only. Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: that's buyer signups (D-009, D-036). Accepters count twice at step 1 (D-030).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov only pages actually seen count (D-035). welcome_email excluded (D-034). (none) = direct. Quick iOS bounces can be missed (D-026).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov, prefetches and preview bots aren't counted (D-033); iPhone long-press previews still are (D-026). Read next to visits. welcome_email excluded (D-034).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Directional.”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 7 (with a response: 6, empty response: 1). `$experiment_exposure`: 6.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |

Caught anyway by the event condition `is_internal` (D-037): 4. Getting through both: 5 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 5 |

**c) `$feature/hero-framing` on page views:** 18 of 19 `landing_page_viewed` (internal included) carry it. 13 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 14:03:01 UTC (after D-038: preview-host and gbcre.eng filter conditions; 13 approved pre-launch test persons queued for deletion).

_No number moved._

<!-- audit-json {"runAt":"2026-11-20 14:04:19 UTC","note":"verifier","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":7,"flag|empty_response":1,"flag|experiment_exposure":6,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":9,"test|events":47,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":9,"check|filter_leak_through_both":5,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 14:10:16 UTC — verifier

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed: accepters count twice (D-030, D-023). Step 2 = buyer roles only. (none) includes 1 unattributed visit, maybe the owner (D-039). welcome_email = returning signups, not a channel (D-034). Quick iOS bounces can be missed (D-026). Small sample: directional (D-039).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: buyer signups are (D-009, D-036). Accepters count twice at step 1 (D-030). (none) includes 1 unattributed visit, maybe the owner (D-039). welcome_email = returning signups (D-034). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. welcome_email excluded (D-034). Accepters can appear as 2 people (D-023). (none) includes 1 unattributed visit, maybe the owner (D-039). Quick iOS bounces can be missed (D-026). Small sample: directional (D-039).”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov only pages actually seen count (D-035). welcome_email excluded (D-034). (none) = direct, incl. 1 unattributed visit, maybe the owner (D-039). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov, prefetches and preview bots aren't counted (D-033); iPhone long-press previews still are (D-026). Read next to visits. welcome_email excluded (D-034). Directional (D-039).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Directional.”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 7 (with a response: 6, empty response: 1). `$experiment_exposure`: 6.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |

Caught anyway by the event condition `is_internal` (D-037): 4. Getting through both: 5 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 5 |

**c) `$feature/hero-framing` on page views:** 18 of 19 `landing_page_viewed` (internal included) carry it. 13 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 14:04:19 UTC (verifier).

_No number moved._

<!-- audit-json {"runAt":"2026-11-20 14:10:16 UTC","note":"verifier","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":7,"flag|empty_response":1,"flag|experiment_exposure":6,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":9,"test|events":47,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":9,"check|filter_leak_through_both":5,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 14:15:12 UTC — verifier

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed; accepters count twice (D-030). Step 2 = buyer roles only. Only pages actually seen count from 10:51 BRT 20 Nov (D-035). (none) incl. 1 unattributed visit, maybe the owner (D-039). welcome_email = returning signups (D-034). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: buyer signups are (D-009, D-036). Accepters count twice at step 1 (D-030). Only pages actually seen count from 10:51 BRT 20 Nov (D-035). (none) incl. 1 unattributed visit (D-039). welcome_email = returning signups (D-034). iOS bounces can be missed (D-026). Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. Only pages actually seen count from 10:51 BRT 20 Nov (D-035). welcome_email excluded (D-034). Accepters can be 2 people (D-023). (none) incl. 1 unattributed visit, maybe the owner (D-039). iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov only pages actually seen count (D-035). welcome_email excluded (D-034). (none) = direct, incl. 1 unattributed visit, maybe the owner (D-039). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov, prefetches and preview bots aren't counted (D-033); iPhone long-press previews still are (D-026). Read next to visits. welcome_email excluded (D-034). Directional (D-039).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Only pages actually seen count from 10:51 BRT 20 Nov (D-035). Directional (D-039).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). Directional.”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 7 (with a response: 6, empty response: 1). `$experiment_exposure`: 6.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |

Caught anyway by the event condition `is_internal` (D-037): 4. Getting through both: 5 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 5 |

**c) `$feature/hero-framing` on page views:** 18 of 19 `landing_page_viewed` (internal included) carry it. 13 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 14:10:16 UTC (verifier).

_No number moved._

<!-- audit-json {"runAt":"2026-11-20 14:15:12 UTC","note":"verifier","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":7,"flag|empty_response":1,"flag|experiment_exposure":6,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":9,"test|events":47,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":9,"check|filter_leak_through_both":5,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 14:19:17 UTC — verifier

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed; accepters count twice (D-030). Step 2 = buyer roles only. Only pages actually seen count from 10:51 BRT 20 Nov (D-035). (none) incl. 1 unattributed visit, maybe the owner (D-039). welcome_email = returning signups (D-034). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: buyer signups are (D-009, D-036). Accepters count twice at step 1 (D-030). Only pages actually seen count from 10:51 BRT 20 Nov (D-035). (none) incl. 1 unattributed visit (D-039). welcome_email = returning signups (D-034). iOS bounces can be missed (D-026). Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. Only pages actually seen count from 10:51 BRT 20 Nov (D-035). welcome_email excluded (D-034). Accepters can be 2 people (D-023). (none) incl. 1 unattributed visit, maybe the owner (D-039). iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov only pages actually seen count (D-035). welcome_email excluded (D-034). (none) = direct, incl. 1 unattributed visit, maybe the owner (D-039). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov, prefetches and preview bots aren't counted (D-033); iPhone long-press previews still are (D-026). Read next to visits. welcome_email excluded (D-034). Directional (D-039).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Only pages actually seen count from 10:51 BRT 20 Nov (D-035). Accepters can be 2 people (D-023). iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). welcome_email = returning signups, not a channel (D-034). (none) = direct (D-039). Directional (D-039).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 7 (with a response: 6, empty response: 1). `$experiment_exposure`: 6.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |

Caught anyway by the event condition `is_internal` (D-037): 4. Getting through both: 5 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 5 |

**c) `$feature/hero-framing` on page views:** 18 of 19 `landing_page_viewed` (internal included) carry it. 13 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 14:15:12 UTC (verifier).

_No number moved._

<!-- audit-json {"runAt":"2026-11-20 14:19:17 UTC","note":"verifier","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":7,"flag|empty_response":1,"flag|experiment_exposure":6,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":9,"test|events":47,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":9,"check|filter_leak_through_both":5,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 14:42:31 UTC — baseline, step 9 (stage funnel and channel table), before any change

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed; accepters count twice (D-030). Step 2 = buyer roles only. Only pages actually seen count from 10:51 BRT 20 Nov (D-035). (none) incl. 1 unattributed visit, maybe the owner (D-039). welcome_email = returning signups (D-034). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: buyer signups are (D-009, D-036). Accepters count twice at step 1 (D-030). Only pages actually seen count from 10:51 BRT 20 Nov (D-035). (none) incl. 1 unattributed visit (D-039). welcome_email = returning signups (D-034). iOS bounces can be missed (D-026). Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: buyer-signup rate per visitor (by utm_source)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H1–H3 headline: unique visitors vs buyer-role signups per utm_source, from 15:00 BRT 19 Nov. Only pages actually seen count from 10:51 BRT 20 Nov (D-035). welcome_email excluded (D-034). Accepters can be 2 people (D-023). (none) incl. 1 unattributed visit, maybe the owner (D-039). iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons per utm_source (welcome_email excluded): Visitors = landing_page_viewed, buyer-role signups, all signups, volume answers.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |
| Volume question answered\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov only pages actually seen count (D-035). welcome_email excluded (D-034). (none) = direct, incl. 1 unattributed visit, maybe the owner (D-039). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov, prefetches and preview bots aren't counted (D-033); iPhone long-press previews still are (D-026). Read next to visits. welcome_email excluded (D-034). Directional (D-039).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Only pages actually seen count from 10:51 BRT 20 Nov (D-035). Accepters can be 2 people (D-023). iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). welcome_email = returning signups, not a channel (D-034). (none) = direct (D-039). Directional (D-039).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 7 (with a response: 6, empty response: 1). `$experiment_exposure`: 6.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |

Caught anyway by the event condition `is_internal` (D-037): 4. Getting through both: 5 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 5 |

**c) `$feature/hero-framing` on page views:** 18 of 19 `landing_page_viewed` (internal included) carry it. 13 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 14:19:17 UTC (verifier).

_No number moved._

<!-- audit-json {"runAt":"2026-11-20 14:42:31 UTC","note":"baseline, step 9 (stage funnel and channel table), before any change","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"opzPWguM|Volume question answered|personal_network|shown":1,"opzPWguM|Volume question answered|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":7,"flag|empty_response":1,"flag|experiment_exposure":6,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":9,"test|events":47,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":9,"check|filter_leak_through_both":5,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 14:47:17 UTC — step 9 after building D-040 stage funnel (d1JCOgLG, not yet on dashboard) and D-042 channel rate table (opzPWguM)

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 0 | 0 | ✓ |  |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Per person, from 15:00 BRT 19 Nov. Step 1 = Landed; accepters count twice (D-030). Step 2 = buyer roles only. Only pages actually seen count from 10:51 BRT 20 Nov (D-035). (none) incl. 1 unattributed visit, maybe the owner (D-039). welcome_email = returning signups (D-034). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Shows the funnel works end to end, any role, from 15:00 BRT 19 Nov. Not the headline: buyer signups are (D-009, D-036). Accepters count twice at step 1 (D-030). Only pages actually seen count from 10:51 BRT 20 Nov (D-035). (none) incl. 1 unattributed visit (D-039). welcome_email = returning signups (D-034). iOS bounces can be missed (D-026). Directional.”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: signup rate per visitor (all roles and buyers)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups and hero clicks per visitor for each channel, from 15:00 BRT 19 Nov, with welcome_email left out (D-034).”

Raw = Channel table (D-042): unique persons per utm_source (welcome_email excluded) for visitors (landing_page_viewed), all signups, buyer signups and hero clicks, plus all signups ÷ visitors and buyer signups ÷ visitors.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups ÷ visitors\|personal_network | 1 | 1 | ✓ |
| All signups\|personal_network | 1 | 1 | ✓ |
| Hero clicks\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov only pages actually seen count (D-035). welcome_email excluded (D-034). (none) = direct, incl. 1 unattributed visit, maybe the owner (D-039). Quick iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 1 | 1 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “channel_link_clicked from /go/<channel>, from 15:00 BRT 19 Nov. From 10:51 BRT 20 Nov, prefetches and preview bots aren't counted (D-033); iPhone long-press previews still are (D-026). Read next to visits. welcome_email excluded (D-034). Directional (D-039).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 2 | 2 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Volume answers (D-004/D-005), from 15:00 BRT 19 Nov, test users filtered. The date leaves out pre-launch test answers that can't be deleted (D-032). Directional.”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “A vs B outside the experiment, from 15:00 BRT 19 Nov. Only events with $feature/hero-framing set, so flag-timeout fallbacks shown A aren't counted (D-031). Only pages actually seen count from 10:51 BRT 20 Nov (D-035). Accepters can be 2 people (D-023). iOS bounces can be missed (D-026). Directional (D-039).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “H2: which roles each channel brings, from 15:00 BRT 19 Nov. An accepter can appear as 2 people (D-023). welcome_email = returning signups, not a channel (D-034). (none) = direct (D-039). Directional (D-039).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 1 | 1 | ✓ |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors per channel from landing to the welcome email link, one person per row, from 15:00 BRT 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 2 | 2 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |
| step4\|personal_network | 1 | 1 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 0 | 0 | 0 | 0 | 0 |

- `$feature_flag_called` for hero-framing: 7 (with a response: 6, empty response: 1). `$experiment_exposure`: 6.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 4 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |

Caught anyway by the event condition `is_internal` (D-037): 4. Getting through both: 5 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 5 |

**c) `$feature/hero-framing` on page views:** 18 of 19 `landing_page_viewed` (internal included) carry it. 13 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 14:42:31 UTC (baseline, step 9 (stage funnel and channel table), before any change).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| d1JCOgLG\|step1\|(none)\|raw | 0 | 1 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|(none)\|shown | 0 | 1 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|raw | 0 | 2 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|shown | 0 | 2 | ▲ check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|raw | 0 | 1 | ▲ check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|shown | 0 | 1 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|raw | 0 | 1 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|shown | 0 | 1 | ▲ check it is real traffic |
| d1JCOgLG\|step4\|personal_network\|raw | 0 | 1 | ▲ check it is real traffic |
| d1JCOgLG\|step4\|personal_network\|shown | 0 | 1 | ▲ check it is real traffic |
| opzPWguM\|All signups ÷ visitors\|personal_network\|raw | 0 | 1 | ▲ check it is real traffic |
| opzPWguM\|All signups ÷ visitors\|personal_network\|shown | 0 | 1 | ▲ check it is real traffic |
| opzPWguM\|Hero clicks\|personal_network\|raw | 0 | 1 | ▲ check it is real traffic |
| opzPWguM\|Hero clicks\|personal_network\|shown | 0 | 1 | ▲ check it is real traffic |
| opzPWguM\|Volume question answered\|personal_network\|raw | 1 | 0 | ▼ UNEXPECTED unless a filter change or deletion explains it |
| opzPWguM\|Volume question answered\|personal_network\|shown | 1 | 0 | ▼ UNEXPECTED unless a filter change or deletion explains it |

<!-- audit-json {"runAt":"2026-11-20 14:47:17 UTC","note":"step 9 after building D-040 stage funnel (d1JCOgLG, not yet on dashboard) and D-042 channel rate table (opzPWguM)","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":0,"experiment|All signups|time|raw":0,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":0,"experiment|Volume question answered|time|raw":0,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":0,"experiment|exposures|time|raw":0,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":2,"KK0a37NQ|step1|personal_network|raw":2,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":2,"dRTNVtm9|step1|personal_network|raw":2,"dRTNVtm9|step2|personal_network|shown":1,"dRTNVtm9|step2|personal_network|raw":1,"dRTNVtm9|step3|personal_network|shown":1,"dRTNVtm9|step3|personal_network|raw":1,"opzPWguM|All signups ÷ visitors|personal_network|shown":1,"opzPWguM|All signups ÷ visitors|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":1,"opzPWguM|All signups|personal_network|raw":1,"opzPWguM|Hero clicks|personal_network|shown":1,"opzPWguM|Hero clicks|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":1,"opzPWguM|Visitors|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":1,"dBS4IKQb|Visitors|personal_network|raw":1,"ZS0Uhz2p|Link clicks|personal_network|shown":2,"ZS0Uhz2p|Link clicks|personal_network|raw":2,"lQ1PbGvG|Respondents|16–30|shown":1,"lQ1PbGvG|Respondents|16–30|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":1,"d9eeKWIG|Signups|Just helping test::personal_network|raw":1,"d1JCOgLG|step1|(none)|shown":1,"d1JCOgLG|step1|(none)|raw":1,"d1JCOgLG|step1|personal_network|shown":2,"d1JCOgLG|step1|personal_network|raw":2,"d1JCOgLG|step2|personal_network|shown":1,"d1JCOgLG|step2|personal_network|raw":1,"d1JCOgLG|step3|personal_network|shown":1,"d1JCOgLG|step3|personal_network|raw":1,"d1JCOgLG|step4|personal_network|shown":1,"d1JCOgLG|step4|personal_network|raw":1,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":0,"variant|time|exposed_persons":0,"variant|time|resent":0,"variant|time|signups":0,"variant|time|buyer_signups":0,"flag|called":7,"flag|empty_response":1,"flag|experiment_exposure":6,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":4,"test|persons":9,"test|events":47,"unattributed|persons":1,"clicks|total":2,"clicks|no_visit_after":1,"survey|post_launch_persons":1,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":9,"check|filter_leak_through_both":5,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 14:52:56 UTC — step 9 after dashboard rearrange: d1JCOgLG on dashboard, KK0a37NQ/dRTNVtm9 off (kept saved), one-sentence captions (D-043)

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 2 | 2 | ✓ |  |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “People per channel from landing to the welcome email link, counted from 15:00 BRT on 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 4 | 4 | ✓ |
| step2\|personal_network | 2 | 2 | ✓ |
| step3\|personal_network | 2 | 2 | ✓ |
| step4\|personal_network | 1 | 1 | ✓ |

**Channels: signup rate per visitor (all roles and buyers)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups and hero clicks per visitor for each channel, from 15:00 BRT 19 Nov, with welcome_email left out (D-034).”

Raw = Channel table (D-042): unique persons per utm_source (welcome_email excluded) for visitors (landing_page_viewed), all signups, buyer signups and hero clicks, plus all signups ÷ visitors and buyer signups ÷ visitors.

Series names: Visitors, All signups, Buyer signups, Hero clicks, All signups ÷ visitors, Buyer signups ÷ visitors (all in the raw definition).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups ÷ visitors\|personal_network | 1 | 1 | ✓ |
| All signups\|personal_network | 2 | 2 | ✓ |
| Hero clicks\|personal_network | 1 | 1 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 2 | 2 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel from 15:00 BRT on 19 Nov, with welcome_email left out and direct visits shown as (none) (D-034).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 2 | 2 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Clicks on each channel's /go/ link from 15:00 BRT on 19 Nov, shown on their own because a click can't be joined to the visit (D-033).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 3 | 3 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Answers to the volume question per answer from 15:00 BRT on 19 Nov, which leaves out the pre-launch test answers (D-032).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 2 | 2 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors and signups per hero variant outside the experiment, counting only events from exposed visitors (D-031).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| All signups\|b | 1 | 1 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |
| Visitors\|b | 1 | 1 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups per role and channel from 15:00 BRT on 19 Nov, where welcome_email rows are returning signups, not a channel (D-034).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 2 | 2 | ✓ |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older buyer-only funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 4 | 4 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older all-roles funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 4 | 4 | ✓ |
| step2\|personal_network | 2 | 2 | ✓ |
| step3\|personal_network | 2 | 2 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 2 | 2 | 1 | 1 | 0 |

- `$feature_flag_called` for hero-framing: 10 (with a response: 9, empty response: 1). `$experiment_exposure`: 9.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 6 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 10 | internal_person, test_user, internal_event | 2026-11-20 14:46:23 UTC | 2026-11-20 14:47:29 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed, survey shown, survey dismissed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |
| 56850f68-a988-58a1-bb1c-7d9598e479e8 |  | 1 | no | 2026-11-20 14:46:33 UTC | 2026-11-20 14:46:33 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:23.435000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:23.599000 | $experiment_exposure | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:23.599000 | $feature_flag_called | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:23.600000 | landing_page_viewed | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:24.989000 | $autocapture | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:25.002000 | survey shown | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 9. Getting through both: 6 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 6 |

**c) `$feature/hero-framing` on page views:** 21 of 22 `landing_page_viewed` (internal included) carry it. 15 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 14:47:17 UTC (step 9 after building D-040 stage funnel (d1JCOgLG, not yet on dashboard) and D-042 channel rate table (opzPWguM)).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| KK0a37NQ\|step1\|personal_network\|raw | 2 | 4 | ▲ check it is real traffic |
| KK0a37NQ\|step1\|personal_network\|shown | 2 | 4 | ▲ check it is real traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|raw | 2 | 3 | ▲ check it is real traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|shown | 2 | 3 | ▲ check it is real traffic |
| check\|filter_leak_events | 9 | 15 | ▲ check it is real traffic |
| check\|filter_leak_through_both | 5 | 6 | ▲ check it is real traffic |
| clicks\|total | 2 | 3 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|raw | 2 | 4 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|shown | 2 | 4 | ▲ check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|raw | 1 | 2 | ▲ check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|raw | 1 | 2 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| d9eeKWIG\|Signups\|Just helping test::personal_network\|raw | 1 | 2 | ▲ check it is real traffic |
| d9eeKWIG\|Signups\|Just helping test::personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|raw | 1 | 2 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|raw | 2 | 4 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|shown | 2 | 4 | ▲ check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|raw | 1 | 2 | ▲ check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|raw | 1 | 2 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| experiment\|All signups\|time\|raw | 0 | 1 | ▲ check it is real traffic |
| experiment\|All signups\|time\|shown | 0 | 1 | ▲ check it is real traffic |
| experiment\|Volume question answered\|time\|raw | 0 | 1 | ▲ check it is real traffic |
| experiment\|Volume question answered\|time\|shown | 0 | 1 | ▲ check it is real traffic |
| experiment\|exposures\|time\|raw | 0 | 2 | ▲ check it is real traffic |
| experiment\|exposures\|time\|shown | 0 | 2 | ▲ check it is real traffic |
| flag\|called | 7 | 10 | ▲ check it is real traffic |
| flag\|experiment_exposure | 6 | 9 | ▲ check it is real traffic |
| lQ1PbGvG\|Respondents\|16–30\|raw | 1 | 2 | ▲ check it is real traffic |
| lQ1PbGvG\|Respondents\|16–30\|shown | 1 | 2 | ▲ check it is real traffic |
| oMvaY0hy\|All signups\|b\|raw | — | 1 | new key (a tile or series added), not traffic |
| oMvaY0hy\|All signups\|b\|shown | — | 1 | new key (a tile or series added), not traffic |
| oMvaY0hy\|Visitors\|b\|raw | — | 1 | new key (a tile or series added), not traffic |
| oMvaY0hy\|Visitors\|b\|shown | — | 1 | new key (a tile or series added), not traffic |
| opzPWguM\|All signups\|personal_network\|raw | 1 | 2 | ▲ check it is real traffic |
| opzPWguM\|All signups\|personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| opzPWguM\|Visitors\|personal_network\|raw | 1 | 2 | ▲ check it is real traffic |
| opzPWguM\|Visitors\|personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| persons_by_source\|personal_network | 4 | 6 | ▲ check it is real traffic |
| survey\|post_launch_persons | 1 | 2 | ▲ check it is real traffic |
| test\|events | 47 | 57 | ▲ check it is real traffic |
| test\|persons | 9 | 10 | ▲ check it is real traffic |
| variant\|time\|exposed_persons | 0 | 2 | ▲ check it is real traffic |
| variant\|time\|exposure_events | 0 | 2 | ▲ check it is real traffic |
| variant\|time\|resent | 0 | 1 | ▲ check it is real traffic |
| variant\|time\|signups | 0 | 1 | ▲ check it is real traffic |

<!-- audit-json {"runAt":"2026-11-20 14:52:56 UTC","note":"step 9 after dashboard rearrange: d1JCOgLG on dashboard, KK0a37NQ/dRTNVtm9 off (kept saved), one-sentence captions (D-043)","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":1,"experiment|All signups|time|raw":1,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":1,"experiment|Volume question answered|time|raw":1,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":2,"experiment|exposures|time|raw":2,"d1JCOgLG|step1|(none)|shown":1,"d1JCOgLG|step1|(none)|raw":1,"d1JCOgLG|step1|personal_network|shown":4,"d1JCOgLG|step1|personal_network|raw":4,"d1JCOgLG|step2|personal_network|shown":2,"d1JCOgLG|step2|personal_network|raw":2,"d1JCOgLG|step3|personal_network|shown":2,"d1JCOgLG|step3|personal_network|raw":2,"d1JCOgLG|step4|personal_network|shown":1,"d1JCOgLG|step4|personal_network|raw":1,"opzPWguM|All signups ÷ visitors|personal_network|shown":1,"opzPWguM|All signups ÷ visitors|personal_network|raw":1,"opzPWguM|All signups|personal_network|shown":2,"opzPWguM|All signups|personal_network|raw":2,"opzPWguM|Hero clicks|personal_network|shown":1,"opzPWguM|Hero clicks|personal_network|raw":1,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":2,"opzPWguM|Visitors|personal_network|raw":2,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":2,"dBS4IKQb|Visitors|personal_network|raw":2,"ZS0Uhz2p|Link clicks|personal_network|shown":3,"ZS0Uhz2p|Link clicks|personal_network|raw":3,"lQ1PbGvG|Respondents|16–30|shown":2,"lQ1PbGvG|Respondents|16–30|raw":2,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|All signups|b|shown":1,"oMvaY0hy|All signups|b|raw":1,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"oMvaY0hy|Visitors|b|shown":1,"oMvaY0hy|Visitors|b|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":2,"d9eeKWIG|Signups|Just helping test::personal_network|raw":2,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":4,"KK0a37NQ|step1|personal_network|raw":4,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":4,"dRTNVtm9|step1|personal_network|raw":4,"dRTNVtm9|step2|personal_network|shown":2,"dRTNVtm9|step2|personal_network|raw":2,"dRTNVtm9|step3|personal_network|shown":2,"dRTNVtm9|step3|personal_network|raw":2,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":2,"variant|time|exposed_persons":2,"variant|time|resent":1,"variant|time|signups":1,"variant|time|buyer_signups":0,"flag|called":10,"flag|empty_response":1,"flag|experiment_exposure":9,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":6,"test|persons":10,"test|events":57,"unattributed|persons":1,"clicks|total":3,"clicks|no_visit_after":1,"survey|post_launch_persons":2,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":15,"check|filter_leak_through_both":6,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 14:55:30 UTC — verifier step 9

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ✓ Every tile matches its raw count. No internal/test answers after launch. Every unattributed visit is labeled.

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 4 | 4 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data, baseline-mean-is-zero |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 2 | 2 | ✓ |  |
| exposures\|time | 6 | 6 | ✓ |  |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “People per channel from landing to the welcome email link, counted from 15:00 BRT on 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 8 | 8 | ✓ |
| step2\|personal_network | 5 | 5 | ✓ |
| step3\|personal_network | 5 | 5 | ✓ |
| step4\|personal_network | 1 | 1 | ✓ |

**Channels: signup rate per visitor (all roles and buyers)** (`opzPWguM`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups and hero clicks per visitor for each channel, from 15:00 BRT 19 Nov, with welcome_email left out (D-034).”

Raw = Channel table (D-042): unique persons per utm_source (welcome_email excluded) for visitors (landing_page_viewed), all signups, buyer signups and hero clicks, plus all signups ÷ visitors and buyer signups ÷ visitors.

Series names: Visitors, All signups, Buyer signups, Hero clicks, All signups ÷ visitors, Buyer signups ÷ visitors (all in the raw definition).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups ÷ visitors\|personal_network | 0.8333 | 0.8333 | ✓ |
| All signups\|personal_network | 5 | 5 | ✓ |
| Hero clicks\|personal_network | 3 | 3 | ✓ |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 6 | 6 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel from 15:00 BRT on 19 Nov, with welcome_email left out and direct visits shown as (none) (D-034).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 6 | 6 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Clicks on each channel's /go/ link from 15:00 BRT on 19 Nov, shown on their own because a click can't be joined to the visit (D-033).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 7 | 7 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Answers to the volume question per answer from 15:00 BRT on 19 Nov, which leaves out the pre-launch test answers (D-032).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 4 | 4 | ✓ |
| Respondents\|I don't know | 1 | 1 | ✓ |
| Respondents\|More than 60 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors and signups per hero variant outside the experiment, counting only events from exposed visitors (D-031).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 1 | 1 | ✓ |
| All signups\|b | 4 | 4 | ✓ |
| Visitors\|a | 1 | 1 | ✓ |
| Visitors\|b | 5 | 5 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups per role and channel from 15:00 BRT on 19 Nov, where welcome_email rows are returning signups, not a channel (D-034).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Just helping test::personal_network | 5 | 5 | ✓ |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older buyer-only funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 8 | 8 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older all-roles funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 8 | 8 | ✓ |
| step2\|personal_network | 5 | 5 | ✓ |
| step3\|personal_network | 3 | 3 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 2 | 2 | 1 | 1 | 0 |
| time | 7 | 6 | 2 | 5 | 0 |

- `$feature_flag_called` for hero-framing: 15 (with a response: 14, empty response: 1). `$experiment_exposure`: 14.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 11 | yes |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 10 | internal_person, test_user, internal_event | 2026-11-20 14:46:23 UTC | 2026-11-20 14:47:29 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed, survey shown, survey dismissed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |
| 56850f68-a988-58a1-bb1c-7d9598e479e8 |  | 1 | no | 2026-11-20 14:46:33 UTC | 2026-11-20 14:46:33 UTC |
| c5c0d8d4-d47d-5761-9ce4-528ef0ee873c |  | 1 | no | 2026-11-20 14:49:19 UTC | 2026-11-20 14:49:19 UTC |
| 87d66938-3912-5dba-b879-a5b5a2e674e5 |  | 1 | no | 2026-11-20 14:49:31 UTC | 2026-11-20 14:49:31 UTC |
| 99ecd560-7927-559d-acc0-c4f88d6ab8f1 |  | 1 | no | 2026-11-20 14:49:51 UTC | 2026-11-20 14:49:51 UTC |
| 01e2abcf-af7f-5fce-b7c1-1f9e0a6f95f2 |  | 1 | no | 2026-11-20 14:50:24 UTC | 2026-11-20 14:50:24 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:23.435000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:23.599000 | $experiment_exposure | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:23.599000 | $feature_flag_called | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:23.600000 | landing_page_viewed | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:24.989000 | $autocapture | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 |  | 2026-11-20 14:46:25.002000 | survey shown | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 9. Getting through both: 6 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 6 |

**c) `$feature/hero-framing` on page views:** 25 of 26 `landing_page_viewed` (internal included) carry it. 19 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 14:52:56 UTC (step 9 after dashboard rearrange: d1JCOgLG on dashboard, KK0a37NQ/dRTNVtm9 off (kept saved), one-sentence captions (D-043)).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| KK0a37NQ\|step1\|personal_network\|raw | 4 | 8 | ▲ check it is real traffic |
| KK0a37NQ\|step1\|personal_network\|shown | 4 | 8 | ▲ check it is real traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|raw | 3 | 7 | ▲ check it is real traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|shown | 3 | 7 | ▲ check it is real traffic |
| clicks\|total | 3 | 7 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|raw | 4 | 8 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|shown | 4 | 8 | ▲ check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|raw | 2 | 5 | ▲ check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|shown | 2 | 5 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|raw | 2 | 5 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|shown | 2 | 5 | ▲ check it is real traffic |
| d9eeKWIG\|Signups\|Just helping test::personal_network\|raw | 2 | 5 | ▲ check it is real traffic |
| d9eeKWIG\|Signups\|Just helping test::personal_network\|shown | 2 | 5 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|raw | 2 | 6 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|shown | 2 | 6 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|raw | 4 | 8 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|shown | 4 | 8 | ▲ check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|raw | 2 | 5 | ▲ check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|shown | 2 | 5 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|raw | 2 | 3 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|shown | 2 | 3 | ▲ check it is real traffic |
| experiment\|All signups\|time\|raw | 1 | 4 | ▲ check it is real traffic |
| experiment\|All signups\|time\|shown | 1 | 4 | ▲ check it is real traffic |
| experiment\|Volume question answered\|time\|raw | 1 | 2 | ▲ check it is real traffic |
| experiment\|Volume question answered\|time\|shown | 1 | 2 | ▲ check it is real traffic |
| experiment\|exposures\|time\|raw | 2 | 6 | ▲ check it is real traffic |
| experiment\|exposures\|time\|shown | 2 | 6 | ▲ check it is real traffic |
| flag\|called | 10 | 15 | ▲ check it is real traffic |
| flag\|experiment_exposure | 9 | 14 | ▲ check it is real traffic |
| lQ1PbGvG\|Respondents\|16–30\|raw | 2 | 4 | ▲ check it is real traffic |
| lQ1PbGvG\|Respondents\|16–30\|shown | 2 | 4 | ▲ check it is real traffic |
| lQ1PbGvG\|Respondents\|I don't know\|raw | — | 1 | ▲ new breakdown value: check it is real traffic |
| lQ1PbGvG\|Respondents\|I don't know\|shown | — | 1 | ▲ new breakdown value: check it is real traffic |
| lQ1PbGvG\|Respondents\|More than 60\|raw | — | 1 | ▲ new breakdown value: check it is real traffic |
| lQ1PbGvG\|Respondents\|More than 60\|shown | — | 1 | ▲ new breakdown value: check it is real traffic |
| oMvaY0hy\|All signups\|b\|raw | 1 | 4 | ▲ check it is real traffic |
| oMvaY0hy\|All signups\|b\|shown | 1 | 4 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|b\|raw | 1 | 5 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|b\|shown | 1 | 5 | ▲ check it is real traffic |
| opzPWguM\|All signups ÷ visitors\|personal_network\|raw | 1 | 0.8333 | ▼ UNEXPECTED unless a filter change or deletion explains it |
| opzPWguM\|All signups ÷ visitors\|personal_network\|shown | 1 | 0.8333 | ▼ UNEXPECTED unless a filter change or deletion explains it |
| opzPWguM\|All signups\|personal_network\|raw | 2 | 5 | ▲ check it is real traffic |
| opzPWguM\|All signups\|personal_network\|shown | 2 | 5 | ▲ check it is real traffic |
| opzPWguM\|Hero clicks\|personal_network\|raw | 1 | 3 | ▲ check it is real traffic |
| opzPWguM\|Hero clicks\|personal_network\|shown | 1 | 3 | ▲ check it is real traffic |
| opzPWguM\|Visitors\|personal_network\|raw | 2 | 6 | ▲ check it is real traffic |
| opzPWguM\|Visitors\|personal_network\|shown | 2 | 6 | ▲ check it is real traffic |
| persons_by_source\|personal_network | 6 | 11 | ▲ check it is real traffic |
| survey\|post_launch_persons | 2 | 6 | ▲ check it is real traffic |
| variant\|time\|exposed_persons | 2 | 6 | ▲ check it is real traffic |
| variant\|time\|exposure_events | 2 | 7 | ▲ check it is real traffic |
| variant\|time\|resent | 1 | 2 | ▲ check it is real traffic |
| variant\|time\|signups | 1 | 5 | ▲ check it is real traffic |

<!-- audit-json {"runAt":"2026-11-20 14:55:30 UTC","note":"verifier step 9","metrics":{"experiment|All signups|control|shown":1,"experiment|All signups|control|raw":1,"experiment|All signups|time|shown":4,"experiment|All signups|time|raw":4,"experiment|Buyer-role signups (D-009 headline)|control|shown":0,"experiment|Buyer-role signups (D-009 headline)|control|raw":0,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":1,"experiment|Volume question answered|control|raw":1,"experiment|Volume question answered|time|shown":2,"experiment|Volume question answered|time|raw":2,"experiment|exposures|control|shown":2,"experiment|exposures|control|raw":2,"experiment|exposures|time|shown":6,"experiment|exposures|time|raw":6,"d1JCOgLG|step1|(none)|shown":1,"d1JCOgLG|step1|(none)|raw":1,"d1JCOgLG|step1|personal_network|shown":8,"d1JCOgLG|step1|personal_network|raw":8,"d1JCOgLG|step2|personal_network|shown":5,"d1JCOgLG|step2|personal_network|raw":5,"d1JCOgLG|step3|personal_network|shown":5,"d1JCOgLG|step3|personal_network|raw":5,"d1JCOgLG|step4|personal_network|shown":1,"d1JCOgLG|step4|personal_network|raw":1,"opzPWguM|All signups ÷ visitors|personal_network|shown":0.8333,"opzPWguM|All signups ÷ visitors|personal_network|raw":0.8333,"opzPWguM|All signups|personal_network|shown":5,"opzPWguM|All signups|personal_network|raw":5,"opzPWguM|Hero clicks|personal_network|shown":3,"opzPWguM|Hero clicks|personal_network|raw":3,"opzPWguM|Visitors|(none)|shown":1,"opzPWguM|Visitors|(none)|raw":1,"opzPWguM|Visitors|personal_network|shown":6,"opzPWguM|Visitors|personal_network|raw":6,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":6,"dBS4IKQb|Visitors|personal_network|raw":6,"ZS0Uhz2p|Link clicks|personal_network|shown":7,"ZS0Uhz2p|Link clicks|personal_network|raw":7,"lQ1PbGvG|Respondents|16–30|shown":4,"lQ1PbGvG|Respondents|16–30|raw":4,"lQ1PbGvG|Respondents|I don't know|shown":1,"lQ1PbGvG|Respondents|I don't know|raw":1,"lQ1PbGvG|Respondents|More than 60|shown":1,"lQ1PbGvG|Respondents|More than 60|raw":1,"oMvaY0hy|All signups|a|shown":1,"oMvaY0hy|All signups|a|raw":1,"oMvaY0hy|All signups|b|shown":4,"oMvaY0hy|All signups|b|raw":4,"oMvaY0hy|Visitors|a|shown":1,"oMvaY0hy|Visitors|a|raw":1,"oMvaY0hy|Visitors|b|shown":5,"oMvaY0hy|Visitors|b|raw":5,"d9eeKWIG|Signups|Just helping test::personal_network|shown":5,"d9eeKWIG|Signups|Just helping test::personal_network|raw":5,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":8,"KK0a37NQ|step1|personal_network|raw":8,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":8,"dRTNVtm9|step1|personal_network|raw":8,"dRTNVtm9|step2|personal_network|shown":5,"dRTNVtm9|step2|personal_network|raw":5,"dRTNVtm9|step3|personal_network|shown":3,"dRTNVtm9|step3|personal_network|raw":3,"variant|control|exposure_events":2,"variant|control|exposed_persons":2,"variant|control|resent":1,"variant|control|signups":1,"variant|control|buyer_signups":0,"variant|time|exposure_events":7,"variant|time|exposed_persons":6,"variant|time|resent":2,"variant|time|signups":5,"variant|time|buyer_signups":0,"flag|called":15,"flag|empty_response":1,"flag|experiment_exposure":14,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":11,"test|persons":10,"test|events":57,"unattributed|persons":1,"clicks|total":7,"clicks|no_visit_after":1,"survey|post_launch_persons":6,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":15,"check|filter_leak_through_both":6,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 15:51:06 UTC — before step 10 (promo video): baseline, no site visits planned

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ 9s0dwQbs: no raw definition

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 4 | 4 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 4 | 4 | ✓ |  |
| exposures\|time | 7 | 7 | ✓ |  |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “People per channel from landing to the welcome email link, counted from 15:00 BRT on 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 10 | 10 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 6 | 6 | ✓ |
| step3\|personal_network | 6 | 6 | ✓ |
| step4\|personal_network | 1 | 1 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel from 15:00 BRT on 19 Nov, with welcome_email left out and direct visits shown as (none) (D-034).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 7 | 7 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Clicks on each channel's /go/ link from 15:00 BRT on 19 Nov, shown on their own because a click can't be joined to the visit (D-022).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 8 | 8 | ✓ |

**Channels: visitors → signups → buyers** (`9s0dwQbs`, dashboard tile). Test accounts filtered: undefined. From undefined.
Caption: _none_

_No raw definition in the audit for this tile. Add one to `RAW`._

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Answers to the volume question per answer from 15:00 BRT on 19 Nov, which leaves out the pre-launch test answers (D-032).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 4 | 4 | ✓ |
| Respondents\|5–15 | 1 | 1 | ✓ |
| Respondents\|I don't know | 1 | 1 | ✓ |
| Respondents\|More than 60 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors and signups per hero variant outside the experiment, counting only events from exposed visitors (D-031).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 2 | 2 | ✓ |
| All signups\|b | 4 | 4 | ✓ |
| Buyer-role signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 2 | 2 | ✓ |
| Visitors\|b | 6 | 6 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups per role and channel from 15:00 BRT on 19 Nov, where welcome_email rows are returning signups, not a channel (D-034).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Finance or operations::personal_network | 1 | 1 | ✓ |
| Signups\|Just helping test::personal_network | 5 | 5 | ✓ |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older buyer-only funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 10 | 10 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older all-roles funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 10 | 10 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 6 | 6 | ✓ |
| step3\|personal_network | 4 | 4 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 4 | 4 | 2 | 2 | 1 |
| time | 8 | 7 | 2 | 5 | 0 |

- `$feature_flag_called` for hero-framing: 18 (with a response: 17, empty response: 1). `$experiment_exposure`: 17.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 13 | yes |
| welcome_email | 1 | no (D-034) |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 10 | internal_person, test_user, internal_event | 2026-11-20 14:46:23 UTC | 2026-11-20 14:47:29 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed, survey shown, survey dismissed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |
| 56850f68-a988-58a1-bb1c-7d9598e479e8 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:46:33 UTC | 2026-11-20 14:46:33 UTC |
| c5c0d8d4-d47d-5761-9ce4-528ef0ee873c | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:19 UTC | 2026-11-20 14:49:19 UTC |
| 87d66938-3912-5dba-b879-a5b5a2e674e5 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:31 UTC | 2026-11-20 14:49:31 UTC |
| 99ecd560-7927-559d-acc0-c4f88d6ab8f1 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:51 UTC | 2026-11-20 14:49:51 UTC |
| 01e2abcf-af7f-5fce-b7c1-1f9e0a6f95f2 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:50:24 UTC | 2026-11-20 14:50:24 UTC |
| a3ff6e77-03c1-54d6-86c6-47643d0f76b0 |  | 1 | no | 2026-11-20 15:07:18 UTC | 2026-11-20 15:07:18 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.435000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $experiment_exposure | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $feature_flag_called | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.600000 | landing_page_viewed | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:24.989000 | $autocapture | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:25.002000 | survey shown | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 9. Getting through both: 6 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 6 |

**c) `$feature/hero-framing` on page views:** 27 of 28 `landing_page_viewed` (internal included) carry it. 21 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 14:55:30 UTC (verifier step 9).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| KK0a37NQ\|step1\|personal_network\|raw | 8 | 10 | ▲ check it is real traffic |
| KK0a37NQ\|step1\|personal_network\|shown | 8 | 10 | ▲ check it is real traffic |
| KK0a37NQ\|step1\|welcome_email\|raw | — | 1 | ▲ new breakdown value: check it is real traffic |
| KK0a37NQ\|step1\|welcome_email\|shown | — | 1 | ▲ new breakdown value: check it is real traffic |
| KK0a37NQ\|step2\|personal_network\|raw | — | 1 | new key (a tile or series added), not traffic |
| KK0a37NQ\|step2\|personal_network\|shown | — | 1 | new key (a tile or series added), not traffic |
| KK0a37NQ\|step3\|personal_network\|raw | — | 1 | new key (a tile or series added), not traffic |
| KK0a37NQ\|step3\|personal_network\|shown | — | 1 | new key (a tile or series added), not traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|raw | 7 | 8 | ▲ check it is real traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|shown | 7 | 8 | ▲ check it is real traffic |
| clicks\|total | 7 | 8 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|raw | 8 | 10 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|shown | 8 | 10 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|welcome_email\|raw | — | 1 | ▲ new breakdown value: check it is real traffic |
| d1JCOgLG\|step1\|welcome_email\|shown | — | 1 | ▲ new breakdown value: check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|raw | 5 | 6 | ▲ check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|shown | 5 | 6 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|raw | 5 | 6 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|shown | 5 | 6 | ▲ check it is real traffic |
| d9eeKWIG\|Signups\|Finance or operations::personal_network\|raw | — | 1 | ▲ new breakdown value: check it is real traffic |
| d9eeKWIG\|Signups\|Finance or operations::personal_network\|shown | — | 1 | ▲ new breakdown value: check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|raw | 6 | 7 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|shown | 6 | 7 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|raw | 8 | 10 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|shown | 8 | 10 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|welcome_email\|raw | — | 1 | ▲ new breakdown value: check it is real traffic |
| dRTNVtm9\|step1\|welcome_email\|shown | — | 1 | ▲ new breakdown value: check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|raw | 5 | 6 | ▲ check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|shown | 5 | 6 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|raw | 3 | 4 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|shown | 3 | 4 | ▲ check it is real traffic |
| experiment\|All signups\|control\|raw | 1 | 2 | ▲ check it is real traffic |
| experiment\|All signups\|control\|shown | 1 | 2 | ▲ check it is real traffic |
| experiment\|Buyer-role signups (D-009 headline)\|control\|raw | 0 | 1 | ▲ check it is real traffic |
| experiment\|Buyer-role signups (D-009 headline)\|control\|shown | 0 | 1 | ▲ check it is real traffic |
| experiment\|Volume question answered\|control\|raw | 1 | 2 | ▲ check it is real traffic |
| experiment\|Volume question answered\|control\|shown | 1 | 2 | ▲ check it is real traffic |
| experiment\|exposures\|control\|raw | 2 | 4 | ▲ check it is real traffic |
| experiment\|exposures\|control\|shown | 2 | 4 | ▲ check it is real traffic |
| experiment\|exposures\|time\|raw | 6 | 7 | ▲ check it is real traffic |
| experiment\|exposures\|time\|shown | 6 | 7 | ▲ check it is real traffic |
| flag\|called | 15 | 18 | ▲ check it is real traffic |
| flag\|experiment_exposure | 14 | 17 | ▲ check it is real traffic |
| lQ1PbGvG\|Respondents\|5–15\|raw | — | 1 | ▲ new breakdown value: check it is real traffic |
| lQ1PbGvG\|Respondents\|5–15\|shown | — | 1 | ▲ new breakdown value: check it is real traffic |
| oMvaY0hy\|All signups\|a\|raw | 1 | 2 | ▲ check it is real traffic |
| oMvaY0hy\|All signups\|a\|shown | 1 | 2 | ▲ check it is real traffic |
| oMvaY0hy\|Buyer-role signups\|a\|raw | — | 1 | new key (a tile or series added), not traffic |
| oMvaY0hy\|Buyer-role signups\|a\|shown | — | 1 | new key (a tile or series added), not traffic |
| oMvaY0hy\|Visitors\|a\|raw | 1 | 2 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|a\|shown | 1 | 2 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|b\|raw | 5 | 6 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|b\|shown | 5 | 6 | ▲ check it is real traffic |
| opzPWguM\|All signups ÷ visitors\|personal_network\|raw | 0.8333 | — | key gone (a tile or series removed), not lost data |
| opzPWguM\|All signups ÷ visitors\|personal_network\|shown | 0.8333 | — | key gone (a tile or series removed), not lost data |
| opzPWguM\|All signups\|personal_network\|raw | 5 | — | key gone (a tile or series removed), not lost data |
| opzPWguM\|All signups\|personal_network\|shown | 5 | — | key gone (a tile or series removed), not lost data |
| opzPWguM\|Hero clicks\|personal_network\|raw | 3 | — | key gone (a tile or series removed), not lost data |
| opzPWguM\|Hero clicks\|personal_network\|shown | 3 | — | key gone (a tile or series removed), not lost data |
| opzPWguM\|Visitors\|(none)\|raw | 1 | — | key gone (a tile or series removed), not lost data |
| opzPWguM\|Visitors\|(none)\|shown | 1 | — | key gone (a tile or series removed), not lost data |
| opzPWguM\|Visitors\|personal_network\|raw | 6 | — | key gone (a tile or series removed), not lost data |
| opzPWguM\|Visitors\|personal_network\|shown | 6 | — | key gone (a tile or series removed), not lost data |
| persons_by_source\|personal_network | 11 | 13 | ▲ check it is real traffic |
| persons_by_source\|welcome_email | — | 1 | new key (a tile or series added), not traffic |
| survey\|post_launch_persons | 6 | 7 | ▲ check it is real traffic |
| variant\|control\|buyer_signups | 0 | 1 | ▲ check it is real traffic |
| variant\|control\|exposed_persons | 2 | 4 | ▲ check it is real traffic |
| variant\|control\|exposure_events | 2 | 4 | ▲ check it is real traffic |
| variant\|control\|resent | 1 | 2 | ▲ check it is real traffic |
| variant\|control\|signups | 1 | 2 | ▲ check it is real traffic |
| variant\|time\|exposed_persons | 6 | 7 | ▲ check it is real traffic |
| variant\|time\|exposure_events | 7 | 8 | ▲ check it is real traffic |

<!-- audit-json {"runAt":"2026-11-20 15:51:06 UTC","note":"before step 10 (promo video): baseline, no site visits planned","metrics":{"experiment|All signups|control|shown":2,"experiment|All signups|control|raw":2,"experiment|All signups|time|shown":4,"experiment|All signups|time|raw":4,"experiment|Buyer-role signups (D-009 headline)|control|shown":1,"experiment|Buyer-role signups (D-009 headline)|control|raw":1,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":2,"experiment|Volume question answered|control|raw":2,"experiment|Volume question answered|time|shown":2,"experiment|Volume question answered|time|raw":2,"experiment|exposures|control|shown":4,"experiment|exposures|control|raw":4,"experiment|exposures|time|shown":7,"experiment|exposures|time|raw":7,"d1JCOgLG|step1|(none)|shown":1,"d1JCOgLG|step1|(none)|raw":1,"d1JCOgLG|step1|personal_network|shown":10,"d1JCOgLG|step1|personal_network|raw":10,"d1JCOgLG|step1|welcome_email|shown":1,"d1JCOgLG|step1|welcome_email|raw":1,"d1JCOgLG|step2|personal_network|shown":6,"d1JCOgLG|step2|personal_network|raw":6,"d1JCOgLG|step3|personal_network|shown":6,"d1JCOgLG|step3|personal_network|raw":6,"d1JCOgLG|step4|personal_network|shown":1,"d1JCOgLG|step4|personal_network|raw":1,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":7,"dBS4IKQb|Visitors|personal_network|raw":7,"ZS0Uhz2p|Link clicks|personal_network|shown":8,"ZS0Uhz2p|Link clicks|personal_network|raw":8,"lQ1PbGvG|Respondents|16–30|shown":4,"lQ1PbGvG|Respondents|16–30|raw":4,"lQ1PbGvG|Respondents|5–15|shown":1,"lQ1PbGvG|Respondents|5–15|raw":1,"lQ1PbGvG|Respondents|I don't know|shown":1,"lQ1PbGvG|Respondents|I don't know|raw":1,"lQ1PbGvG|Respondents|More than 60|shown":1,"lQ1PbGvG|Respondents|More than 60|raw":1,"oMvaY0hy|All signups|a|shown":2,"oMvaY0hy|All signups|a|raw":2,"oMvaY0hy|All signups|b|shown":4,"oMvaY0hy|All signups|b|raw":4,"oMvaY0hy|Buyer-role signups|a|shown":1,"oMvaY0hy|Buyer-role signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":2,"oMvaY0hy|Visitors|a|raw":2,"oMvaY0hy|Visitors|b|shown":6,"oMvaY0hy|Visitors|b|raw":6,"d9eeKWIG|Signups|Finance or operations::personal_network|shown":1,"d9eeKWIG|Signups|Finance or operations::personal_network|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":5,"d9eeKWIG|Signups|Just helping test::personal_network|raw":5,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":10,"KK0a37NQ|step1|personal_network|raw":10,"KK0a37NQ|step1|welcome_email|shown":1,"KK0a37NQ|step1|welcome_email|raw":1,"KK0a37NQ|step2|personal_network|shown":1,"KK0a37NQ|step2|personal_network|raw":1,"KK0a37NQ|step3|personal_network|shown":1,"KK0a37NQ|step3|personal_network|raw":1,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":10,"dRTNVtm9|step1|personal_network|raw":10,"dRTNVtm9|step1|welcome_email|shown":1,"dRTNVtm9|step1|welcome_email|raw":1,"dRTNVtm9|step2|personal_network|shown":6,"dRTNVtm9|step2|personal_network|raw":6,"dRTNVtm9|step3|personal_network|shown":4,"dRTNVtm9|step3|personal_network|raw":4,"variant|control|exposure_events":4,"variant|control|exposed_persons":4,"variant|control|resent":2,"variant|control|signups":2,"variant|control|buyer_signups":1,"variant|time|exposure_events":8,"variant|time|exposed_persons":7,"variant|time|resent":2,"variant|time|signups":5,"variant|time|buyer_signups":0,"flag|called":18,"flag|empty_response":1,"flag|experiment_exposure":17,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":13,"persons_by_source|welcome_email":1,"test|persons":10,"test|events":57,"unattributed|persons":1,"clicks|total":8,"clicks|no_visit_after":1,"survey|post_launch_persons":7,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":15,"check|filter_leak_through_both":6,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-20 16:51:04 UTC — after step 10 (promo video): no site visits made during the session

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ 9s0dwQbs: no raw definition

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 4 | 4 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 6 | 6 | ✓ |  |
| exposures\|time | 7 | 7 | ✓ |  |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “People per channel from landing to the welcome email link, counted from 15:00 BRT on 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 12 | 12 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 6 | 6 | ✓ |
| step3\|personal_network | 6 | 6 | ✓ |
| step4\|personal_network | 2 | 2 | ✓ |

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel from 15:00 BRT on 19 Nov, with welcome_email left out and direct visits shown as (none) (D-034).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 1 | 1 | ✓ |
| Visitors\|personal_network | 8 | 8 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Clicks on each channel's /go/ link from 15:00 BRT on 19 Nov, shown on their own because a click can't be joined to the visit (D-022).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 9 | 9 | ✓ |

**Channels: visitors → signups → buyers** (`9s0dwQbs`, dashboard tile). Test accounts filtered: undefined. From undefined.
Caption: _none_

_No raw definition in the audit for this tile. Add one to `RAW`._

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Answers to the volume question per answer from 15:00 BRT on 19 Nov, which leaves out the pre-launch test answers (D-032).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 4 | 4 | ✓ |
| Respondents\|5–15 | 1 | 1 | ✓ |
| Respondents\|I don't know | 1 | 1 | ✓ |
| Respondents\|More than 60 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors and signups per hero variant outside the experiment, counting only events from exposed visitors (D-031).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 2 | 2 | ✓ |
| All signups\|b | 4 | 4 | ✓ |
| Buyer-role signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 3 | 3 | ✓ |
| Visitors\|b | 6 | 6 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups per role and channel from 15:00 BRT on 19 Nov, where welcome_email rows are returning signups, not a channel (D-034).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Finance or operations::personal_network | 1 | 1 | ✓ |
| Signups\|Just helping test::personal_network | 5 | 5 | ✓ |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older buyer-only funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 12 | 12 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older all-roles funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 1 | 1 | ✓ |
| step1\|personal_network | 12 | 12 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 6 | 6 | ✓ |
| step3\|personal_network | 4 | 4 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 6 | 6 | 3 | 2 | 1 |
| time | 8 | 7 | 2 | 5 | 0 |

- `$feature_flag_called` for hero-framing: 20 (with a response: 19, empty response: 1). `$experiment_exposure`: 19.
- Page views shown A by fallback (no flag, no exposure): 1 (836fe88c-eb65-5e90-b897-69b497b5398e).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 1 | no (direct) |
| personal_network | 15 | yes |
| welcome_email | 1 | no (D-034) |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 10 | internal_person, test_user, internal_event | 2026-11-20 14:46:23 UTC | 2026-11-20 14:47:29 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed, survey shown, survey dismissed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |
| 56850f68-a988-58a1-bb1c-7d9598e479e8 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:46:33 UTC | 2026-11-20 14:46:33 UTC |
| c5c0d8d4-d47d-5761-9ce4-528ef0ee873c | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:19 UTC | 2026-11-20 14:49:19 UTC |
| 87d66938-3912-5dba-b879-a5b5a2e674e5 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:31 UTC | 2026-11-20 14:49:31 UTC |
| 99ecd560-7927-559d-acc0-c4f88d6ab8f1 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:51 UTC | 2026-11-20 14:49:51 UTC |
| 01e2abcf-af7f-5fce-b7c1-1f9e0a6f95f2 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:50:24 UTC | 2026-11-20 14:50:24 UTC |
| a3ff6e77-03c1-54d6-86c6-47643d0f76b0 |  | 1 | no | 2026-11-20 15:07:18 UTC | 2026-11-20 15:07:18 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.435000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $experiment_exposure | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $feature_flag_called | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.600000 | landing_page_viewed | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:24.989000 | $autocapture | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:25.002000 | survey shown | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 9. Getting through both: 6 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 6 |

**c) `$feature/hero-framing` on page views:** 28 of 29 `landing_page_viewed` (internal included) carry it. 22 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 15:51:06 UTC (before step 10 (promo video): baseline, no site visits planned).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| KK0a37NQ\|step1\|personal_network\|raw | 10 | 12 | ▲ check it is real traffic |
| KK0a37NQ\|step1\|personal_network\|shown | 10 | 12 | ▲ check it is real traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|raw | 8 | 9 | ▲ check it is real traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|shown | 8 | 9 | ▲ check it is real traffic |
| clicks\|total | 8 | 9 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|raw | 10 | 12 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|shown | 10 | 12 | ▲ check it is real traffic |
| d1JCOgLG\|step4\|personal_network\|raw | 1 | 2 | ▲ check it is real traffic |
| d1JCOgLG\|step4\|personal_network\|shown | 1 | 2 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|raw | 7 | 8 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|shown | 7 | 8 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|raw | 10 | 12 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|shown | 10 | 12 | ▲ check it is real traffic |
| experiment\|exposures\|control\|raw | 4 | 6 | ▲ check it is real traffic |
| experiment\|exposures\|control\|shown | 4 | 6 | ▲ check it is real traffic |
| flag\|called | 18 | 20 | ▲ check it is real traffic |
| flag\|experiment_exposure | 17 | 19 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|a\|raw | 2 | 3 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|a\|shown | 2 | 3 | ▲ check it is real traffic |
| persons_by_source\|personal_network | 13 | 15 | ▲ check it is real traffic |
| variant\|control\|exposed_persons | 4 | 6 | ▲ check it is real traffic |
| variant\|control\|exposure_events | 4 | 6 | ▲ check it is real traffic |
| variant\|control\|resent | 2 | 3 | ▲ check it is real traffic |

<!-- audit-json {"runAt":"2026-11-20 16:51:04 UTC","note":"after step 10 (promo video): no site visits made during the session","metrics":{"experiment|All signups|control|shown":2,"experiment|All signups|control|raw":2,"experiment|All signups|time|shown":4,"experiment|All signups|time|raw":4,"experiment|Buyer-role signups (D-009 headline)|control|shown":1,"experiment|Buyer-role signups (D-009 headline)|control|raw":1,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":2,"experiment|Volume question answered|control|raw":2,"experiment|Volume question answered|time|shown":2,"experiment|Volume question answered|time|raw":2,"experiment|exposures|control|shown":6,"experiment|exposures|control|raw":6,"experiment|exposures|time|shown":7,"experiment|exposures|time|raw":7,"d1JCOgLG|step1|(none)|shown":1,"d1JCOgLG|step1|(none)|raw":1,"d1JCOgLG|step1|personal_network|shown":12,"d1JCOgLG|step1|personal_network|raw":12,"d1JCOgLG|step1|welcome_email|shown":1,"d1JCOgLG|step1|welcome_email|raw":1,"d1JCOgLG|step2|personal_network|shown":6,"d1JCOgLG|step2|personal_network|raw":6,"d1JCOgLG|step3|personal_network|shown":6,"d1JCOgLG|step3|personal_network|raw":6,"d1JCOgLG|step4|personal_network|shown":2,"d1JCOgLG|step4|personal_network|raw":2,"dBS4IKQb|Visitors|(none)|shown":1,"dBS4IKQb|Visitors|(none)|raw":1,"dBS4IKQb|Visitors|personal_network|shown":8,"dBS4IKQb|Visitors|personal_network|raw":8,"ZS0Uhz2p|Link clicks|personal_network|shown":9,"ZS0Uhz2p|Link clicks|personal_network|raw":9,"lQ1PbGvG|Respondents|16–30|shown":4,"lQ1PbGvG|Respondents|16–30|raw":4,"lQ1PbGvG|Respondents|5–15|shown":1,"lQ1PbGvG|Respondents|5–15|raw":1,"lQ1PbGvG|Respondents|I don't know|shown":1,"lQ1PbGvG|Respondents|I don't know|raw":1,"lQ1PbGvG|Respondents|More than 60|shown":1,"lQ1PbGvG|Respondents|More than 60|raw":1,"oMvaY0hy|All signups|a|shown":2,"oMvaY0hy|All signups|a|raw":2,"oMvaY0hy|All signups|b|shown":4,"oMvaY0hy|All signups|b|raw":4,"oMvaY0hy|Buyer-role signups|a|shown":1,"oMvaY0hy|Buyer-role signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":3,"oMvaY0hy|Visitors|a|raw":3,"oMvaY0hy|Visitors|b|shown":6,"oMvaY0hy|Visitors|b|raw":6,"d9eeKWIG|Signups|Finance or operations::personal_network|shown":1,"d9eeKWIG|Signups|Finance or operations::personal_network|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":5,"d9eeKWIG|Signups|Just helping test::personal_network|raw":5,"KK0a37NQ|step1|(none)|shown":1,"KK0a37NQ|step1|(none)|raw":1,"KK0a37NQ|step1|personal_network|shown":12,"KK0a37NQ|step1|personal_network|raw":12,"KK0a37NQ|step1|welcome_email|shown":1,"KK0a37NQ|step1|welcome_email|raw":1,"KK0a37NQ|step2|personal_network|shown":1,"KK0a37NQ|step2|personal_network|raw":1,"KK0a37NQ|step3|personal_network|shown":1,"KK0a37NQ|step3|personal_network|raw":1,"dRTNVtm9|step1|(none)|shown":1,"dRTNVtm9|step1|(none)|raw":1,"dRTNVtm9|step1|personal_network|shown":12,"dRTNVtm9|step1|personal_network|raw":12,"dRTNVtm9|step1|welcome_email|shown":1,"dRTNVtm9|step1|welcome_email|raw":1,"dRTNVtm9|step2|personal_network|shown":6,"dRTNVtm9|step2|personal_network|raw":6,"dRTNVtm9|step3|personal_network|shown":4,"dRTNVtm9|step3|personal_network|raw":4,"variant|control|exposure_events":6,"variant|control|exposed_persons":6,"variant|control|resent":3,"variant|control|signups":2,"variant|control|buyer_signups":1,"variant|time|exposure_events":8,"variant|time|exposed_persons":7,"variant|time|resent":2,"variant|time|signups":5,"variant|time|buyer_signups":0,"flag|called":20,"flag|empty_response":1,"flag|experiment_exposure":19,"flag|fallback_views":1,"persons_by_source|(none)":1,"persons_by_source|personal_network":15,"persons_by_source|welcome_email":1,"test|persons":10,"test|events":57,"unattributed|persons":1,"clicks|total":9,"clicks|no_visit_after":1,"survey|post_launch_persons":7,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":15,"check|filter_leak_through_both":6,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-21 14:34:15 UTC — baseline before step 11 (welcome email CTA to Google Form survey)

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ 9s0dwQbs: no raw definition
- ≠ unlabeled unattributed visits: eb48ecba-e4e1-5170-a5d7-a029762a66da, 3257de69-5499-5a0e-9628-f26fda7bbc69, 20920abe-cc85-5510-96eb-c26461d73e19

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 5 | 5 | ✓ | not-enough-exposures |
| Buyer-role signups (D-009 headline)\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 3 | 3 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 6 | 6 | ✓ |  |
| exposures\|time | 11 | 11 | ✓ |  |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “People per channel from landing to the welcome email link, counted from 15:00 BRT on 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 7 | 7 | ✓ |
| step4\|personal_network | 3 | 3 | ✓ |

**Channels: visitors → signups → buyers** (`9s0dwQbs`, dashboard tile). Test accounts filtered: undefined. From undefined.
Caption: _none_

_No raw definition in the audit for this tile. Add one to `RAW`._

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel from 15:00 BRT on 19 Nov, with welcome_email left out and direct visits shown as (none) (D-034).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 3 | 3 | ✓ |
| Visitors\|personal_network | 12 | 12 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Clicks on each channel's /go/ link from 15:00 BRT on 19 Nov, shown on their own because a click can't be joined to the visit (D-022).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 10 | 10 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Answers to the volume question per answer from 15:00 BRT on 19 Nov, which leaves out the pre-launch test answers (D-032).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 4 | 4 | ✓ |
| Respondents\|5–15 | 1 | 1 | ✓ |
| Respondents\|I don't know | 2 | 2 | ✓ |
| Respondents\|More than 60 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors and signups per hero variant outside the experiment, counting only events from exposed visitors (D-031).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 2 | 2 | ✓ |
| All signups\|b | 5 | 5 | ✓ |
| Buyer-role signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 4 | 4 | ✓ |
| Visitors\|b | 10 | 10 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups per role and channel from 15:00 BRT on 19 Nov, where welcome_email rows are returning signups, not a channel (D-034).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Finance or operations::personal_network | 1 | 1 | ✓ |
| Signups\|Just helping test::personal_network | 6 | 6 | ✓ |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older buyer-only funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older all-roles funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 5 | 5 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 7 | 6 | 3 | 2 | 1 |
| time | 13 | 11 | 3 | 6 | 0 |

- `$feature_flag_called` for hero-framing: 26 (with a response: 25, empty response: 1). `$experiment_exposure`: 25.
- Page views shown A by fallback (no flag, no exposure): 2 (836fe88c-eb65-5e90-b897-69b497b5398e, 3257de69-5499-5a0e-9628-f26fda7bbc69).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 3 | no (direct) |
| personal_network | 17 | yes |
| welcome_email | 1 | no (D-034) |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 10 | internal_person, test_user, internal_event | 2026-11-20 14:46:23 UTC | 2026-11-20 14:47:29 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed, survey shown, survey dismissed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| eb48ecba-e4e1-5170-a5d7-a029762a66da | **UNLABELED** | 2026-11-21 01:35:06 UTC | shiftpatch-concept.pages.dev | Chrome / Windows |
| 3257de69-5499-5a0e-9628-f26fda7bbc69 | **UNLABELED** | 2026-11-21 08:29:04 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| 20920abe-cc85-5510-96eb-c26461d73e19 | **UNLABELED** | 2026-11-21 08:34:25 UTC | shiftpatch-concept.pages.dev | Chrome iOS / iOS |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |
| 56850f68-a988-58a1-bb1c-7d9598e479e8 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:46:33 UTC | 2026-11-20 14:46:33 UTC |
| c5c0d8d4-d47d-5761-9ce4-528ef0ee873c | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:19 UTC | 2026-11-20 14:49:19 UTC |
| 87d66938-3912-5dba-b879-a5b5a2e674e5 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:31 UTC | 2026-11-20 14:49:31 UTC |
| 99ecd560-7927-559d-acc0-c4f88d6ab8f1 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:51 UTC | 2026-11-20 14:49:51 UTC |
| 01e2abcf-af7f-5fce-b7c1-1f9e0a6f95f2 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:50:24 UTC | 2026-11-20 14:50:24 UTC |
| a3ff6e77-03c1-54d6-86c6-47643d0f76b0 |  | 1 | no | 2026-11-20 15:07:18 UTC | 2026-11-20 15:07:18 UTC |
| d68070ca-0a94-5987-9104-f440a9e7ec99 |  | 1 | no | 2026-11-21 13:50:11 UTC | 2026-11-21 13:50:11 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.435000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $experiment_exposure | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $feature_flag_called | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.600000 | landing_page_viewed | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:24.989000 | $autocapture | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:25.002000 | survey shown | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 9. Getting through both: 6 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 6 |

**c) `$feature/hero-framing` on page views:** 34 of 36 `landing_page_viewed` (internal included) carry it. 27 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-20 16:51:04 UTC (after step 10 (promo video): no site visits made during the session).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| KK0a37NQ\|step1\|(none)\|raw | 1 | 3 | ▲ check it is real traffic |
| KK0a37NQ\|step1\|(none)\|shown | 1 | 3 | ▲ check it is real traffic |
| KK0a37NQ\|step1\|personal_network\|raw | 12 | 15 | ▲ check it is real traffic |
| KK0a37NQ\|step1\|personal_network\|shown | 12 | 15 | ▲ check it is real traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|raw | 9 | 10 | ▲ check it is real traffic |
| ZS0Uhz2p\|Link clicks\|personal_network\|shown | 9 | 10 | ▲ check it is real traffic |
| clicks\|total | 9 | 10 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|(none)\|raw | 1 | 3 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|(none)\|shown | 1 | 3 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|raw | 12 | 15 | ▲ check it is real traffic |
| d1JCOgLG\|step1\|personal_network\|shown | 12 | 15 | ▲ check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|raw | 6 | 7 | ▲ check it is real traffic |
| d1JCOgLG\|step2\|personal_network\|shown | 6 | 7 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|raw | 6 | 7 | ▲ check it is real traffic |
| d1JCOgLG\|step3\|personal_network\|shown | 6 | 7 | ▲ check it is real traffic |
| d1JCOgLG\|step4\|personal_network\|raw | 2 | 3 | ▲ check it is real traffic |
| d1JCOgLG\|step4\|personal_network\|shown | 2 | 3 | ▲ check it is real traffic |
| d9eeKWIG\|Signups\|Just helping test::personal_network\|raw | 5 | 6 | ▲ check it is real traffic |
| d9eeKWIG\|Signups\|Just helping test::personal_network\|shown | 5 | 6 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|(none)\|raw | 1 | 3 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|(none)\|shown | 1 | 3 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|raw | 8 | 12 | ▲ check it is real traffic |
| dBS4IKQb\|Visitors\|personal_network\|shown | 8 | 12 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|(none)\|raw | 1 | 3 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|(none)\|shown | 1 | 3 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|raw | 12 | 15 | ▲ check it is real traffic |
| dRTNVtm9\|step1\|personal_network\|shown | 12 | 15 | ▲ check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|raw | 6 | 7 | ▲ check it is real traffic |
| dRTNVtm9\|step2\|personal_network\|shown | 6 | 7 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|raw | 4 | 5 | ▲ check it is real traffic |
| dRTNVtm9\|step3\|personal_network\|shown | 4 | 5 | ▲ check it is real traffic |
| experiment\|All signups\|time\|raw | 4 | 5 | ▲ check it is real traffic |
| experiment\|All signups\|time\|shown | 4 | 5 | ▲ check it is real traffic |
| experiment\|Volume question answered\|time\|raw | 2 | 3 | ▲ check it is real traffic |
| experiment\|Volume question answered\|time\|shown | 2 | 3 | ▲ check it is real traffic |
| experiment\|exposures\|time\|raw | 7 | 11 | ▲ check it is real traffic |
| experiment\|exposures\|time\|shown | 7 | 11 | ▲ check it is real traffic |
| flag\|called | 20 | 26 | ▲ check it is real traffic |
| flag\|experiment_exposure | 19 | 25 | ▲ check it is real traffic |
| flag\|fallback_views | 1 | 2 | ▲ check it is real traffic |
| lQ1PbGvG\|Respondents\|I don't know\|raw | 1 | 2 | ▲ check it is real traffic |
| lQ1PbGvG\|Respondents\|I don't know\|shown | 1 | 2 | ▲ check it is real traffic |
| oMvaY0hy\|All signups\|b\|raw | 4 | 5 | ▲ check it is real traffic |
| oMvaY0hy\|All signups\|b\|shown | 4 | 5 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|a\|raw | 3 | 4 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|a\|shown | 3 | 4 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|b\|raw | 6 | 10 | ▲ check it is real traffic |
| oMvaY0hy\|Visitors\|b\|shown | 6 | 10 | ▲ check it is real traffic |
| persons_by_source\|(none) | 1 | 3 | ▲ check it is real traffic |
| persons_by_source\|personal_network | 15 | 17 | ▲ check it is real traffic |
| survey\|post_launch_persons | 7 | 8 | ▲ check it is real traffic |
| unattributed\|persons | 1 | 4 | ▲ check it is real traffic |
| variant\|control\|exposure_events | 6 | 7 | ▲ check it is real traffic |
| variant\|time\|exposed_persons | 7 | 11 | ▲ check it is real traffic |
| variant\|time\|exposure_events | 8 | 13 | ▲ check it is real traffic |
| variant\|time\|resent | 2 | 3 | ▲ check it is real traffic |
| variant\|time\|signups | 5 | 6 | ▲ check it is real traffic |

<!-- audit-json {"runAt":"2026-11-21 14:34:15 UTC","note":"baseline before step 11 (welcome email CTA to Google Form survey)","metrics":{"experiment|All signups|control|shown":2,"experiment|All signups|control|raw":2,"experiment|All signups|time|shown":5,"experiment|All signups|time|raw":5,"experiment|Buyer-role signups (D-009 headline)|control|shown":1,"experiment|Buyer-role signups (D-009 headline)|control|raw":1,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":2,"experiment|Volume question answered|control|raw":2,"experiment|Volume question answered|time|shown":3,"experiment|Volume question answered|time|raw":3,"experiment|exposures|control|shown":6,"experiment|exposures|control|raw":6,"experiment|exposures|time|shown":11,"experiment|exposures|time|raw":11,"d1JCOgLG|step1|(none)|shown":3,"d1JCOgLG|step1|(none)|raw":3,"d1JCOgLG|step1|personal_network|shown":15,"d1JCOgLG|step1|personal_network|raw":15,"d1JCOgLG|step1|welcome_email|shown":1,"d1JCOgLG|step1|welcome_email|raw":1,"d1JCOgLG|step2|personal_network|shown":7,"d1JCOgLG|step2|personal_network|raw":7,"d1JCOgLG|step3|personal_network|shown":7,"d1JCOgLG|step3|personal_network|raw":7,"d1JCOgLG|step4|personal_network|shown":3,"d1JCOgLG|step4|personal_network|raw":3,"dBS4IKQb|Visitors|(none)|shown":3,"dBS4IKQb|Visitors|(none)|raw":3,"dBS4IKQb|Visitors|personal_network|shown":12,"dBS4IKQb|Visitors|personal_network|raw":12,"ZS0Uhz2p|Link clicks|personal_network|shown":10,"ZS0Uhz2p|Link clicks|personal_network|raw":10,"lQ1PbGvG|Respondents|16–30|shown":4,"lQ1PbGvG|Respondents|16–30|raw":4,"lQ1PbGvG|Respondents|5–15|shown":1,"lQ1PbGvG|Respondents|5–15|raw":1,"lQ1PbGvG|Respondents|I don't know|shown":2,"lQ1PbGvG|Respondents|I don't know|raw":2,"lQ1PbGvG|Respondents|More than 60|shown":1,"lQ1PbGvG|Respondents|More than 60|raw":1,"oMvaY0hy|All signups|a|shown":2,"oMvaY0hy|All signups|a|raw":2,"oMvaY0hy|All signups|b|shown":5,"oMvaY0hy|All signups|b|raw":5,"oMvaY0hy|Buyer-role signups|a|shown":1,"oMvaY0hy|Buyer-role signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":4,"oMvaY0hy|Visitors|a|raw":4,"oMvaY0hy|Visitors|b|shown":10,"oMvaY0hy|Visitors|b|raw":10,"d9eeKWIG|Signups|Finance or operations::personal_network|shown":1,"d9eeKWIG|Signups|Finance or operations::personal_network|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":6,"d9eeKWIG|Signups|Just helping test::personal_network|raw":6,"KK0a37NQ|step1|(none)|shown":3,"KK0a37NQ|step1|(none)|raw":3,"KK0a37NQ|step1|personal_network|shown":15,"KK0a37NQ|step1|personal_network|raw":15,"KK0a37NQ|step1|welcome_email|shown":1,"KK0a37NQ|step1|welcome_email|raw":1,"KK0a37NQ|step2|personal_network|shown":1,"KK0a37NQ|step2|personal_network|raw":1,"KK0a37NQ|step3|personal_network|shown":1,"KK0a37NQ|step3|personal_network|raw":1,"dRTNVtm9|step1|(none)|shown":3,"dRTNVtm9|step1|(none)|raw":3,"dRTNVtm9|step1|personal_network|shown":15,"dRTNVtm9|step1|personal_network|raw":15,"dRTNVtm9|step1|welcome_email|shown":1,"dRTNVtm9|step1|welcome_email|raw":1,"dRTNVtm9|step2|personal_network|shown":7,"dRTNVtm9|step2|personal_network|raw":7,"dRTNVtm9|step3|personal_network|shown":5,"dRTNVtm9|step3|personal_network|raw":5,"variant|control|exposure_events":7,"variant|control|exposed_persons":6,"variant|control|resent":3,"variant|control|signups":2,"variant|control|buyer_signups":1,"variant|time|exposure_events":13,"variant|time|exposed_persons":11,"variant|time|resent":3,"variant|time|signups":6,"variant|time|buyer_signups":0,"flag|called":26,"flag|empty_response":1,"flag|experiment_exposure":25,"flag|fallback_views":2,"persons_by_source|(none)":3,"persons_by_source|personal_network":17,"persons_by_source|welcome_email":1,"test|persons":10,"test|events":57,"unattributed|persons":4,"clicks|total":10,"clicks|no_visit_after":1,"survey|post_launch_persons":8,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":15,"check|filter_leak_through_both":6,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-21 14:57:21 UTC — after step 11 code edits (not deployed; no site visits)

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ 9s0dwQbs: no raw definition
- ≠ unlabeled unattributed visits: eb48ecba-e4e1-5170-a5d7-a029762a66da, 3257de69-5499-5a0e-9628-f26fda7bbc69, 20920abe-cc85-5510-96eb-c26461d73e19

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 5 | 5 | ✓ | not-enough-exposures |
| Buyer-role signups (D-009 headline)\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 3 | 3 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 6 | 6 | ✓ |  |
| exposures\|time | 11 | 11 | ✓ |  |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “People per channel from landing to the welcome email link, counted from 15:00 BRT on 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 7 | 7 | ✓ |
| step4\|personal_network | 3 | 3 | ✓ |

**Channels: visitors → signups → buyers** (`9s0dwQbs`, dashboard tile). Test accounts filtered: undefined. From undefined.
Caption: _none_

_No raw definition in the audit for this tile. Add one to `RAW`._

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel from 15:00 BRT on 19 Nov, with welcome_email left out and direct visits shown as (none) (D-034).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 3 | 3 | ✓ |
| Visitors\|personal_network | 12 | 12 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Clicks on each channel's /go/ link from 15:00 BRT on 19 Nov, shown on their own because a click can't be joined to the visit (D-022).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 10 | 10 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Answers to the volume question per answer from 15:00 BRT on 19 Nov, which leaves out the pre-launch test answers (D-032).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 4 | 4 | ✓ |
| Respondents\|5–15 | 1 | 1 | ✓ |
| Respondents\|I don't know | 2 | 2 | ✓ |
| Respondents\|More than 60 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors and signups per hero variant outside the experiment, counting only events from exposed visitors (D-031).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 2 | 2 | ✓ |
| All signups\|b | 5 | 5 | ✓ |
| Buyer-role signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 4 | 4 | ✓ |
| Visitors\|b | 10 | 10 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups per role and channel from 15:00 BRT on 19 Nov, where welcome_email rows are returning signups, not a channel (D-034).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Finance or operations::personal_network | 1 | 1 | ✓ |
| Signups\|Just helping test::personal_network | 6 | 6 | ✓ |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older buyer-only funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older all-roles funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 5 | 5 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 7 | 6 | 3 | 2 | 1 |
| time | 13 | 11 | 3 | 6 | 0 |

- `$feature_flag_called` for hero-framing: 26 (with a response: 25, empty response: 1). `$experiment_exposure`: 25.
- Page views shown A by fallback (no flag, no exposure): 2 (836fe88c-eb65-5e90-b897-69b497b5398e, 3257de69-5499-5a0e-9628-f26fda7bbc69).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 3 | no (direct) |
| personal_network | 17 | yes |
| welcome_email | 1 | no (D-034) |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 5 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-20 11:30:49 UTC | $pageview, landing_page_viewed |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 10 | internal_person, test_user, internal_event | 2026-11-20 14:46:23 UTC | 2026-11-20 14:47:29 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed, survey shown, survey dismissed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| eb48ecba-e4e1-5170-a5d7-a029762a66da | **UNLABELED** | 2026-11-21 01:35:06 UTC | shiftpatch-concept.pages.dev | Chrome / Windows |
| 3257de69-5499-5a0e-9628-f26fda7bbc69 | **UNLABELED** | 2026-11-21 08:29:04 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| 20920abe-cc85-5510-96eb-c26461d73e19 | **UNLABELED** | 2026-11-21 08:34:25 UTC | shiftpatch-concept.pages.dev | Chrome iOS / iOS |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |
| 56850f68-a988-58a1-bb1c-7d9598e479e8 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:46:33 UTC | 2026-11-20 14:46:33 UTC |
| c5c0d8d4-d47d-5761-9ce4-528ef0ee873c | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:19 UTC | 2026-11-20 14:49:19 UTC |
| 87d66938-3912-5dba-b879-a5b5a2e674e5 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:31 UTC | 2026-11-20 14:49:31 UTC |
| 99ecd560-7927-559d-acc0-c4f88d6ab8f1 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:51 UTC | 2026-11-20 14:49:51 UTC |
| 01e2abcf-af7f-5fce-b7c1-1f9e0a6f95f2 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:50:24 UTC | 2026-11-20 14:50:24 UTC |
| a3ff6e77-03c1-54d6-86c6-47643d0f76b0 |  | 1 | no | 2026-11-20 15:07:18 UTC | 2026-11-20 15:07:18 UTC |
| d68070ca-0a94-5987-9104-f440a9e7ec99 |  | 1 | no | 2026-11-21 13:50:11 UTC | 2026-11-21 13:50:11 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.435000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $experiment_exposure | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $feature_flag_called | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.600000 | landing_page_viewed | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:24.989000 | $autocapture | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:25.002000 | survey shown | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 9. Getting through both: 6 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 6 |

**c) `$feature/hero-framing` on page views:** 34 of 36 `landing_page_viewed` (internal included) carry it. 27 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-21 14:34:15 UTC (baseline before step 11 (welcome email CTA to Google Form survey)).

_No number moved._

<!-- audit-json {"runAt":"2026-11-21 14:57:21 UTC","note":"after step 11 code edits (not deployed; no site visits)","metrics":{"experiment|All signups|control|shown":2,"experiment|All signups|control|raw":2,"experiment|All signups|time|shown":5,"experiment|All signups|time|raw":5,"experiment|Buyer-role signups (D-009 headline)|control|shown":1,"experiment|Buyer-role signups (D-009 headline)|control|raw":1,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":2,"experiment|Volume question answered|control|raw":2,"experiment|Volume question answered|time|shown":3,"experiment|Volume question answered|time|raw":3,"experiment|exposures|control|shown":6,"experiment|exposures|control|raw":6,"experiment|exposures|time|shown":11,"experiment|exposures|time|raw":11,"d1JCOgLG|step1|(none)|shown":3,"d1JCOgLG|step1|(none)|raw":3,"d1JCOgLG|step1|personal_network|shown":15,"d1JCOgLG|step1|personal_network|raw":15,"d1JCOgLG|step1|welcome_email|shown":1,"d1JCOgLG|step1|welcome_email|raw":1,"d1JCOgLG|step2|personal_network|shown":7,"d1JCOgLG|step2|personal_network|raw":7,"d1JCOgLG|step3|personal_network|shown":7,"d1JCOgLG|step3|personal_network|raw":7,"d1JCOgLG|step4|personal_network|shown":3,"d1JCOgLG|step4|personal_network|raw":3,"dBS4IKQb|Visitors|(none)|shown":3,"dBS4IKQb|Visitors|(none)|raw":3,"dBS4IKQb|Visitors|personal_network|shown":12,"dBS4IKQb|Visitors|personal_network|raw":12,"ZS0Uhz2p|Link clicks|personal_network|shown":10,"ZS0Uhz2p|Link clicks|personal_network|raw":10,"lQ1PbGvG|Respondents|16–30|shown":4,"lQ1PbGvG|Respondents|16–30|raw":4,"lQ1PbGvG|Respondents|5–15|shown":1,"lQ1PbGvG|Respondents|5–15|raw":1,"lQ1PbGvG|Respondents|I don't know|shown":2,"lQ1PbGvG|Respondents|I don't know|raw":2,"lQ1PbGvG|Respondents|More than 60|shown":1,"lQ1PbGvG|Respondents|More than 60|raw":1,"oMvaY0hy|All signups|a|shown":2,"oMvaY0hy|All signups|a|raw":2,"oMvaY0hy|All signups|b|shown":5,"oMvaY0hy|All signups|b|raw":5,"oMvaY0hy|Buyer-role signups|a|shown":1,"oMvaY0hy|Buyer-role signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":4,"oMvaY0hy|Visitors|a|raw":4,"oMvaY0hy|Visitors|b|shown":10,"oMvaY0hy|Visitors|b|raw":10,"d9eeKWIG|Signups|Finance or operations::personal_network|shown":1,"d9eeKWIG|Signups|Finance or operations::personal_network|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":6,"d9eeKWIG|Signups|Just helping test::personal_network|raw":6,"KK0a37NQ|step1|(none)|shown":3,"KK0a37NQ|step1|(none)|raw":3,"KK0a37NQ|step1|personal_network|shown":15,"KK0a37NQ|step1|personal_network|raw":15,"KK0a37NQ|step1|welcome_email|shown":1,"KK0a37NQ|step1|welcome_email|raw":1,"KK0a37NQ|step2|personal_network|shown":1,"KK0a37NQ|step2|personal_network|raw":1,"KK0a37NQ|step3|personal_network|shown":1,"KK0a37NQ|step3|personal_network|raw":1,"dRTNVtm9|step1|(none)|shown":3,"dRTNVtm9|step1|(none)|raw":3,"dRTNVtm9|step1|personal_network|shown":15,"dRTNVtm9|step1|personal_network|raw":15,"dRTNVtm9|step1|welcome_email|shown":1,"dRTNVtm9|step1|welcome_email|raw":1,"dRTNVtm9|step2|personal_network|shown":7,"dRTNVtm9|step2|personal_network|raw":7,"dRTNVtm9|step3|personal_network|shown":5,"dRTNVtm9|step3|personal_network|raw":5,"variant|control|exposure_events":7,"variant|control|exposed_persons":6,"variant|control|resent":3,"variant|control|signups":2,"variant|control|buyer_signups":1,"variant|time|exposure_events":13,"variant|time|exposed_persons":11,"variant|time|resent":3,"variant|time|signups":6,"variant|time|buyer_signups":0,"flag|called":26,"flag|empty_response":1,"flag|experiment_exposure":25,"flag|fallback_views":2,"persons_by_source|(none)":3,"persons_by_source|personal_network":17,"persons_by_source|welcome_email":1,"test|persons":10,"test|events":57,"unattributed|persons":4,"clicks|total":10,"clicks|no_visit_after":1,"survey|post_launch_persons":8,"survey|post_launch_test_persons":0,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":15,"check|filter_leak_through_both":6,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-21 15:32:45 UTC — baseline before repo cleanup (chore/repo-cleanup)

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ 9s0dwQbs: no raw definition
- ≠ unlabeled unattributed visits: eb48ecba-e4e1-5170-a5d7-a029762a66da, 3257de69-5499-5a0e-9628-f26fda7bbc69, 20920abe-cc85-5510-96eb-c26461d73e19
- ≠ internal/test survey answers after launch: d299c033-5d88-5d5e-a299-282436bc7ed7

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 5 | 5 | ✓ | not-enough-exposures |
| Buyer-role signups (D-009 headline)\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 3 | 3 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 6 | 6 | ✓ |  |
| exposures\|time | 11 | 11 | ✓ |  |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “People per channel from landing to the welcome email link, counted from 15:00 BRT on 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 7 | 7 | ✓ |
| step4\|personal_network | 3 | 3 | ✓ |

**Channels: visitors → signups → buyers** (`9s0dwQbs`, dashboard tile). Test accounts filtered: undefined. From undefined.
Caption: _none_

_No raw definition in the audit for this tile. Add one to `RAW`._

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel from 15:00 BRT on 19 Nov, with welcome_email left out and direct visits shown as (none) (D-034).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 3 | 3 | ✓ |
| Visitors\|personal_network | 12 | 12 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Clicks on each channel's /go/ link from 15:00 BRT on 19 Nov, shown on their own because a click can't be joined to the visit (D-022).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 10 | 10 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Answers to the volume question per answer from 15:00 BRT on 19 Nov, which leaves out the pre-launch test answers (D-032).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 4 | 4 | ✓ |
| Respondents\|5–15 | 1 | 1 | ✓ |
| Respondents\|I don't know | 2 | 2 | ✓ |
| Respondents\|More than 60 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors and signups per hero variant outside the experiment, counting only events from exposed visitors (D-031).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 2 | 2 | ✓ |
| All signups\|b | 5 | 5 | ✓ |
| Buyer-role signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 4 | 4 | ✓ |
| Visitors\|b | 10 | 10 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups per role and channel from 15:00 BRT on 19 Nov, where welcome_email rows are returning signups, not a channel (D-034).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Finance or operations::personal_network | 1 | 1 | ✓ |
| Signups\|Just helping test::personal_network | 6 | 6 | ✓ |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older buyer-only funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older all-roles funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 5 | 5 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 7 | 6 | 3 | 2 | 1 |
| time | 13 | 11 | 3 | 6 | 0 |

- `$feature_flag_called` for hero-framing: 27 (with a response: 26, empty response: 1). `$experiment_exposure`: 26.
- Page views shown A by fallback (no flag, no exposure): 2 (836fe88c-eb65-5e90-b897-69b497b5398e, 3257de69-5499-5a0e-9628-f26fda7bbc69).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 3 | no (direct) |
| personal_network | 17 | yes |
| welcome_email | 1 | no (D-034) |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 9 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-21 15:08:51 UTC | $pageview, landing_page_viewed, signup_form_started, signup_form_submitted |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 10 | internal_person, test_user, internal_event | 2026-11-20 14:46:23 UTC | 2026-11-20 14:47:29 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed, survey shown, survey dismissed |
| d299c033-5d88-5d5e-a299-282436bc7ed7 |  | 11 | internal_event, test_email | 2026-11-21 15:08:51 UTC | 2026-11-21 15:23:48 UTC | survey shown, survey sent, welcome_email_sent, welcome_email_opened, welcome_email_link_clicked, $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| eb48ecba-e4e1-5170-a5d7-a029762a66da | **UNLABELED** | 2026-11-21 01:35:06 UTC | shiftpatch-concept.pages.dev | Chrome / Windows |
| 3257de69-5499-5a0e-9628-f26fda7bbc69 | **UNLABELED** | 2026-11-21 08:29:04 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| 20920abe-cc85-5510-96eb-c26461d73e19 | **UNLABELED** | 2026-11-21 08:34:25 UTC | shiftpatch-concept.pages.dev | Chrome iOS / iOS |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |
| 56850f68-a988-58a1-bb1c-7d9598e479e8 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:46:33 UTC | 2026-11-20 14:46:33 UTC |
| c5c0d8d4-d47d-5761-9ce4-528ef0ee873c | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:19 UTC | 2026-11-20 14:49:19 UTC |
| 87d66938-3912-5dba-b879-a5b5a2e674e5 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:31 UTC | 2026-11-20 14:49:31 UTC |
| 99ecd560-7927-559d-acc0-c4f88d6ab8f1 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:51 UTC | 2026-11-20 14:49:51 UTC |
| 01e2abcf-af7f-5fce-b7c1-1f9e0a6f95f2 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:50:24 UTC | 2026-11-20 14:50:24 UTC |
| a3ff6e77-03c1-54d6-86c6-47643d0f76b0 |  | 1 | no | 2026-11-20 15:07:18 UTC | 2026-11-20 15:07:18 UTC |
| d68070ca-0a94-5987-9104-f440a9e7ec99 |  | 1 | no | 2026-11-21 13:50:11 UTC | 2026-11-21 13:50:11 UTC |
| d299c033-5d88-5d5e-a299-282436bc7ed7 |  | 1 | test_email | 2026-11-21 15:08:53 UTC | 2026-11-21 15:08:53 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.435000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $experiment_exposure | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $feature_flag_called | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.600000 | landing_page_viewed | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:24.989000 | $autocapture | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:25.002000 | survey shown | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 9. Getting through both: 6 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 6 |

**c) `$feature/hero-framing` on page views:** 36 of 38 `landing_page_viewed` (internal included) carry it. 28 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-21 14:57:21 UTC (after step 11 code edits (not deployed; no site visits)).

| Number | Before | Now |  |
| :--- | :--- | :--- | :--- |
| flag\|called | 26 | 27 | ▲ check it is real traffic |
| flag\|experiment_exposure | 25 | 26 | ▲ check it is real traffic |
| survey\|post_launch_persons | 8 | 9 | ▲ check it is real traffic |
| survey\|post_launch_test_persons | 0 | 1 | ▲ check it is real traffic |
| test\|events | 57 | 72 | ▲ check it is real traffic |
| test\|persons | 10 | 11 | ▲ check it is real traffic |

<!-- audit-json {"runAt":"2026-11-21 15:32:45 UTC","note":"baseline before repo cleanup (chore/repo-cleanup)","metrics":{"experiment|All signups|control|shown":2,"experiment|All signups|control|raw":2,"experiment|All signups|time|shown":5,"experiment|All signups|time|raw":5,"experiment|Buyer-role signups (D-009 headline)|control|shown":1,"experiment|Buyer-role signups (D-009 headline)|control|raw":1,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":2,"experiment|Volume question answered|control|raw":2,"experiment|Volume question answered|time|shown":3,"experiment|Volume question answered|time|raw":3,"experiment|exposures|control|shown":6,"experiment|exposures|control|raw":6,"experiment|exposures|time|shown":11,"experiment|exposures|time|raw":11,"d1JCOgLG|step1|(none)|shown":3,"d1JCOgLG|step1|(none)|raw":3,"d1JCOgLG|step1|personal_network|shown":15,"d1JCOgLG|step1|personal_network|raw":15,"d1JCOgLG|step1|welcome_email|shown":1,"d1JCOgLG|step1|welcome_email|raw":1,"d1JCOgLG|step2|personal_network|shown":7,"d1JCOgLG|step2|personal_network|raw":7,"d1JCOgLG|step3|personal_network|shown":7,"d1JCOgLG|step3|personal_network|raw":7,"d1JCOgLG|step4|personal_network|shown":3,"d1JCOgLG|step4|personal_network|raw":3,"dBS4IKQb|Visitors|(none)|shown":3,"dBS4IKQb|Visitors|(none)|raw":3,"dBS4IKQb|Visitors|personal_network|shown":12,"dBS4IKQb|Visitors|personal_network|raw":12,"ZS0Uhz2p|Link clicks|personal_network|shown":10,"ZS0Uhz2p|Link clicks|personal_network|raw":10,"lQ1PbGvG|Respondents|16–30|shown":4,"lQ1PbGvG|Respondents|16–30|raw":4,"lQ1PbGvG|Respondents|5–15|shown":1,"lQ1PbGvG|Respondents|5–15|raw":1,"lQ1PbGvG|Respondents|I don't know|shown":2,"lQ1PbGvG|Respondents|I don't know|raw":2,"lQ1PbGvG|Respondents|More than 60|shown":1,"lQ1PbGvG|Respondents|More than 60|raw":1,"oMvaY0hy|All signups|a|shown":2,"oMvaY0hy|All signups|a|raw":2,"oMvaY0hy|All signups|b|shown":5,"oMvaY0hy|All signups|b|raw":5,"oMvaY0hy|Buyer-role signups|a|shown":1,"oMvaY0hy|Buyer-role signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":4,"oMvaY0hy|Visitors|a|raw":4,"oMvaY0hy|Visitors|b|shown":10,"oMvaY0hy|Visitors|b|raw":10,"d9eeKWIG|Signups|Finance or operations::personal_network|shown":1,"d9eeKWIG|Signups|Finance or operations::personal_network|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":6,"d9eeKWIG|Signups|Just helping test::personal_network|raw":6,"KK0a37NQ|step1|(none)|shown":3,"KK0a37NQ|step1|(none)|raw":3,"KK0a37NQ|step1|personal_network|shown":15,"KK0a37NQ|step1|personal_network|raw":15,"KK0a37NQ|step1|welcome_email|shown":1,"KK0a37NQ|step1|welcome_email|raw":1,"KK0a37NQ|step2|personal_network|shown":1,"KK0a37NQ|step2|personal_network|raw":1,"KK0a37NQ|step3|personal_network|shown":1,"KK0a37NQ|step3|personal_network|raw":1,"dRTNVtm9|step1|(none)|shown":3,"dRTNVtm9|step1|(none)|raw":3,"dRTNVtm9|step1|personal_network|shown":15,"dRTNVtm9|step1|personal_network|raw":15,"dRTNVtm9|step1|welcome_email|shown":1,"dRTNVtm9|step1|welcome_email|raw":1,"dRTNVtm9|step2|personal_network|shown":7,"dRTNVtm9|step2|personal_network|raw":7,"dRTNVtm9|step3|personal_network|shown":5,"dRTNVtm9|step3|personal_network|raw":5,"variant|control|exposure_events":7,"variant|control|exposed_persons":6,"variant|control|resent":3,"variant|control|signups":2,"variant|control|buyer_signups":1,"variant|time|exposure_events":13,"variant|time|exposed_persons":11,"variant|time|resent":3,"variant|time|signups":6,"variant|time|buyer_signups":0,"flag|called":27,"flag|empty_response":1,"flag|experiment_exposure":26,"flag|fallback_views":2,"persons_by_source|(none)":3,"persons_by_source|personal_network":17,"persons_by_source|welcome_email":1,"test|persons":11,"test|events":72,"unattributed|persons":4,"clicks|total":10,"clicks|no_visit_after":1,"survey|post_launch_persons":9,"survey|post_launch_test_persons":1,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":15,"check|filter_leak_through_both":6,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-21 15:45:08 UTC — after repo cleanup (no site visits; dist identical to main)

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ 9s0dwQbs: no raw definition
- ≠ unlabeled unattributed visits: eb48ecba-e4e1-5170-a5d7-a029762a66da, 3257de69-5499-5a0e-9628-f26fda7bbc69, 20920abe-cc85-5510-96eb-c26461d73e19
- ≠ internal/test survey answers after launch: d299c033-5d88-5d5e-a299-282436bc7ed7

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 5 | 5 | ✓ | not-enough-exposures |
| Buyer-role signups (D-009 headline)\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 3 | 3 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 6 | 6 | ✓ |  |
| exposures\|time | 11 | 11 | ✓ |  |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “People per channel from landing to the welcome email link, counted from 15:00 BRT on 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 7 | 7 | ✓ |
| step4\|personal_network | 3 | 3 | ✓ |

**Channels: visitors → signups → buyers** (`9s0dwQbs`, dashboard tile). Test accounts filtered: undefined. From undefined.
Caption: _none_

_No raw definition in the audit for this tile. Add one to `RAW`._

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel from 15:00 BRT on 19 Nov, with welcome_email left out and direct visits shown as (none) (D-034).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 3 | 3 | ✓ |
| Visitors\|personal_network | 12 | 12 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Clicks on each channel's /go/ link from 15:00 BRT on 19 Nov, shown on their own because a click can't be joined to the visit (D-022).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 10 | 10 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Answers to the volume question per answer from 15:00 BRT on 19 Nov, which leaves out the pre-launch test answers (D-032).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 4 | 4 | ✓ |
| Respondents\|5–15 | 1 | 1 | ✓ |
| Respondents\|I don't know | 2 | 2 | ✓ |
| Respondents\|More than 60 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors and signups per hero variant outside the experiment, counting only events from exposed visitors (D-031).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 2 | 2 | ✓ |
| All signups\|b | 5 | 5 | ✓ |
| Buyer-role signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 4 | 4 | ✓ |
| Visitors\|b | 10 | 10 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups per role and channel from 15:00 BRT on 19 Nov, where welcome_email rows are returning signups, not a channel (D-034).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Finance or operations::personal_network | 1 | 1 | ✓ |
| Signups\|Just helping test::personal_network | 6 | 6 | ✓ |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older buyer-only funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older all-roles funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 5 | 5 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 7 | 6 | 3 | 2 | 1 |
| time | 13 | 11 | 3 | 6 | 0 |

- `$feature_flag_called` for hero-framing: 27 (with a response: 26, empty response: 1). `$experiment_exposure`: 26.
- Page views shown A by fallback (no flag, no exposure): 2 (836fe88c-eb65-5e90-b897-69b497b5398e, 3257de69-5499-5a0e-9628-f26fda7bbc69).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 3 | no (direct) |
| personal_network | 17 | yes |
| welcome_email | 1 | no (D-034) |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 9 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-21 15:08:51 UTC | $pageview, landing_page_viewed, signup_form_started, signup_form_submitted |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 10 | internal_person, test_user, internal_event | 2026-11-20 14:46:23 UTC | 2026-11-20 14:47:29 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed, survey shown, survey dismissed |
| d299c033-5d88-5d5e-a299-282436bc7ed7 |  | 11 | internal_event, test_email | 2026-11-21 15:08:51 UTC | 2026-11-21 15:23:48 UTC | survey shown, survey sent, welcome_email_sent, welcome_email_opened, welcome_email_link_clicked, $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| eb48ecba-e4e1-5170-a5d7-a029762a66da | **UNLABELED** | 2026-11-21 01:35:06 UTC | shiftpatch-concept.pages.dev | Chrome / Windows |
| 3257de69-5499-5a0e-9628-f26fda7bbc69 | **UNLABELED** | 2026-11-21 08:29:04 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| 20920abe-cc85-5510-96eb-c26461d73e19 | **UNLABELED** | 2026-11-21 08:34:25 UTC | shiftpatch-concept.pages.dev | Chrome iOS / iOS |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |
| 56850f68-a988-58a1-bb1c-7d9598e479e8 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:46:33 UTC | 2026-11-20 14:46:33 UTC |
| c5c0d8d4-d47d-5761-9ce4-528ef0ee873c | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:19 UTC | 2026-11-20 14:49:19 UTC |
| 87d66938-3912-5dba-b879-a5b5a2e674e5 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:31 UTC | 2026-11-20 14:49:31 UTC |
| 99ecd560-7927-559d-acc0-c4f88d6ab8f1 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:51 UTC | 2026-11-20 14:49:51 UTC |
| 01e2abcf-af7f-5fce-b7c1-1f9e0a6f95f2 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:50:24 UTC | 2026-11-20 14:50:24 UTC |
| a3ff6e77-03c1-54d6-86c6-47643d0f76b0 |  | 1 | no | 2026-11-20 15:07:18 UTC | 2026-11-20 15:07:18 UTC |
| d68070ca-0a94-5987-9104-f440a9e7ec99 |  | 1 | no | 2026-11-21 13:50:11 UTC | 2026-11-21 13:50:11 UTC |
| d299c033-5d88-5d5e-a299-282436bc7ed7 |  | 1 | test_email | 2026-11-21 15:08:53 UTC | 2026-11-21 15:08:53 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.435000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $experiment_exposure | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $feature_flag_called | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.600000 | landing_page_viewed | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:24.989000 | $autocapture | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:25.002000 | survey shown | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 9. Getting through both: 6 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 6 |

**c) `$feature/hero-framing` on page views:** 36 of 38 `landing_page_viewed` (internal included) carry it. 28 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-21 15:32:45 UTC (baseline before repo cleanup (chore/repo-cleanup)).

_No number moved._

<!-- audit-json {"runAt":"2026-11-21 15:45:08 UTC","note":"after repo cleanup (no site visits; dist identical to main)","metrics":{"experiment|All signups|control|shown":2,"experiment|All signups|control|raw":2,"experiment|All signups|time|shown":5,"experiment|All signups|time|raw":5,"experiment|Buyer-role signups (D-009 headline)|control|shown":1,"experiment|Buyer-role signups (D-009 headline)|control|raw":1,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":2,"experiment|Volume question answered|control|raw":2,"experiment|Volume question answered|time|shown":3,"experiment|Volume question answered|time|raw":3,"experiment|exposures|control|shown":6,"experiment|exposures|control|raw":6,"experiment|exposures|time|shown":11,"experiment|exposures|time|raw":11,"d1JCOgLG|step1|(none)|shown":3,"d1JCOgLG|step1|(none)|raw":3,"d1JCOgLG|step1|personal_network|shown":15,"d1JCOgLG|step1|personal_network|raw":15,"d1JCOgLG|step1|welcome_email|shown":1,"d1JCOgLG|step1|welcome_email|raw":1,"d1JCOgLG|step2|personal_network|shown":7,"d1JCOgLG|step2|personal_network|raw":7,"d1JCOgLG|step3|personal_network|shown":7,"d1JCOgLG|step3|personal_network|raw":7,"d1JCOgLG|step4|personal_network|shown":3,"d1JCOgLG|step4|personal_network|raw":3,"dBS4IKQb|Visitors|(none)|shown":3,"dBS4IKQb|Visitors|(none)|raw":3,"dBS4IKQb|Visitors|personal_network|shown":12,"dBS4IKQb|Visitors|personal_network|raw":12,"ZS0Uhz2p|Link clicks|personal_network|shown":10,"ZS0Uhz2p|Link clicks|personal_network|raw":10,"lQ1PbGvG|Respondents|16–30|shown":4,"lQ1PbGvG|Respondents|16–30|raw":4,"lQ1PbGvG|Respondents|5–15|shown":1,"lQ1PbGvG|Respondents|5–15|raw":1,"lQ1PbGvG|Respondents|I don't know|shown":2,"lQ1PbGvG|Respondents|I don't know|raw":2,"lQ1PbGvG|Respondents|More than 60|shown":1,"lQ1PbGvG|Respondents|More than 60|raw":1,"oMvaY0hy|All signups|a|shown":2,"oMvaY0hy|All signups|a|raw":2,"oMvaY0hy|All signups|b|shown":5,"oMvaY0hy|All signups|b|raw":5,"oMvaY0hy|Buyer-role signups|a|shown":1,"oMvaY0hy|Buyer-role signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":4,"oMvaY0hy|Visitors|a|raw":4,"oMvaY0hy|Visitors|b|shown":10,"oMvaY0hy|Visitors|b|raw":10,"d9eeKWIG|Signups|Finance or operations::personal_network|shown":1,"d9eeKWIG|Signups|Finance or operations::personal_network|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":6,"d9eeKWIG|Signups|Just helping test::personal_network|raw":6,"KK0a37NQ|step1|(none)|shown":3,"KK0a37NQ|step1|(none)|raw":3,"KK0a37NQ|step1|personal_network|shown":15,"KK0a37NQ|step1|personal_network|raw":15,"KK0a37NQ|step1|welcome_email|shown":1,"KK0a37NQ|step1|welcome_email|raw":1,"KK0a37NQ|step2|personal_network|shown":1,"KK0a37NQ|step2|personal_network|raw":1,"KK0a37NQ|step3|personal_network|shown":1,"KK0a37NQ|step3|personal_network|raw":1,"dRTNVtm9|step1|(none)|shown":3,"dRTNVtm9|step1|(none)|raw":3,"dRTNVtm9|step1|personal_network|shown":15,"dRTNVtm9|step1|personal_network|raw":15,"dRTNVtm9|step1|welcome_email|shown":1,"dRTNVtm9|step1|welcome_email|raw":1,"dRTNVtm9|step2|personal_network|shown":7,"dRTNVtm9|step2|personal_network|raw":7,"dRTNVtm9|step3|personal_network|shown":5,"dRTNVtm9|step3|personal_network|raw":5,"variant|control|exposure_events":7,"variant|control|exposed_persons":6,"variant|control|resent":3,"variant|control|signups":2,"variant|control|buyer_signups":1,"variant|time|exposure_events":13,"variant|time|exposed_persons":11,"variant|time|resent":3,"variant|time|signups":6,"variant|time|buyer_signups":0,"flag|called":27,"flag|empty_response":1,"flag|experiment_exposure":26,"flag|fallback_views":2,"persons_by_source|(none)":3,"persons_by_source|personal_network":17,"persons_by_source|welcome_email":1,"test|persons":11,"test|events":72,"unattributed|persons":4,"clicks|total":10,"clicks|no_visit_after":1,"survey|post_launch_persons":9,"survey|post_launch_test_persons":1,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":15,"check|filter_leak_through_both":6,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
## Audit 2026-11-21 16:48:41 UTC — after D-060/D-061 doc edits (no PostHog change, no site visits)

Read-only run of `scripts/metrics-audit.mjs`. Events from 2026-11-19 17:48:18 UTC (experiment start, 14:48 BRT); insight tiles from 2026-11-19 18:00:00 UTC (15:00 BRT). Raw counts leave out internal/test persons, `is_internal` events, test emails, localhost and `/preview/` (D-029), and use the step 8 target definitions (D-030, D-031, D-034), so a tile still waiting for its change shows a mismatch until it's applied.

### Summary

- ≠ 9s0dwQbs: no raw definition
- ≠ unlabeled unattributed visits: eb48ecba-e4e1-5170-a5d7-a029762a66da, 3257de69-5499-5a0e-9628-f26fda7bbc69, 20920abe-cc85-5510-96eb-c26461d73e19
- ≠ internal/test survey answers after launch: d299c033-5d88-5d5e-a299-282436bc7ed7

### 1. Tiles: PostHog vs raw

**Experiment 612484** (dashboard tile). Exposure `$experiment_exposure`, test accounts filtered: true, multiple variants: exclude.

| Number | PostHog | Raw |  | PostHog hides results because |
| :--- | :--- | :--- | :--- | :--- |
| All signups\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| All signups\|time | 5 | 5 | ✓ | not-enough-exposures |
| Buyer-role signups (D-009 headline)\|control | 1 | 1 | ✓ | not-enough-exposures, not-enough-metric-data |
| Buyer-role signups (D-009 headline)\|time | 0 | 0 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|control | 2 | 2 | ✓ | not-enough-exposures, not-enough-metric-data |
| Volume question answered\|time | 3 | 3 | ✓ | not-enough-exposures, not-enough-metric-data |
| exposures\|control | 6 | 6 | ✓ |  |
| exposures\|time | 11 | 11 | ✓ |  |

**Funnel: channel → signup → welcome email (by utm_source)** (`d1JCOgLG`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “People per channel from landing to the welcome email link, counted from 15:00 BRT on 19 Nov (D-040).”

Raw = Stage funnel (D-040), per person, ordered, 7-day window: Landed → signup_form_started → signup_form_submitted (all roles) → welcome_email_opened → welcome_email_link_clicked. Breakdown: utm_source of step 1.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 7 | 7 | ✓ |
| step4\|personal_network | 3 | 3 | ✓ |

**Channels: visitors → signups → buyers** (`9s0dwQbs`, dashboard tile). Test accounts filtered: undefined. From undefined.
Caption: _none_

_No raw definition in the audit for this tile. Add one to `RAW`._

**Channels: traffic (visitors by utm_source)** (`dBS4IKQb`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Unique landing-page visitors per channel from 15:00 BRT on 19 Nov, with welcome_email left out and direct visits shown as (none) (D-034).”

Raw = Unique persons with landing_page_viewed per utm_source (welcome_email excluded).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Visitors\|(none) | 3 | 3 | ✓ |
| Visitors\|personal_network | 12 | 12 | ✓ |

**Channels: link clicks (by channel)** (`ZS0Uhz2p`, dashboard tile). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Clicks on each channel's /go/ link from 15:00 BRT on 19 Nov, shown on their own because a click can't be joined to the visit (D-022).”

Raw = Total channel_link_clicked events per channel (welcome_email excluded). Includes link previews; see "Clicks with no visit after".

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Link clicks\|personal_network | 10 | 10 | ✓ |

**Volume question answers (pricing input)** (`lQ1PbGvG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Answers to the volume question per answer from 15:00 BRT on 19 Nov, which leaves out the pre-launch test answers (D-032).”

Raw = Unique persons answering the volume question, per answer.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Respondents\|16–30 | 4 | 4 | ✓ |
| Respondents\|5–15 | 1 | 1 | ✓ |
| Respondents\|I don't know | 2 | 2 | ✓ |
| Respondents\|More than 60 | 1 | 1 | ✓ |

**A/B: buyer-signup rate per visitor (by hero_variant)** (`oMvaY0hy`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Visitors and signups per hero variant outside the experiment, counting only events from exposed visitors (D-031).”

Raw = Unique persons per hero_variant, only events that carry $feature/hero-framing (D-031: leaves out flag-timeout fallbacks that showed A with no exposure).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| All signups\|a | 2 | 2 | ✓ |
| All signups\|b | 5 | 5 | ✓ |
| Buyer-role signups\|a | 1 | 1 | ✓ |
| Visitors\|a | 4 | 4 | ✓ |
| Visitors\|b | 10 | 10 | ✓ |

**Signups by role (by utm_source)** (`d9eeKWIG`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Signups per role and channel from 15:00 BRT on 19 Nov, where welcome_email rows are returning signups, not a channel (D-034).”

Raw = Unique persons with signup_form_submitted per role × utm_source.

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| Signups\|Finance or operations::personal_network | 1 | 1 | ✓ |
| Signups\|Just helping test::personal_network | 6 | 6 | ✓ |

**Channels: funnel visit → buyer signup → volume answer (by utm_source)** (`KK0a37NQ`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older buyer-only funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed (landing_page_viewed or cookie_banner_answered) → buyer signup → volume answer. Breakdown: utm_source of the first step (first touch).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 1 | 1 | ✓ |
| step3\|personal_network | 1 | 1 | ✓ |

**Channels: funnel visit → any signup → volume answer (by utm_source)** (`dRTNVtm9`, not on the dashboard). Test accounts filtered: true. From 2026-11-19T18:00:00Z.
Caption: “Older all-roles funnel, kept saved but off the dashboard since the stage funnel replaced it (D-040).”

Raw = Per-person funnel, ordered, 1-day window: Landed → any signup (all roles) → volume answer. Breakdown: utm_source of the first step (D-036).

| Series | breakdown | PostHog | Raw |  |
| :--- | :--- | :--- | :--- |
| step1\|(none) | 3 | 3 | ✓ |
| step1\|personal_network | 15 | 15 | ✓ |
| step1\|welcome_email | 1 | 1 | ✓ |
| step2\|personal_network | 7 | 7 | ✓ |
| step3\|personal_network | 5 | 5 | ✓ |

### 2. Exposures and signups per variant

| Variant | $experiment_exposure events | Exposed persons | Re-sent after Accept | Signups (hero_variant, flag property set) | Buyer signups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| control | 7 | 6 | 3 | 2 | 1 |
| time | 13 | 11 | 3 | 6 | 0 |

- `$feature_flag_called` for hero-framing: 27 (with a response: 26, empty response: 1). `$experiment_exposure`: 26.
- Page views shown A by fallback (no flag, no exposure): 2 (836fe88c-eb65-5e90-b897-69b497b5398e, 3257de69-5499-5a0e-9628-f26fda7bbc69).

### 3. Persons per utm_source (clean, all events since experiment start)

| utm_source | Persons | Counted as a channel |
| :--- | :--- | :--- |
| (none) | 3 | no (direct) |
| personal_network | 17 | yes |
| welcome_email | 1 | no (D-034) |

### 4. Internal, test and unattributed traffic since experiment start

**Excluded as internal/test** (kept out of the raw counts):

| Person | Label | Events | Why excluded | First | Last | Event types |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 9 | internal_event, internal_person, test_user | 2026-11-19 19:46:01 UTC | 2026-11-21 15:08:51 UTC | $pageview, landing_page_viewed, signup_form_started, signup_form_submitted |
| 1681bc92-b4ef-52d5-96c8-c58ee16a40aa | Owner, local QA clicks from localhost:8799 (step 7) | 2 | localhost | 2026-11-19 20:35:57 UTC | 2026-11-19 20:35:57 UTC | channel_link_clicked |
| 66c13370-0e79-5431-927d-52e35920c579 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:07 UTC | 2026-11-20 13:26:07 UTC | channel_link_clicked |
| a1db1b4a-8304-5b09-98c6-98e1c3e6cbf1 | Owner, step 8 local /go/ check (localhost:8799) | 1 | localhost | 2026-11-20 13:26:08 UTC | 2026-11-20 13:26:08 UTC | channel_link_clicked |
| 476d4df1-2c74-58c7-82ea-5e520e91571c | Owner (confirmed): one $pageview on the per-deploy preview URL f6db5f66…, 2026-11-20 13:30 UTC, opened without ?internal=1 | 1 | preview_host | 2026-11-20 13:30:05 UTC | 2026-11-20 13:30:05 UTC | $pageview |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 3 | internal_event | 2026-11-20 13:30:50 UTC | 2026-11-20 13:30:50 UTC | $experiment_exposure, $feature_flag_called, landing_page_viewed |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 12 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:32:31 UTC | 2026-11-20 13:33:46 UTC | $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 14 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:34:55 UTC | 2026-11-20 13:35:51 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 8 | internal_person, test_user, internal_event, preview_host | 2026-11-20 13:36:15 UTC | 2026-11-20 13:37:13 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 10 | internal_person, test_user, internal_event | 2026-11-20 14:46:23 UTC | 2026-11-20 14:47:29 UTC | $pageview, $feature_flag_called, $experiment_exposure, landing_page_viewed, survey shown, survey dismissed |
| d299c033-5d88-5d5e-a299-282436bc7ed7 |  | 11 | internal_event, test_email | 2026-11-21 15:08:51 UTC | 2026-11-21 15:23:48 UTC | survey shown, survey sent, welcome_email_sent, welcome_email_opened, welcome_email_link_clicked, $pageview, $experiment_exposure, $feature_flag_called, landing_page_viewed |

**Unattributed visits** (clean page views with no utm_source, from persons not excluded above):

| Person | Label | First view | Host | Browser / OS |
| :--- | :--- | :--- | :--- | :--- |
| 836fe88c-eb65-5e90-b897-69b497b5398e | Unattributed 1: direct visit, Chrome on Linux, 2026-11-19 19:14 UTC, possibly the owner (unconfirmed), kept | 2026-11-19 19:14:31 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| eb48ecba-e4e1-5170-a5d7-a029762a66da | **UNLABELED** | 2026-11-21 01:35:06 UTC | shiftpatch-concept.pages.dev | Chrome / Windows |
| 3257de69-5499-5a0e-9628-f26fda7bbc69 | **UNLABELED** | 2026-11-21 08:29:04 UTC | shiftpatch-concept.pages.dev | Chrome / Linux |
| 20920abe-cc85-5510-96eb-c26461d73e19 | **UNLABELED** | 2026-11-21 08:34:25 UTC | shiftpatch-concept.pages.dev | Chrome iOS / iOS |

**Clicks with no visit after** (no `landing_page_viewed` from that channel within 10 minutes; likely link previews or prefetches):

| Person | Label | Channel | Time |
| :--- | :--- | :--- | :--- |
| d4ce36f0-c81e-547d-b67b-d45c165a6ce1 | Unknown 1: personal_network click with no page view after it, likely a link preview (unconfirmed) | personal_network | 2026-11-19 23:38:16 UTC |

### 5. Volume-question answers by person

**After launch** (these are what the survey tile and memo read):

| Person | Label | Answers | Test/internal? | First | Last |
| :--- | :--- | :--- | :--- | :--- | :--- |
| f7f85f93-e73b-5c9e-9806-6ff644e50f47 | Friend 1, profile 3 of 3: after Accept (identified, signed up) | 1 | no | 2026-11-20 00:27:43 UTC | 2026-11-20 00:27:43 UTC |
| 56850f68-a988-58a1-bb1c-7d9598e479e8 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:46:33 UTC | 2026-11-20 14:46:33 UTC |
| c5c0d8d4-d47d-5761-9ce4-528ef0ee873c | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:19 UTC | 2026-11-20 14:49:19 UTC |
| 87d66938-3912-5dba-b879-a5b5a2e674e5 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:31 UTC | 2026-11-20 14:49:31 UTC |
| 99ecd560-7927-559d-acc0-c4f88d6ab8f1 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:49:51 UTC | 2026-11-20 14:49:51 UTC |
| 01e2abcf-af7f-5fce-b7c1-1f9e0a6f95f2 | Owner test on iPhone without ?internal=1, 2026-11-20 14:44–14:50 UTC (owner-confirmed; left in, D-045) | 1 | no | 2026-11-20 14:50:24 UTC | 2026-11-20 14:50:24 UTC |
| a3ff6e77-03c1-54d6-86c6-47643d0f76b0 |  | 1 | no | 2026-11-20 15:07:18 UTC | 2026-11-20 15:07:18 UTC |
| d68070ca-0a94-5987-9104-f440a9e7ec99 |  | 1 | no | 2026-11-21 13:50:11 UTC | 2026-11-21 13:50:11 UTC |
| d299c033-5d88-5d5e-a299-282436bc7ed7 |  | 1 | test_email | 2026-11-21 15:08:53 UTC | 2026-11-21 15:08:53 UTC |

**Before launch:** 24 answers from 22 persons (3 with a person record, 19 cookieless with none, which can't be deleted). Read survey results from 2026-11-19 18:00:00 UTC.

### 6. Checks

**a) Internal/test persons whose events slip past the person conditions** (no internal flag at event time):

| Person | Label | Time | Event | Reaches a tile? | Has event property is_internal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| b7b21c2e-c1d0-525e-940c-6e060f49d1b8 | Owner, main profile (is_internal), kept as step-5 evidence | 2026-11-19 19:46:01.076000 | $pageview | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:49.922000 | $pageview | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.018000 | $opt_in | no (not a tile event) | no |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $experiment_exposure | **yes** | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.081000 | $feature_flag_called | no (not a tile event) | yes |
| c6d3e84a-62e8-505e-8de9-c69f12931a3c | Owner, step 8 test 0: reference visit, live site, old code (?internal=1) | 2026-11-20 13:30:50.082000 | landing_page_viewed | **yes** | yes |
| f29dc930-b2ed-5ba0-a7bf-855d6e069d3d | Owner, step 8 test 1: background-tab test on the preview (?internal=1) | 2026-11-20 13:31:51.805000 | $opt_in | no (not a tile event) | no |
| 9fceb1b9-7a19-5c7f-b704-eb71ab1928dd | Owner, step 8 test 2: preview, variant B (?internal=1) | 2026-11-20 13:34:55.237000 | $opt_in | no (not a tile event) | no |
| d1688f5f-3225-5f24-8dfe-a5a2c783f189 | Owner, step 8 test 3: preview, variant A (?internal=1) | 2026-11-20 13:36:15.721000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.435000 | $opt_in | no (not a tile event) | no |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $experiment_exposure | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.599000 | $feature_flag_called | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:23.600000 | landing_page_viewed | **yes** | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:24.989000 | $autocapture | no (not a tile event) | yes |
| 6c686719-86c5-5263-b171-b463312a3646 | Owner, ?internal=1 desktop visit, 2026-11-20 14:46 UTC (step 9) | 2026-11-20 14:46:25.002000 | survey shown | no (not a tile event) | yes |

Caught anyway by the event condition `is_internal` (D-037): 9. Getting through both: 6 (0 on a tile event).

**b) Stored type of the internal flags on person records:**

| is_internal | $internal_or_test_user | Persons |
| :--- | :--- | :--- |
| Bool | Bool | 6 |

**c) `$feature/hero-framing` on page views:** 36 of 38 `landing_page_viewed` (internal included) carry it. 28 followed a flag answer within 60 s; 0 of those are missing it.

**d) Hygiene:**

| Check | Result |
| :--- | :--- |
| Key read from | .env |
| .env exists and is gitignored | yes |
| Labels file has no email address | yes |
| This audit doc has no email address | yes |

### 7. Diff against the previous run

Previous run: 2026-11-21 15:45:08 UTC (after repo cleanup (no site visits; dist identical to main)).

_No number moved._

<!-- audit-json {"runAt":"2026-11-21 16:48:41 UTC","note":"after D-060/D-061 doc edits (no PostHog change, no site visits)","metrics":{"experiment|All signups|control|shown":2,"experiment|All signups|control|raw":2,"experiment|All signups|time|shown":5,"experiment|All signups|time|raw":5,"experiment|Buyer-role signups (D-009 headline)|control|shown":1,"experiment|Buyer-role signups (D-009 headline)|control|raw":1,"experiment|Buyer-role signups (D-009 headline)|time|shown":0,"experiment|Buyer-role signups (D-009 headline)|time|raw":0,"experiment|Volume question answered|control|shown":2,"experiment|Volume question answered|control|raw":2,"experiment|Volume question answered|time|shown":3,"experiment|Volume question answered|time|raw":3,"experiment|exposures|control|shown":6,"experiment|exposures|control|raw":6,"experiment|exposures|time|shown":11,"experiment|exposures|time|raw":11,"d1JCOgLG|step1|(none)|shown":3,"d1JCOgLG|step1|(none)|raw":3,"d1JCOgLG|step1|personal_network|shown":15,"d1JCOgLG|step1|personal_network|raw":15,"d1JCOgLG|step1|welcome_email|shown":1,"d1JCOgLG|step1|welcome_email|raw":1,"d1JCOgLG|step2|personal_network|shown":7,"d1JCOgLG|step2|personal_network|raw":7,"d1JCOgLG|step3|personal_network|shown":7,"d1JCOgLG|step3|personal_network|raw":7,"d1JCOgLG|step4|personal_network|shown":3,"d1JCOgLG|step4|personal_network|raw":3,"dBS4IKQb|Visitors|(none)|shown":3,"dBS4IKQb|Visitors|(none)|raw":3,"dBS4IKQb|Visitors|personal_network|shown":12,"dBS4IKQb|Visitors|personal_network|raw":12,"ZS0Uhz2p|Link clicks|personal_network|shown":10,"ZS0Uhz2p|Link clicks|personal_network|raw":10,"lQ1PbGvG|Respondents|16–30|shown":4,"lQ1PbGvG|Respondents|16–30|raw":4,"lQ1PbGvG|Respondents|5–15|shown":1,"lQ1PbGvG|Respondents|5–15|raw":1,"lQ1PbGvG|Respondents|I don't know|shown":2,"lQ1PbGvG|Respondents|I don't know|raw":2,"lQ1PbGvG|Respondents|More than 60|shown":1,"lQ1PbGvG|Respondents|More than 60|raw":1,"oMvaY0hy|All signups|a|shown":2,"oMvaY0hy|All signups|a|raw":2,"oMvaY0hy|All signups|b|shown":5,"oMvaY0hy|All signups|b|raw":5,"oMvaY0hy|Buyer-role signups|a|shown":1,"oMvaY0hy|Buyer-role signups|a|raw":1,"oMvaY0hy|Visitors|a|shown":4,"oMvaY0hy|Visitors|a|raw":4,"oMvaY0hy|Visitors|b|shown":10,"oMvaY0hy|Visitors|b|raw":10,"d9eeKWIG|Signups|Finance or operations::personal_network|shown":1,"d9eeKWIG|Signups|Finance or operations::personal_network|raw":1,"d9eeKWIG|Signups|Just helping test::personal_network|shown":6,"d9eeKWIG|Signups|Just helping test::personal_network|raw":6,"KK0a37NQ|step1|(none)|shown":3,"KK0a37NQ|step1|(none)|raw":3,"KK0a37NQ|step1|personal_network|shown":15,"KK0a37NQ|step1|personal_network|raw":15,"KK0a37NQ|step1|welcome_email|shown":1,"KK0a37NQ|step1|welcome_email|raw":1,"KK0a37NQ|step2|personal_network|shown":1,"KK0a37NQ|step2|personal_network|raw":1,"KK0a37NQ|step3|personal_network|shown":1,"KK0a37NQ|step3|personal_network|raw":1,"dRTNVtm9|step1|(none)|shown":3,"dRTNVtm9|step1|(none)|raw":3,"dRTNVtm9|step1|personal_network|shown":15,"dRTNVtm9|step1|personal_network|raw":15,"dRTNVtm9|step1|welcome_email|shown":1,"dRTNVtm9|step1|welcome_email|raw":1,"dRTNVtm9|step2|personal_network|shown":7,"dRTNVtm9|step2|personal_network|raw":7,"dRTNVtm9|step3|personal_network|shown":5,"dRTNVtm9|step3|personal_network|raw":5,"variant|control|exposure_events":7,"variant|control|exposed_persons":6,"variant|control|resent":3,"variant|control|signups":2,"variant|control|buyer_signups":1,"variant|time|exposure_events":13,"variant|time|exposed_persons":11,"variant|time|resent":3,"variant|time|signups":6,"variant|time|buyer_signups":0,"flag|called":27,"flag|empty_response":1,"flag|experiment_exposure":26,"flag|fallback_views":2,"persons_by_source|(none)":3,"persons_by_source|personal_network":17,"persons_by_source|welcome_email":1,"test|persons":11,"test|events":72,"unattributed|persons":4,"clicks|total":10,"clicks|no_visit_after":1,"survey|post_launch_persons":9,"survey|post_launch_test_persons":1,"survey|pre_launch_answers":24,"survey|pre_launch_persons":22,"check|filter_leak_events":15,"check|filter_leak_through_both":6,"check|filter_leak_tile_events":0,"check|views_missing_flag_prop":0}} -->

---
