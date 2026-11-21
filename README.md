# ShiftPatch launch kit

ShiftPatch is a **pre-launch concept**: an idea for helping hospitals fill short-notice nurse shifts from their own staff and float pool. Nothing has been built. This repo holds the landing page used to find out whether it's worth building.

Decisions, and the reasons for them, are in [`docs/decisions.md`](docs/decisions.md).

Not in this repo, by design: the full AI session transcripts (unedited) and the 75-second promo video. Both are delivered with the submission email. How the video was made, and where its source lives, is in [`docs/gtm/video.md`](docs/gtm/video.md).

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

## Status

- Landing page: live since 2026-11-19, unlisted (D-011). Traffic so far comes only from the owner's personal network.
- Analytics: PostHog through our own `/sp` proxy, cookieless until the visitor accepts the consent banner, session replay only after consent with every input masked. Events are listed in [`docs/tracking-plan.md`](docs/tracking-plan.md). Hero A/B test = PostHog experiment "Hero framing: money vs time", running.
- Email: live. Every signup gets a welcome email and two follow-ups, sent from the ShiftPatch Gmail through Google Apps Script ([`apps-script/Code.gs`](apps-script/Code.gs), D-024). Each email links to a short Google Form survey through the tracked `/email/click` redirect (D-052). Opens and clicks go to PostHog as `welcome_email_opened` and `welcome_email_link_clicked`.
- Tracked channel links: `/go/personal_network`, `/go/direct_outreach`, `/go/linkedin`, `/go/fonl_annual_2027` (D-019, D-020), and `/go/linkedin_ads` for the paid campaign (D-028).
- Go-to-market content: written and ready, never sent, published or run, as the brief requires. Outreach, LinkedIn posts with graphics and the paid campaign spec are in [`docs/gtm/`](docs/gtm/). The prospects and the customer profile are in [`docs/research/`](docs/research/).
