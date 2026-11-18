# Step 4 review: PostHog setup vs. the grading checklist

- **Date:** 2026-11-18. PostHog's clock read 19:17 UTC at the browser tests. This machine's clock runs about 2 hours ahead of PostHog's, so all times below are PostHog event timestamps.
- **Scope:** review only. Nothing in PostHog or the code was changed. The only things added to PostHog are the test events tagged `utm_content = review_test` (listed in "Clean-up list" below).
- **Project:** ShiftPatch, PostHog project 741778 (US). Live site: `https://shiftpatch-concept.pages.dev`, at commit `a018131` on main.
- **Method:** every status below is backed by an MCP call or HogQL query run during this review, a curl against the live site, or a file and line. Nothing is carried over from earlier sessions' reports.

## Summary

| # | Item | Status |
| :-- | :--- | :--- |
| 1 | Every channel has its own UTM-tagged link | PASS |
| 2 | Funnel tracked end to end (visit → signup → survey answer) | PASS (email stages BLOCKED until step 5) |
| 3 | Every event named in a hypothesis exists | PASS |
| 4 | A/B test is a real Experiment with flag and metric | PASS (status: DRAFT) |
| 5 | Event names: snake_case, object_verb, past tense | PASS |
| 6 | Session replay on, `maskAllInputs: true` | PASS (a visual check of a recording is still open) |
| 7a | Hypotheses use the five-slot sentence | FAIL for the A/B hypothesis (none written); PASS for H1–H3 |
| 7b | Each hypothesis names its number | PASS for H1–H3; FAIL for A/B (no hypothesis) |
| 7c | Each hypothesis says where the number lives in PostHog | PARTIAL: the insights H1–H3 point to don't exist yet |
| 7d | No significance claims | PASS |
| DC1 | Page events carry `hero_variant` and UTM tags | PARTIAL: `$pageview` has no `hero_variant` |
| DC2 | Experiment shows exposures for A and B | BLOCKED: experiment is a draft until launch (D-021) |
| A | Experiment is a draft, flag active, launch keeps setup, test filter on | PASS |
| B | Channel click joins the page visit | PASS for declined; FAIL for accepted |
| C | Flag variant stays consistent through consent and signup | PARTIAL: exposure correct, `$feature/hero-framing` wrong afterwards |
| D | Test survey answers traceable and filtered | PARTIAL: all traceable, but survey results don't filter test users |
| V | Flag keys (control/time) match `hero_variant` (a/b) | PARTIAL: 35 events disagree |

---

## Part 1: grading checklist (`docs/grading-checklist.md`)

### 1. Every channel has its own UTM-tagged link: PASS

`curl -s -o /dev/null -w "%{http_code} %{redirect_url}" https://shiftpatch-concept.pages.dev/go/<channel>?c=review_test`:

| Link | HTTP | Redirect target |
| :--- | :--- | :--- |
| `/go/personal_network` | 302 | `/?utm_source=personal_network&utm_medium=referral&utm_campaign=prelaunch-2026-11&utm_content=review_test` |
| `/go/direct_outreach` | 302 | `/?utm_source=direct_outreach&utm_medium=outreach&utm_campaign=prelaunch-2026-11&utm_content=review_test` |
| `/go/linkedin` | 302 | `/?utm_source=linkedin&utm_medium=social&utm_campaign=prelaunch-2026-11&utm_content=review_test` |
| `/go/fonl_annual_2027` | 302 | `/?utm_source=fonl_annual_2027&utm_medium=event&utm_campaign=prelaunch-2026-11&utm_content=review_test` |
| `/go/not_a_channel` (control) | 302 | `/` (no UTM tags, no event) |

- **D-019 and D-020:** the slugs, mediums and campaign match exactly. Defined in `functions/go/[channel].ts:13-18`.
- **Hypotheses:** H1 uses `direct_outreach`, H2 `linkedin`, H3 `fonl_annual_2027`, and the baseline is `personal_network` (`docs/research/traction-channels.md:110,120,130,132`). All match.
- **Each click logs `channel_link_clicked`:** confirmed by HogQL. The 4 curl clicks at 19:16:42–19:16:44 carry `utm_content = review_test`.

