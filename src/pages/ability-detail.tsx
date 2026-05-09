import { batch, For } from '@stewie-js/core'
import type { JSXElement } from '@stewie-js/core'
import { useRouteData, useRouter } from '@stewie-js/router'
import {
  AbilityFooterCallout,
  AbilityHero,
  AppShell,
  CategoryBadge,
  DetailList,
  PokemonRosterCard,
  RelatedAbilityCard,
  SectionFrame,
} from '../components/ui.js'
import { getRelatedAbilities } from '../data/pokedex.js'
import type { AbilityModel } from '../data/pokedex.js'
import { appState, rememberAbilityTransition, rememberCardTransition } from '../state/app-state.js'

export function AbilityDetailPage(): JSXElement {
  const ability = useRouteData<AbilityModel>()
  const router = useRouter()

  batch(() => {
    appState.selectedAbilitySlug = ability.slug
  })

  const relatedAbilities = getRelatedAbilities(ability)

  return (
    <AppShell title={`${ability.name} Ability | Stewie-JS Demo - Pokedex`}>
      <div class="page page--ability-detail">
        <AbilityHero ability={ability} onBack={() => void router.navigate('/abilities')} />

        <div class="ability-detail-grid">
          <SectionFrame title="Effect Details">
            <div class="detail-copy">
              <p>{ability.summary}</p>
              <div class="detail-copy__facts">
                <div>
                  <span>Trigger</span>
                  <strong>{ability.tags[0] ?? 'Battle Start'}</strong>
                </div>
                <div>
                  <span>Style</span>
                  <strong>{ability.categoryLabel}</strong>
                </div>
                <div>
                  <span>Effect</span>
                  <strong>{ability.effectSummary}</strong>
                </div>
              </div>
            </div>
          </SectionFrame>

          <SectionFrame title="Strategy Notes">
            <DetailList title="Field Notes" items={ability.strategyNotes} accent={ability.accent} />
          </SectionFrame>

          <SectionFrame title="Tags & Categories">
            <div class="tag-cloud">
              <CategoryBadge label={ability.categoryLabel} accent={ability.accent} />
              <For each={ability.tags}>
                {(getTag) => <span class="tag-pill" style={`--accent:${ability.accent};`}>{getTag()}</span>}
              </For>
            </div>
          </SectionFrame>

          <SectionFrame title="Usage & Interactions">
            <DetailList title="Interactions" items={ability.interactionNotes} accent={ability.accent} />
          </SectionFrame>
        </div>

        <SectionFrame title={`Pokemon With ${ability.name}`} subtitle="Selecting a Pokemon transitions into the full detail profile.">
          <div class="roster-grid">
            <For each={ability.users}>
              {(getPokemon) => (
                <PokemonRosterCard
                  pokemon={getPokemon()}
                  accent={ability.accent}
                  onOpen={() => {
                    rememberCardTransition(getPokemon().slug, ability.accent, 'ability-detail')
                    void router.navigate(`/detail/${getPokemon().slug}`)
                  }}
                />
              )}
            </For>
          </div>
        </SectionFrame>

        <SectionFrame title="Related Abilities" subtitle="Open another crest to continue the strategy trail.">
          <div class="related-ability-grid">
            <For each={relatedAbilities}>
              {(getRelated) => (
                <RelatedAbilityCard
                  ability={getRelated()}
                  onOpen={() => {
                    rememberAbilityTransition(getRelated().slug, getRelated().accent)
                    void router.navigate(`/abilities/${getRelated().slug}`)
                  }}
                />
              )}
            </For>
          </div>
        </SectionFrame>

        <AbilityFooterCallout />
      </div>
    </AppShell>
  )
}
