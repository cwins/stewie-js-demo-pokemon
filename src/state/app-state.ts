import { batch, reactiveScope, store } from '@stewie-js/core'

export const appState = reactiveScope(() => store({
  selectedPokemonSlug: 'pikachu',
  selectedAbilitySlug: 'blaze',
  transition: {
    origin: 'discover' as 'discover' | 'abilities' | 'ability-detail',
    slug: 'pikachu',
    accent: '#f4c542',
  },
}))

export function rememberCardTransition(slug: string, accent: string, origin: 'discover' | 'abilities' | 'ability-detail' = 'discover'): void {
  batch(() => {
    appState.selectedPokemonSlug = slug
    appState.transition.origin = origin
    appState.transition.slug = slug
    appState.transition.accent = accent
  })
}

export function rememberAbilityTransition(slug: string, accent: string): void {
  batch(() => {
    appState.selectedAbilitySlug = slug
    appState.transition.origin = 'abilities'
    appState.transition.slug = slug
    appState.transition.accent = accent
  })
}
