# Paid campaign spec: LinkedIn Sponsored Content (step 7, phase 2)

Status: written, not run. Nothing is bought. ShiftPatch is a pre-launch concept and nothing is built. This spec follows the owner's decisions in D-028, which picked option A from `docs/gtm/paid-options.md`. Web sources were accessed on 2026-11-19. Cost figures marked "vendor blog" are national or global estimates, not LinkedIn prices.

## At a glance

| Item | Value |
| :--- | :--- |
| Platform | LinkedIn Sponsored Content, single image |
| Objective | Website visits. No Lead Gen Forms (D-028) |
| Audience | Florida (state) AND D-009 buyer job titles AND hospital industry |
| Budget | $750 lifetime cap, about $250 a week for 3 weeks |
| Start | Only after the hero A/B test is read for the memo (D-028) |
| Link | `/go/linkedin_ads?c=adNN`: `utm_source=linkedin_ads`, `utm_medium=paid_social`, `utm_campaign=prelaunch-2026-11` (approved in D-028) |
| The one metric | Buyer-signup rate per visitor for `utm_source = linkedin_ads`, in insight `opzPWguM` |
| Tracking | `/go/` link and UTMs only. No LinkedIn Insight Tag (D-028) |

---

## 1. Audience

### Targeting facets

All facets below are listed on [LinkedIn Help, Targeting options for LinkedIn Ads (a424655)](https://www.linkedin.com/help/linkedin/answer/a424655). Selections combine with OR inside a category and AND across categories ([LinkedIn Help, a417950](https://www.linkedin.com/help/lms/answer/a417950), seen in search summary).

| Facet | Setting | Why |
| :--- | :--- | :--- |
| Location | Florida, United States (state level) | D-015. LinkedIn lists "state" as a location level |
| Location type | Permanent (profile) location, if state level is offered there | Reaches people based in Florida, not just visitors passing through. See verify item 2 |
| Job titles (OR) | Chief Nursing Officer; Chief Nursing Executive; Associate Chief Nursing Officer; Assistant Chief Nursing Officer; Vice President Patient Care Services; Director of Nursing; Nurse Manager; Staffing Coordinator; Staffing Manager; Scheduling Coordinator; Nursing Staffing Office Manager; Float Pool Manager; Director of Finance; Director of Operations | The D-009 buyer roles, using the title wording from `docs/research/target-customer.md` section 1. Pick each title from the typeahead so LinkedIn uses its standard version (a424655) |
| Company industry | Hospitals and Health Care (or the closest hospital industry LinkedIn offers) | D-028. Keeps out finance and operations directors outside hospitals |
| Company size | Not set | Keeps the audience from getting too small. LinkedIn suggests starting with two or three facets (a417950) |
| Exclusions | None at first | Same reason. Non-buyers who get through are separated out in reporting by `is_buyer_role` |
| Audience expansion / predictive audiences | Off | Expansion would reach people outside the titles and state (a424655 says predictive audiences "help expand your ad set's reach") |

### Verify in Campaign Manager before anything else (logged in)

1. **Forecast size.** LinkedIn shows the estimated audience on the right of the targeting screen (a424655). **Under 300 members: stop.** The campaign can't run as written ("The minimum audience size required to run an ad set is 300 member accounts", a424655), so it goes back to the owner (D-028). LinkedIn recommends 50,000+ for single image ads ([LinkedIn audience page](https://business.linkedin.com/advertise/ads/audience)). A smaller Florida audience can still run, but expect LinkedIn to flag it. Note the forecast number and date in the open items below.
2. **State level.** Check whether permanent (profile) location offers Florida as a state. The help page lists state under recent location only. If permanent location has no state option, use recent location and note it.
3. **Industry name.** Note the exact industry label LinkedIn offers.
4. **Expansion off.** Check that audience expansion and predictive audiences are off before saving.
5. **Suggested bid.** Note LinkedIn's suggested CPC range for this audience. The planning range in `paid-options.md` is $5.00 to $12.40 (vendor blogs). If LinkedIn suggests much more, the click estimates below are too high.
6. **Ad specs.** Check the current character limits for intro text and headline, and which CTA buttons are offered. These weren't fetched from a LinkedIn page in this pass. The copy below is short on purpose.

---

## 2. Creative

The copy follows CLAUDE.md "Copy voice and honesty":

- It says "concept" and "nothing is built yet".
- It describes the idea only conditionally, and only with the D-010 claim (nurses come from the hospital's own staff and float pool).
- It doesn't favor money or time.
- It asks for a look at the page.
- Every number has its source named.
- No exclamation marks, hashtags, emoji or hype words.

Ads are signed "Gabriel", the same as the LinkedIn posts.

Graphics come from the reusable template `design/social-graphic/template.html`. It always shows the "Pre-launch concept" label and "An idea, not a product". Render one PNG per ad from the repo root in PowerShell (see `design/social-graphic/README.md`). Chrome is needed.

LinkedIn's CTA button: use **Learn more** if offered (verify item 6). It's the closest to "have a look", and it doesn't promise a signup or a product.

### ad01: the question

- **Link:** `https://shiftpatch-concept.pages.dev/go/linkedin_ads?c=ad01`
- **Intro text:**
  > I'm testing an idea about short-notice nursing shifts in Florida hospitals. It's a pre-launch concept, and nothing is built yet. If you lead nursing or staffing, I'd like your honest view. The page is short and asks one question. Gabriel
- **Headline:** A concept for short-notice shifts. Tell me where it's wrong.
- **CTA:** Learn more
- **Graphic:**

      .\design\social-graphic\render.ps1 -Headline "When a shift opens with little warning, what happens first?" -Source "A question I'm testing. ShiftPatch is a pre-launch concept." -Out docs\gtm\assets\ad01.png

- **Sources:** none (no facts used)

### ad02: the idea, stated conditionally

- **Link:** `https://shiftpatch-concept.pages.dev/go/linkedin_ads?c=ad02`
- **Intro text:**
  > Here's the idea. When a shift opens at short notice, it would be filled from the hospital's own staff and float pool. That's all it is so far: a concept on one page. Nothing is built. I'm asking Florida nurse and staffing leaders whether it's worth building. Gabriel
- **Headline:** Your own staff and float pool, first. Worth building?
- **CTA:** Learn more
- **Graphic:**

      .\design\social-graphic\render.ps1 -Headline "Could your own staff and float pool cover the next open shift?" -Source "An idea I'm testing. Nothing is built yet." -Out docs\gtm\assets\ad02.png

- **Sources:** the only product claim is D-010 (own staff and float pool), the same wording as the landing page's "How it would work".

### ad03: one sourced Florida fact

- **Link:** `https://shiftpatch-concept.pages.dev/go/linkedin_ads?c=ad03`
- **Intro text:**
  > Florida hospitals reported RN vacancy at 10% in 2025, down from 21% in 2022 (FHA workforce report, via The Capitolist, 2026-01-23). So I'm curious. Do shifts still open at short notice where you work? I'm testing a concept about that. Nothing is built yet. Gabriel
- **Headline:** RN vacancy is down in Florida. Are short-notice shifts?
- **CTA:** Learn more
- **Graphic:**

      .\design\social-graphic\render.ps1 -Headline "RN vacancy in Florida fell from 21% to 10%. Do shifts still open at short notice?" -Source "Source: FHA workforce report, via The Capitolist, 2026-01-23" -Out docs\gtm\assets\ad03.png

- **Source:** `docs/research/target-customer.md` section 4, citing [The Capitolist, 2026-01-23](https://thecapitolist.com/florida-hospitals-add-jobs-and-ease-nurse-shortages-but-retention-challenges-remain/). The figure is a Florida statewide number from 132 FHA member hospitals (about 48% of beds). It doesn't describe any one hospital.

### Neutral-pain check

| Ad | Mentions money (overtime, agency spend, cost) | Mentions time (phoning around, hours) | Result |
| :--- | :--- | :--- | :--- |
| ad01 | no | no | neutral |
| ad02 | no | no | neutral |
| ad03 | no | no | neutral (vacancy is a workforce figure, not a cost or time figure) |

### Rotation

Run all three in one campaign. If Campaign Manager offers even rotation, use it, so each ad gets a fair share early on (verify). `utm_content` (`ad01` to `ad03`) shows which ad brought each visit.

---

## 3. Budget, schedule, stop rules

### Budget

LinkedIn's minimums are $10 a day and $100 lifetime for a new campaign ([LinkedIn, Maximize your budget](https://business.linkedin.com/advertise/ads/best-practices/maximize-your-budget)). This plan is above both.

| Week | Planned spend | Cumulative (must not exceed) | Clicks at $12.40 to $5.00 CPC (planning range, vendor blogs) |
| :--- | :--- | :--- | :--- |
| 1 | about $250 | $250 | about 20 to 50 |
| 2 | about $250 | $500 | about 20 to 50 |
| 3 | about $250 | $750 | about 20 to 50 |
| **Total** | **$750** | **$750 lifetime cap** | **about 60 to 150** |

- Set a **lifetime budget of $750** with a 21-day schedule, not a daily budget alone. Vendor sources disagree on how far one day can overspend a daily budget (20% to 100%), and none of them was confirmed on a LinkedIn page. A lifetime cap stops the total either way.
- **Bidding:** if a cost cap or manual CPC is offered, cap it at $12.40, the top of the planning range. Otherwise use LinkedIn's default and watch week 1's CPC.
- Clicks are spend ÷ CPC, rounded. They are not visitors or signups, and no conversion rate is assumed.

### Schedule

- **Rule (D-028):** the campaign starts only after the hero A/B test has been read for the memo. Ad clicks must not land in the experiment's sample.
- **Before the start:** freeze the memo's A/B numbers with an end date, so later paid visits can't change them. Paid visitors still land on `/`, where the `hero-framing` flag keeps splitting traffic 50/50 (see open items).
- **Start day:** the first Monday after the A/B read. Run 21 days, Monday to Sunday three times.
- **Example only, not a chosen date:** if the A/B were read on Friday 2027-01-08, the campaign would run Monday 2027-01-11 to Sunday 2027-01-31. The real dates depend on when the memo read happens.
- **Overlap with organic:** the LinkedIn organic posts run 23 Nov to 3 Dec 2026 (D-027). If they are posted, they will be over before any start date that follows the A/B read. Either way, the two are separate rows (`linkedin` vs `linkedin_ads`).

### Stop rules

| When | What happens |
| :--- | :--- |
| Forecast under 300 members | Don't launch. Back to the owner (D-028) |
| An ad is rejected | Fix the wording only. Never add a claim to get approval. If the fix would change what the ad says ShiftPatch is, ask the owner |
| End of day 2: LinkedIn reports clicks, but `channel_link_clicked` for `channel = linkedin_ads` shows none (insight `ZS0Uhz2p`) | Pause. The link or redirect is broken. Fix it, then resume |
| End of week 1: CPC above $12.40 | Review with the owner: keep going at fewer clicks, or stop. Not an automatic stop |
| A comment, message or report says the ad reads as a real product | Pause that ad and review the wording with the owner |
| $750 spent, or day 21 reached | Campaign ends. No extension without a new owner decision |

None of these rules uses the signup rate. With 60 to 150 clicks, the rate is directional only and isn't a reason to stop early or keep going.

---

## 4. The one metric

**Buyer-signup rate per visitor for `utm_source = linkedin_ads`**, read in the saved insight **`opzPWguM`, "Channels: buyer-signup rate per visitor (by utm_source)"** (`docs/tracking-plan.md`). It is unique people with `signup_form_submitted` where `is_buyer_role = true`, divided by unique people with `landing_page_viewed`, broken down by `utm_source` (D-022). Read it with the date range set to the campaign's 21 days, and don't save changes to the shared insight.

**Secondary (a click count, not a goal):** `channel_link_clicked` for `channel = linkedin_ads`, in insight **`ZS0Uhz2p`, "Channels: link clicks (by channel)"**. It confirms the link works and gives a cross-check against LinkedIn's own click count. The two won't match exactly: LinkedIn may count clicks that never reach the server, and the server counts every request.

Both events and both insights are in `docs/tracking-plan.md`. No new event or insight is needed.

Report counts and rates as directional. No significance claims (`docs/grading-checklist.md`).

---

## 5. Hypothesis

> We believe that **showing Florida hospital nursing, staffing and finance or operations leaders a LinkedIn Sponsored Content ad that calls ShiftPatch a concept and asks for a look at the page, through `/go/linkedin_ads`** will result in **a buyer-signup rate per visitor for `utm_source = linkedin_ads` at least as high as the rate for `utm_source = linkedin` (organic)**, validated by **Florida hospital leaders with D-009 buyer titles who click the ad during its 21 days**, using **the buyer-signup rate per visitor (`signup_form_submitted` with `is_buyer_role = true` ÷ `landing_page_viewed`, unique people) in PostHog insight `opzPWguM`, broken down by `utm_source`, with `channel_link_clicked` in insight `ZS0Uhz2p` as the click count**, because **LinkedIn ads can target by job title and US state ([a424655](https://www.linkedin.com/help/linkedin/answer/a424655)), so more of the people who click should hold buyer roles than with organic posts, which reach whoever happens to see them (an assumption to test)**.

- **The number it moves:** buyer-signup rate per visitor, `utm_source = linkedin_ads`.
- **Where it lives:** PostHog insight `opzPWguM` (and `ZS0Uhz2p` for clicks).
- **How it is read:** directional only. At about 60 to 150 clicks, a difference between `linkedin_ads` and `linkedin` is a hint, not a result. If organic LinkedIn wasn't posted, compare with `personal_network` instead and say so.

---

## 6. Policy notes

From [LinkedIn's Advertising Policies](https://members.linkedin.com/legal/ads-policy) (last revised 2025-11-18):

- **"Your product or service must accurately match the content of your ad."** Each ad says "concept" and "nothing is built yet", and so does the page. The only product description is the conditional D-010 claim.
- **"Any claims in your ad must have factual support."** ad03's one number is sourced in the ad text itself. ad01 and ad02 contain no facts.
- **"The domain of your Display URL must match the domain of your Destination URL."** The ad links to `shiftpatch-concept.pages.dev/go/linkedin_ads`, which redirects (302) to `shiftpatch-concept.pages.dev/` on the same domain. The display URL should be `shiftpatch-concept.pages.dev`.
- **"All members must be sent to the same destination URL and landing page from a click on your ad."** Every click lands on `/`. The hero has two variants, but the destination URL and page are the same. This is my reading; LinkedIn review may see it differently (open item).
- **"Do not send members to a landing page that generates a pop-up."** The consent banner is a fixed bar along the bottom of the page (`src/components/ConsentBanner.astro`: `position: fixed`, bottom edge, no overlay). It doesn't block the page, so I read it as a banner, not a pop-up. **This is my reading, not a LinkedIn ruling.** If review rejects it, the fix is a page change, which is an owner decision.
- **"Do not use tracking cookies to track users across sites without full disclosure and consent."** No Insight Tag is added (D-028). LinkedIn reports clicks and impressions from its own side. Visits are measured only by PostHog under the existing consent setup.
- **Health matters:** LinkedIn "reserves the right to restrict advertising related to any health matter". These ads make no health claims and don't promote treatment, but review may take longer.
- **Query parameters:** the `/go` function passes on only `c` (as `utm_content`). Any other parameters LinkedIn adds to the click URL are dropped by the redirect (`functions/go/[channel].ts`).

---

## 7. Open items (owner)

1. **Forecast result:** audience size and suggested bid from Campaign Manager. Not yet run (needs a logged-in ad account).
2. **Which LinkedIn Page runs the ads.** Sponsored Content runs from a LinkedIn Page. A ShiftPatch Page would have to say "pre-launch concept" in its name area or tagline. Running the signer's own posts as ads may also be possible; not researched here.
3. **Freezing the A/B read:** the date the memo's experiment numbers end, and whether the experiment is stopped or left running while paid traffic arrives.
4. **Real start date,** once the A/B read date is known.
5. **Ad specs** (verify item 6): character limits and CTA options.
6. **Rendering:** the three PNGs (`ad01.png` to `ad03.png`) aren't rendered yet. The commands are above.
7. **Consent bar vs "pop-up":** confirmed only if LinkedIn's review approves the ads.
8. **Ad account billing:** spending needs an ad account with a payment method. Not set up; nothing is bought.

---

## Log

- **Agent:** Agent C, phase 2
- **Model:** Opus 5.5 (claude-opus-5-5)
- **Start (UTC, `date -u`):** Thu, Nov 19, 2026  8:35:42 PM
- **End (UTC, `date -u`):** Thu, Nov 19, 2026  8:37:39 PM
- **Task:** Write the LinkedIn Sponsored Content campaign spec for the owner's choice in D-028: audience, creative, budget, schedule, stop rules, one metric, one hypothesis, policy notes, open items.
- **Method:** Read D-028, `design/social-graphic/README.md`, `render.ps1` and `template.html` (default label and source text), `functions/go/[channel].ts` (confirmed the `linkedin_ads` entry with `paid_social`), the first part of `docs/gtm/linkedin-posts.md` (for the organic dates and signer placeholder), `docs/tracking-plan.md` (insights and events), and `docs/research/target-customer.md` (titles and the vacancy figure). Reused the LinkedIn sources fetched in phase 1. Checked each ad against the CLAUDE.md voice rules and the neutral-pain rule.
- **Sources:** [LinkedIn Help a424655](https://www.linkedin.com/help/linkedin/answer/a424655); [LinkedIn Help a423690](https://www.linkedin.com/help/lms/answer/a423690); [LinkedIn audience page](https://business.linkedin.com/advertise/ads/audience); [LinkedIn, Maximize your budget](https://business.linkedin.com/advertise/ads/best-practices/maximize-your-budget); [LinkedIn Advertising Policies](https://members.linkedin.com/legal/ads-policy); LinkedIn Help a417950 (search summary); [The Capitolist, 2026-01-23](https://thecapitolist.com/florida-hospitals-add-jobs-and-ease-nurse-shortages-but-retention-challenges-remain/) via `target-customer.md`; vendor-blog CPC range from `paid-options.md` ([Stackmatix](https://www.stackmatix.com/blog/linkedin-ads-cost), [Webtonic](https://www.webtonic.io/blog/health-wellness-linkedin-ads-statistics)). All accessed 2026-11-19.
- **Kept:** the phase 1 targeting, budget and policy findings; the D-009 titles in the wording `target-customer.md` uses; one sourced Florida number (vacancy 21% to 10%).
- **Dropped and why:**
  - The "67% of 13,657 RN departures within 24 months" figure: `traction-channels.md` marks it unverified on the FHA page.
  - Overtime and agency figures (Jackson Health, FHA cost growth): they lean toward money and would tilt the A/B test.
  - The phoning-around pain: unsourced, and it leans toward time.
  - The `d9eeKWIG` signups-by-role insight as a metric: the brief asks for one metric.
  - Character limits and CTA lists: not fetched from LinkedIn, so they are left as verify items, not stated.
- **Known gaps:**
  - No audience forecast or LinkedIn bid suggestion (needs a logged-in account).
  - Permanent-location state targeting not confirmed.
  - Ad specs and even rotation not confirmed on a LinkedIn page.
  - Which LinkedIn Page runs the ads is undecided.
  - The memo's A/B read date is unknown, so the schedule is relative, with an example only.
  - The consent-bar reading is unconfirmed.
- **Output files:** C:\Users\Gabriel\Downloads\ShiftPatch Repo\shiftpatch-launch-kit\docs\gtm\paid-campaign-spec.md
