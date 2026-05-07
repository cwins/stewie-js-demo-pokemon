import { For, Match, Show, Switch, effect } from '@stewie-js/core'
import type { JSXElement } from '@stewie-js/core'
import { useLocation, useRouter } from '@stewie-js/router'
import type {
  AbilityCategoryOption,
  AbilityModel,
  DiscoverSort,
  ExploreModule,
  PokemonCardModel,
  PokemonType,
  QuestCard,
  TypeOption,
} from '../data/pokedex.js'
import { rememberAbilityTransition, rememberCardTransition } from '../state/app-state.js'
import { TopNav } from './top-nav.js'

export function AppShell({ children }: { children: JSXElement }): JSXElement {
  const location = useLocation()

  effect(() => {
    void location.pathname
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  })

  return (
    <div class="app-shell">
      <div class="app-shell__backdrop" aria-hidden="true" />
      <TopNav />
      <main class="app-main">{children}</main>
    </div>
  )
}

export function PageIntro(props: {
  number: string
  title: string
  subtitle: string
  kicker?: string
  className?: string
}): JSXElement {
  return (
    <header class={`page-intro ${props.className ?? ''}`}>
      <span class="page-intro__number">{props.number}</span>
      <div>
        <Show when={Boolean(props.kicker)}>
          <p class="page-intro__kicker">{props.kicker}</p>
        </Show>
        <h1 class="page-intro__title">{props.title}</h1>
        <p class="page-intro__subtitle">{props.subtitle}</p>
      </div>
    </header>
  )
}

export function SectionFrame(props: {
  title: string
  subtitle?: string
  children: JSXElement
  tone?: 'paper' | 'midnight'
  className?: string
}): JSXElement {
  return (
    <section class={`section-frame section-frame--${props.tone ?? 'paper'} ${props.className ?? ''}`}>
      <div class="section-frame__heading">
        <h2>{props.title}</h2>
        <Show when={Boolean(props.subtitle)}>
          <p>{props.subtitle}</p>
        </Show>
      </div>
      {props.children}
    </section>
  )
}

export function SearchBar(props: {
  value: () => string
  onInput: (value: string) => void
  onAction: () => void
  placeholder?: string
}): JSXElement {
  return (
    <div class="search-bar">
      <div class="search-bar__field">
        <span class="search-bar__icon" aria-hidden="true">⌕</span>
        <input
          class="search-bar__input"
          type="search"
          placeholder={props.placeholder ?? 'Search Pokemon, types, abilities...'}
          value={() => props.value()}
          onInput={(event: Event) => props.onInput((event.currentTarget as HTMLInputElement).value)}
        />
      </div>
      <button class="search-bar__button" onClick={props.onAction}>Search</button>
    </div>
  )
}

export function FilterChip(props: {
  option: TypeOption | AbilityCategoryOption
  active: () => boolean
  onToggle: () => void
}): JSXElement {
  return (
    <button
      class={() => `filter-chip${props.active() ? ' is-active' : ''}`}
      onClick={props.onToggle}
      data-active={props.active() ? 'true' : 'false'}
    >
      <span class="filter-chip__icon" aria-hidden="true">{props.option.icon}</span>
      <span>{props.option.label}</span>
    </button>
  )
}

export function TypeBadge({ type }: { type: PokemonType }): JSXElement {
  return <span class={`type-badge type-badge--${type}`}>{type}</span>
}

export function CategoryBadge(props: { label: string; accent: string }): JSXElement {
  return <span class="category-badge" style={`--accent:${props.accent};`}>{props.label}</span>
}

export function FeaturedPanel(props: {
  pokemon: PokemonCardModel
  label: string
  onExplore: () => void
}): JSXElement {
  return (
    <article class="featured-panel" style={`--accent:${props.pokemon.accent}; --glow:${props.pokemon.glow};`}>
      <div class="featured-panel__copy">
        <span class="featured-panel__eyebrow">{props.label}</span>
        <h2>{props.pokemon.name}</h2>
        <p class="featured-panel__number">{props.pokemon.number}</p>
        <div class="featured-panel__types">
          <For each={props.pokemon.types}>
            {(getType: () => PokemonType) => <TypeBadge type={getType()} />}
          </For>
        </div>
        <p>{props.pokemon.spotlight}</p>
        <button class="featured-panel__cta" onClick={props.onExplore}>Explore</button>
      </div>
      <div class="featured-panel__art-wrap">
        <img class="featured-panel__art" src={props.pokemon.image} alt={props.pokemon.name} />
      </div>
    </article>
  )
}

