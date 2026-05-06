import { batch, reactiveScope, store } from '@stewie-js/core'

export const appState = reactiveScope(() => store({
  navOpen: false,
  selectedPokemonSlug: 'pikachu',
  selectedSpeciesSlug: 'charizard',
  transition: {
    origin: 'discover' as 'discover' | 'detail' | 'species',
    slug: 'pikachu',
    accent: '#f4c542',
  },
}))

export function rememberCardTransition(slug: string, accent: string): void {
  batch(() => {
    appState.selectedPokemonSlug = slug
    appState.transition.origin = 'discover'
    appState.transition.slug = slug
    appState.transition.accent = accent
    appState.navOpen = false
  })
}

export function rememberSpeciesTransition(slug: string, accent: string): void {
  batch(() => {
    appState.selectedSpeciesSlug = slug
    appState.transition.origin = 'detail'
    appState.transition.slug = slug
    appState.transition.accent = accent
    appState.navOpen = false
  })
}
