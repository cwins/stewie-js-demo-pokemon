# Agent Implementation Prompt

Use the following prompt with the implementation agent:

```md
You are implementing a mock Pokemon website in this repository.

Your goal is to build a responsive-first, anime-inspired, magical-cartoon web experience based on the design artifacts and handoff docs in `./design-plan/`.

## Primary references

Read these first and treat them as the source of truth:

- `./design-plan/implementation-handoff-plan.md`
- `./design-plan/execution-ready-agent-brief.md`
- `./design-plan/07-page-discover-responsive.png`
- `./design-plan/08-page-detail-responsive.png`
- `./design-plan/09-page-species-responsive.png`

You may use these as supporting concept history if needed:

- `./design-plan/04-concept-anime-magical-with-shell-explorations-board.png`
- `./design-plan/05-concept-responsive-first-board.png`
- `./design-plan/06-concept-responsive-mobile-legible-board.png`

## Stewie-JS emphasis

Do not treat Stewie-JS like a generic JSX view library.

The implementation should strongly demonstrate the framework's actual strengths:

- fine-grained `signal()` and `computed()` reactivity
- `batch()` and `untrack()` where they improve reactive correctness
- `store()` for shared reactive state when needed
- built-in control flow with `Show`, `For`, `Switch`, and `Match`
- `@stewie-js/router` URL-as-store routing
- route params and query params as part of the app state model
- route `load` functions plus `useRouteData()` for page-level data
- `resource()` and `Suspense` for async UI states when appropriate
- SSR/hydration patterns if practical in this repo
- `@stewie-js/testing` and `@stewie-js/devtools` for verification

Favor Stewie-native state and routing patterns over React-style habits like broad re-render-oriented state ownership.

## Product direction

Build a polished mock Pokemon site that feels:

- anime-inspired
- sharp
- magical
- cinematic
- character-led
- premium, but not encyclopedic

It should not feel like:

- a wiki
- an online encyclopedia
- a generic dashboard
- a dark teal data tool
- a SaaS admin UI

## Core constraints

- The site must be responsive, not adaptive.
- Keep the same major components across desktop, tablet, and mobile.
- Do not hide major content sections at smaller breakpoints.
- Do not replace desktop patterns with mobile-only alternate patterns for core modules.
- Components should reflow fluidly through wrapping, stacking, compression, and scaling.
- Preserve content parity, especially on the `Detail` page.

Also ensure the final implementation makes Stewie look like a good choice for this product, not an incidental implementation detail.

## Required pages

Implement at least these three pages:

1. `Discover`
2. `Detail`
3. `Species`

### `Discover` page requirements

- top navigation shell
- search input
- filter chip rail
- featured discovery hero/panel
- Pokemon card collection
- supporting quest/discovery modules

### `Detail` page requirements

- hero reveal area
- Pokemon name and number
- type badges
- abilities
- moves
- base stats
- quick facts
- tabs such as `Overview`, `Moves`, `Habitat`, `Evolution`

### `Species` page requirements

- species identity panel
- evolution path / sigil route
- metadata cards
- related forms / variants
- supporting descriptors

## Framework-specific expectations

Use Stewie primitives intentionally:

- use `signal()` for local UI state such as active tabs, hover emphasis, chip states, reveal states, and small animation orchestration
- use `computed()` for filtered/sorted Pokemon collections and other derived UI outputs
- use `batch()` when multiple related updates should land together
- use `untrack()` where needed to avoid accidental subscriptions in derived logic
- use `store()` sparingly for shared app state that legitimately spans pages or modules
- use `Show`, `For`, `Switch`, and `Match` instead of falling back to generic rendering habits when those primitives fit
- use `@stewie-js/router` for navigation between `Discover`, `Detail`, and `Species`
- back `Discover` search/filter/sort state with query params where practical
- use route params for Pokemon identity and species identity
- use route `load` functions and `useRouteData()` for route-owned data
- use `resource()` with `Suspense` if in-component async loading states are needed
- prefer precise reactive bindings over any coarse page recomputation pattern

The product should visibly benefit from Stewie's fine-grained updates:

- chip toggles should update only the affected UI
- search/sort interactions should feel immediate
- independent `Detail` modules should remain isolated and predictable
- route-driven transitions should feel clean and structured
- list and conditional rendering should read like idiomatic Stewie, not transplanted React habits

## Detail page parity requirements

Across desktop, tablet, and mobile, the `Detail` page must preserve the same underlying content:

- same Pokemon
- same abilities
- same moves
- same six base stats
- same stat labels and values
- same quick facts fields

The layout may reflow, but the content contract must stay intact.

## Visual system

Follow the palette and direction from `implementation-handoff-plan.md`.

Key style traits:

- warm cream / paper-like base
- ink-dark text
- coral, gold, cyan, ember, and green accents
- heroic typography
- angled dividers and energy lines
- aura glows
- collectible-card framing
- crisp layered gradients

Keep the design buildable and web-native. Avoid making it feel like a game HUD.

## Motion requirements

Implement a consistent, restrained animation system:

- card hover tilt and glow
- chip activation sweep
- shared-element or equivalent transition from `Discover` card to `Detail` hero
- stat charge animation
- tab glide underline
- move chip stagger/arc-in
- evolution path draw-in

On smaller screens, reduce motion distance/intensity while keeping the same motion language.

If true shared-element transitions are not practical in the current stack, create the closest reasonable fallback rather than removing the transition idea entirely.

Drive motion with small local reactive state where possible so interactions remain surgical and easy to reason about.

## Data integration

The site is based on the GraphQL PokeAPI-style entity model.

Use data that maps naturally to:

- `Pokemon`
- `PokemonSpecies`
- `EvolutionChain`
- `Type`
- `Move`
- `Ability`
- `Region`

Use a mapping layer or view-model layer so the UI is not tightly coupled to raw API response shapes.

If full integration is too expensive for this pass, use stable mock data shaped like the final UI contract.

Recommended URL model:

- `Discover`: query params for search, filters, sort, and optional pagination
- `Detail`: route param for Pokemon slug or id
- `Species`: route param for species/evolution identity

## Implementation approach

Recommended order:

1. inspect the repository and identify the correct app structure
2. identify how to best use Stewie routing, signals, route loaders, and SSR/hydration in this repo
3. set up design tokens and global styling primitives
4. build reusable shell and UI primitives
5. build reusable page modules
6. implement `Discover`
7. implement `Detail`
8. implement `Species`
9. add motion and transitions
10. verify responsive behavior and parity across breakpoints
11. verify the reactive model with Stewie-specific tooling/tests
12. polish visual details

## Technical expectations

- Respect existing repo conventions
- Prefer reusable components over page-specific duplication
- Keep styles organized and token-driven
- Use fluid sizing with techniques such as `clamp()`
- Avoid breakpoint-specific content removal for major sections
- Preserve accessible structure and readable hierarchy
- If available, enable `@stewie-js/devtools` in development and use it to confirm reactive update granularity
- If tests are added, prefer `@stewie-js/testing` for component and SSR verification

## Final deliverable expectations

When finished, report back with:

- what you implemented
- where the main files live
- any assumptions you made about the framework or architecture
- how responsive behavior is handled
- how animations/transitions were implemented
- how Stewie-specific capabilities were used and demonstrated
- any gaps, mocks, or deferred pieces

Before finishing, verify that the UI still feels anime-inspired and magical rather than encyclopedic.
```
