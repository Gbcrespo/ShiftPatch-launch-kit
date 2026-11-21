# Review C: strategy and scope (checks 5 to 8)

**Summary**
1. Traction, paid spec and most of scope are in good shape; the hard gap is the decision memo (due tomorrow), and transcripts are not evidenced inside the repo.
2. Social posts are the weakest item: 6 posts on one channel over 11 days, 3 of 6 without a graphic, and a stale note says posts 3 and 6 still need renders.
3. The Florida narrowing is justified only in decisions.md (D-015), not in the prospect or customer docs, and the stated reason is thin.

- **Date:** 2026-11-21 (submission 2026-11-22)
- **Skills checked:** repo parent `.claude/skills`: captions-overlay, hyperframes, hyperframes-cli, media-use (all video tooling). None fit a strategy review, so none used. No `.claude/skills` inside the launch kit.
- **Agents checked:** `.claude/agents/metrics-auditor.md` and `metrics-verifier.md` (analytics auditors, out of scope here). None used.
- **Files read:** docs/research/traction-channels.md, docs/grading-checklist.md, docs/gtm/linkedin-posts.md, docs/gtm/paid-campaign-spec.md (targeted lines), docs/gtm/video.md (head), docs/gtm/outreach-messages.md (headings), design/social-graphic/README.md, docs/research/target-customer.md and prospect-spotcheck.md (grep), prospects.csv (row count), docs/tracking-plan.md (grep), docs/decisions.md (D-014, D-015, D-027, D-028 and greps), README.md, brief.txt (deliverables and method sections), directory listings.
- **Read-only:** yes. Only this file was written. No site, PostHog, link or web access; .env and .dev.vars not opened.

## Check 5: Traction

