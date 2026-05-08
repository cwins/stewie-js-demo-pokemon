import { computed, reactiveScope, signal, For, Show } from '@stewie-js/core'
import type { JSXElement } from '@stewie-js/core'
import { useQuery, useRouteData, useRouter } from '@stewie-js/router'
import {
  AbilityCard,
  AbilityPreviewPanel,
  AppShell,
  FilterChip,
  PageIntro,
  SearchBar,
  SectionFrame,
} from '../components/ui.js'
import type { AbilitiesPageData, AbilityCategory, AbilityModel } from '../data/pokedex.js'
import { ABILITY_CATEGORY_OPTIONS } from '../data/pokedex.js'
import { rememberAbilityTransition, rememberCardTransition } from '../state/app-state.js'

function buildAbilitiesUrl(query: { q?: string; category?: string }, pathname: string): string {
  const params = new URLSearchParams()

  if (query.q) params.set('q', query.q)
  if (query.category && query.category !== 'all') params.set('category', query.category)

  const suffix = params.toString()
  return suffix ? `${pathname}?${suffix}` : pathname
}

export function AbilitiesPage(): JSXElement {
  const data = useRouteData<AbilitiesPageData>()
  const router = useRouter()
  const query = useQuery<{ q: string; category: string }>()

  let searchDraft!: ReturnType<typeof signal<string>>
  let committedSearch!: ReturnType<typeof signal<string>>
  let activeCategory!: ReturnType<typeof signal<AbilityCategory>>
  let hoveredSlug!: ReturnType<typeof signal<string | null>>
  let filteredAbilities!: ReturnType<typeof computed<AbilityModel[]>>
  let previewAbility!: ReturnType<typeof computed<AbilityModel>>
  reactiveScope(() => {
    searchDraft = signal(query.q ?? '')
    committedSearch = signal(query.q ?? '')
    activeCategory = signal((query.category ?? 'all') as AbilityCategory)
    hoveredSlug = signal<string | null>(null)

    filteredAbilities = computed(() => {
      const phrase = committedSearch().trim().toLowerCase()
      const category = activeCategory()

      return data.abilities.filter((ability) => {
        const matchesSearch = phrase === ''
          || ability.name.toLowerCase().includes(phrase)
          || ability.summary.toLowerCase().includes(phrase)
          || ability.effectSummary.toLowerCase().includes(phrase)
          || ability.tags.some((tag) => tag.toLowerCase().includes(phrase))
        const matchesCategory = category === 'all' || ability.category === category
        return matchesSearch && matchesCategory
      })
    })

    previewAbility = computed(() => {
      const hovered = hoveredSlug()
      if (hovered) {
        return filteredAbilities().find((ability) => ability.slug === hovered) ?? filteredAbilities()[0] ?? data.abilities[0]
      }
      return filteredAbilities().find((ability) => ability.slug === data.featuredAbilitySlug) ?? filteredAbilities()[0] ?? data.abilities[0]
    })
  })

  const updateQuery = (patch: Partial<{ q: string; category: string }>): void => {
    const next = {
      q: patch.q ?? committedSearch(),
      category: patch.category ?? activeCategory(),
    }
    const nextUrl = buildAbilitiesUrl(next, router.location.pathname)
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', nextUrl)
    }
  }

  return (
    <AppShell>
      <div class="page page--abilities">
        <section class="abilities-hero">
          <div class="abilities-hero__copy">
            <PageIntro
              title={data.heroTitle}
              subtitle="Explore the unique abilities that shape strategies and define Pokemon in battle."
              kicker="Powers. Traits. Battle-changing effects."
            />
            <SearchBar
              value={searchDraft}
              onInput={(value) => searchDraft.set(value)}
              onAction={() => {
                committedSearch.set(searchDraft())
                updateQuery({ q: searchDraft() })
              }}
              placeholder="Search abilities by name or effect..."
            />
            <div class="discover-hero__chips">
              <For each={ABILITY_CATEGORY_OPTIONS}>
                {(getOption) => (
                  <FilterChip
                    option={getOption()}
                    active={() => activeCategory() === getOption().value}
                    onToggle={() => {
                      activeCategory.set(getOption().value as AbilityCategory)
                      updateQuery({ category: getOption().value })
                    }}
                  />
                )}
              </For>
            </div>
          </div>
          <div class="abilities-hero__art">
            <div class="abilities-hero__crest">
              <span>{() => previewAbility().crest}</span>
            </div>
          </div>
        </section>

        <SectionFrame title="Featured Abilities" subtitle="Crests flare on hover and open into a focused dossier view.">
          <Show
            when={() => filteredAbilities().length > 0}
            fallback={(
              <div class="empty-state">
                <h3>No abilities match this search.</h3>
                <p>Try another category or clear your search to reveal more powers.</p>
              </div>
            )}
          >
            <div class="ability-grid">
              <For each={filteredAbilities}>
                {(getAbility) => (
                  <AbilityCard
                    ability={getAbility()}
                    active={() => previewAbility().slug === getAbility().slug}
                    onHover={(slug) => hoveredSlug.set(slug)}
                    onOpen={() => {
                      rememberAbilityTransition(getAbility().slug, getAbility().accent)
                      void router.navigate(`/abilities/${getAbility().slug}`)
                    }}
                  />
                )}
              </For>
            </div>
          </Show>
        </SectionFrame>

        <SectionFrame title="Detail Preview" subtitle="Selecting an ability opens the focused detail route.">
          <AbilityPreviewPanel
            ability={previewAbility()}
            onOpenAbility={() => {
              const ability = previewAbility()
              rememberAbilityTransition(ability.slug, ability.accent)
              void router.navigate(`/abilities/${ability.slug}`)
            }}
            onOpenPokemon={(slug) => {
              rememberCardTransition(slug, previewAbility().accent, 'abilities')
              void router.navigate(`/detail/${slug}`)
            }}
          />
        </SectionFrame>

        <SectionFrame title="Popular & Trending Abilities" subtitle="Smaller chips keep the atlas feeling collectible instead of encyclopedic.">
          <div class="related-ability-grid">
            <For each={data.trending}>
              {(getAbility) => (
                <button
                  class="related-ability-card"
                  style={`--accent:${getAbility().accent};`}
                  onClick={() => {
                    rememberAbilityTransition(getAbility().slug, getAbility().accent)
                    void router.navigate(`/abilities/${getAbility().slug}`)
                  }}
                >
                  <span class="related-ability-card__crest">{getAbility().crest}</span>
                  <div>
                    <strong>{getAbility().name}</strong>
                    <p>{getAbility().summary}</p>
                  </div>
                </button>
              )}
            </For>
          </div>
        </SectionFrame>

        <SectionFrame title="Stewie Features On This Page" subtitle="See detailed effects, interactions, and all Pokemon who can use it." tone="midnight">
          <div class="steering-note">
            <p>Query-backed ability search updates only the card roster, the preview panel, and the focused count-sensitive content.</p>
            <p>Each selected crest opens its own route-owned page so deep linking and card-to-hero transitions stay clean and Stewie-native.</p>
          </div>
        </SectionFrame>
      </div>
    </AppShell>
  )
}
