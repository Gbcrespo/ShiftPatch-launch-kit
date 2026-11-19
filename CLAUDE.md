@AGENTS.md

# ShiftPatch launch kit

ShiftPatch is a pre-launch concept for a platform that helps hospitals fill nurse shifts. Nothing is built. Nothing in this repo may claim otherwise.

## How we work: human in the loop

- For each step, propose a complete plan with your defaults, and I approve or override. Only stop to ask when something changes the A/B variants, makes a claim about the product, or affects privacy. Everything else: decide, build, and list the defaults you chose in the summary so I can override them.
- Never make product decisions for me (audience, copy, pricing, A/B variable, channels, event names, tools, page structure). You may give a recommendation, clearly labeled. I decide.
- After I decide, log the decision and my reason in docs/decisions.md before implementing.
- Work one step at a time. After each step, explain what was done in plain terms, show me how to verify it, and wait for my go-ahead.
- Simple factual questions get a direct answer, no options needed.
- One branch per step. Merge it into main only after I approve that step's done check.
- Never commit or merge until I explicitly say so.
- Batch questions in one message.
- Check all work against docs/grading-checklist.md, and say how each step measures up in its summary.

## Non-negotiables

- Honest pre-launch framing everywhere: ShiftPatch is a concept.
- Fictional, neutral brand only. Never Designli's name or assets.
- Copy must read like a person wrote it.
- Event names: snake_case, object_verb, past tense.

## Copy voice and honesty

- One person writing to one person: first person, plain words, short and varied sentences. Signed by a real person (the welcome email's signer).
- Say what it is: "an idea I'm testing", "a pre-launch concept", "nothing is built yet". Never imply customers, users, pilots, results, a launch date, pricing or testimonials, or call it a platform or product that exists.
- Describe ShiftPatch only conditionally ("the idea is…", "it would…"), and only with approved claims (D-010: nurses come from the hospital's own staff and float pool).
- Every number or fact has a source in the repo, named next to it. The phoning-around pain is unsourced (target-customer.md), so it is asked as a question, never stated as fact.
- Name the short-notice-shift problem without favoring money or time, so outreach and posts don't tilt the live hero A/B test (D-001).
- Ask, don't pitch: the goal is to learn. The ask is small: a reply, or a look at the page.
- Never lead with a labor dispute or name a nurse, and never criticize a hospital. No significance claims.
- Nothing that reads machine-made: no "I hope this finds you well", no hype words (revolutionary, seamless, game-changing, unlock, leverage, empower), no exclamation marks, no emoji, at most 2 hashtags on a post.
- Fictional brand only: ShiftPatch. Never Designli.
