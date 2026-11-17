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
  - `docs/tracking-plan.md` and the five-slot A/B hypothesis
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
- **Reason:** Not stated beyond the choices themselves. The owner chose the recommended direction and structure, and wrote the hero headlines.

## D-011: Deploy to Cloudflare Pages, live but unlisted

- **Date:** 2026-11-17
- **Decided by:** project owner
- **Decision:** Deploy to Cloudflare Pages on a free `*.pages.dev` address, built from `main` on every push. The site is publicly reachable but unlisted: `robots.txt` blocks all crawlers, the pages carry noindex tags, and the link isn't shared until PostHog is in and step 6 passes. D-010's no-deploy rule is reworded to match.
- **Setup:** project `shiftpatch-concept`; Astro preset, `npm run build`, output `dist`, root = repo root; Node 24 via `.nvmrc`; `functions/` at the project root for later Pages Functions; preview deployments for other branches turned off. No secrets in the repo (`.env.*`, `.dev.vars`, `.wrangler/` are ignored).
- **Reason (inferred, owner to confirm):** The form sends nothing yet, so no data is collected, and the privacy policy overstates tracking rather than hiding any. A login gate (Cloudflare Access) would add setup for little gain.
- **Ruled out:** locking the site behind Cloudflare Access; waiting to deploy until the PostHog step.