export function QuestCardItem({ quest }: { quest: QuestCard }): JSXElement {
  return (
    <article class="quest-card" style={`--accent:${quest.accent};`}>
      <div class="quest-card__head">
        <span class="quest-card__spark" aria-hidden="true">{quest.icon}</span>
        <div>
          <h3>{quest.title}</h3>
          <p>{quest.subtitle}</p>
        </div>
      </div>
      <div class="quest-card__meter">
        <span class="quest-card__fill" style={`width:${(quest.progress / quest.total) * 100}%;`} />
      </div>
      <p class="quest-card__meta">{`${quest.progress} / ${quest.total}`}</p>
    </article>
  )
}

export function PokemonCard(props: {
  pokemon: PokemonCardModel
  isFeatured: () => boolean
  onHover: (slug: string | null) => void
  origin?: 'discover' | 'abilities' | 'ability-detail'
}): JSXElement {
  const router = useRouter()

  return (
    <article
      class={() => `pokemon-card${props.isFeatured() ? ' is-featured' : ''}`}
      style={`--accent:${props.pokemon.accent}; --glow:${props.pokemon.glow};`}
      onMouseEnter={() => props.onHover(props.pokemon.slug)}
      onMouseLeave={() => props.onHover(null)}
      data-testid={`pokemon-card-${props.pokemon.slug}`}
    >
      <button
        class="pokemon-card__button"
        onClick={() => {
          rememberCardTransition(props.pokemon.slug, props.pokemon.accent, props.origin ?? 'discover')
          void router.navigate(`/detail/${props.pokemon.slug}`)
        }}
      >
        <div class="pokemon-card__frame">
          <div class="pokemon-card__art" style={`view-transition-name:pokemon-art-${props.pokemon.slug};`}>
            <img src={props.pokemon.image} alt={props.pokemon.name} />
          </div>
          <div class="pokemon-card__meta">
            <span>{props.pokemon.number}</span>
            <strong>{props.pokemon.name}</strong>
            <p>{props.pokemon.classification}</p>
            <div class="pokemon-card__types">
              <For each={props.pokemon.types}>
                {(getType: () => PokemonType) => <TypeBadge type={getType()} />}
              </For>
            </div>
          </div>
        </div>
      </button>
    </article>
  )
}

export function ExploreCard({ module }: { module: ExploreModule }): JSXElement {
  return (
    <article class="explore-card" style={`--accent:${module.accent};`}>
      <h3>{module.title}</h3>
      <p>{module.subtitle}</p>
      <span class="explore-card__arrow">→</span>
    </article>
  )
}

export function SortControl(props: {
  value: () => DiscoverSort
  onChange: (value: DiscoverSort) => void
}): JSXElement {
  return (
    <label class="sort-control">
      <span>Sort</span>
      <select
        value={props.value}
        onChange={(event: Event) => props.onChange((event.currentTarget as HTMLSelectElement).value as DiscoverSort)}
      >
        <option value="pokedex">Pokedex</option>
        <option value="aura">Aura</option>
        <option value="quest">Quest Ready</option>
      </select>
    </label>
  )
}

export function AbilityChip(props: {
  name: string
  summary: string
  accent: string
  onClick?: () => void
}): JSXElement {
  return props.onClick
    ? (
      <button class="ability-chip" style={`--accent:${props.accent};`} onClick={props.onClick}>
        <span class="ability-chip__icon" aria-hidden="true">AB</span>
        <div>
          <h3>{props.name}</h3>
          <p>{props.summary}</p>
        </div>
      </button>
    )
    : (
      <article class="ability-chip" style={`--accent:${props.accent};`}>
        <span class="ability-chip__icon" aria-hidden="true">AB</span>
        <div>
          <h3>{props.name}</h3>
          <p>{props.summary}</p>
        </div>
      </article>
    )
}

