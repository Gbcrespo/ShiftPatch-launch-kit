# ShiftPatch launch kit

ShiftPatch is a **pre-launch concept**: an idea for helping hospitals fill short-notice nurse shifts from their own staff and float pool. Nothing has been built. This repo holds the landing page used to find out whether it's worth building.

Decisions, and the reasons for them, are in [`docs/decisions.md`](docs/decisions.md).

Not in this repo, by design: the full AI session transcripts (unedited), which are delivered with the submission email, and the 75-second promo video, which is [on Google Drive](https://drive.google.com/file/d/1xnr8oOLdcrH_Ilol_9T_X4d-P67eDitb/view?usp=sharing). How the video was made, and where its source lives, is in [`docs/gtm/video.md`](docs/gtm/video.md).

## Where to find each deliverable

Grouped by the brief's four parts.

### 1. Landing page and analytics

| Deliverable | Where |
| :--- | :--- |
| Live landing page, two variants | https://shiftpatch-concept.pages.dev. Source: [`src/components/LandingPage.astro`](src/components/LandingPage.astro), hero copy for both variants in [`src/data/hero.ts`](src/data/hero.ts) |
| Privacy policy | https://shiftpatch-concept.pages.dev/privacy. Source: [`src/pages/privacy.astro`](src/pages/privacy.astro) |
| A/B test | PostHog experiment "Hero framing: money vs time", flag `hero-framing`. Metrics in [`docs/tracking-plan.md`](docs/tracking-plan.md#feature-flag-and-experiment) |
| Feedback widget and one-question survey | Live on the page. Set up in [`src/layouts/Layout.astro`](src/layouts/Layout.astro) and [`src/components/SignupForm.astro`](src/components/SignupForm.astro), survey events in [`docs/tracking-plan.md`](docs/tracking-plan.md#survey-properties-posthogs-names) |
| Funnel, named and instrumented | [`docs/tracking-plan.md`](docs/tracking-plan.md#funnel) |
| One-screen dashboard | [PostHog dashboard (public link)](https://us.posthog.com/shared/j6ETsnpSEfOHnHlENoe44CGIhC1hMQ) |

### 2. Email and content

| Deliverable | Where |
| :--- | :--- |
| Email list, welcome email and two follow-ups | [`apps-script/Code.gs`](apps-script/Code.gs) |
| Two weeks of social posts with graphics | [`docs/gtm/linkedin-posts.md`](docs/gtm/linkedin-posts.md), graphics in [`docs/gtm/assets/`](docs/gtm/assets/) |
| Promo video | [Video](https://drive.google.com/file/d/1xnr8oOLdcrH_Ilol_9T_X4d-P67eDitb/view?usp=sharing). How it was made: [`docs/gtm/video.md`](docs/gtm/video.md) |

### 3. Go-to-market

| Deliverable | Where |
| :--- | :--- |
| Paid campaign spec, never run | [`docs/gtm/paid-campaign-spec.md`](docs/gtm/paid-campaign-spec.md) |
| Target customer profile | [`docs/research/target-customer.md`](docs/research/target-customer.md) |
| 30 named prospects with public evidence | [`docs/research/prospects.csv`](docs/research/prospects.csv), checked in [`docs/prospect-verification.md`](docs/prospect-verification.md) |
| 20 outreach messages, never sent | [`docs/gtm/outreach-messages.md`](docs/gtm/outreach-messages.md) |
| Traction channels ranked, three picked, with hypotheses | [`docs/research/traction-channels.md`](docs/research/traction-channels.md) |

### 4. Judgment

| Deliverable | Where |
| :--- | :--- |
| Decision memo | [`docs/decision-memo.md`](docs/decision-memo.md) (PLACEHOLDER: not in the repo yet) |
| Full AI session transcripts | Delivered with the submission email |

## Status

- Landing page: live since 2026-11-19, unlisted (D-011). Traffic so far comes only from the owner's personal network.
- Analytics: PostHog through our own `/sp` proxy (D-064). No consent banner. PostHog keeps one analytics ID in local storage and sets no cookies. Session replay runs for every visitor, with every input masked. The privacy page has a "Stop analytics on this device" button that turns analytics off for that browser. Events are listed in [`docs/tracking-plan.md`](docs/tracking-plan.md). Hero A/B test = PostHog experiment "Hero framing: money vs time", running.
- Data fixes: visitors split in two by the old consent banner were merged, and owner tests were removed from the numbers (D-063). Tracking was fixed on 21 Nov at 18:58 BRT (D-064).
- Email: live. Every signup gets a welcome email and two follow-ups, sent from the ShiftPatch Gmail through Google Apps Script ([`apps-script/Code.gs`](apps-script/Code.gs), D-024). Each email links to a short Google Form survey through the tracked `/email/click` redirect (D-052). Opens and clicks go to PostHog as `welcome_email_opened` and `welcome_email_link_clicked`.
- Tracked channel links: `/go/personal_network`, `/go/direct_outreach`, `/go/linkedin`, `/go/fonl_annual_2027` (D-019, D-020), and `/go/linkedin_ads` for the paid campaign (D-028).
- Go-to-market content: written and ready, never sent, published or run, as the brief requires. Outreach, LinkedIn posts with graphics and the paid campaign spec are in [`docs/gtm/`](docs/gtm/). The prospects and the customer profile are in [`docs/research/`](docs/research/).

## Run it locally

```sh
npm install
npm run dev
```

Then open:

| Page | What it shows |
| :--- | :--- |
| `http://localhost:4321/preview/a` | Variant A: money framing |
| `http://localhost:4321/preview/b` | Variant B: time framing |
| `http://localhost:4321/privacy` | Privacy policy |
| `http://localhost:4321/` | The live page: the hero variant comes from the PostHog flag `hero-framing` |

The two variants are the same `LandingPage` component. Only the hero copy differs, and it lives in `src/data/hero.ts`.

To test the Cloudflare functions (the `/sp` PostHog proxy and the `/go/<channel>` links) locally, build first and serve `dist` with wrangler:

```sh
npm run build
npx wrangler pages dev dist --port 8788
```
