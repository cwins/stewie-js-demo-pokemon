# Stewie-JS Demo Pokemon

A small demo app that presents a stylized Pokedex experience built with Stewie-JS. It includes:

- `Discover` for browsing and searching Pokemon
- `Abilities` for browsing ability cards
- `Ability Detail` for focused ability pages
- `Detail` for Pokemon profile pages

The UI uses a mix of curated mock presentation data and live GraphQL-backed enrichment from PokeAPI, with an offline fallback mode for local work.

## Run

```bash
pnpm install
pnpm run dev
```

Optional offline mode:

```bash
VITE_POKEDEX_OFFLINE=1 pnpm run dev
```

## Main Files

- App routes: [src/app.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/app.tsx)
- Data and GraphQL mapping: [src/data/pokedex.ts](/Users/chris/Git/stewie-js-demo-pokemon/src/data/pokedex.ts)
- Shared reactive app state: [src/state/app-state.ts](/Users/chris/Git/stewie-js-demo-pokemon/src/state/app-state.ts)
- Shared UI primitives: [src/components/ui.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/components/ui.tsx)
- Discover page: [src/pages/discover.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/discover.tsx)
- Abilities page: [src/pages/abilities.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/abilities.tsx)
- Ability detail page: [src/pages/ability-detail.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/ability-detail.tsx)
- Pokemon detail page: [src/pages/detail.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/detail.tsx)
- Global styles and motion: [src/styles.css](/Users/chris/Git/stewie-js-demo-pokemon/src/styles.css)

## Stewie Features Used

### `@stewie-js/router`

- Route definitions and route-owned loaders are in [src/app.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/app.tsx).
- `Discover` uses `useQuery()` to keep search, type filters, and sort reflected in the URL in [src/pages/discover.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/discover.tsx).
- Pages read route-owned data with `useRouteData()` in [src/pages/discover.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/discover.tsx), [src/pages/abilities.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/abilities.tsx), [src/pages/ability-detail.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/ability-detail.tsx), and [src/pages/detail.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/detail.tsx).

### `signal()` and `computed()`

- Local UI state like search drafts, hovered cards, active tabs, and derived lists is handled with fine-grained signals and computeds in [src/pages/discover.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/discover.tsx), [src/pages/abilities.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/abilities.tsx), and [src/pages/detail.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/detail.tsx).

### `batch()` and `untrack()`

- `batch()` is used when grouped state updates should land together, for example during search input updates and transition-state writes in [src/pages/discover.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/discover.tsx) and [src/state/app-state.ts](/Users/chris/Git/stewie-js-demo-pokemon/src/state/app-state.ts).
- `untrack()` is used in query-to-input synchronization to avoid accidental subscriptions in [src/pages/discover.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/discover.tsx) and [src/pages/abilities.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/abilities.tsx).

### `store()`

- Shared cross-page transition state and selected entities live in a Stewie store in [src/state/app-state.ts](/Users/chris/Git/stewie-js-demo-pokemon/src/state/app-state.ts).

### Built-in control flow

- The app uses `For` and `Show` heavily for list rendering and empty states in [src/pages/discover.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/discover.tsx), [src/pages/abilities.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/abilities.tsx), [src/pages/ability-detail.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/ability-detail.tsx), and [src/pages/detail.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/detail.tsx).

### Async/resource-style behavior

- Route loaders fetch the main page payloads in [src/app.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/app.tsx).
- The detail page also demonstrates `defineResource()` and `useResource()` for tab-scoped async lore text in [src/pages/detail.tsx](/Users/chris/Git/stewie-js-demo-pokemon/src/pages/detail.tsx).
- Live GraphQL fetches, caching, fallback behavior, and view-model mapping live in [src/data/pokedex.ts](/Users/chris/Git/stewie-js-demo-pokemon/src/data/pokedex.ts).

## Notes

- The app is intentionally demo-oriented rather than production-oriented.
- Some copy and presentation fields are curated locally even when live API data is available.
- `VITE_POKEDEX_OFFLINE=1` forces the app back to local stub data.
