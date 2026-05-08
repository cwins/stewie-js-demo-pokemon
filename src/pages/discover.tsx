import { computed, effect, reactiveScope, signal, Show, For } from '@stewie-js/core'
import type { JSXElement } from '@stewie-js/core'
import { useQuery, useRouteData, useRouter } from '@stewie-js/router'
import { AppShell, ExploreCard, FeaturedPanel, FilterChip, PageIntro, PokemonCard, QuestCardItem, SearchBar, SectionFrame, SortControl } from '../components/ui.js'
import type { DiscoverPageData, DiscoverSort, PokemonCardModel } from '../data/pokedex.js'
import { getOfflineDiscoverPokemon, loadDiscoverPokemon, TYPE_OPTIONS } from '../data/pokedex.js'
import { rememberCardTransition } from '../state/app-state.js'

function buildDiscoverUrl(query: { q?: string; type?: string; sort?: string }, pathname: string): string {
  const params = new URLSearchParams()

  if (query.q) params.set('q', query.q)
  if (query.type && query.type !== 'all') params.set('type', query.type)
  if (query.sort && query.sort !== 'pokedex') params.set('sort', query.sort)

  const suffix = params.toString()
  return suffix ? `${pathname}?${suffix}` : pathname
}

export function DiscoverPage(): JSXElement {
  const data = useRouteData<DiscoverPageData>()
  const router = useRouter()
  const query = useQuery<{ q: string; type: string; sort: string }>()

  let searchDraft!: ReturnType<typeof signal<string>>
  let committedSearch!: ReturnType<typeof signal<string>>
  let activeType!: ReturnType<typeof signal<string>>
  let activeSort!: ReturnType<typeof signal<DiscoverSort>>
  let hoveredSlug!: ReturnType<typeof signal<string | null>>
  let discoverPokemon!: ReturnType<typeof signal<PokemonCardModel[]>>
  let filteredPokemon!: ReturnType<typeof computed<PokemonCardModel[]>>
  let featuredPokemon!: ReturnType<typeof computed<PokemonCardModel>>
  let discoverRequestId = 0
  reactiveScope(() => {
    searchDraft = signal(query.q ?? '')
    committedSearch = signal(query.q ?? '')
    activeType = signal(query.type ?? 'all')
    activeSort = signal((query.sort ?? 'pokedex') as DiscoverSort)
    hoveredSlug = signal<string | null>(null)
    discoverPokemon = signal(getOfflineDiscoverPokemon(query.q ?? '', query.type ?? 'all'))

    effect(() => {
      const q = committedSearch()
      const type = activeType()
      const fallback = getOfflineDiscoverPokemon(q, type)
      const requestId = ++discoverRequestId

      discoverPokemon.set(fallback)

      void loadDiscoverPokemon(q, type).then((results) => {
        if (requestId !== discoverRequestId) return
        discoverPokemon.set(results)
      })
    })

    filteredPokemon = computed(() => {
      const sort = activeSort()
      const sourcePokemon = discoverPokemon()

      return [...sourcePokemon].sort((left, right) => {
        if (sort === 'aura') {
          return right.auraRank - left.auraRank
        }
        if (sort === 'quest') {
          return left.quickFacts[3]?.value.localeCompare(right.quickFacts[3]?.value ?? '') ?? 0
        }
        return left.id - right.id
      })
    })

    featuredPokemon = computed(() => {
      const hovered = hoveredSlug()
      if (hovered) {
        return filteredPokemon().find((pokemon) => pokemon.slug === hovered) ?? filteredPokemon()[0] ?? data.pokemon[0]
      }
      return filteredPokemon().find((pokemon) => pokemon.slug === data.featuredSlug) ?? filteredPokemon()[0] ?? data.pokemon[0]
    })
  })

  const updateQuery = (patch: Partial<{ q: string; type: string; sort: string }>): void => {
    const next = {
      q: patch.q ?? committedSearch(),
      type: patch.type ?? activeType(),
      sort: patch.sort ?? activeSort(),
    }
    const nextUrl = buildDiscoverUrl(next, router.location.pathname)
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', nextUrl)
    }
  }

  return (
    <AppShell>
      <div class="page page--discover">
        <section class="discover-hero">
          <div class="discover-hero__copy">
            <PageIntro
              title={data.heroTitle}
              subtitle={data.heroSubtitle}
              kicker="Find the next legend."
            />
            <SearchBar
              value={searchDraft}
              onInput={(value) => searchDraft.set(value)}
              onAction={() => {
                committedSearch.set(searchDraft())
                updateQuery({ q: searchDraft() })
              }}
            />
            <div class="discover-hero__chips">
              <For each={TYPE_OPTIONS}>
                {(getOption) => (
                  <FilterChip
                    option={getOption()}
                    active={() => activeType() === getOption().value}
                    onToggle={() => {
                      activeType.set(getOption().value)
                      updateQuery({ type: getOption().value })
                    }}
                  />
                )}
              </For>
            </div>
          </div>

            <FeaturedPanel
            pokemon={featuredPokemon()}
            label="Featured discovery"
            onExplore={() => {
              const pokemon = featuredPokemon()
              rememberCardTransition(pokemon.slug, pokemon.accent)
              void router.navigate(`/detail/${pokemon.slug}`)
            }}
          />
        </section>

        <SectionFrame title="Featured Quests" subtitle="Complete goals, earn rewards." className="quests-frame">
          <div class="quest-grid">
            <For each={data.quests}>
              {(getQuest) => <QuestCardItem quest={getQuest()} />}
            </For>
          </div>
        </SectionFrame>

        <SectionFrame title="Pokemon Discoveries" subtitle="New encounters await.">
          <div>
            <div class="section-toolbar">
              <p>{() => `${filteredPokemon().length} active encounters`}</p>
              <SortControl
                value={activeSort}
                onChange={(value) => {
                  activeSort.set(value)
                  updateQuery({ sort: value })
                }}
              />
            </div>

            <Show
              when={() => filteredPokemon().length > 0}
              fallback={(
                <div class="empty-state">
                  <h3>No discoveries match this route.</h3>
                  <p>Try another type or clear your search to reveal more encounters.</p>
                </div>
              )}
            >
              <div class="pokemon-grid" data-testid="pokemon-grid">
                <For each={filteredPokemon}>
                  {(getPokemon: () => PokemonCardModel) => (
                    <PokemonCard
                      pokemon={getPokemon()}
                      isFeatured={() => hoveredSlug() === getPokemon().slug}
                      onHover={(slug) => hoveredSlug.set(slug)}
                      origin="discover"
                    />
                  )}
                </For>
              </div>
            </Show>
          </div>
        </SectionFrame>

        <SectionFrame title="Explore More" subtitle="Jump into more ways to play and discover!">
          <div class="explore-grid">
            <For each={data.explore}>
              {(getModule) => <ExploreCard module={getModule()} />}
            </For>
          </div>
        </SectionFrame>

        <SectionFrame title="Stewie Features On This Page" subtitle="Signals, computed collections, and URL-backed state stay tightly scoped." tone="midnight">
          <div class="steering-note">
            <p>Typing in the search bar updates the query string and only the dependent card grid, featured panel, and count line respond.</p>
            <p>The selected card route is remembered in shared store state so cross-page transitions stay clean without a heavy global controller.</p>
          </div>
        </SectionFrame>
      </div>
    </AppShell>
  )
}
