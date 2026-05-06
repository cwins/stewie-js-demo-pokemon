# Execution-Ready Agent Brief

Use this brief to implement the approved mock Pokemon website design in this repository.

Primary references:

- `implementation-handoff-plan.md`
- `07-page-discover-responsive.png`
- `08-page-detail-responsive.png`
- `09-page-species-responsive.png`

## Stewie-JS Goal

Do not implement this as if Stewie were just a JSX syntax layer.

The finished work should strongly demonstrate Stewie-JS advantages:

- fine-grained signal reactivity
- URL-as-store routing
- route-level data loading
- Stewie-native control flow and list rendering
- async primitives that fit the framework model
- coordinated SSR/hydration where appropriate
- first-party testing and devtools support

Favor Stewie-native patterns over React-like habits such as broad component state ownership or unnecessary indirection.

## Objective

Implement a responsive-first, anime-inspired Pokemon web experience with three core pages:

1. `Discover`
2. `Detail`
3. `Species`

The site should feel sharp, magical, cinematic, and character-led. It should not feel like a wiki, encyclopedia, or generic dashboard.

## Non-Negotiables

- Responsive, not adaptive
- Same major components across desktop, tablet, and mobile
- No hiding core content blocks by breakpoint
- No mobile-only replacements for filters, stats, moves, or evolution path
- `Detail` page content parity must hold across all sizes
- Motion should reinforce navigation and hierarchy, not act as decoration only

## Visual References To Follow

Use these files as the highest-priority visual source of truth:

- `07-page-discover-responsive.png`
- `08-page-detail-responsive.png`
- `09-page-species-responsive.png`

Use these earlier concept boards only as supporting history if needed:

- `04-concept-anime-magical-with-shell-explorations-board.png`
- `05-concept-responsive-first-board.png`
- `06-concept-responsive-mobile-legible-board.png`

## Suggested Build Scope

Build a polished mock product shell that uses real-looking data from GraphQL PokeAPI where practical. Prioritize visual fidelity, responsive behavior, and motion over exhaustive feature completeness.

Minimum page expectations:

### `Discover`

- top navigation
- search field
- filter chip rail
- featured discovery hero
- Pokemon card collection
- supporting modules that feel like quest / discovery panels

### `Detail`

- hero reveal with Pokemon name and number
- type badges
- abilities
- moves
- base stats
- quick facts
- tab rail

### `Species`

- species identity panel
- evolution path
- metadata cards
- related forms / variants
- supporting descriptors

## Data Contract

Use a stable content contract per page.

For `Detail`, keep parity across breakpoints:

- same Pokemon
- same 2 abilities
- same 4 moves
- same 6 base stats with labels and values
- same quick-fact fields

If the layout changes, the content must still remain present.

## Framework-Specific Build Requirements

Structure the implementation so it showcases Stewie well:

- use `signal()` for local interactive state such as tab selection, hover emphasis, active chips, staged reveals, and animation toggles
- use `computed()` for filtered Pokemon collections, derived labels, sort outputs, and composed UI state
- use `batch()` when multiple related state updates should settle together
- use `untrack()` if you need to intentionally avoid subscribing inside a derived or effectful path
- use `store()` for shared app-level state if needed, but keep local interactions local
- prefer `Show`, `For`, `Switch`, and `Match` for conditional and list rendering patterns
- use `@stewie-js/router` for all page navigation
- back `Discover` search/filter/sort state with route query params when practical
- use route params for entity identity like Pokemon id/name and species identity
- use route `load` functions and `useRouteData()` for `Detail` and `Species` page data
- if async view-level loading needs to happen inside components, prefer `resource()` with `Suspense`
- prefer precise reactive bindings over coarse page recomputation

If SSR is available in the chosen app structure, use `@stewie-js/server` hydration-friendly patterns for the initial route output.

## Suggested File Structure

Adapt this to the repository conventions, but keep responsibilities separated:

```txt
src/
  app/
    routes/
      discover/
      pokemon/
      species/
  components/
    shell/
    cards/
    data-display/
    motion/
  styles/
    tokens/
    globals/
  lib/
    api/
    mappers/
    view-models/
  data/
    mocks/
```

## Design Token Setup

Create reusable tokens first:

- color tokens
- typography scale
- spacing scale
- radii
- shadows
- motion timings
- easing curves

Use the palette from `implementation-handoff-plan.md`.

## Component Checklist

Build these reusable components before assembling pages:

- `AppShell`
- `TopNav`
- `SearchBar`
- `FilterChip`
- `TypeBadge`
- `PokemonCard`
- `FeaturedPanel`
- `SectionFrame`
- `StatMeter`
- `AbilityChip`
- `MoveChip`
- `QuickFactItem`
- `TabRail`
- `EvolutionNode`
- `EvolutionPath`
- `VariantCard`

## Stewie-JS Demonstration Ideas

The agent should make these capabilities visible in the final result:

- typing in `Discover` search should update results through fine-grained reactivity
- toggling chips should update only the dependent UI
- conditional states should look clean and Stewie-native, not manually orchestrated with sprawling imperative logic
- route changes should preserve a clean mental model: list -> detail -> species
- query-backed filters should make URLs shareable and restorable
- route loaders should keep page data ownership simple
- dev-mode verification should confirm only affected DOM regions update during interactions

## Layout Rules

The responsive system should be fluid:

- use flexible grid and flex layouts
- use `clamp()` for type, spacing, and module sizing
- preserve module identity across breakpoints
- allow modules to wrap and stack naturally
- keep the same reading order where possible

Do not solve mobile by removing content.

## Motion Rules

Implement a consistent motion vocabulary:

- card hover tilt and glow
- chip activation sweep
- shared-element transition from `Discover` card to `Detail` hero
- stat charge animation
- tab glide underline
- move chip stagger
- evolution path draw-in

Recommended implementation priorities:

1. hover and state transitions
2. staggered entrances
3. page-level transitions

If browser support or framework constraints limit shared-element transitions, preserve the same intent with a simpler fallback rather than removing motion entirely.

Use Stewie state primitives to drive these effects directly instead of introducing a heavy abstraction layer unless the repository already has one.

## Data Integration Notes

Use GraphQL PokeAPI entities that map naturally to the pages:

- `pokemon`
- `pokemonSpecies`
- `evolutionChain`
- `types`
- `moves`
- `abilities`
- `regions`

Prefer a thin mapping layer between API responses and UI components so the UI stays stable if query shapes change.

Recommended URL model:

- `Discover`: query params for search, type, region, sort, maybe page
- `Detail`: route param for Pokemon identity
- `Species`: route param for species or evolution-family identity

## Implementation Order

1. Set up tokens and global styles
2. Set up Stewie routing, route data boundaries, and state approach
3. Build the shell and layout primitives
4. Build reusable display components
5. Implement `Discover`
6. Implement `Detail`
7. Implement `Species`
8. Add motion and transitions
9. Verify responsive parity across breakpoints
10. Verify reactive granularity with Stewie tooling
11. Polish spacing, glow, and composition details

## Verification Checklist

Before considering the implementation complete, verify:

- all three pages exist
- all three pages feel like one product
- the app remains visually strong on desktop, tablet, and mobile
- `Detail` page parity holds at all breakpoints
- no major modules disappear on mobile
- the UI does not regress into an encyclopedia feel
- animations are present, readable, and not excessive
- the implementation clearly benefits from Stewie routing/reactivity instead of merely using TSX syntax

## Delivery Expectations

The implementing agent should return:

- a short summary of what was built
- any assumptions made about Stewie-JS structure
- notes on responsive behavior
- notes on animation implementation
- any gaps where API data was mocked or deferred
