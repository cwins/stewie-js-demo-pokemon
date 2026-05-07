# Implementation Handoff Plan

Build a responsive-first, anime-inspired Pokemon web app with one fluid component system across `Desktop`, `Tablet`, and `Mobile`. The product should feel magical, sharp, and character-led, not encyclopedic. Use the same components and content structure at every size; layouts may wrap, compress, and stack, but major modules should not disappear or be replaced by breakpoint-specific alternatives.

## Information Architecture

The approved structure is now:

- `Discover` at `/`
- `Abilities` at `/abilities`
- `Ability Detail` at `/abilities/:ability`
- `Detail` at `/detail/:pokemon`

Important navigation rule:

- `Detail` is not in the top navigation
- users reach `Detail` only by clicking a Pokemon card from `Discover`, `Abilities`, or `Ability Detail`

Removed from scope:

- `Species`
- top-level `/detail` landing state
- `/species` and `/species/:id`

## Stewie-JS Strategy

This implementation should visibly take advantage of Stewie-JS rather than treating it like a generic component renderer.

Use Stewie strengths intentionally:

- fine-grained `signal()` and `computed()` reactivity for highly interactive UI states
- `batch()` and `untrack()` where needed to keep reactive updates intentional and well-bounded
- `store()` for shared app state that updates surgically without component re-renders
- built-in control flow primitives like `Show`, `For`, `Switch`, and `Match`
- `@stewie-js/router` for URL-driven page state, typed params, and query-backed filters
- route `load` functions plus `useRouteData()` for page-level data fetching
- `resource()` and `Suspense` if async loading states are surfaced inside the UI
- SSR + hydration where practical so the app can feel fast and content-rich on first paint
- `@stewie-js/testing` for component, signal, and SSR verification
- `@stewie-js/devtools` during development to confirm reactive update granularity and route behavior

The implementation should demonstrate that Stewie is a strong fit for:

- animated chip/filter systems
- live search and sorting
- hover and focus-rich card grids
- route-driven deep linking
- responsive layouts with many independently reactive regions
- filtered roster views such as Pokemon-with-this-ability

## Visual Direction

The design language should feel like a premium magical-cartoon adventure interface:

- warm, light base instead of dark dashboard surfaces
- bold heroic headings
- sharp angled dividers and energy-line accents
- aura glows, collectible-card framing, and cinematic composition
- playful but polished motion

Avoid:

- wiki / encyclopedia layouts
- SaaS-style cards and tables as the dominant identity
- dark teal / blue-green "data tool" mood
- separate mobile-only interaction models

## Color Palette

Use these as the core system tokens:

```txt
Background / Canvas
- Cream 50:   #F7F1E8
- Warm Paper: #EFE4D3
- Mist 100:   #F9F7F2

Core Neutrals
- Ink 900:    #161518
- Slate 700:  #3A3A44
- Stone 500:  #8A837B
- Line 200:   #D9CCBA

Primary Accents
- Coral Red:  #E85C4A
- Ember:      #F08A3E
- Electric Gold: #F4C542
- Sky Cyan:   #5BC7F6
- Leaf Green: #63B96A

Support / FX
- Aura Pink:  #FF8FA3
- Glow Blue:  #8EDBFF
- Soft Shadow: rgba(22, 21, 24, 0.14)
- Hard Shadow: rgba(22, 21, 24, 0.24)
```

## Core Product Structure

Implement these four routes:

1. `Discover`

A landing / browse page with:

- top nav shell
- search input
- horizontal filter chip rail
- featured hero/discovery panel
- Pokemon cards / quest-like discovery panels
- supporting content modules

2. `Abilities`

A top-level ability atlas page with:

- top nav shell
- search input
- filter chip rail or grouped categories
- featured abilities
- ability cards / crests
- preview of selecting an ability to inspect its effect and related Pokemon

3. `Ability Detail`

A focused ability page with:

- ability hero / crest
- effect summary
- related tags or categories
- strategy / notes section
- a Pokemon roster of characters who have that ability
- related abilities

4. `Detail`

A Pokemon profile page with:

- shared-element hero area from selected card
- name + number
- type badges
- `Abilities`
- `Moves`
- `Base Stats`
- `Quick Facts`
- tabs like `Overview`, `Moves`, `Habitat`, `Evolution`

## How To Showcase Stewie-JS