export function StatMeter(props: {
  label: string
  value: number
  accent: string
}): JSXElement {
  return (
    <div class="stat-meter" style={`--accent:${props.accent}; --value:${props.value};`}>
      <span class="stat-meter__label">{props.label}</span>
      <div class="stat-meter__track">
        <span class="stat-meter__fill" style={`width:${Math.min(100, props.value)}%;`} />
      </div>
      <strong class="stat-meter__value">{props.value}</strong>
    </div>
  )
}

export function QuickFactItem(props: {
  label: string
  value: string
}): JSXElement {
  return (
    <div class="quick-fact">
      <span>{props.label}</span>
      <strong>{props.value}</strong>
    </div>
  )
}

export function MoveChip(props: {
  name: string
  type: PokemonType
  pp: string
  summary: string
  index: number
}): JSXElement {
  return (
    <article class="move-chip" style={`--stagger:${props.index};`}>
      <div class="move-chip__title">
        <strong>{props.name}</strong>
        <TypeBadge type={props.type} />
      </div>
      <div class="move-chip__meta">
        <span>{props.pp}</span>
        <p>{props.summary}</p>
      </div>
    </article>
  )
}

export function TabRail(props: {
  value: () => string
  tabs: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}): JSXElement {
  return (
    <div class="tab-rail" role="tablist" aria-label="Detail views">
      <For each={props.tabs}>
        {(getTab: () => { value: string; label: string }) => (
          <button
            class={() => `tab-rail__tab${props.value() === getTab().value ? ' is-active' : ''}`}
            role="tab"
            aria-selected={() => String(props.value() === getTab().value)}
            onClick={() => props.onChange(getTab().value)}
          >
            {getTab().label}
          </button>
        )}
      </For>
      <span
        class="tab-rail__glider"
        style={() => `transform:translateX(${props.tabs.findIndex((tab) => tab.value === props.value()) * 100}%); width:${100 / props.tabs.length}%;`}
      />
    </div>
  )
}

export function NarrativePanel(props: {
  title: string
  body: string
  tab: string
  loading: () => boolean
  loreLine?: string
}): JSXElement {
  return (
    <SectionFrame title={props.title} subtitle="Reactive tab focus and route-owned storytelling." tone="midnight">
      <div class="narrative-panel">
        <Switch>
          <Match when={() => props.loading()}>
            <p class="narrative-panel__loading">Reading fresh field notes...</p>
          </Match>
          <Match when={true}>
            <div>
              <p class="narrative-panel__body">{props.body}</p>
              <Show when={Boolean(props.loreLine)}>
                <p class="narrative-panel__lore">{props.loreLine ?? ''}</p>
              </Show>
            </div>
          </Match>
        </Switch>
        <span class="narrative-panel__tab">{props.tab}</span>
      </div>
    </SectionFrame>
  )
}

export function AbilityCard(props: {
  ability: AbilityModel
  active: () => boolean
  onHover: (slug: string | null) => void
  onOpen: () => void
}): JSXElement {
  return (
    <article
      class={() => `ability-card${props.active() ? ' is-active' : ''}`}
      style={`--accent:${props.ability.accent}; --glow:${props.ability.glow};`}
      onMouseEnter={() => props.onHover(props.ability.slug)}
      onMouseLeave={() => props.onHover(null)}
    >
      <button class="ability-card__button" onClick={props.onOpen}>
        <div class="ability-card__crest" style={`view-transition-name:ability-crest-${props.ability.slug};`}>
          <span>{props.ability.crest}</span>
        </div>
        <strong>{props.ability.name}</strong>
        <p>{props.ability.summary}</p>
        <CategoryBadge label={props.ability.categoryLabel} accent={props.ability.accent} />
      </button>
    </article>
  )
}

