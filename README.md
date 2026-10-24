# ARCANA — The Astral Archive

An immersive 3D tarot reading chamber built with Next.js 16, React 19, React Three Fiber and an original,
procedurally illustrated 78-card deck. Readings are interpreted server-side by an AI provider (Claude, or a
built-in offline mock) and are framed as reflection and entertainment, not prediction or professional advice.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the mock provider works with no configuration
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Development server                                   |
| `npm run build`     | Production build                                     |
| `npm start`         | Serve the production build                           |
| `npm run typecheck` | Generate Next route types, then `tsc --noEmit`       |
| `npm run lint`      | ESLint (Next core-web-vitals + TypeScript + React Compiler rules) |
| `npm test`          | Vitest unit, integration and component tests         |
| `npm run check`     | typecheck + lint + test                              |

## Configuration (server-side only)

| Variable               | Default            | Purpose                                                        |
| ---------------------- | ------------------ | -------------------------------------------------------------- |
| `ARCANA_AI_PROVIDER`   | `mock`             | `mock` (offline, deterministic) or `anthropic` (Claude)        |
| `ANTHROPIC_API_KEY`    | —                  | Required when the provider is `anthropic`                      |
| `ARCANA_AI_MODEL`      | `claude-opus-5-5`  | Override the Claude model                                      |
| `ARCANA_AI_TIMEOUT_MS` | `45000`            | Abort provider calls after this long                           |
| `ARCANA_MOCK_FAIL`     | —                  | Mock only: simulate `timeout`, `rate_limit`, `malformed`, `unavailable` |
| `ARCANA_MOCK_DELAY_MS` | `900`              | Mock only: artificial latency                                  |

Never prefix these with `NEXT_PUBLIC_`. The key is read only inside the `/api/reading` route handler and never
reaches the browser bundle.

The Claude provider uses the official `@anthropic-ai/sdk` with structured outputs (a Zod schema), `effort: "medium"`,
and server-side refusal fallbacks (`fallbacks: "default"`, beta `server-side-fallback-2026-07-01`) so a policy
decline on the primary model is retried on the server's default fallback model. Remove those two fields in
`lib/ai/providers/anthropic.ts` if you prefer declined requests to stay declined.

## How a reading works

1. **Shuffle (deterministic result).** Pressing *Shuffle the deck* runs a Fisher–Yates shuffle over all 78 card
   ids using `crypto.getRandomValues`, assigns each card an orientation (30 % reversal chance, configurable), and
   deals the spread. **The reading is fixed at this moment.** Shuffle, cut, draw and flip animations only reveal it
   and can be skipped at any time.
2. **Draw & reveal.** Click/tap the deck (or press Space) to draw; click/tap a card (or press R) to turn it.
3. **Interpret (probabilistic).** When every card is revealed, the client posts `{question, spreadId, tone, cards}`
   to `/api/reading`. The server validates the deal (right count, right positions, no duplicates, known ids),
   rebuilds every card's meaning from its own deck data (client-sent meanings are ignored), calls the provider, and
   validates the response with Zod — including that it addresses exactly the drawn cards in order. Failures return
   a typed, retryable error; a reading is never fabricated.
4. **History.** Each completed reading is saved to `localStorage` (and updated when an interpretation arrives).
   Readings whose interpretation failed can be re-interpreted from the History page.

## Architecture

```
app/
  page.tsx                 landing page with animated hero
  reading/                 the reading chamber
  deck/  history/  settings/
  api/reading/route.ts     POST endpoint (validation, rate limit, error mapping)
components/
  scene/                   R3F canvas, environment (table, rings, sky, dust), camera rig, textures
  cards/                   3D card + deck (shuffle animation), shared geometry, SVG→texture, 2D card images
  spreads/                 layout maths (spread → table coordinates), 2D spread renderer
  reading/                 reading flow orchestrator, setup, HUD, card detail, interpretation, history
  deck/                    encyclopedia with search and filters
  ui/                      header, footer, hero, settings, sigils
lib/
  tarot/deck/              78 card records (data only) + registry/search
  tarot/art/               procedural SVG artwork: frame, 22 major illustrations, minor emblems, back
  tarot/spreads.ts         the four spreads: positions, labels, lenses, layout coordinates
  tarot/selection.ts       pure shuffle/deal/validate functions
  tarot/random.ts          crypto RNG + seeded PRNG for tests
  reading/machine.ts       pure reducer for the reading flow
  ai/                      schemas, prompt context, engine, providers (anthropic, mock), client fetcher
  storage/                 validated localStorage stores (history, settings)
types/tarot.ts             shared domain types
tests/                     Vitest suites
```

### Spreads

| Spread                    | Cards | Positions                                                                 |
| ------------------------- | ----- | ------------------------------------------------------------------------- |
| Daily Guidance            | 1     | Today's Lens                                                              |
| Past · Present · Future   | 3     | Past, Present, Future                                                     |
| The Crossroads (decision) | 5     | Heart of the Matter, Path A, Path B, Unseen Factor, Counsel               |
| Celtic Cross              | 10    | Present, Challenge (crossing), Foundation, Recent Past, Crown, Near Future, Self, Environment, Hopes & Fears, Outcome |

Each position carries an interpretation *lens* (`self`, `obstacle`, `guidance`, `outcome`); every card has a
sentence for each lens, so position-specific meaning comes from data.

### 3D details

- The canvas is loaded with `next/dynamic` (`ssr: false`) from a client component.
- Cards are a beveled rounded-rectangle extrusion (gold edge) with separate front/back faces; the back face's UVs are
  mirrored to compensate for its 180° rotation, so neither side is ever mirrored.
- Flips rotate around the card's long axis; reversal is a 180° turn around the table normal, so reversed artwork
  and text are upside-down, never mirrored. The back design is 180°-symmetric, so orientation can't leak before
  the reveal.
- Geometry and textures are shared; card art is rasterised once per card to a 510×850 canvas texture.
- Per-frame work mutates existing objects only (no allocations); particles and twinkling run in shaders.
- Reduced motion (OS setting or Settings page) makes animations instant and stills the sky and dust.
- If WebGL is unavailable, the context is lost, or the scene throws, the chamber falls back to a 2D CSS spread
  with the same layout data. Users can also choose 2D in Settings.

### Accessibility & input

Mouse, touch and keyboard all work: Space/Enter/D draw, R reveals, A draws and reveals everything, ←/→ move
between revealed cards, S/Esc skip animations or close a card. All cards are also exposed as buttons in the HUD
tray, with live-region announcements of draws and reveals. Settings include high contrast and larger text.

## Artwork

All 78 fronts and the back are original SVG compositions generated in code (`lib/tarot/art`). Each Major Arcana card
has its own emblematic illustration; minor cards use engraved suit emblems in per-number layouts plus distinct court
emblems, over a star field seeded from each card's id. No third-party deck imagery is used. Known limitations: the
art is emblematic (no human figures), pip cards 3–10 share one arrangement per number across suits, and a few small
details (the Chariot's sphinxes, Judgement's trumpet) are crude at thumbnail size.
