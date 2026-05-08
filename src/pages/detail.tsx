import { batch, computed, reactiveScope, signal, For, Match, Show, Switch } from '@stewie-js/core'
import type { JSXElement } from '@stewie-js/core'
import { useRouteData, useRouter } from '@stewie-js/router'
import {
  AbilityChip,
  AppShell,
  MoveChip,
  PageIntro,
  QuickFactItem,
  SectionFrame,
  StatMeter,
  TabRail,
  TypeBadge,
} from '../components/ui.js'
import type { PokemonCardModel } from '../data/pokedex.js'
import { appState, rememberAbilityTransition, rememberCardTransition } from '../state/app-state.js'

const DETAIL_TABS = [
  { value: 'habitat', label: 'Habitat' },
  { value: 'evolution', label: 'Evolution' },
] as const

export function DetailPage(): JSXElement {
  const pokemon = useRouteData<PokemonCardModel>()
  const router = useRouter()

  batch(() => {
    appState.selectedPokemonSlug = pokemon.slug
    appState.selectedAbilitySlug = pokemon.abilities[0]?.slug ?? 'blaze'
  })

  let activeTab!: ReturnType<typeof signal<'habitat' | 'evolution'>>
  let totalStats!: ReturnType<typeof computed<number>>
  reactiveScope(() => {
    activeTab = signal<'habitat' | 'evolution'>('habitat')
    totalStats = computed(() => Object.values(pokemon.stats).reduce((sum, value) => sum + value, 0))
  })

  return (
    <AppShell>
      <div class="page page--detail">
        <section class="detail-hero" style={`--accent:${pokemon.accent}; --glow:${pokemon.glow};`}>
          <div class="detail-hero__copy">
            <PageIntro title={pokemon.name} subtitle={pokemon.classification} kicker={pokemon.number} />
            <div class="detail-hero__types">
              <For each={pokemon.types}>
                {(getType) => <TypeBadge type={getType()} />}
              </For>
            </div>
            <p class="detail-hero__summary">{pokemon.spotlight}</p>
            <div class="detail-hero__actions">
              <button
                class="detail-hero__cta"
                onClick={() => {
                  const ability = pokemon.abilities[0]
                  if (!ability) return
                  rememberAbilityTransition(ability.slug, pokemon.accent)
                  void router.navigate(`/abilities/${ability.slug}`)
                }}
              >
                Open {pokemon.abilities[0]?.name ?? 'Ability'}
              </button>
            </div>
          </div>

          <div class="detail-hero__art" style={`view-transition-name:pokemon-art-${pokemon.slug};`}>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        </section>

        <div class="detail-grid">
          <SectionFrame title="Abilities" subtitle="Signature passive traits.">
            <div class="ability-list">
              <For each={pokemon.abilities}>
                {(getAbility) => (
                  <AbilityChip
                    name={getAbility().name}
                    summary={getAbility().summary}
                    accent={pokemon.accent}
                    onClick={() => {
                      rememberAbilityTransition(getAbility().slug, pokemon.accent)
                      void router.navigate(`/abilities/${getAbility().slug}`)
                    }}
                  />
                )}
              </For>
            </div>
          </SectionFrame>

          <SectionFrame title="Base Stats" subtitle="Stat charge animation stays consistent across breakpoints.">
            <div class="stat-list">
              <StatMeter label="HP" value={pokemon.stats.hp} accent="#63b96a" />
              <StatMeter label="Attack" value={pokemon.stats.attack} accent="#f08a3e" />
              <StatMeter label="Defense" value={pokemon.stats.defense} accent="#f4c542" />
              <StatMeter label="Sp. Atk" value={pokemon.stats.spAtk} accent="#5bc7f6" />
              <StatMeter label="Sp. Def" value={pokemon.stats.spDef} accent="#7e6dff" />
              <StatMeter label="Speed" value={pokemon.stats.speed} accent="#ff5f86" />
              <div class="stat-total">
                <span>Total</span>
                <strong>{() => totalStats()}</strong>
              </div>
            </div>
          </SectionFrame>

          <SectionFrame title="Quick Facts" subtitle="Same fact set at every size.">
            <div class="quick-facts-grid">
              <For each={pokemon.quickFacts}>
                {(getFact) => <QuickFactItem label={getFact().label} value={getFact().value} />}
              </For>
            </div>
          </SectionFrame>
        </div>

        <SectionFrame title="Moves" subtitle="Move chips arc in with a shared motion rhythm.">
          <div class="move-grid">
            <For each={pokemon.moves}>
              {(getMove, getIndex) => (
                <MoveChip
                  name={getMove().name}
                  type={getMove().type}
                  pp={getMove().pp}
                  summary={getMove().summary}
                  index={getIndex()}
                />
              )}
            </For>
          </div>
        </SectionFrame>

        <TabRail
          value={activeTab}
          tabs={[...DETAIL_TABS]}
          onChange={(value) => activeTab.set(value as 'habitat' | 'evolution')}
        />

        <Switch>
          <Match when={() => activeTab() === 'habitat'}>
            <SectionFrame title={pokemon.tabs.habitat.title} tone="midnight">
              <div class="narrative-panel">
                <div>
                  <p class="narrative-panel__body">{pokemon.tabs.habitat.body}</p>
                </div>
              </div>
            </SectionFrame>
          </Match>
          <Match when={true}>
            <SectionFrame title={pokemon.tabs.evolution.title} tone="midnight">
              <div class="narrative-panel">
                <div>
                  <p class="narrative-panel__body">{pokemon.tabs.evolution.body}</p>
                  <Show when={() => (pokemon.evolutionLine?.length ?? 0) > 0}>
                    <div class="evolution-path detail-evolution-path">
                      <For each={() => pokemon.evolutionLine ?? []}>
                        {(getStep, getIndex) => (
                          <div class="evolution-path__step">
                            <button
                              class={() => `evolution-node${getStep().isCurrent ? ' is-active' : ''}`}
                              onClick={() => {
                                rememberCardTransition(getStep().slug, pokemon.accent)
                                void router.navigate(`/detail/${getStep().slug}`)
                              }}
                            >
                              <span class="evolution-node__ring" aria-hidden="true" />
                              <img src={getStep().image} alt={getStep().name} />
                              <small>{getStep().number}</small>
                              <strong>{getStep().name}</strong>
                            </button>
                            <Show when={() => getIndex() < (pokemon.evolutionLine?.length ?? 0) - 1}>
                              <span class="evolution-path__arrow" aria-hidden="true">→</span>
                            </Show>
                          </div>
                        )}
                      </For>
                    </div>
                  </Show>
                </div>
              </div>
            </SectionFrame>
          </Match>
        </Switch>
      </div>
    </AppShell>
  )
}
