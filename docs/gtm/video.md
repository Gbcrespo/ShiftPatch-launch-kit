# Promo video

Status: rendered, not published. The final MP4 is delivered with the submission email. ShiftPatch is a pre-launch concept, and nothing is built. Every app screen in the video carries a "Concept" label, and the reveal and end card carry the "Pre-launch concept" pill (the scope promised to Designli: clearly labeled concept mockups).

## The file
- **Final file:** `video.mp4`, 75.0 s, voiceover with no captions (D-051). It's delivered with the submission email, not through this repo.
- **Where the files live:** outside this repo, in the owner's local folder `%USERPROFILE%\Downloads\ShiftPatch-video\` (D-059). The final cut is `renders/video.mp4`. A captioned version is `renders/video-captioned.mp4`, and three earlier test renders sit beside them. No video, render or audio file is in git, and `.gitignore` keeps them out.
- **Format:** 75.0 s (target 60–90), 1920×1080, 30 fps, H.264 + AAC, 4.4 MB.
- **Audio, measured but not heard:** −14.0 LUFS integrated, −1.1 dBFS peak.
- **Tool:** HeyGen HyperFrames, CLI 0.9.72, with the `hyperframes` and `media-use` skills (D-046). It was rendered locally on the Free plan. No credits were spent and no card was added.
- **Project:** `ShiftPatch-video\` holds BRIEF.md, SPEC.md, STORYBOARD.md, SCRIPT.md, STORYLINES.md, BUILD.md and REVIEW.md, plus `index.html`, `compositions\`, `assets\` and `snapshots\`. Re-render it with the HyperFrames CLI. The HyperFrames caches were not copied; the CLI rebuilds them.
- **Live site:** never loaded. Nothing was captured from a URL, and the only preview was the local Studio on localhost.

## What it says (voiceover and captions)
Read by Kokoro's `af_bella` voice, generated locally (D-050). The final version has no captions (D-051). The captioned version shows these lines word for word.

| Time | Line |
|---|---|
| 0–6 s | Ten to five. A shift tonight just opened up. |
| 6–16 s | Someone called in sick. Or the unit got busier than planned. Either way, the shift still needs a nurse. How does your unit fill it today? |
| 16–24 s | We think that moment deserves a simpler answer. Meet ShiftPatch. |
| 24–34 s | Here's how it would work. A manager posts the open shift: the unit, the date and the hours. |
| 34–44 s | It goes to nurses on your own staff and float pool who've said they'd like extra hours. |
| 44–54 s | One of them takes the shift, and the manager can see who's covering it. |
| 54–62 s | Your own nurses, first. That's the idea behind ShiftPatch. |
| 62–68 s | Because when a shift opens up at the last minute, the answer could already be on your team. |
| 68–75 s | Join the early list, and be the first to hear what's next. |

- **Sources:** the three steps are the landing page's "How it would work" copy (D-010). The CTA is `ctaLabel` in `src/data/site.ts`.
- **No numbers:** the video has none. Every sourced figure is about cost, so it would tilt the hero A/B test (D-001, D-047).
- **Music:** one track from HeyGen's free catalog.
- **Sound effects:** bundled with the skill, under the Pixabay Content License.

## How it differs from the original plan
Agent D's script was never written. This file didn't exist before this step, so the brief started from `docs/research/target-customer.md` and `src/data/` (D-046). Against the step's own first draft:

- **Voice and framing (D-048):** the first-person founder voice ("I'm Gabriel… nothing is built yet… what I don't know yet") became a pre-launch teaser in the brand "we" voice.
  - It never says the product is available, an experiment, or unavailable.
  - It ends on "Join the early list" instead of "We're testing this idea".
  - The Concept labels and "Here's how it would work" stay.
- **Voice source (D-049, D-050):** the plan was HeyGen's free voice. HeyGen refused it on the Free plan, so the video was captions-only for a while, and is now Kokoro, run locally.
- **Link (D-047):** the end card shows the plain URL with no new `/go/` channel. Visits from the video arrive as untagged direct traffic.
- **Captions (D-051):** the brief asked for captions on. This version has none, at the owner's request.
- **Independent review fixes:**
  - The payoff board at 55–62 s now carries a Concept label.
  - The "Pre-launch concept" pill lands with the wordmark.
  - Caption line breaks were fixed.
  - The owner kept the remaining copy and polish notes as they are (see `REVIEW.md` in the video folder).
