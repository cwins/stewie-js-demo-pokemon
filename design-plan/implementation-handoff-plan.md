# Implementation Handoff Plan

Build a responsive-first, anime-inspired Pokemon web app with one fluid component system across `Desktop`, `Tablet`, and `Mobile`. The product should feel magical, sharp, and character-led, not encyclopedic. Use the same components and content structure at every size; layouts may wrap, compress, and stack, but major modules should not disappear or be replaced by breakpoint-specific alternatives.

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
- tabbed detail panels
- route transitions between related views
- responsive layouts with many independently reactive regions

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

Suggested usage:

- backgrounds: `Cream 50`, `Warm Paper`
- primary text: `Ink 900`
- secondary text: `Slate 700`, `Stone 500`
- dividers / subtle borders: `Line 200`
- active CTAs and important badges: `Coral Red`, `Electric Gold`
- elemental / interactive accents: `Sky Cyan`, `Leaf Green`, `Ember`
- glows and transitions: `Aura Pink`, `Glow Blue`

## Typography

Use a two-font system:

- Display: bold, condensed, high-personality face for page titles, section labels, stat callouts
- UI Sans: clean, readable sans for filters, tabs, metadata, card labels

Typography behavior:

- fluid scale with `clamp()`
- oversized page titles on desktop that reduce proportionally on smaller screens
- type badges, pills, and chips should feel crisp and collectible, not generic

## Core Product Structure

Implement at least these three pages:

1. `Discover`

A landing / browse page with:

- top nav shell
- search input
- horizontal filter chip rail
- featured hero/discovery panel
- Pokemon cards / quest-like discovery panels
- supporting content modules

2. `Detail`

A Pokemon profile page with:

- shared-element hero area from selected card
- name + number
- type badges
- `Abilities`
- `Moves`
- `Base Stats`
- `Quick Facts`
- tabs like `Overview`, `Moves`, `Habitat`, `Evolution`

3. `Species`

A species / evolution page with:

- species identity panel
- magical-path evolution chain
- metadata cards
- related forms / variants
- descriptors like habitat, egg group, growth rate, region, etc.

## How To Showcase Stewie-JS

The build should make the framework benefits legible in the product itself.

Suggested demonstrations:

- `Discover` filters and sort controls should update card collections through signals/computed values with no coarse page redraw behavior
- list rendering should use Stewie-native `For` rather than generic array mapping patterns where appropriate
- conditional page sections and loading/error states should prefer `Show` / `Switch` / `Match`
- selected Pokemon state should flow into route navigation cleanly using router params rather than ad hoc global plumbing
- query parameters should back shareable `Discover` state such as search, type, region, and sort
- route-level `load` functions should power `Detail` and `Species` data loading so page ownership is clean
- if in-component async resources are used, they should rely on `resource()` and `Suspense` rather than ad hoc loading plumbing
- independently reactive modules on `Detail` such as stats, moves, abilities, and facts should update surgically if the selected entity changes
- hover, tab, chip, and animation states should use small local signals rather than heavyweight shared state
- SSR/hydration should be considered for initial page output, especially if the app is presented as a fast polished mock product

## Responsive Rules

This must be responsive, not adaptive.

Rules:

- same nav across breakpoints
- same modules across breakpoints
- same content groups across breakpoints
- no mobile-only replacement UI for major sections
- no hiding core modules like filters, stats, moves, evolution path

Layout behavior:

- desktop: cinematic, wider compositions
- tablet: fewer columns, tighter grouping
- mobile: vertical flow with preserved module order and identity

Examples:

- `Discover` filters wrap or scroll horizontally, but remain the same filter system
- `Detail` hero, stats, abilities, moves, and facts all remain present and stack vertically
- `Species` evolution path narrows into a vertical or tighter route, but stays the same structure

## Component System

Key reusable components:

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

Styling guidance:

- rounded corners, but not overly soft
- use angled trims, diagonal highlights, and layered borders
- cards should feel like collectible panels, not generic rectangles
- keep depth subtle but intentional

## Motion System

Use a small, consistent animation vocabulary rather than many unrelated effects.

Primary interactions:

- `Discover -> Detail`: shared-element card-to-hero transition
- `Detail -> Species`: aura trail / route-line continuation
- filter chips: activation sweep or ignite effect
- cards: slight lift, tilt, glow on hover
- stat meters: charge upward on reveal
- tabs: glide underline or energy stroke
- move chips: stagger or arc in
- evolution path: line draws in, nodes pulse on hover

Animation principles:

- short, readable, punchy
- preserve clarity over spectacle
- reduce distance and intensity on smaller screens, but keep same motion language

Suggested timing:

- micro hover: `120ms - 180ms`
- chip / tab state: `180ms - 240ms`
- card lift / reveal: `220ms - 320ms`
- page transitions: `300ms - 450ms`

Suggested easing:

- use one standard ease-out for UI state changes
- use one stronger ease for hero / page transitions
- avoid overly bouncy motion

Stewie-specific motion note:

- keep animation-driving state local and signal-based so interactions remain granular and predictable
- use router-driven page changes as the orchestration point for cross-page transitions

## Data Mapping from GraphQL PokeAPI

Map the design to these likely entity families:

- `Pokemon`
- `PokemonSpecies`
- `EvolutionChain`
- `Type`
- `Move`
- `Ability`
- `Region`

Suggested page ownership:

- `Discover`: pokemon list + type / region filtering
- `Detail`: pokemon core profile, abilities, moves, stats
- `Species`: species metadata, evolution chain, forms / variants

Important implementation rule:

- define a stable content contract per page so the same data groups appear across breakpoints

For `Detail`, explicitly keep parity:

- same `Abilities` count and items
- same `Moves` count and items
- same six `Base Stats` with labels and values
- same `Quick Facts` fields

## Implementation Order

1. Build design tokens
Set up colors, type scale, spacing, radii, shadows, and motion tokens.

2. Set up Stewie app foundations
Establish routing, data-loading boundaries, SSR/hydration approach if used, and shared stores/signals strategy.

3. Build shell and primitives
Create nav, section frames, chips, badges, buttons, and card containers.

4. Build responsive layout utilities
Use fluid grid/flex patterns and `clamp()` spacing/type tokens.

5. Build page-level reusable modules
Featured panel, Pokemon card, stat meter, tab rail, evolution path.

6. Build the three pages
Start with `Discover`, then `Detail`, then `Species`.

7. Add transition system
Implement shared-element / view-transition behavior between major pages.

8. Tune responsive behavior
Check parity and layout consistency across desktop, tablet, and mobile.

9. Polish motion and visual FX
Add glows, streaks, subtle aura layers, and hover motion sparingly.

10. Verify with Stewie tooling
Use `@stewie-js/testing` for core UI checks and `@stewie-js/devtools` in development to confirm reactive granularity and route behavior.

## Quality Bar

The final build should:

- feel like one cohesive adventure product
- preserve the same information architecture across sizes
- avoid encyclopedic density
- maintain strong visual personality without becoming game HUD clutter
- feel crisp and intentional in both static layout and motion

## Acceptance Criteria

The implementation is successful if:

- all three pages exist and feel visually unified
- the app is responsive without adaptive swapping
- `Detail` content parity is preserved across breakpoints
- motion reinforces navigation and hierarchy
- the product feels anime-inspired, magical, sharp, and modern
- the UI does not read like a wiki or dashboard
- the implementation clearly uses Stewie signals/stores/router patterns rather than generic framework habits