The build should make the framework benefits legible in the product itself.

Suggested demonstrations:

- `Discover` filters and sort controls should update card collections through signals/computed values with no coarse page redraw behavior
- `Abilities` search and category changes should update the ability roster surgically
- list rendering should use Stewie-native `For` rather than generic array mapping patterns where appropriate
- conditional page sections and loading/error states should prefer `Show` / `Switch` / `Match`
- query parameters should back shareable `Discover` state such as search, type, region, and sort
- query parameters can also back `Abilities` search and category filtering where useful
- route-level `load` functions should power `Ability Detail` and `Detail` data loading so page ownership is clean
- if in-component async resources are used, they should rely on `resource()` and `Suspense` rather than ad hoc loading plumbing
- independently reactive modules on `Detail` such as stats, moves, abilities, and facts should update surgically if the selected entity changes
- hover, tab, chip, and animation states should use small local signals rather than heavyweight shared state

## Responsive Rules

This must be responsive, not adaptive.

Rules:

- same nav across breakpoints
- same modules across breakpoints
- same content groups across breakpoints
- no mobile-only replacement UI for major sections
- no hiding core modules like filters, stats, moves, ability rosters, or related modules

Examples:

- `Discover` filters wrap or scroll horizontally, but remain the same filter system
- `Abilities` search, filters, featured cards, and grouped modules remain present at every size
- `Ability Detail` hero, effect summary, Pokemon roster, and related abilities remain present and stack naturally
- `Detail` hero, stats, abilities, moves, and facts all remain present and stack vertically

## Component System

Key reusable components:

- `AppShell`
- `TopNav`
- `SearchBar`
- `FilterChip`
- `TypeBadge`
- `PokemonCard`
- `AbilityCard`
- `AbilityCrest`
- `FeaturedPanel`
- `SectionFrame`
- `StatMeter`
- `AbilityChip`
- `MoveChip`
- `QuickFactItem`
- `TabRail`

## Motion System

Use a small, consistent animation vocabulary rather than many unrelated effects.

Primary interactions:

- `Discover -> Detail`: shared-element card-to-hero transition
- `Abilities -> Ability Detail`: selected ability card expands into ability hero / crest
- `Ability Detail -> Detail`: selecting a Pokemon card transitions into the Pokemon detail hero
- filter chips: activation sweep or ignite effect
- cards: slight lift, tilt, glow on hover
- stat meters: charge upward on reveal
- tabs: glide underline or energy stroke
- move chips: stagger or arc in
- ability crests: pulse or flare subtly on selection

## Data Mapping from GraphQL PokeAPI

Map the design to these likely entity families:

- `Pokemon`
- `Ability`
- `Type`
- `Move`
- `Region`

Suggested page ownership:

- `Discover`: pokemon list + type / region filtering
- `Abilities`: ability list, categories, and search
- `Ability Detail`: ability metadata + related Pokemon roster
- `Detail`: pokemon core profile, abilities, moves, stats

Important implementation rule:

- define a stable content contract per page so the same data groups appear across breakpoints

For `Detail`, explicitly keep parity:

- same `Abilities` count and items
- same `Moves` count and items
- same six `Base Stats` with labels and values
- same `Quick Facts` fields

## URL Model

Recommended URL structure:

- `/`
- `/abilities`
- `/abilities/:ability`
- `/detail/:pokemon`

Recommended query usage:

- `Discover`: search, type, region, sort, maybe page
- `Abilities`: search, category, sort

## Implementation Order

1. Build design tokens
2. Set up Stewie app foundations
3. Build shell and primitives
4. Build responsive layout utilities
5. Build page-level reusable modules
6. Build `Discover`
7. Build `Abilities`
8. Build `Ability Detail`
9. Build `Detail`
10. Add transition system
11. Tune responsive behavior
12. Verify with Stewie tooling

## Acceptance Criteria

The implementation is successful if:

- the top nav exposes `Discover` and `Abilities`, but not `Detail`
- users can reach `Detail` by clicking a Pokemon card from other pages
- `Abilities` feels like a strong top-level destination
- `Ability Detail` clearly explains an ability and shows Pokemon who have it
- `Detail` content parity is preserved across breakpoints
- the product feels anime-inspired, magical, sharp, and modern
- the implementation clearly uses Stewie signals/stores/router patterns rather than generic framework habits
