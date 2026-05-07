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
- `./design-plan/10-page-abilities-responsive.png`
- `./design-plan/11-page-ability-detail-responsive.png`

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

Favor Stewie-native state and routing patterns over React-style habits.

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

## Information architecture

Implement these routes:

1. `Discover` at `/`
2. `Abilities` at `/abilities`
3. `Ability Detail` at `/abilities/:ability`
4. `Detail` at `/detail/:pokemon`

Important nav rule:

- `Detail` must not appear in the top nav
- users reach `Detail` only by clicking a Pokemon card

Do not implement `Species`.

## Core constraints

- The site must be responsive, not adaptive.
- Keep the same major components across desktop, tablet, and mobile.
- Do not hide major content sections at smaller breakpoints.
- Do not replace desktop patterns with mobile-only alternate patterns for core modules.
- Components should reflow fluidly through wrapping, stacking, compression, and scaling.
- Preserve content parity, especially on the `Detail` and `Ability Detail` pages.

## Required page requirements

### `Discover`

- top navigation shell
- search input
- filter chip rail
- featured discovery hero/panel
- Pokemon card collection
- supporting quest/discovery modules

### `Abilities`

- top navigation shell
- hero section introducing abilities
- search input
- filter chip rail or grouped categories
- featured ability cards
- grouped ability sections
- preview or CTA into focused ability detail views

### `Ability Detail`

- ability hero / crest
- effect summary
- related tags/categories
- strategy or usage notes
- Pokemon roster for this ability
- related abilities
- return path to `/abilities`

### `Detail`

- hero reveal area
- Pokemon name and number
- type badges
- abilities
- moves
- base stats
- quick facts
- tabs

## Framework-specific expectations

Use Stewie primitives intentionally:

- use `signal()` for local UI state such as active tabs, hover emphasis, chip states, reveal states, and animation orchestration
- use `computed()` for filtered/sorted Pokemon collections and filtered ability collections
- use `batch()` when multiple related updates should land together
- use `untrack()` where needed to avoid accidental subscriptions in derived logic
- use `store()` sparingly for truly shared app state
- use `Show`, `For`, `Switch`, and `Match` instead of generic rendering habits when those primitives fit
- use `@stewie-js/router` for navigation between `Discover`, `Abilities`, `Ability Detail`, and `Detail`
- back `Discover` search/filter/sort state with query params where practical
- back `Abilities` search/filter/sort state with query params where practical
- use route params for Pokemon identity and ability identity
- use route `load` functions and `useRouteData()` for route-owned data
- use `resource()` with `Suspense` if in-component async loading states are needed
- prefer precise reactive bindings over coarse page recomputation

## Content parity requirements

Across desktop, tablet, and mobile, `Detail` must preserve:

- same Pokemon
- same abilities
- same moves
- same six base stats
- same stat labels and values
- same quick facts fields

Across desktop, tablet, and mobile, `Ability Detail` must preserve:

- same selected ability
- same effect summary
- same related tags/categories
- same Pokemon roster items
- same related abilities

## Motion requirements

Implement a consistent, restrained animation system:

- card hover tilt and glow
- chip activation sweep
- `Discover` card to `Detail` hero transition
- `Abilities` card to `Ability Detail` hero transition
- Pokemon roster card to `Detail` hero transition
- stat charge animation
- tab glide underline

On smaller screens, reduce motion distance/intensity while keeping the same motion language.

## Data integration

Use data that maps naturally to:

- `Pokemon`
- `Ability`
- `Type`
- `Move`
- `Region`

Use a mapping layer or view-model layer so the UI is not tightly coupled to raw API response shapes.

Recommended URL model:

- `/`
- `/abilities`
- `/abilities/:ability`
- `/detail/:pokemon`

## Implementation approach

Recommended order:

1. inspect the repository and identify the correct app structure
2. identify how to best use Stewie routing, signals, route loaders, and SSR/hydration in this repo
3. set up design tokens and global styling primitives
4. build reusable shell and UI primitives
5. build reusable page modules
6. implement `Discover`
7. implement `Abilities`
8. implement `Ability Detail`
9. implement `Detail`
10. add motion and transitions
11. verify responsive behavior and parity across breakpoints
12. verify the reactive model with Stewie-specific tooling/tests
13. polish visual details

## Final deliverable expectations

When finished, report back with:

- what you implemented
- where the main files live
- how responsive behavior is handled
- how animations/transitions were implemented
- how Stewie-specific capabilities were used and demonstrated
- any gaps, mocks, or deferred pieces

Before finishing, verify that:

- `Detail` is not in the top nav
- `Abilities` is in the top nav
- clicking a Pokemon card reaches `Detail`
- clicking an ability reaches `Ability Detail`
- the UI still feels anime-inspired and magical rather than encyclopedic
```
