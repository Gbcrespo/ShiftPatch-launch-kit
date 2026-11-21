# Evaluator: pre-submission review of the ShiftPatch launch kit

**Date:** Sat 2026-11-21 (submission Sun 2026-11-22). Inputs: assets-A-copy.md, assets-B-prospects.md, assets-C-strategy.md.

## Summary

1. Of the 4 majors raised by the reviewers, 1 still holds as a fix: posts 1, 2 and 5 have no graphic, and the brief asks for posts "With graphics". It takes about 30 minutes with the existing render script.
2. The decision memo and the transcripts are must-do deliverables, but they sit outside this fix pass. Neither is in the repo yet, and the brief calls transcripts "the deliverable we read most closely".
3. I downgraded A's outreach-template major to minor. Each message cites a unique, sourced fact and asks its own question. The shared sentence is the approved D-010 claim, and A overcounted it: "One takes it, and the manager sees who's covering" appears 10 times, not about 17. A one-line note in the file explaining that the sentence is shared on purpose is enough.
4. I downgraded C's post-count major to owner call. The brief says "Two weeks of social posts" and gives no number. Six posts run from Mon 23 Nov to Thu 3 Dec, about 3 a week with Thanksgiving skipped, as logged in D-027.
5. Fixing today: 7 small items (1 S, 6 XS). Going to the memo or the email: 12 memo limits and 9 email lines. Nothing in B's work is close to major, so I made no web fetch.

### Final major list

