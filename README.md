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
| `http://localhost:4321/` | Variant A for now, until variant assignment is added |

The two variants are the same `LandingPage` component. Only the hero copy differs, and it lives in `src/data/hero.ts`.

## Status

- Landing page UI: done. The signup form and survey check what's entered but don't send anything yet.
- Analytics, the consent banner and email: not built yet.
