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
