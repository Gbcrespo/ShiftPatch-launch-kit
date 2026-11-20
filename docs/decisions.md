# Decisions

Each entry records what was decided, by whom, and why. Newest at the bottom.

## D-001: A/B test the hero on money vs. time framing

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Decision:** The A/B test changes only the hero framing.
  - **Variant A (money):** cost savings, meaning less overtime and agency spend on short-notice shifts.
  - **Variant B (time):** time savings, meaning no more phoning around to fill shifts.
  - Everything else on the page is identical across variants.
- **Success metric:** `signup_form_submitted` (refined by D-009: buyer-role signups are the headline number)
- **Reason:** It shows which pain buyers act on. That sets the go-to-market focus (ops vs. finance angle, pitch, ROI story).
- **Ruled out:** Testing price. The cheaper option always wins, and a free signup can't measure willingness to pay.

## D-002: Privacy policy, consent, and retention

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Policy discloses:** form fields, PostHog analytics, session replay with masked inputs, the email tool, purpose, retention and deletion, and the ShiftPatch Gmail as contact.
- **Policy is linked from:** the footer, plus a consent line under the signup form.
- **Consent model:** cookieless by default. PostHog runs in cookieless mode for every visitor. A banner asks for consent, and accepting enables cookies and session replay (inputs masked). No replay without consent.
- **Consent line under the form:** a notice, not a checkbox.
- **Retention:** deleted on request at any time. Everything is deleted within 6 months after the test ends.
- **PostHog region:** US (existing project). The policy discloses this in one line.
- **Reason:** Every visitor is counted for the A/B metric, so the test isn't starved of data, and nothing identifying (cookies, recordings) runs without consent. A notice avoids adding signup friction for emails people are signing up to receive. Keeping the existing US project avoids re-setup; disclosure covers the transfer.
- **Known data trade-off:** visitors who decline can't be linked across days, so return visits count as new visitors and may see the other variant.
- **Ruled out:** opt-in before any tracking (it hides the visitors who decline, which shrinks and skews the A/B sample) and no session replay (it contradicts the brief).

## D-003: No price on the page

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Decision:** The landing page shows no price on either variant.
- **Reason:** Traffic will be small, so every signup counts, and with no price on the page the hero framing stays the only difference between variants. A visible price next to the money-framed hero could change how Variant A performs compared with B. Willingness to pay is asked in the one-question survey instead (see D-004).
- **Ruled out:** a planned price in the main flow (it muddies the A/B test and lowers signups) and a planned price in the FAQ (less upfront, little learned).

## D-004: Pricing unit and survey placement

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Pricing unit:** per filled shift.
- **Survey placement:** the one-question survey appears on the thank-you screen, after signup, so it can't affect the A/B metric.
- **Survey question:** "How many short-notice shifts does your facility fill in a typical month?"
- **Answers:** Fewer than 5 / 5–15 / 16–30 / 31–60 / More than 60 / I don't know ("<5" relabeled "Fewer than 5" in step 2 to match "More than 60"; same range)
- **How it's used:** each answer gives a break-even fee per filled shift ($500 ÷ shifts per month), compared against the $500/month reference point. No price appears on the page (D-003).
- **About the $500/month:** the founder's unvalidated guess from the brief ("roughly $500/month for a mid-size facility"). It's the reference point the pricing analysis compares against, not a planned ShiftPatch plan.
- **Dependency:** the signup form must include a required role field (to be detailed in the form-fields decision).
- **Reason:**
  - Per filled shift: the buyer pays when the product actually does its job, and it's the unit the break-even math uses.
  - Thank-you screen: asking after signup means the survey can't affect the A/B metric.
  - Wording: see D-005.
  - "I don't know" as the only opt-out: role is already captured on the form.
- **Ruled out:** per hour worked (reads like agency markup, hard to quote) and per unit/ward per month (loosely tied to value). For the wording: an agency comparison (gives the analysis no number to work with on its own) and price ranges or an open price (anchoring, and needs prices picked).

## D-005: Pricing is a separate analysis, not part of the A/B test

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Decision:** Pricing is handled as a separate pricing analysis, outside the A/B test. The A/B test stays money vs. time framing (D-001).
- **Main data input:** the one-question thank-you-screen survey (D-004).
- **Where it lives:** a section or appendix in the decision memo, expanded in the final presentation.
- **Scope and timing:** timeboxed, and done only after all committed deliverables are finished.
- **Reason:** A price A/B test only shows that the cheaper option wins, and a free signup can't measure willingness to pay. A break-even threshold lets Juan compare per-shift and flat pricing transparently instead of trusting a guessed price.