- **16 categories:** all scanned and ranked. The file scores 19 (the book's full list), a superset of 16, and ranks all 19 (traction-channels.md:34-54, 58-80). Nothing missing. It says it could not find the source of "16" (line 15); honest, but it may read oddly to a grader.
- **Three picked:** yes: Sales, LinkedIn organic, Offline events (lines 84-90), confirmed by the owner in D-019 (line 3).
- **Framework named and justified:** yes, Traction/Bullseye with a 5-criterion rubric (lines 11-30).
- **Five slots:** H1 (line 104), H2 (114), H3 (124) each fill action, outcome, audience, measurement, rationale.
- **Measurable number and PostHog location:** yes for all three (lines 106-107, 116-117, 126-127: insights 9s0dwQbs, d1JCOgLG, ZS0Uhz2p, KK0a37NQ, d9eeKWIG). H1 has a numeric guide (2 of 30). H2 is relative to a baseline. H3's outcome ("higher buyer share ... than any online channel") has no number.
- **Significance claims:** none; explicitly disclaimed (line 100).
- **Stale text:** section 7 (lines 134-139) still proposes adding survey properties to the tracking plan, but tracking-plan.md:57-63 now lists them.

## Check 6: Social posts

- **Two weeks' worth:** 6 posts, Mon 23 Nov to Thu 3 Dec, about 3 a week, skipping Thanksgiving week (linkedin-posts.md:22, 49, 72, 99, 122, 149; D-027). That is roughly 1.5 working weeks, one channel, with a 5-day gap. Thin against "two weeks of social posts".
- **Graphics:** posts 3, 4, 6 have PNGs and all exist in docs/gtm/assets (post03.png, linkedin-template.png, post06.png). Posts 1, 2, 5 say "Graphic: no" (lines 23, 50, 123). The brief says "with graphics".
- **Stale note:** line 172 says posts 3 and 6 still need renders; the files exist. Log line 187 says the same. Both contradict lines 73 and 150.
- **Channel evidence:** LinkedIn rests on a ranking and an unverified assumption (linkedin-posts.md:7). target-customer.md:63 says LinkedIn was not checked. The same file lists FONL, SFONL, FHA and trade press as where these leaders gather (lines 57-62), but no post targets those.
- **Not published:** header line 3 says "written, not published" and waits for the owner. There is no per-post status field; the header suffices.
- **Buyer-first:** copy addresses nurse leaders and staffing leaders. The hashtags #nursing and #staffing (lines 43, 143) can attract staff nurses.

## Check 7: Paid campaign (paid-campaign-spec.md)

All four elements are present and concrete.
- Audience: Florida state, 14 named titles, hospital industry, expansion off, 300-member stop rule (lines 11, 22-42).
- Creative: ad01 to ad03 specified, PNGs exist in docs/gtm/assets (lines 47-115).
- Budget: $750 lifetime cap over 21 days, weekly table, CPC range flagged as vendor-blog, stop rules (lines 117-155).
- One number: buyer-signup rate per visitor for utm_source=linkedin_ads, insight opzPWguM (lines 157-159). Status "written, not run" (line 3).
- Caveat: the audience forecast was not obtained (line 196, needs an ad account); the spec discloses this.

## Check 8: Scope, item by item

Commitment: complete kit, buyer-first, set aside nurse-side acquisition, channels this buyer does not use, and building the product.

| Item | Status | Evidence | Note |
| :--- | :--- | :--- | :--- |
| Landing page, 2 variants | shipped | src/pages/index.astro, src/pages/preview/, README.md:16-20 | Not visited, per rules |
| A/B test (PostHog experiment) | shipped | experiment 612484, flag hero-framing (decisions.md:342; tracking-plan.md:79-82) | |
| Privacy policy | shipped | src/pages/privacy.astro | |
| Feedback widget and survey | shipped | tracking-plan.md:44, 57-63 | |
| Funnel (real events) | shipped | tracking-plan.md:11-24, insight d1JCOgLG | Reviewed elsewhere |
| Dashboard | shipped | tracking-plan.md:90-93 | Out of scope; see docs/review-2026-11-21.md |
| Emails (welcome + 2 follow-ups) | shipped | apps-script/Code.gs, docs/step-5-notes.md:7-9 | Out of scope |
| Two weeks of social posts with graphics | partial | docs/gtm/linkedin-posts.md | 6 posts, 3 graphics, one channel |
| 60 to 90 s video | shipped (documented) | docs/gtm/video.md:5-8 (75.0 s, outside repo, D-059) | |
| Paid campaign spec | shipped | docs/gtm/paid-campaign-spec.md | |
| Profile and 30 prospects | shipped | docs/research/target-customer.md; prospects.csv (30 rows); prospect-spotcheck.md | Florida narrowing: finding 7 |
| 20 outreach messages | shipped | docs/gtm/outreach-messages.md (20 sections, lines 22-349); outreach-picks.md | Not sent, as required |
| Traction ranked, 3 picked, hypotheses | shipped | docs/research/traction-channels.md | See check 5 |
| Decision memo | missing (due 22 Nov) | no memo file in docs/ | Known gap |
| AI session transcripts | not evidenced in repo | no transcript file or pointer found in docs/, README.md or decisions.md | Confirm where they are delivered |

**Buyer-first (D-014):** holds. Research, prospects, outreach, paid targeting and H1 to H3 are all buyer-side (decisions.md:151-157). No nurse-side acquisition found beyond the hashtag nit.

**Florida narrowing (D-015):** the reason is in decisions.md:159-166, linked from README.md:5. target-customer.md:1-3 and the prospect docs say "Florida only" without a reason. The reason given is "matches Juan's base", which names an unexplained person and gives no market rationale.

## Findings

| # | Check | Finding | Evidence | Severity | Type | Suggested minimal fix |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 1 | 6 | Only 6 posts over 11 days on one channel; weak against "two weeks of social posts" | linkedin-posts.md:22-149; decisions.md:309 | major | brief requirement | Add 3 to 4 posts (for example 26-27 Nov, 4 Dec) or say in the submission email that this piece is partial |
| 2 | 6 | Posts 1, 2, 5 have no graphic; brief says "with graphics" | linkedin-posts.md:23, 50, 123 | major | brief requirement | Render three PNGs with design/social-graphic/render.ps1 and update the Graphic lines |
| 3 | 6 | Stale note says posts 3 and 6 need renders; the files exist | linkedin-posts.md:172, 187 vs 73, 150; assets/post03.png, post06.png | minor | opinion | Delete line 172 and fix log line 187 |
| 4 | 6 | Channel choice not evidenced for this customer; LinkedIn "not checked" and only one channel used, though FONL, FHA and trade press are named | linkedin-posts.md:7; target-customer.md:57-63 | minor | brief requirement | Add one evidence line (leader bios or FONL pages linking LinkedIn) or call it an explicit test |
| 5 | 8 | Decision memo not written (due tomorrow) | no memo file in docs/ | major | brief requirement | Write it on 22 Nov from the real numbers |
| 6 | 8 | Transcripts not evidenced in the repo | no match in docs/, README.md, decisions.md | minor | brief requirement | Add a one-line pointer to where transcripts are delivered |
| 7 | 8 | Florida narrowing reason lives only in decisions.md and is thin ("matches Juan's base") | decisions.md:162; target-customer.md:1-3 | minor | brief requirement | Add a 2-line "Why Florida" to target-customer.md: owner's network, 223 CMS hospitals, one license lookup, trade-off stated |
| 8 | 5 | Brief says 16 categories; file scores 19 and says it cannot source "16" | traction-channels.md:15 | nit | opinion | Add a line saying the 16 are covered as a subset of the 19 |
| 9 | 5 | H3 outcome has no number or threshold | traction-channels.md:124 | minor | brief requirement | Add a directional guide (for example at least 1 buyer signup per event) |
| 10 | 5 | Section 7 proposes survey properties already in the tracking plan | traction-channels.md:139 vs tracking-plan.md:57-63 | nit | opinion | Mark both proposals as done |
| 11 | 6 | #nursing and #staffing hashtags may draw staff nurses, against buyer-first | linkedin-posts.md:43, 143 | nit | opinion | Swap for #nurseleadership or #healthcareoperations |
