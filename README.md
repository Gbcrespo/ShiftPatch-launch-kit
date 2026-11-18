# ShiftPatch launch kit

ShiftPatch is a **pre-launch concept**: an idea for helping hospitals fill short-notice nurse shifts from their own staff and float pool. Nothing has been built. This repo holds the landing page used to find out whether it's worth building.

Decisions, and the reasons for them, are in [`docs/decisions.md`](docs/decisions.md).

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

- Landing page UI: done.
- Analytics (step 4): PostHog through our own `/sp` proxy, cookieless until the visitor accepts the consent banner, session replay only after consent with every input masked. Events are listed in [`docs/tracking-plan.md`](docs/tracking-plan.md). Hero A/B test = PostHog experiment "Hero framing: money vs time".
- Tracked channel links: `/go/personal_network`, `/go/direct_outreach`, `/go/linkedin`, `/go/fonl_annual_2027` (D-019, D-020).
- Email: not built yet (step 5).