## D-006: The brief stays local, out of git

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Decision:** The original brief is kept at `docs/brief.pdf` for fact-checking. `.gitignore` lists that exact path (not all PDFs, so future PDF deliverables in `docs/` aren't silently ignored). It is never committed or pushed.
- **Reason:** The brief stays out of git so nothing from Designli ends up in the repo, while Claude can still check facts against the original.
- **Ruled out:** committing it verbatim (breaks the "never Designli" rule). A neutral fact sheet that gets committed remains an option for later.
- **Status (2026-11-17): parked.** The brief has not been added and is not needed for now. The owner may add it later. The `.gitignore` entry for `docs/brief.pdf` stays in place so it's protected if it's added.

## D-007: Focus on the landing page; defer the remaining step-1 decisions

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Decision:** Step 1 settles only what the landing-page UI needs: feature-interest cards (yes/no) and the signup form fields. These are deferred to the steps where they get built:
  - Email tool (welcome email + two follow-ups, open/click events to PostHog)
  - Channels with tracked `/go/` links and UTM tags (including `utm_source=personal_network`)
  - `docs/tracking-plan.md` and the A/B hypothesis (originally called "five-slot"; that template was wrong. The format is in `docs/grading-checklist.md`, see D-013.)
- **Reason:** Focus on building the landing page. Decide the rest when it gets built.

## D-008: Page UI: no feature cards; minimal signup form

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Feature-interest cards:** none.
- **Signup form fields:** two, both required.
  - **Email**, labeled "Email" (not "Work email")
  - **Role**, a required choice from:
    Director of nursing / CNO · Nurse manager · Staffing or scheduling coordinator · Finance or operations · Nurse · Other · Just helping test
- **No name field.** The welcome email uses a generic greeting.
- **Reason:** The fewest fields keeps signups up, the survey already covers volume, and role separates buyers from helpers. Feature cards aren't required by the brief, and friend clicks on them wouldn't mean much.
- **Ruled out:** clickable or static feature cards; an optional facility-name field; a detailed form (name, facility, size, country).

## D-009: Headline A/B number is buyer-role signups

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Decision:** The headline A/B result is `signup_form_submitted` filtered to buyer roles.
  - **Buyer roles (headline):** Director of nursing / CNO, Nurse manager, Staffing or scheduling coordinator, Finance or operations.
  - **Excluded from the headline, reported separately:** Nurse (supply side), Other, Just helping test.
  - All signups are also reported as a secondary number.
- **Reason:** Friend signups would distort the A/B result, so buyer-role signups are the honest headline.

## D-010: Landing page design, structure, and hero copy

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Visual direction:** "Charge sheet": warm off-white paper, navy ink, one muted teal accent, serif headings with a plain sans body, thin ruled lines, and a small shift-roster grid in the hero.
- **Page structure, in order:** top bar with a "Pre-launch concept" label → hero (the only part that varies) → how it would work → where this is today → signup form with consent notice → thank-you state with the volume question (built now, UI only) → footer. Plus a separate `/privacy` page.
- **Nurse source (product claim):** the hospital's own staff and float pool.
- **Hero copy.** The two variants share a structure so only the pain differs:
  - **A (money):** "Stop paying a premium for short-notice shifts." / "When a shift opens up at the last minute, the fix is usually overtime or an agency. ShiftPatch is an idea we're testing for filling those shifts without the extra cost." (Reworded in step 2 so "premium" appears only once, in the headline.)
  - **B (time):** "Stop phoning around to fill tonight's shift." / "When a shift opens up at the last minute, someone ends up working down a call list. ShiftPatch is an idea we're testing for getting the open shift to the right nurses without the calls."
  - **Button (shared, not a variant):** "Join the early list"
- **Variant build:** one shared `LandingPage` component; only `Hero` takes the variant. Both copies live in one data file. Preview routes `/preview/a` and `/preview/b` are set to noindex. Assigning real visitors to a variant is decided in the PostHog step. Note that assigning on the server would usually need a cookie, which affects D-002.
- **Contact address:** shiftpatchsurvey@gmail.com
- **Approved defaults:** self-hosted fonts (no Google Fonts requests), a text wordmark only, the email tool described generically on `/privacy` until it's chosen, form validation in the browser with a placeholder submit, and Astro starter files replaced.
- **Approved copy (product claims):** the "How it would work" steps, the privacy policy text, the "Fewer than 5" survey label, and the "Your welcome email will come from shiftpatchsurvey@gmail.com" message.
- **No shared link and no indexing before PostHog is in and step 6 passes.** (Reworded in step 3, see D-011. It originally said no public deploy at all.)
- **Reason:** The Charge sheet style looks equally credible next to a cost message and a time message, so the design doesn't favor either variant. Nurses come from the hospital's own staff and float pool because that's what the concept describes, and it avoids implying we supply nurses.

## D-011: Deploy to Cloudflare Pages, live but unlisted

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Decision:** Deploy to Cloudflare Pages on a free `*.pages.dev` address, built from `main` on every push. The site is publicly reachable but unlisted: `robots.txt` blocks all crawlers, the pages carry noindex tags, and the link isn't shared until PostHog is in and step 6 passes. D-010's no-deploy rule is reworded to match.
- **Setup:** project `shiftpatch-concept`; Astro preset, `npm run build`, output `dist`, root = repo root; Node 24 via `.nvmrc`; `functions/` at the project root for later Pages Functions; preview deployments for other branches turned off. No secrets in the repo (`.env.*`, `.dev.vars`, `.wrangler/` are ignored).
- **Reason:** The form sends nothing yet, so an unlisted live site carries no real risk. A login gate would add setup for no benefit.
- **Ruled out:** locking the site behind Cloudflare Access; waiting to deploy until the PostHog step.

## D-012: Approve full plans instead of answering option-by-option questions

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Decision:** Claude proposes a full plan for each step with its defaults, and the owner approves or overrides it. Claude stops to ask only when something changes the A/B variants, makes a product claim, or affects privacy. (CLAUDE.md's "How we work" already reflects this.)
- **Reason:** Switched from option-by-option questions to approving full plans, because the volume of questions was slowing the build without improving decisions. A/B variants, product claims and privacy still need my approval.

## D-013: Grading checklist for all future work

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Decision:** `docs/grading-checklist.md` holds the hypothesis format and the analytics checklist. All work from step 4 on is checked against it, and each step's summary says how it measures up.
- **Correction:** the "five-slot" hypothesis template mentioned in D-007 was an assumption and was wrong. The format in the checklist replaces it.
- **Reason:** One fixed checklist to check every step against, so nothing the work is judged on gets missed.

## D-014: Market the buyer side first

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Decision:** Research, prospects and channels target the buyer: hospital nursing and staffing leaders (CNO / director of nursing, staffing office, nurse managers, finance or operations).
- **Reason:** The buyer is the only side with a budget, and it matches D-009 (buyer-role signups are the headline A/B number). Buyer prospects can be checked against CMS and hospital pages.
- **Ruled out:** supply (nurses: no budget, outside the D-009 headline, and naming individual nurses is more sensitive) and watchers (consultants, analysts: easy to verify, but they can't validate the idea as buyers).

## D-015: Florida only, for now

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Decision:** The customer profile and the 30 prospects cover Florida hospitals only.
- **Reason:** It matches Juan's base and gives one coherent outreach story. Florida has 200+ CMS-listed hospitals and one license lookup (FL DOH MQA), so verification stays consistent. Narrowing is easy to explain.
- **Known trade-off:** fewer hospitals with recent, specific evidence of the problem than nationwide, so some rows may land at medium confidence.
- **Ruled out:** all of the US (outreach spread thin, 50 state boards to verify against) and 3–4 shortage states (needs its own sourced justification and several license lookups).

## D-016: identify() every signup

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Decision:** On signup, call `identify()` with the lowercased email (plus `role` and `is_buyer_role` as person properties) for every signup, including visitors who declined cookies. No cookie is set without consent. /privacy gets one added line: "If you join the list, we link your email to your visit in PostHog so we can see which emails were useful."
- **Reason:** Signing up is a deliberate act of giving us the email, and it only links that one visit. It lets the email events (step 5) join the same person, so the funnel holds end to end.
- **Fallback:** if the SDK won't identify in cookieless mode, `signup_form_submitted` carries the email as a person property instead.
- **Ruled out:** identify only after cookie consent (breaks the email-to-visit funnel for decliners).
- **Refines:** D-002 (decliners stay anonymous until they choose to sign up).

## D-017: The volume question is an API-mode PostHog survey

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Decision:** The D-004 question is created in PostHog Surveys as an API-mode survey. The existing thank-you UI stays and sends PostHog's `survey shown` / `survey sent` events.
- **Reason:** Results show up in the Surveys tab with no design change, and the D-010 page structure stays as approved.
- **Note:** `survey shown` / `survey sent` are PostHog's own event names (with spaces). The tracking plan lists them as PostHog built-ins, outside our snake_case rule.
- **Ruled out:** a PostHog popover survey (off-brand, can be blocked or dismissed, changes the page structure).

## D-018: Step 4 tracking plan, experiment setup and copy

- **Date:** 2026-11-18
- **Decided by:** project owner (approved the step 4 plan)
- **Tracking plan:** the events in `docs/tracking-plan.md` (landing_page_viewed, hero_cta_clicked, signup_form_started, signup_form_submitted, cookie_banner_answered, channel_link_clicked, plus PostHog built-ins).
- **Flag and experiment:** flag `hero-framing`, variants `control` = A (money) and `time` = B (time), split 50/50. Experiment "Hero framing: money vs time". Primary metric `signup_form_submitted` where `is_buyer_role = true` (D-009). Secondary metrics: all `signup_form_submitted`, and `survey sent`. Test accounts excluded.
- **Consent banner copy:** "We count visits to this page without cookies. Can we also use cookies and record your session (typing is always hidden) to see where the page is confusing?" Buttons: Accept / No thanks, plus a privacy policy link.
- **Feedback widget:** a PostHog popover survey behind a small "Feedback" tab, not shown on the thank-you step: "Anything confusing or missing on this page?" (open text, optional).
- **Proxy:** a Cloudflare Pages Function at `/sp/*` on our own origin.
- **Reason:** The event names cover the funnel from visit to signup to survey answer as real events, with the variant and UTM tags on every event (grading checklist). Same-origin proxying keeps ad blockers from dropping events with no custom domain needed. The copy keeps the D-002 consent model honest and plain.
- **Ruled out:** a separate Cloudflare Worker or PostHog's managed proxy (both need a custom domain).

## D-019: Traction channels for tracked links

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Decision:** Three channels get tracked `/go/<channel>` links, plus the `personal_network` baseline:
  - **Direct outreach** (Sales, founder-led problem-discovery messages to the Florida prospects): `/go/direct_outreach`, `utm_medium=outreach`
  - **LinkedIn organic** (Existing platforms): `/go/linkedin`, `utm_medium=social`
  - **Offline events**: `/go/<event slug>`, `utm_medium=event`. The owner asked for the healthcare leadership events that actually take place in the first half of 2027, and which are in Florida, to be researched first. The slug(s) follow from that research (see `docs/research/events-2027h1.md`).
  - **Personal network** (this week's 10–15 visits): `/go/personal_network`, `utm_medium=referral`
- **Campaign tag:** `utm_campaign=prelaunch-2026-11` on every link.
- **Reason:** These were the top three of the 19 Traction channels scored for Florida nursing and staffing buyers in `docs/research/traction-channels.md` (21, 19 and 17 of 25): the most precise reach of named buyers, free, and honest for a pre-launch concept. Only `personal_network` runs this week. The others are launch-ready but not run.
- **Ruled out:** content marketing (17, tied with offline events but lower reach; slow, and needs public posting) and the remaining 15 channels (see the ranking).

## D-020: Offline events stay in Florida

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Decision:** The offline-events channel (D-019) uses Florida events only. The tracked link is `/go/fonl_annual_2027` (FONL Annual Conference, Palmetto, FL, Nov 3–5, 2027, confirmed on FONL's own page). No Florida buyer event in January–June 2027 is confirmed on an organizer page (`docs/research/events-2027h1.md`). FHA Hospital Days (Tallahassee, Mar 16–17, 2027) gets a link only if FHA confirms the dates. No further event research.
- **Reason (owner's words):** "Let's stick to Florida, we still need to confirm if the product is viable there. If we can't find other offline events, it's ok, we keep the research tighter."
- **Ruled out:** out-of-state events (AONL in Phoenix, ACHE in Nashville, Becker's in Chicago, HFMA in Denver), even though AONL has the largest nurse-leader audience in the window.

## D-021: Today is testing only; analysis starts at launch, 2026-11-19 12:00 BRT

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Decision:** Everything on 2026-11-18 is testing. The analysis window starts at a fixed launch time, **2026-11-19 12:00 BRT (15:00 UTC)**, when the owner shares the links.
  - The experiment "Hero framing: money vs time" is held in **draft** until then. Its flag `hero-framing` stays on, so the page still assigns variants, but nothing counts toward the results until the experiment is launched at 12:00 BRT, which sets its start date to that moment. (PostHog can schedule flag changes but not an experiment launch, so the launch is one click, by the owner or Claude.)
  - Every other insight, funnel or count for the A/B test and the channels uses `date_from = 2026-11-19T15:00:00Z`.
  - Localhost visits count as internal automatically, just like `/?internal=1`.
  - No IP-based internal filter.
- **Reason:** A fixed start keeps the 2026-11-18 test traffic out of every number, including the 2 non-internal `channel_link_clicked` events from the deploy check (about 15:40 UTC on 2026-11-18). Localhost dev traffic had leaked into the experiment once while testing, and marking it internal is the filter that reliably excludes it.
- **Ruled out:** an IP filter on the owner's home IP.

## D-022: A/B hypothesis and step 4 review decisions

- **Date:** 2026-11-18
- **Decided by:** project owner, after the step 4 review (`docs/reviews/step-4-posthog-review.md`)
- **A/B hypothesis (the owner's words, in the checklist format):**
  > We believe that **leading the hero with time savings instead of cost savings** will result in **a higher buyer-role signup rate**, validated by **buyer visitors from launch until the memo**, using **the PostHog experiment "Hero framing: money vs time" primary metric, buyer-role `signup_form_submitted`**, because **the buyer's daily pain is phoning around to fill shifts, which they feel personally every week**.
  - **The number:** "Buyer-role signups (D-009 headline)" in experiment 612484 (variant `time` = B vs `control` = A). Cross-check: the insight "A/B: buyer-signup rate per visitor (by hero_variant)".
  - **Edits for the format only:** "I believe" → "We believe", and "the buyer's daily pain as phoning around" → "is phoning around".
- **Insights:** create the saved insights the hypotheses point to, all from the launch time (2026-11-19 15:00 UTC, D-021) with test accounts filtered out.
- **Channel funnels:** read channels by `utm_source`, and read `channel_link_clicked` on its own (Trends by `channel`).
  - The retest showed that a per-person funnel starting at `landing_page_viewed` also drops visitors who accept cookies, because Accept moves them to a new person.
  - So the headline channel number is a rate computed from unique people per event (buyer-role signups ÷ visitors, by `utm_source`). The per-person funnel is kept only as a secondary view, labelled as undercounting accepters.
- **Variant:** `hero_variant` (a/b) is the source of truth for any A/B breakdown outside the experiment. `$feature/hero-framing` can flip after Accept or signup. The experiment itself attributes by exposure and is correct.
- **Survey test answers:** read survey results from the launch time. Step 6d deletes the 14 test answers' persons listed in the review.
- **`$pageview` without `hero_variant`:** accepted as is. Use `landing_page_viewed` for anything split by variant.
- **Reason:** These keep every launch number readable without code changes the day before launch. The owner wrote the hypothesis, and the analysis rules follow from what the review measured.

## D-023: Known limitation: accepting cookies splits a visitor into two people

- **Date:** 2026-11-18
- **Decided by:** project owner
- **Known limitation:** accepting cookies gives the visitor a new PostHog ID, so pre-consent events and post-consent events land on two people. `alias()` can't merge them in cookieless mode.
- **Decision:** no code change at this scale (10–15 visits).
  - The headline channel metric is buyer signups ÷ visitors per `utm_source`, counted from events (insight `opzPWguM`).
  - The person-based funnel (`KK0a37NQ`) stays as a secondary view, labelled as undercounting visitors who accept.
  - Visitors who accept may also count as 2 exposures in the experiment, so A/B results are directional only.
  - The memo will say both.
- **Reason:** Changing the consent setup would affect replay and privacy (D-002), and adding identity code isn't worth it for this sample.
- **Ruled out:** passing a visit ID through the `/go` redirect, and any other new identity code.

## D-024: Email through the ShiftPatch Gmail with Google Apps Script

- **Date:** 2026-11-18
- **Decided by:** project owner (tool, privacy and footer). The rest are Claude's defaults, listed so the owner can override them.
- **Tool:** the ShiftPatch Gmail (`shiftpatchsurvey@gmail.com`) sends through Google Apps Script, Gmail's own automation. It's the sender and the reply-to. No Brevo or other email service.
  - Readers see "ShiftPatch <shiftpatchsurvey@gmail.com>", signed by Google, with no rewritten From.
  - PostHog Workflows was ruled out because it can't send from a gmail.com address (its email channel needs DNS records on a domain you own).
- **List (privacy, owner approved):** signups (email, role, hero variant, unsubscribe status) are kept in a Google Sheet in the same Google account. `/privacy` says so.
- **Footer (owner decided):** no postal address. Every email has an unsubscribe link.
- **Sequence (defaults):** welcome immediately, follow-up 1 at +2 hours, follow-up 2 at +6 hours, so reviewers get all three the same day. Plain text, signed by a person, honest that ShiftPatch is a pre-launch concept. The copy needs the owner's approval before anything sends.
- **Contact data (default):** email, role and `hero_variant`. No facility size: the form has no such field (D-008), and adding one would change the page and the A/B friction.
- **Events (default):** only `welcome_email_sent`, `welcome_email_opened` and `welcome_email_link_clicked` go to PostHog, with `distinct_id` = the contact's email. Follow-up sends are logged in the Sheet.
  - Visitors who accepted cookies were identified by that email at signup (D-016), so these join the same person.
  - Visitors who declined match by the `email` person property only (D-023).
- **Code (default):** a new `/api/contact` function (the form calls it after `signup_form_submitted`, nothing else changes) and a new `/email/<action>` function (`sent` webhook signed with HMAC, plus `open`, `click` and `unsubscribe` links with signed tokens). The secrets live only in Cloudflare environment variables and the script's own properties. `/go` is unchanged.
- **Timing (default):** aim to be live before the 2026-11-19 12:00 BRT launch. If not, the launch time (D-021) still holds.
- **Reason:** It uses the Gmail the owner already has, so there's no new vendor and no cost. Real Gmail sending gives the best inbox placement available without a domain.
- **Ruled out:** Brevo, which would rewrite the sender to `@brevosend.com`. Also the Gmail API from Cloudflare, which needs a Google Cloud project, OAuth, a scheduler, and more code.

## D-025: Launch moves to 2026-11-19 15:00 BRT (18:00 UTC); step 6 plan

- **Date:** 2026-11-19
- **Decided by:** project owner
- **Launch time:** the analysis window now starts at **2026-11-19 15:00 BRT (18:00 UTC)**. This replaces D-021's 12:00 BRT (15:00 UTC); the rest of D-021 stands. The experiment "Hero framing: money vs time" (612484) is launched at 15:00 BRT, right before the `personal_network` link is shared, and every insight uses `date_from = 2026-11-19T18:00:00Z`.
- **6d test data:** the 18 listed test persons (step 4 review part D and step 5 test addresses) were deleted with their events and recordings. `gbcrespo10+test6@gmail.com` and `gbcre.eng+test1@hotmail.com` (5d provider tests on 2026-11-19) are kept. Like the step 6a test runs, they are dated before launch and excluded by the launch date and the test-account filter.
- **Dashboard:** layout Option 1, "A/B first": experiment results full width on top, then the signup funnel by channel next to the buyer-signup rate per channel, then traffic by channel next to link clicks.
- **Step 6 plan:** approved as proposed (6a end-to-end runs on 4 `/go/` links before launch, 6b checklist, 6c dashboard, 6d exclusion by date with no further deletions).
- **Reason:** the owner didn't give one ("not relevant").

## D-026: Step 6a findings; experiment launched

- **Date:** 2026-11-19
- **Decided by:** project owner
- **Launch:** experiment 612484 was launched on the owner's "go". PostHog set its start to **2026-11-19 17:48:18 UTC** (14:48 BRT), about 12 minutes before the D-025 time. The saved insights still start at 18:00 UTC. The `personal_network` link is shared at or after 15:00 BRT, so no real visit falls between the two.
- **Finding 1, accepted as a known limit:** visitors who decline cookies get no PostHog person record, and `signup_form_submitted` doesn't carry the email. Their `welcome_email_*` events (distinct_id = email) can't be joined to their visit, channel or variant. Email engagement for decliners is reported as totals only. This corrects D-023 and the tracking plan, which said decliners match by the `email` person property. No privacy change.
- **Finding 2, fix after launch:** on iOS, two page loads sent `$pageview` but lost the batch carrying `landing_page_viewed` and the exposure, probably because the visitor switched apps right away (cause not verified). Quick mobile bounces are undercounted in visits and exposures. The memo says so.
- **Finding 3, not fixed:** `/go/linkedin` logged `channel_link_clicked` twice, 17 s apart, for one visit on iPhone. **Cause (owner confirmed):** a long press on the link in the email on iPhone, which opened a preview (quick look) that loaded the link before the actual tap. So a preview counts as a click. Real visitors who long-press a link will add an extra `channel_link_clicked` too; read link clicks as slightly inflated next to visits.
- **Reason:** the owner's call: accept 1, fix 2 after launch. 3 has a known, harmless cause (an iPhone link preview), so no code change.

## D-027: Step 7 plan: outreach, LinkedIn posts, paid campaign spec

- **Date:** 2026-11-19
- **Decided by:** project owner (approved the step 7 plan)
- **Copy voice:** the "Copy voice and honesty" section in CLAUDE.md applies to every piece of copy. It includes a neutral-pain rule: outreach and posts name the short-notice-shift problem without favoring money or time, so they don't tilt the live hero A/B test (D-001).
- **Outreach (Agent A):** 20 prospects, picked by the agent and approved by the owner. Each gets a LinkedIn connection note (300 characters or fewer, one cited fact, no link) and a first message (about 500 characters, with the link) sent once the invite is accepted. Link: `/go/direct_outreach?c=msg_v1`.
- **No per-person link tag:** links never carry a prospect id, so the channel is measured but people aren't (in the spirit of D-002).
- **LinkedIn organic (Agent B):** angle "testing in the open", a founder notebook where each post asks nurse leaders one question. 6 posts, about 3 a week: Mon 23, Tue 24, Wed 25 Nov and Tue 1, Wed 2, Thu 3 Dec 2026 (US Thanksgiving skipped). Link `/go/linkedin?c=postNN`. One reusable graphic template (HTML/SVG source plus a PNG).
- **Paid (Agent C):** phase 1 options first; the owner picks the option and the paid `/go/` slug before phase 2.
- **Nothing is sent, published or run.** Everything is written and ready.
- **Reason:** the owner picked the recommended option for each question.

## D-028: Step 7 checkpoint 1: outreach picks, paid option, paid link

- **Date:** 2026-11-19
- **Decided by:** project owner
- **Outreach picks:** the 20 rows in `docs/gtm/outreach-picks.md`, approved as picked: P04, P08, P10, P14–P30 except P05–P07, P09, P11–P13 (10 high, 10 medium; 7 HCA Florida). Checking that each person is still in post before sending stays a manual step.
- **Paid option:** LinkedIn Sponsored Content, about $750 over 3 weeks (lifetime cap), targeted to Florida, the D-009 buyer titles and the hospital industry. Website-visit objective. No Lead Gen Forms and no Insight Tag (a third-party cookie `/privacy` doesn't cover). A logged-in Campaign Manager forecast comes first; under 300 members means it can't run as written.
- **Timing:** paid is scheduled to start only after the hero A/B test is read for the memo, so ad clicks don't make up the experiment's sample.
- **Paid link:** `/go/linkedin_ads`, `utm_source=linkedin_ads`, `utm_medium=paid_social`, keeping `utm_campaign=prelaunch-2026-11` like every other link. Built on the step 7 branch and verified locally. It goes live only when the branch is pushed.
- **Reason:** the owner picked the recommended option for each question.

## D-029: Test-account filter uses direct conditions, not cohort 728308

- **Date:** 2026-11-20
- **Decided by:** project owner
- **Decision:** replace the cohort condition in the project test-account filter with direct person conditions: `is_internal` is not `true`, `$internal_or_test_user` is not `true`, and `email` doesn't contain `example.com` or `gbcrespo10`. The `$host` localhost/127.0.0.1 and `$pathname` `/preview/` conditions stay.
- **Note:** experiment 612484 uses this same filter (`filterTestAccounts: true`), so the change also applies to its exposures. No internal person has an exposure after launch, so its numbers don't move.
- **Reason:** the cohort was stale (11 members, last recalculated 2026-11-19 17:00 UTC; the owner's profile was created at 19:46), which let the owner's visits into every tile.

## D-030: Funnel first step is the action "Landed"

- **Date:** 2026-11-20
- **Decided by:** project owner
- **Decision:** the channel funnel (`KK0a37NQ`) starts at a new action "Landed" = `landing_page_viewed` OR `cookie_banner_answered`, so a visitor who accepts and then signs up has a first step on their post-Accept person. No code change. Caption: visitors who accept are counted twice at step 1.
- **Reason:** the smallest honest fix after declining the visit-ID change (D-023).

## D-031: Keep the experiment as is; count A/B signups only from exposed events

- **Date:** 2026-11-20
- **Decided by:** project owner
- **Decision:** experiment 612484, its flag and its metrics are not touched. Each visitor who accepts cookies counts as 2 exposures, which lowers conversion the same way in both variants; the memo says so. The memo also reports signups by `hero_variant` from events, counting only events that carry `$feature/hero-framing`, so flag-timeout fallbacks (shown A with no exposure, like person `836fe88c…`) don't tilt the count toward A. The cross-check insight `oMvaY0hy` gets that same filter.
- **Reason:** changing a running experiment is a bigger risk than a known, symmetric bias.

## D-032: Delete pre-launch test profiles; read the survey from launch

- **Date:** 2026-11-20
- **Decided by:** project owner
- **Decision:** delete internal/test person profiles whose events are all before 2026-11-19 17:48 UTC, only from a list the owner approves (`docs/cleanup-list.md`). Keep the owner's main profile (`b7b21c2e…`, step 5 evidence) and anything with events after launch. Pre-launch survey answers that can't be deleted (cookieless, no person record) and the owner's own pre-launch answer stay. A caption says so, and survey results are read from launch (15:00 BRT).
- **Reason:** clean People and survey results for the reviewer.

## D-033: Check whether the /go/ crawler and prefetch filter shipped

- **Date:** 2026-11-20
- **Decided by:** project owner
- **Decision:** report only.
- **Finding:** it wasn't shipped. No branch, stash or commit has crawler, bot or prefetch handling in `functions/go/[channel].ts`.
- **Follow-up decision (owner, 2026-11-20): ship the minimal change with D-035.** `/go/<channel>` still redirects every request the same way, but sends no `channel_link_clicked` when the request says it's a prefetch, prerender or preview (`Sec-Purpose`, `Purpose`, `X-Purpose`, `X-Moz` headers), or when the user agent is empty or a known link-preview bot or crawler (facebookexternalhit, Twitterbot, LinkedInBot, Slackbot, WhatsApp, TelegramBot, Discordbot and others). In-app browsers still count. The iPhone long-press preview (D-026 finding 3) uses a normal Safari user agent and still counts as a click; the link-clicks caption keeps saying so.

## D-034: welcome_email is not an acquisition channel

- **Date:** 2026-11-20
- **Decided by:** project owner
- **Decision:** exclude `utm_source = welcome_email` from the acquisition tiles: traffic (`dBS4IKQb`), buyer-signup rate (`opzPWguM`) and link clicks (`ZS0Uhz2p`). Keep it in the email funnel.
- **Reason:** it's returning signups, not a channel.

## D-035: Send the exposure and the page view only once the page is visible

- **Date:** 2026-11-20
- **Decided by:** project owner (approach: the recommended option)
- **Decision:** read the `hero-framing` flag on load with `send_event: false`, so the headline renders exactly as today. Once the page is really visible (`document.prerendering` is false and `visibilityState` is `visible`, or the first `prerenderingchange`/`visibilitychange` to visible), call `getFeatureFlag('hero-framing')` once more so posthog-js itself sends the same `$feature_flag_called` it sends today, with all its properties, once per page load. PostHog derives `$experiment_exposure` from it on the server: the SDK doesn't send that event. `landing_page_viewed` and `$pageview` are sent at that same moment. Automatic page views are turned off, and `capture_pageleave: true` is set so `$pageleave` keeps working. No UX change: same render timing, headline, banner, surveys and replay. No event names change.
- **Test:** a background tab sends no `landing_page_viewed`, `$pageview` or `$feature_flag_called` until it's focused. `?internal=1` visits still send `$opt_in` and `$set` right away (internal marking, unchanged). The reference and test visits use fresh incognito windows, because the SDK reports a flag only once per browser.
- **Reason:** prefetch and preview loads inflate visitors and exposures.

## D-036: Show "All signups" on the dashboard; buyer signups stay the headline

- **Date:** 2026-11-20
- **Decided by:** project owner
- **Decision:** add a second per-person funnel, "Landed → any signup → volume answer (by utm_source)", next to the buyer funnel on the dashboard, so it's visible that the funnel works end to end with real events whatever the role. The headline numbers stay buyer-role signups: the experiment's primary metric, the buyer funnel (`KK0a37NQ`) and the buyer-signup rate (`opzPWguM`).
- **Layout (Claude's default):** row 2 holds the buyer funnel, then the all-signups funnel, then the buyer-signup rate, each 4 columns wide. Rows 1 and 3 are unchanged (D-025 order kept).
- **Reason:** the buyer funnel reads 0 at step 2 while the only real signup is a non-buyer ("Just helping test"), which looks like a broken funnel.

## D-037: Test-account filter also checks the event's own is_internal

- **Date:** 2026-11-20
- **Decided by:** project owner
- **Decision:** add the event-property condition `is_internal` is not `true` to the project test-account filter, next to the D-029 person conditions.
- **Why it's needed:** with person-on-events, the person conditions read the person's properties *as they were when the event was captured*. The owner's `$pageview` at 2026-11-19 19:46:01 UTC was captured before `is_internal` reached the profile, so D-029 alone let it through. Every event from `?internal=1` carries `is_internal` itself (a super property), so this catches it. No tile used that event, so tile numbers don't move.
- **Reason:** the smallest fix that closes the gap; found by the step 8 audit (check 6a).