| # | Finding | Why it holds | Fix | Effort |
|---|---|---|---|---|
| M1 | Posts 1, 2 and 5 have no graphic (C#2) | The brief asks for posts "With graphics". docs/gtm/linkedin-posts.md:23, 50 and 123 say "Graphic: no", and that is visible to anyone who opens the file. | Run `design/social-graphic/render.ps1` three times (`-Out docs\gtm\assets\post01.png`, post02 and post05, with `-Source "A question, not a claim"`), view each PNG, update the three Graphic lines, and delete the stale note at line 172 and in the log at line 187 (C#3). | S (about 30 min) |
| M2 | Decision memo not written (C#5) | It is a brief deliverable that Designli judges against the data. | Must do, outside this fix pass. Write it on 22 Nov from the real numbers and paste in the limits below. | M |
| M3 | Transcripts not evidenced (C#6, upgraded) | The brief says transcripts are "the deliverable we read most closely", and no file, pointer or mention of them was found in README.md, docs/ or decisions.md. | Must do, outside this fix pass. Export every session unedited and attach it. Optionally add a one-line pointer in README (fix F7). | S |

Headline suggestions for M1, taken from each post's own question: post 1 "When a shift opens with very little warning, what happens first?" (line 35). Post 2 "Who decides which nurses get asked first when a shift opens?" (line 60). Post 5 "What would worry you first about filling shifts from your own staff?" (line 135, reworded to stand alone using the D-010 claim).

## Method, skills and agents

- **Skills checked:** the launch kit has no `.claude/skills`. The parent folder's `.claude/skills` holds captions-overlay, hyperframes, hyperframes-cli and media-use, which are all video tools. None fit a read-only review, so none were used.
- **Agents checked:** `.claude/agents` holds metrics-auditor and metrics-verifier, which audit PostHog metrics. Neither fits, so neither was used, and no subagents were spawned.
- **Opened to re-check evidence:** brief.txt (the deliverables and grading lines only), CLAUDE.md:30-32, decisions.md (D-010, D-015, D-027, D-052 to D-058), linkedin-posts.md (Graphic lines, 154-176, questions), outreach-messages.md:22-70 plus counts of the repeated sentences, apps-script/Code.gs:34-44, LandingPage.astro:66-70, SignupForm.astro:11-15 and 52, hero.ts, target-customer.md:1-6, README.md:1-8, design/social-graphic/README.md and render.ps1.
- **Read-only:** this is the only file written. I visited no site, link or preview, made no PostHog call and sent nothing. I opened no .env or .dev.vars, made no web fetch and reproduced no contact details.

## Re-check of each reviewer major

- **A#1, outreach skeleton. Downgraded to minor.** The brief grades "Whether the assets read as written by a person" and says each message "cites a specific, verifiable fact". Each message passes that last rule: every connection note opens with a different sourced fact, and every first message asks its own question (outreach-messages.md:26-30, 43-47, 60-64). Wording varies more than A says. P08 (line 47) restructures the claim, and the closing sentence repeats in 10 messages, not about 17. The shared core comes from CLAUDE.md:30 ("only with approved claims (D-010)"), so it is consistent by design rather than machine-made. Messages of similar length are normal for a LinkedIn sequence. The residual risk is a reader who sees 3 messages in a row. Rewriting all 20 would take M time and need recounting, which is not worth it the day before submission. Fix F2 is a one-line note in the file header.
- **C#1, post count. Downgraded to owner call (D-027).** The brief asks only for "Two weeks of social posts, ready to publish", with no count. D-027 logs 6 posts at about 3 a week across two calendar weeks (Mon 23 Nov to Thu 3 Dec), with US Thanksgiving skipped. That is a defensible cadence for the buyer, and the brief is met literally. State the cadence in the email.
- **C#2, graphics. Confirmed major.** The brief says "With graphics", and 3 of 6 posts say "Graphic: no". The template and script already exist and take a headline argument, so this is the cheapest major in the kit.
- **C#5, memo. Confirmed, classed as must do outside this fix pass.**

## Minors checked for upgrade

- **Welcome email in the present tense (A#14). Stays minor, no fix today.** Code.gs:36 says "an idea we're testing, not a product. Nothing is built yet." Line 38 opens "The idea is simple." CLAUDE.md:30 lists "the idea is…" as an allowed conditional form, so the rule is met as written. Editing it would mean redeploying the live Apps Script the day before Designli signs up, which risks more than it gains.
- **"One question" vs a five-question survey (A#13). Stays minor, fix today.** "One question" is accurate for the on-page volume question (SignupForm.astro:52). The emails then ask for a separate five-question survey (Code.gs:40). The page understates the ask, which is the mismatch the owner already fixed in the emails under D-058. It is XS but needs a page deploy. The change is shared copy, so both A/B arms get it equally.
- **P17 evidence is for another hospital (B#2). Stays minor.** Joe DiMaggio Children's belongs to the same system (Memorial Healthcare System), and the CSV row already says so. The wider point that all 5 sampled evidence links only show that a float pool exists (B#3, B#4) is a targeting-realism limit, so it goes in the memo. Re-sourcing 30 rows is M work.
- **Transcripts (C#6). Upgraded to M3,** as above.
- **Florida reason is thin (C#7). Stays minor, fix today.** The brief says "If you narrow the geography, tell us why." The reason exists in D-015 (decisions.md:164), but target-customer.md:1-3 only says "Florida only". D-015 also cites "Juan's base", which a reviewer cannot place. Two lines fix both.
- **Post 6 "from conversation" (A#23). Stays minor, fix today unless it is true.** It is an unsourced claim about where the idea came from, in an unpublished post, and CLAUDE.md:31 requires every fact to have a source. If the owner did have those conversations, keep it.

## Findings table

| Finding | Source | Evidence | Verdict | Effort | Fix today? |
|---|---|---|---|---|---|
| F1. Posts 1, 2 and 5 have no graphic, plus a stale "needs renders" note | C#2, C#3 | docs/gtm/linkedin-posts.md:23, 50, 123, 172, 187 | major | S | yes: render 3 PNGs with render.ps1, update the Graphic lines, delete line 172 and fix log line 187 |
| Decision memo missing | C#5 | no memo file in docs/ | major (must do, outside this fix pass) | M | no (due 22 Nov): write it from the real numbers using the limits below |
| Transcripts not evidenced | C#6 | no mention in README.md, docs/*.md or decisions.md | major (must do, outside this fix pass) | S | no: export and attach every session unedited; pointer is F7 |
| F2. Outreach shares one skeleton and the claim sentence | A#1, A#2 | docs/gtm/outreach-messages.md:30, 47, 64 (closing line repeats 10 times) | minor (downgraded) | XS | yes: add one header line saying the idea sentence is the approved D-010 claim and is shared on purpose, while the fact and the question are per person |
| F3. Florida "why" missing from the customer doc, and "Juan's base" unexplained | C#7 | docs/research/target-customer.md:1-3; docs/decisions.md:164 | minor | XS | yes: add 2 lines to target-customer.md (owner's network, 200+ CMS hospitals, one license lookup, trade-off) and say who Juan is or reword D-015 |
| F4. Page promises "one question", but the emails ask for a 5-question survey | A#13 | src/components/LandingPage.astro:68-69; SignupForm.astro:13; apps-script/Code.gs:40 | minor | XS | yes: "three short emails (with an optional 1-minute survey) and one question here", then deploy |
| F5. Post 6 says "from conversation" with no source | A#23 | docs/gtm/linkedin-posts.md:158 | minor | XS | yes, unless true: "I haven't checked that picture against anything, and I can't point to a source for it." |
| F6. #nursing and #staffing hashtags pull in staff nurses, against the buyer-first scope | C#11 | docs/gtm/linkedin-posts.md:43, 143 | nit (scope email promises buyer-first) | XS | yes, while editing the file for F1: swap for #nurseleadership or #healthcareoperations |
| F7. No pointer to transcripts or the video | C#6 | README.md | minor | XS | yes: one README line saying where the transcripts and the 75 s video are delivered |
| Post count, 6 over about 2 weeks | C#1 | linkedin-posts.md:22-149; decisions.md:309 | owner call (D-027) | n/a | no: state the cadence in the email |
| Hero A "usually" is unsourced | A#9 | src/data/hero.ts:9 | owner call (D-010) | XS | no: the A/B test is live, so changing an arm mid-test hurts the read more |
| Hero B states the call-list pain as fact | A#10, A#11 | src/data/hero.ts:12-14; CLAUDE.md:31 | owner call (D-010) | XS | no: same reason; note it in the memo as an accepted risk |
| Video lines "Meet ShiftPatch", present-tense taglines, "what's next" | A#17-20 | ShiftPatch-video/SCRIPT.md:18, 24; STORYBOARD.md:45, 109, 110 | owner call (D-048) | M (re-render) | no: the pill and "Concept" labels carry the framing |
| Single channel, and LinkedIn use is unverified | C#4 | linkedin-posts.md:7; target-customer.md:57-63 | minor (D-019/D-027 pick) | S | no: memo limit |
| Prospect evidence shows a float pool exists, not short-notice gaps (P17 is a sister hospital) | B#2, B#3, B#4 | prospects.csv:7, 10, 13, 18, 27 | minor | M | no: memo limit |
| FL license lookup not run | B#9 | MQA form needs interactive search | minor | S (manual) | no: email line |
| H3 has no numeric outcome | C#9 | docs/research/traction-channels.md:124 | minor | XS | no: memo limit (optional "at least 1 buyer signup per event") |
| Welcome email in the present tense | A#14 | apps-script/Code.gs:38 | minor | XS + redeploy | no: allowed "the idea is" form (CLAUDE.md:30); redeploying the day before is risky |
| Ad02 headline is declarative | A#27 | docs/gtm/paid-campaign-spec.md:82 | minor | XS | no: it is the approved claim followed by a question |
| Other A minors (#5 "established", #18-19 covered above) | A#5 | outreach-messages.md:185 | minor | XS | skip, see source file |
| Remaining prospect minors (undated role pages) | B#5 | role URLs in B | minor | n/a | skip, see source file |
| A nits #3, 4, 6, 7, 8, 11, 12, 15, 16, 21, 22, 24, 25, 26 | A | see assets-A-copy.md | nit | XS each | skip, see source file |
| B nits #6, 7, 8 | B | see assets-B-prospects.md | nit | XS | skip, see source file |
| C nits #8, 10 (16 vs 19 categories, stale section 7) | C | traction-channels.md:15, 139 | nit | XS | skip, see source file |

Count: fix today 7 (F1 to F7: 1 S, 6 XS). Must do, outside this fix pass: 2 (memo, transcripts). Owner calls: 4. Everything else goes to the memo, the email or "skip".

## Limits for the memo

Ready to paste, in the owner's voice.

- All the traffic so far came from my own network. Nothing was posted, sent or paid for, so these numbers tell me very little about how hospital buyers I don't know would respond.
- The visitor count is small, so I read the A/B test as a direction, not a winner. I make no claim of statistical significance.
- LinkedIn, outreach and paid are written and ready but have not run. Their hypotheses are untested, and I have no channel data to compare them.
- I chose LinkedIn because I assumed Florida nurse leaders spend time there. I did not check that, and the only channel in the posts is LinkedIn.
- For most prospects, my public evidence shows that the hospital recruits for a float pool. It does not show that they struggle with short-notice shifts. This is the weakest part of the targeting.
- For one prospect, the float-pool posting is from a sister hospital in the same system, not the hospital where that person works.
- I could not run the Florida nurse license lookup for the prospects, because the state's form needs an interactive search.
- I limited the prospects to Florida. That kept verification consistent but left fewer hospitals with recent, specific evidence of the problem.
- Both hero lines state an unsourced pain as fact. The phoning-around pain has no source, and hero A's "usually" has none either. I accepted that risk for the test, and the next version would phrase it as a question.
- The page says the signup asks one question, but the follow-up emails link a five-question survey. I left the live page as it was so the experiment didn't change mid-run.
- The survey answers stay in Google Forms and are not joined to PostHog. Every email click is counted under the welcome step, whichever email it came from.
- The events hypothesis has no numeric target yet, so I cannot call it a pass or a fail.
- I could not get a LinkedIn audience forecast without an ad account, so the paid plan's reach is unconfirmed.

## State in submission email

- The 75-second promo video is delivered separately, outside the repo.
- The full AI session transcripts are attached unedited (say where).
- The posts, outreach and paid campaign are written and ready. Nothing was published, sent or run, as the brief asks.
- There are six LinkedIn posts over two weeks, about three a week, with US Thanksgiving week skipped (23 Nov to 3 Dec).
- The Florida nurse license lookup was not run, because the state form needs an interactive search.
- I narrowed the prospects to Florida, and the reason is in docs/research/target-customer.md and D-015.
- The paid audience forecast was not obtained, because that needs an ad account.
- All traffic came from my personal network.
- The survey is a Google Form, and its answers live there, not in PostHog.

## Owner decisions on this review (2026-11-21, D-062)

- **Applied:**
  - F1: post graphics for posts 1, 2 and 5. The headlines are the posts' own questions; post 1 and post 5 differ slightly from the suggestions above.
  - F2: outreach header note.
  - F3: why Florida, and who Juan is.
  - F7: README pointer.
- **Skipped:** F4 (now a memo limit) and F6 (hashtags kept).
- **F5, post 6's "from conversation":** fixed. The owner did not have those conversations, so the line was reworded (D-062).
- **Owner calls kept as they are:** post count, both hero lines, video lines. The hero memo limit is reworded to cover both lines.