### 2. Funnel tracked end to end: PASS (later stages BLOCKED)

HogQL: `SELECT event, count(), max(timestamp), min(timestamp) FROM events WHERE timestamp > now() - INTERVAL 30 DAY GROUP BY event`

| Stage (tracking-plan order) | Event | Count | Last seen (UTC) |
| :--- | :--- | --: | :--- |
| Channel click (server) | `channel_link_clicked` | 9 (before this review's tests) | 16:51:56 |
| Visit | `landing_page_viewed` | 29 | 17:28:59 |
| CTA (optional) | `hero_cta_clicked` | 7 | 15:44:46 |
| Form started | `signup_form_started` | 14 | 17:25:47 |
| Signup | `signup_form_submitted` | 14 | 17:25:50 |
| Survey shown | `survey shown` | 17 | 17:25:50 |
| Survey answer | `survey sent` | 14 | 17:25:53 |
| Consent | `cookie_banner_answered` | 8 | 17:29:16 |
| Exposure | `$feature_flag_called` / `$experiment_exposure` | 25 / 25 | 17:28:59 |
| Identify | `$identify` | 10 | 17:25:50 |
| **Email events (step 5)** | not defined yet | — | **BLOCKED**: the email tool is chosen in step 5 |

`read-data-schema {kind: events}` lists every one of these as seen in the last 30 days.

### 3. Every event named in a hypothesis exists: PASS

| Hypothesis | Events and properties named | In the project? |
| :--- | :--- | :--- |
| H1 direct outreach (`traction-channels.md:104-107`) | `signup_form_submitted`, `landing_page_viewed`, `channel_link_clicked`, `survey sent`; `is_buyer_role`, `utm_source`, `channel` | Yes (item 2 table; properties seen on events in Part 2 queries) |
| H2 LinkedIn (`:114-117`) | `signup_form_submitted`, `channel_link_clicked`; `is_buyer_role`, `utm_source`, `role` | Yes |
| H3 offline events (`:124-127`) | `signup_form_submitted`, `survey sent`, `channel_link_clicked`; `is_buyer_role`, `utm_source`, `channel` | Yes |
| A/B (experiment description) | `signup_form_submitted`, `is_buyer_role` | Yes, but no five-slot A/B hypothesis exists (see 7a) |

### 4. The A/B test is a real Experiment with flag and metric: PASS (status DRAFT)

`experiment-get {id: 612484}`:
- **Experiment:** id `612484`, name "Hero framing: money vs time", `type: product`, **`status: draft`**, `start_date: null`.
- **Flag:** `hero-framing`, id `1099361`, `active: true`. Variants `control` "A: money framing" 50% and `time` "B: time framing" 50%, rollout 100%, `ensure_experience_continuity: false`.
- **Primary metric:** funnel "Buyer-role signups (D-009 headline)": `signup_form_submitted` where `is_buyer_role = "true"`.
- **Secondary metrics:** "All signups" (`signup_form_submitted`), and "Volume question answered" (`signup_form_submitted` → `survey sent` with `$survey_id = 01a1ef17-b69e-0000-336f-3ef067316d59`).
- **Other settings:** `exposure_criteria.filterTestAccounts: true`, `multiple_variant_handling: exclude`, `stats_config.method: bayesian`, `resolved_exposure_event: $experiment_exposure`.

### 5. Event names: PASS

| Event | Type | Rule check |
| :--- | :--- | :--- |
| `landing_page_viewed` | custom | object `landing_page`, verb `viewed` (past) ✓ |
| `hero_cta_clicked` | custom | `hero_cta` + `clicked` ✓ |
| `signup_form_started` | custom | `signup_form` + `started` ✓ |
| `signup_form_submitted` | custom | `signup_form` + `submitted` ✓ |
| `cookie_banner_answered` | custom | `cookie_banner` + `answered` ✓ |
| `channel_link_clicked` | custom (server) | `channel_link` + `clicked` ✓ |
| `$pageview`, `$pageleave`, `$autocapture`, `$web_vitals`, `$identify`, `$set`, `$opt_in`, `$feature_flag_called`, `$experiment_exposure` | PostHog built-in | exempt |
| `survey shown`, `survey sent`, `survey dismissed` | PostHog built-in (survey API contract) | exempt; D-017 notes the spaces |

The 6 custom events are the only non-`$`, non-survey events in the HogQL event list.

### 6. Session replay on with `maskAllInputs: true`: PASS

- **Code:** `src/lib/analytics.ts:27` has `disable_session_recording: true` (no replay before consent). Line 28 has `session_recording: { maskAllInputs: true }`. Lines 38 and 77 call `startSessionRecording()` only when consent is granted or on Accept.
- **Live bundle:** the live site serves `/_astro/analytics.DoUsuZVP.js`, the same file name as the local build, which contains this config.
- **Project (`project-get`):** `session_recording_opt_in: true`. `session_recording_masking_config: null`, so no project-level override and the SDK's `maskAllInputs` applies. `session_recording_retention_period: 30d`.
- **Open:** a visual check that a recording shows masked fields is on the owner's UI checklist.

### 7. Hypothesis format

Format (`docs/grading-checklist.md:9`): "We believe that [action] will result in [outcome], validated by [audience] using [measurement], because [rationale]."

| Hypothesis | 5 slots | Names its number | Where it lives in PostHog | Significance |
| :--- | :--- | :--- | :--- | :--- |
| H1 direct outreach | PASS (`:104`) | PASS: buyer-role signups and rate for `utm_source = direct_outreach` (`:106`) | **PARTIAL**: "the Funnel insight" and "a second Trends insight" (`:107`) don't exist | PASS |
| H2 LinkedIn | PASS (`:114`) | PASS: buyer share of signups and buyer-signup rate for `linkedin` (`:116`) | **PARTIAL**: Funnel and Trends insights (`:117`) don't exist | PASS |
| H3 offline events | PASS (`:124`) | PASS: buyer signups and survey-answer rate for `fonl_annual_2027` (`:126`) | **PARTIAL**: Funnel and Trends insights (`:127`) don't exist | PASS |
| A/B hero framing | **FAIL**: no five-slot sentence exists in `docs/` (grep "We believe" finds only H1–H3 and the template) | **FAIL**: no hypothesis | Experiment 612484 exists | PASS: the experiment description says "directional only, never significant" |

- **Saved insights:** `SELECT id, short_id, name FROM system.insights WHERE deleted = 0` returns only the 9 insights PostHog created with the project (ids 14211702–14211710: Active users, Sessions, Pageviews, DAUs, WAUs, Retention, Top referrers, Users by country, Visit to interaction funnel). None are the hypothesis insights.
- **Significance:** `traction-channels.md:100` says counts and rates are directional only, and grep finds no significance claim.
- **Small inconsistency:** H1's outcome says "at least 2 out of 30 contacted", but the prospect list has 27 rows.

### Step 4 done-check

- **DC1, page events carry `hero_variant` and UTM tags: PARTIAL.**
  - `landing_page_viewed`, `cookie_banner_answered`, `signup_form_started`, `signup_form_submitted`, `survey shown` and `survey sent` all carry `hero_variant` and `utm_*` in the review runs (Part 2 queries).
  - `$pageview` carries the UTM tags but **no `hero_variant`**. It fires at SDK init, before the flag resolves. Its `hero_variant` is null in every review row.
  - The tracking plan says super properties are "on every event".
- **DC2, experiment shows exposures for A and B: BLOCKED.**
  - The experiment is a draft until the 12:00 BRT launch (D-021). A draft has no `start_date`, so it shows no results.
  - At event level, both variants are exposed: `$experiment_exposure` `control` for person `21315687…` and `time` for person `7996e0e1…` in the review runs.

---

## Part 2: four issues, tested

### A. Experiment status: PASS

- **Draft with the flag on:** `status: draft`, `start_date: null`, `end_date: null`. Flag `hero-framing` `active: true`, so the site assigns variants now (verified: the review browsers got `time` and `control` from `/sp/flags`).
- **Test filter:** `exposure_criteria.filterTestAccounts: true` ("filter out internal and test users"). The project test-account filters are cohort `728308` not_in, `$host` not_icontains `localhost` / `127.0.0.1`, and `$pathname` not_icontains `/preview/`.
- **Launching resets nothing.** Per the `experiment-launch` tool definition, launch "activates the feature flag, sets start_date to the current server time, recomputes metric fingerprints, and transitions status from draft to running".
  - Evidence: this experiment has been through reset → launch → reset in this project. `experiment-get` still shows all 3 metrics (same uuids `e501e1bc…`, `01ef5d10…`, `7ecba40d…`), `filterTestAccounts: true`, the same variants and split, and flag version 3. Only the fingerprints changed.
- **Note:** earlier today (results read at about 15:45 UTC), the experiment counted 6 localhost exposures even with the `$host` localhost filter. Only people marked internal by the cohort were reliably excluded. Since `3279670`, localhost visits mark themselves internal (`src/lib/analytics.ts:33-34`), and D-021's launch reset clears the old ones.

### B. Does the channel click join the page visit?

**Setup:** two fresh headless Chrome contexts, each with a distinct desktop user agent. Each opened `https://shiftpatch-concept.pages.dev/go/personal_network?c=review_test`, chose a consent option, and signed up with role "Nurse manager". Script: `review.mjs` in the session scratchpad (not in the repo).

**Identity forwarding:** the function forwards both identity inputs.
- **IP:** read from `cf-connecting-ip`, sent as the `$ip` property and the `x-forwarded-for` header (`functions/go/[channel].ts:33,46,60`).
- **User agent:** sent as `$raw_user_agent` and the `user-agent` header (`:34,47,59`).
- **ID:** the event goes out with `distinct_id: $posthog_cookieless` (`:38`), so PostHog computes the same daily hash as for the browser.

HogQL (events of each `review_test` person, in order):

| Path | `channel_link_clicked` person | `landing_page_viewed` person | `signup_form_submitted` person | Result |
| :--- | :--- | :--- | :--- | :--- |
| Declined ("No thanks") | `7996e0e1-b727-5953-acc8-3620a8013f1b` (19:16:59) | `7996e0e1…` (19:17:02), variant b | `7996e0e1…` (19:17:05) | **PASS: joins** |
| Accepted | `bebd1b91-2112-5a7b-acff-13f7ae8bf7eb` (19:17:08) | `bebd1b91…` (19:17:10), variant a | `21315687-b43a-5945-b27c-dea50908a973` (19:17:13) | **FAIL: breaks at Accept** |

- **Why the accepted path breaks:** on Accept, posthog-js replaces the cookieless ID with a new cookie ID (`$opt_in` on `01a1f01b-cf77-…` at 19:17:11). There's no merge, because the browser never knows the server-side cookieless hash. Everything after Accept (exposure resend, signup, `$identify`) is on `21315687…`.
- **Temporary funnel:** `query-funnel` (not saved) with steps `channel_link_clicked` → `landing_page_viewed` → `signup_form_submitted`, filter `utm_content = review_test`, a 1-hour window and test accounts not filtered:

  | Step | Persons | Conversion |
  | :--- | --: | --: |
  | `channel_link_clicked` | 4 | 100% |
  | `landing_page_viewed` | 2 | 50% |
  | `signup_form_submitted` | 1 | 25% |

  The 4 click persons are the 2 browsers and 2 persons from the 4 curl checks. The curls never load the page. Of the 2 browser paths, declined converts all the way, and accepted stops after `landing_page_viewed`.
- **Side observation:** the 4 curl clicks from one machine landed on 2 cookieless persons (`0af12857…` ×3, `930b5b19…` ×1). The cookieless ID is sensitive to the client IP (for example, IPv4 vs IPv6), so even declined visitors can occasionally split.

### C. Flag persistence through consent and signup: PARTIAL

Accepted-cookies signup (`review_test-accepted@example.com`, final person `21315687…`):

| Time | Event | Person | `hero_variant` | `$feature/hero-framing` |
| :--- | :--- | :--- | :--- | :--- |
| 19:17:10.942 | `$experiment_exposure` (from page load) | `bebd1b91…` (cookieless) | — | `control` |
| 19:17:10.943 | `landing_page_viewed` | `bebd1b91…` | a | control |
| 19:17:11.522 | `$experiment_exposure`, re-sent after Accept (`exposure_resent_after_consent = true`) | `21315687…` | a | control |
| 19:17:13.045 | `signup_form_started` | `21315687…` | a | **time** |
| 19:17:13.760 | `signup_form_submitted` | `21315687…` | a | **time** |
| 19:17:13.771 | `$identify` | `21315687…` | a | **time** |

- **Exposed to both variants? No.** The final person has one exposure (`control`), which matches the hero shown (A), so the experiment credits the signup to A. The browser saw `/sp/flags` answer `control`, then `time` (new cookie ID), then `control` (after identify).
- **But** `signup_form_submitted` and later events carry `$feature/hero-framing = time`. The override in `src/lib/analytics.ts:68` doesn't survive the flag reload after opt-in.
- **Experiment metric:** correct, because it attributes by exposure.
- **Insights broken down by `$feature/hero-framing`:** wrong for accepters. `hero_variant` is right.
- **Also:** the accepter is counted twice in exposures, as the cookieless person (`bebd1b91…`, no conversion) and the new person (`21315687…`). It's random across variants, so it dilutes both rates equally rather than biasing one.
- **Persistence:** `ensure_experience_continuity: false`. Turning it on would cover identify, but not the consent switch, which creates a new anonymous ID.

### D. Test survey answers: PARTIAL

`survey-stats {id: 01a1ef17-b69e-0000-336f-3ef067316d59}` reports `survey sent` 11, from 10 unique persons, since the survey start at 14:45 UTC. The distribution is "5–15" 6, "31–60" 4, "I don't know" 1. **All of them are test answers, so the survey results don't apply the internal/test filter.** (The survey-stats tool has no test-account option. HogQL finds 14 `survey sent` events in total, 3 of them before the survey start.)

Every answer is traceable (HogQL joining `survey sent` to persons):

| # | Time (UTC) | Person id | Who | Host | Internal on the person? |
| --: | :--- | :--- | :--- | :--- | :--- |
| 1 | 14:40:32 | `b999f23d-8b86-5a7d-8423-ac39d8c1956d` | spike test (no email) | localhost | `$internal_or_test_user` = true |
| 2–4 | 14:42:26, 14:45:13, 14:47:03 | `ad631431-e978-5485-bed0-817ca766892a` | consent tests (declined; email property overwritten to `consent3-declined@example.com`) | localhost | `$internal_or_test_user` = true |
| 5 | 14:42:32 | `719c67f7-440e-5ca3-bb53-fae1548dbc71` | `consent1-accepted@example.com` | localhost | **no** (only the `$host` filter catches it) |
| 6 | 14:45:20 | `ad585515-d65c-5df7-a142-bf4c26f1fd8b` | `consent2-accepted@example.com` | localhost | **no** |
| 7 | 14:47:09 | `57de81d2-0ceb-5df5-92f1-fd698a784e5e` | `consent3-accepted@example.com` | localhost | **no** |
| 8–13 | 15:44:18–15:44:47 | `40bb40e1…`, `4fd1c644…`, `5b6e2f30…`, `a54e9533…`, `9b364c15…`, `9ae13b69…` | `qa-internal-0` … `qa-internal-5@example.com` | live | yes (`is_internal`, `$internal_or_test_user`) |
| 14 | 17:25:53 | `7e42d0b7-f697-555e-b307-c1d034045e7c` | the owner's own test signup (`utm_content = test`) | live | yes |

Step 6d can remove all 14 by person id. The review's own runs answered no survey questions.

### V. Flag keys vs `hero_variant`: PARTIAL

HogQL: `hero_variant × $feature/hero-framing` over the last day (excluding `/preview/`):

| `hero_variant` | `$feature/hero-framing` | Events |
| :--- | :--- | --: |
| a | control | 143 |
| b | time | 149 |
| a | time | **24** |
| b | control | **11** |

- **Consistent:** every `$feature_flag_called`, `$experiment_exposure` and `landing_page_viewed` row is in a matching pair (`a`↔`control`, `b`↔`time`).
- **Mismatches:** the 35 mismatched events are all after Accept or after `identify()` (`signup_form_started`, `signup_form_submitted`, `$identify`, `survey shown`, `survey sent`, `$autocapture`, `$web_vitals`, `$pageleave`).
- **Conclusion:** A/B reads the same in the experiment and in anything broken down by `hero_variant`. It doesn't in anything broken down by `$feature/hero-framing`.

---

## FAIL and PARTIAL items, with recommended fixes (owner decides)

1. **7a/7b: no A/B hypothesis in the five-slot format (FAIL).**
   - **Recommended:** Claude drafts one sentence from D-001/D-009 for the owner to approve, and adds it to `docs/decisions.md` (or a hypotheses doc), naming "Buyer-role signups (D-009 headline)" in experiment 612484 as its number and location. No PostHog change.
2. **7c: the insights the hypotheses point to don't exist (PARTIAL).**
   - **Recommended:** create and save them, all with `date_from = 2026-11-19T15:00:00Z` (D-021):
     - a Funnel `landing_page_viewed` → `signup_form_submitted` (`is_buyer_role = true`), broken down by `utm_source`, with a third step `survey sent`;
     - a Trends `channel_link_clicked` broken down by `channel`;
     - a Trends `signup_form_submitted` broken down by `role`.
   - Alternative: leave it to step 6.
3. **B: the channel click doesn't join the signup for visitors who accept cookies (FAIL).**
   - **(a) Recommended: start channel funnels at `landing_page_viewed` broken down by `utm_source`, and read `channel_link_clicked` on its own (Trends by `channel`).** This is already how H1–H3 are written, needs no code change, and the UTM tags survive Accept.
     - Trade-off: you can't measure click → visit drop-off per person, only as aggregate counts.
   - (b) Pass a click ID through the redirect: the function adds `?cid=<uuid>`, puts it on `channel_link_clicked`, and the browser registers it as a super property. A HogQL query joins them by `cid`.
     - Trade-off: a code change and a new property (a tracking-plan decision), and the join only works in SQL, not in a standard funnel.
   - (c) Accept the gap and report accepted-cookie visitors separately.
     - Trade-off: no work, but channel funnels undercount whoever clicks Accept.
4. **C and V: `$feature/hero-framing` flips after Accept or signup (PARTIAL).**
   - **(a) Recommended: treat `hero_variant` as the source of truth for any A/B breakdown outside the experiment, and say so in the tracking plan.** The experiment already attributes correctly by exposure.
     - Trade-off: no code change. PostHog's own `$feature/…` property stays unreliable for accepters.
   - (b) Code fix: re-apply the override in an `onFeatureFlags` callback, so it survives the reload after opt-in and identify. Then re-test.
     - Trade-off: a small code change, and it relies on posthog-js override behaviour.
   - (c) Turn on `ensure_experience_continuity`.
     - Trade-off: it only covers `identify()`, not the consent switch, and adds flag-evaluation latency. It doesn't fix this alone.
5. **D: survey results include test answers (PARTIAL).**
   - **Recommended:** read survey results from `date_from = 2026-11-19T15:00:00Z` (survey-stats supports `date_from`), and have step 6d delete the 14 test persons listed above.
   - Optional: mark persons 5–7 (`consent1/2/3-accepted`) internal now, since only the `$host` filter catches them.
6. **DC1: `$pageview` has no `hero_variant` (PARTIAL).**
   - **Recommended:** accept it, and use `landing_page_viewed` (which has it) for any variant split.
   - Alternative: turn off auto pageview and capture `$pageview` manually after the variant resolves. Trade-off: a code change, and Web analytics would miss page views from visitors whose flags never load.
7. **Note (no status): the `$host` localhost test filter didn't exclude localhost exposures from the experiment** (observed earlier today).
   - **Recommended:** keep the current setup. Localhost now marks itself internal, and D-021's launch reset clears the old data.

## Clean-up list: `review_test` people (delete only after the owner approves)

| Person id | What |
| :--- | :--- |
| `0af12857-5891-52d9-a2f3-8cdaea6621f3` | 3 curl `channel_link_clicked` (personal_network, direct_outreach, linkedin) |
| `930b5b19-1833-50ad-b01f-23d9c1e0aae1` | 1 curl `channel_link_clicked` (fonl_annual_2027) |
| `7996e0e1-b727-5953-acc8-3620a8013f1b` | declined path (signup `review_test-declined@example.com`) |
| `bebd1b91-2112-5a7b-acff-13f7ae8bf7eb` | accepted path, cookieless part (click, page view, exposure) |
| `21315687-b43a-5945-b27c-dea50908a973` | accepted path after Accept (`review_test-accepted@example.com`) |
| `8ade64ce-f2c8-5a5d-adbb-12408e711937` | retest, declined path (`review_test2-declined@example.com`) |
| `4238e3f9-4d09-5621-9767-8ce45cebdabc` | retest, accepted path, cookieless part |
| `17171767-935f-590a-8076-5e3e58875423` | retest, accepted path after Accept (`review_test2-accepted@example.com`) |

## Resolution (owner decisions, D-022)

| Item | Decision | What was done | Status now |
| :--- | :--- | :--- | :--- |
| 7a/7b A/B hypothesis | Owner wrote it | Added to `docs/decisions.md` (D-022) in the five-slot format, naming experiment 612484's primary metric | PASS |
| 7c Insights | Create them | 6 saved insights, all from 2026-11-19 15:00 UTC with test accounts filtered: `opzPWguM`, `KK0a37NQ`, `ZS0Uhz2p`, `d9eeKWIG`, `oMvaY0hy`, `lQ1PbGvG` (listed in `docs/tracking-plan.md`) | PASS |
| B Channel join | Read by `utm_source`; retest | **Retest finding:** a funnel starting at `landing_page_viewed` also drops accepters, because the page view stays on the cookieless person. The headline channel number is now a rate from unique people per event (`opzPWguM`). See the retest below. | PASS (known limit documented) |
| C/V Flag property | `hero_variant` is the source of truth | Documented in the tracking plan; A/B cross-check insight `oMvaY0hy` uses `hero_variant` | PASS (known limit documented) |
| D Survey test answers | Read from launch; delete in 6d | Survey insight `lQ1PbGvG` starts at launch; 14 persons listed above for 6d | PASS for launch reads; deletion pending 6d |
| DC1 `$pageview` | Accept | Documented in the tracking plan | Accepted |

**Retest (`utm_content = review_test2`, two fresh browsers, both via `/go/personal_network`):**
- **Declined:** `channel_link_clicked`, `landing_page_viewed`, `cookie_banner_answered`, `signup_form_started` and `signup_form_submitted` are all on person `8ade64ce…`, all with `utm_source = personal_network`.
- **Accepted:** `channel_link_clicked` and `landing_page_viewed` are on `4238e3f9…` (cookieless). The re-sent exposure, `cookie_banner_answered`, `signup_form_started`, `signup_form_submitted`, `survey shown` and `$identify` are on `17171767…`. Every one of those events keeps `utm_source = personal_network`, `utm_content = review_test2` and `hero_variant = a`. `$feature/hero-framing` flips to `time` from `signup_form_started` on (D-022).
- **Rate query** (the shape of `opzPWguM`, filtered to `review_test2`): Visitors 2, Buyer-role signups 2, so both signups are counted. A per-person funnel would show 1 of 2.

## Final status (step 4 close-out, D-023)

| # | Item | Final status | Closed by |
| :-- | :--- | :--- | :--- |
| 1 | Channel UTM links | PASS | — |
| 2 | Funnel end to end | PASS for visit → signup → survey; **BLOCKED** for email events | **Step 5** (email events) |
| 3 | Hypothesis events exist | PASS | — |
| 4 | Experiment object | PASS (draft by design, D-021) | — |
| 5 | Event names | PASS | — |
| 6 | Session replay + `maskAllInputs` | PASS (the owner's visual check of a recording is still open) | — |
| 7a/7b | Five-slot hypotheses, number named | PASS (A/B hypothesis added, D-022) | — |
| 7c | Where the number lives | PASS (6 saved insights) | — |
| 7d | No significance claims | PASS | — |
| DC1 | Page events carry variant and UTM tags | PASS with a documented exception (`$pageview` has no `hero_variant`, D-022) | — |
| DC2 | Exposures for A and B | **BLOCKED** | **Launch at share time** (2026-11-19 12:00 BRT, right before the `personal_network` link goes out) |
| A | Draft, flag on, launch keeps setup | PASS | — |
| B | Channel click joins the visit | PASS for declined; known limitation for accepted (D-023) | — |
| C/V | Variant consistency | Known limitation: `hero_variant` is the source of truth (D-022) | — |
| D | Test survey answers | **BLOCKED** for clean-up | **Step 6d** (delete test persons and test survey answers before launch) |

**Test data clean-up so far:**
- The 2 identified review people (`review_test-accepted`, `review_test2-accepted`) are deleted, with their events and recordings.
- The 6 cookieless review visitors have no person record, so PostHog's person delete can't remove their events (persons-bulk-delete found 0 by person id or distinct id). Those events are dated before the launch, so every launch insight and the experiment leave them out.
- The 14 test survey answers are still there for 6d.

## Queries used (HogQL unless noted)

- Event inventory: `SELECT event, count(), max(timestamp), min(timestamp) FROM events WHERE timestamp > now() - INTERVAL 30 DAY GROUP BY event`
- Saved insights: `SELECT id, short_id, name, saved, deleted, created_at FROM system.insights WHERE deleted = 0`
- Review trail: `SELECT event, distinct_id, person_id, properties.hero_variant, properties.$feature/hero-framing, properties.$feature_flag_response, properties.exposure_resent_after_consent, timestamp FROM events WHERE timestamp > now() - INTERVAL 30 MINUTE AND person_id IN (SELECT person_id FROM events WHERE … utm_content = 'review_test')`
- Survey trace: `SELECT … FROM events e LEFT JOIN persons p ON p.id = e.person_id WHERE e.event = 'survey sent' AND e.properties.$survey_id = '01a1ef17-b69e-0000-336f-3ef067316d59'`
- Variant cross-tab: `SELECT properties.hero_variant, properties.$feature/hero-framing, count(), groupUniqArray(event) FROM events WHERE timestamp > now() - INTERVAL 1 DAY AND hero_variant set AND $pathname NOT LIKE '/preview/%' GROUP BY 1, 2`
- MCP: `experiment-get 612484`, `project-get`, `read-data-schema {kind: events}`, `survey-stats` (with per-question stats), `query-funnel` (temporary, not saved)
