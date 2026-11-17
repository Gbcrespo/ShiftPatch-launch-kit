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

## Non-negotiables

- Honest pre-launch framing everywhere: ShiftPatch is a concept.
- Fictional, neutral brand only. Never Designli's name or assets.
- Copy must read like a person wrote it.
- Event names: snake_case, object_verb, past tense.
