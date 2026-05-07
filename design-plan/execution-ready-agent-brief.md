# Execution-Ready Agent Brief

Use this brief to implement the approved mock Pokemon website design in this repository.

Primary references:

- `implementation-handoff-plan.md`
- `07-page-discover-responsive.png`
- `08-page-detail-responsive.png`
- `10-page-abilities-responsive.png`
- `11-page-ability-detail-responsive.png`

## Objective

Implement a responsive-first, anime-inspired Pokemon web experience with these routes:

1. `Discover` at `/`
2. `Abilities` at `/abilities`
3. `Ability Detail` at `/abilities/:ability`
4. `Detail` at `/detail/:pokemon`

The site should feel sharp, magical, cinematic, and character-led. It should not feel like a wiki, encyclopedia, or generic dashboard.

## Navigation Rule

- `Detail` is not in the top navigation
- users should only reach `Detail` by clicking a Pokemon card
- the top nav should emphasize `Discover` and `Abilities`

## Non-Negotiables

- Responsive, not adaptive
- Same major components across desktop, tablet, and mobile
- No hiding core content blocks by breakpoint
- No mobile-only replacements for filters, stats, moves, or Pokemon roster sections
- `Detail` page content parity must hold across all sizes
- Motion should reinforce navigation and hierarchy, not act as decoration only

## Stewie-JS Goal

Do not implement this as if Stewie were just a JSX syntax layer.

The finished work should strongly demonstrate:

- `signal()`, `computed()`, `batch()`, and `untrack()` where appropriate
- Stewie-native control flow with `Show`, `For`, `Switch`, and `Match`
- URL-as-store routing
- route-level data loading
- first-party testing and devtools support

## Visual References To Follow

Use these files as the highest-priority visual source of truth:

- `07-page-discover-responsive.png`
- `08-page-detail-responsive.png`
- `10-page-abilities-responsive.png`
- `11-page-ability-detail-responsive.png`

Older concept boards are supporting history only.

## Minimum Page Expectations

### `Discover`

- top navigation
- search field
- filter chip rail
- featured discovery hero
- Pokemon card collection
- supporting discovery modules

### `Abilities`

- hero panel introducing abilities as powers/traits
- search field
- filter chip rail or grouped categories
- featured ability cards
- grouped ability sections
- preview of opening a focused ability detail view

### `Ability Detail`

- ability hero / crest
- effect summary
- related tags or categories
- strategy or usage notes
- Pokemon roster for that ability
- related abilities
- clear return path to `/abilities`

### `Detail`

- hero reveal with Pokemon name and number
- type badges
- abilities
- moves
- base stats
- quick facts
- tab rail

## Data Contract

Use a stable content contract per page.

For `Detail`, keep parity across breakpoints:

- same Pokemon
- same abilities
- same moves
- same 6 base stats with labels and values
- same quick-fact fields

For `Ability Detail`, keep parity across breakpoints:

- same selected ability
- same effect summary
- same related categories/tags
- same Pokemon roster items
- same related abilities section

## Framework-Specific Build Requirements

- use `signal()` for local interactive state
- use `computed()` for filtered Pokemon and ability collections
- use `batch()` when related state changes should settle together
- use `untrack()` only when avoiding accidental subscriptions is necessary
- use `Show`, `For`, `Switch`, and `Match` when they fit naturally
- use `@stewie-js/router` for all navigation
- back `Discover` and `Abilities` filtering with query params where useful
- use route params for Pokemon identity and ability identity
- use route `load` functions and `useRouteData()` for `Ability Detail` and `Detail`
- prefer precise reactive bindings over coarse page recomputation

## Suggested File Structure

```txt
src/
  app/
    routes/
      discover/
      abilities/
      ability-detail/
      pokemon-detail/
  components/
    shell/
    cards/
    data-display/
    motion/
  lib/
    api/
    mappers/
    view-models/
```

## Motion Rules

Implement a consistent motion vocabulary:

- card hover tilt and glow
- chip activation sweep
- `Discover` card to `Detail` hero transition
- `Abilities` card to `Ability Detail` hero transition
- Pokemon roster card to `Detail` hero transition
- stat charge animation
- tab glide underline

## Data Integration Notes

Use GraphQL PokeAPI entities that map naturally to:

- `pokemon`
- `abilities`
- `moves`
- `types`
- `regions`

Recommended URL model:

- `/`
- `/abilities`
- `/abilities/:ability`
- `/detail/:pokemon`

## Implementation Order

1. Set up tokens and global styles
2. Set up Stewie routing, route data boundaries, and state approach
3. Build the shell and layout primitives
4. Build reusable display components
5. Implement `Discover`
6. Implement `Abilities`
7. Implement `Ability Detail`
8. Implement `Detail`
9. Add motion and transitions
10. Verify responsive parity across breakpoints
11. Verify reactive granularity with Stewie tooling

## Verification Checklist

- `Discover`, `Abilities`, `Ability Detail`, and `Detail` all exist
- top nav exposes `Discover` and `Abilities`, not `Detail`
- clicking a Pokemon card reaches `Detail`
- clicking an ability reaches `Ability Detail`
- `Detail` parity holds at all breakpoints
- `Ability Detail` parity holds at all breakpoints
- the UI does not regress into an encyclopedia feel
- the implementation clearly benefits from Stewie routing/reactivity instead of merely using TSX syntax
