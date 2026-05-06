import { batch, reactiveScope, signal, For } from '@stewie-js/core'
import type { JSXElement } from '@stewie-js/core'
import { useRouteData, useRouter } from '@stewie-js/router'
import { AppShell, EvolutionPath, MetadataGrid, SectionFrame, SpeciesHero, SynergyFooter, VariantCard } from '../components/ui.js'
import type { SpeciesModel } from '../data/pokedex.js'
import { appState, rememberCardTransition } from '../state/app-state.js'

export function SpeciesPage(): JSXElement {
  const species = useRouteData<SpeciesModel>()
  const router = useRouter()

  batch(() => {
    appState.selectedSpeciesSlug = species.slug
    appState.selectedPokemonSlug = species.slug
  })

  let hoveredNodeId!: ReturnType<typeof signal<string | null>>
  let activeVariantId!: ReturnType<typeof signal<string>>
  reactiveScope(() => {
    hoveredNodeId = signal<string | null>(null)
    activeVariantId = signal(species.variants[0]?.id ?? 'default')
  })

  const activeVariant = () => species.variants.find((variant) => variant.id === activeVariantId()) ?? species.variants[0]

  return (
    <AppShell>
      <div class="page page--species">
        <SpeciesHero
          species={species}
          activeVariant={activeVariant}
          onOpenDetail={() => {
            rememberCardTransition(species.slug, species.accent)
            void router.navigate(`/pokemon/${species.slug}`)
          }}
        />

        <SectionFrame title="Evolution Path" subtitle="Sigil path draws in to reveal the full lineage." tone="midnight">
          <EvolutionPath species={species} activeNodeId={hoveredNodeId} onHover={(id) => hoveredNodeId.set(id)} />
        </SectionFrame>

        <SectionFrame title="Species Information" subtitle="Metadata cards keep the same content in every layout.">
          <div>
            <MetadataGrid items={species.metadata} />
            <div class="trainer-note">
              <h3>Trainer Notes</h3>
              <p>{species.trainerNote}</p>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame title="Forms & Variants" subtitle="Cards fan open on scroll with the same motion language.">
          <div class="variant-grid">
            <For each={() => species.variants}>
              {(getVariant) => (
                <VariantCard
                  variant={getVariant()}
                  active={() => activeVariantId() === getVariant().id}
                  onPick={() => activeVariantId.set(getVariant().id)}
                />
              )}
            </For>
          </div>
        </SectionFrame>

        <SectionFrame title="Lineage Synergy" subtitle="Related forms, pools, and matchups stay collectible instead of encyclopedic." tone="midnight">
          <SynergyFooter species={species} />
        </SectionFrame>
      </div>
    </AppShell>
  )
}
