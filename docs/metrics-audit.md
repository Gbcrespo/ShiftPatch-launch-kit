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