export function AbilityPreviewPanel(props: {
  ability: AbilityModel
  onOpenAbility: () => void
  onOpenPokemon: (slug: string) => void
}): JSXElement {
  return (
    <article class="ability-preview" style={`--accent:${props.ability.accent}; --glow:${props.ability.glow};`}>
      <div class="ability-preview__copy">
        <div class="ability-preview__crest">
          <span>{props.ability.crest}</span>
        </div>
        <div>
          <h3>{props.ability.name}</h3>
          <CategoryBadge label={props.ability.categoryLabel} accent={props.ability.accent} />
        </div>
        <p>{props.ability.summary}</p>
        <div class="ability-preview__stats">
          <div>
            <span>Effect</span>
            <strong>{props.ability.effectSummary}</strong>
          </div>
          <div>
            <span>Users</span>
            <strong>{props.ability.users.length}</strong>
          </div>
        </div>
        <button class="featured-panel__cta" onClick={props.onOpenAbility}>Open Ability</button>
      </div>
      <div class="ability-preview__art">
        <h4>Pokemon Gather</h4>
        <div class="ability-preview__users">
          <For each={props.ability.users}>
            {(getUser) => (
              <button class="ability-preview__user" onClick={() => props.onOpenPokemon(getUser().slug)}>
                <img src={getUser().image} alt={getUser().name} />
                <span>{getUser().name}</span>
              </button>
            )}
          </For>
        </div>
      </div>
    </article>
  )
}

export function AbilityHero(props: {
  ability: AbilityModel
  onBack: () => void
}): JSXElement {
  return (
    <section class="ability-hero" style={`--accent:${props.ability.accent}; --glow:${props.ability.glow};`}>
      <div class="ability-hero__copy">
        <button class="ability-hero__back" onClick={props.onBack}>‹ All Abilities</button>
        <PageIntro
          number={`#${String(props.ability.id).padStart(2, '0')}`}
          title={props.ability.name}
          subtitle={props.ability.summary}
        />
        <CategoryBadge label={props.ability.categoryLabel} accent={props.ability.accent} />
      </div>
      <div class="ability-hero__crest-wrap">
        <div class="ability-hero__crest" style={`view-transition-name:ability-crest-${props.ability.slug};`}>
          <span>{props.ability.crest}</span>
        </div>
        <div class="ability-hero__effect">
          <span>Effect Summary</span>
          <p>{props.ability.effectSummary}</p>
        </div>
      </div>
    </section>
  )
}

export function DetailList(props: {
  title: string
  items: string[]
  accent: string
}): JSXElement {
  return (
    <div class="detail-list" style={`--accent:${props.accent};`}>
      <h3>{props.title}</h3>
      <ul>
        <For each={props.items}>
          {(getItem) => <li>{getItem()}</li>}
        </For>
      </ul>
    </div>
  )
}

export function PokemonRosterCard(props: {
  pokemon: AbilityModel['users'][number]
  accent: string
  onOpen: () => void
}): JSXElement {
  return (
    <button class="roster-card" style={`--accent:${props.accent};`} onClick={props.onOpen}>
      <img src={props.pokemon.image} alt={props.pokemon.name} />
      <strong>{props.pokemon.name}</strong>
      <span>{props.pokemon.number}</span>
      <p>{props.pokemon.classification}</p>
      <div class="roster-card__types">
        <For each={props.pokemon.types}>
          {(getType) => <TypeBadge type={getType()} />}
        </For>
      </div>
    </button>
  )
}

export function RelatedAbilityCard(props: {
  ability: AbilityModel
  onOpen: () => void
}): JSXElement {
  return (
    <button class="related-ability-card" style={`--accent:${props.ability.accent};`} onClick={props.onOpen}>
      <span class="related-ability-card__crest">{props.ability.crest}</span>
      <div>
        <strong>{props.ability.name}</strong>
        <p>{props.ability.summary}</p>
      </div>
    </button>
  )
}

export function AbilityFooterCallout(): JSXElement {
  return (
    <section class="ability-footer-callout">
      <div>
        <h2>Select a Pokemon to Explore Its Details</h2>
        <p>Click any Pokemon above to view its full profile, stats, moves, and more.</p>
      </div>
    </section>
  )
}
