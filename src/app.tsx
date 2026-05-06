import { Router, Route } from '@stewie-js/router'
import type { JSXElement } from '@stewie-js/core'
import { loadDiscoverData, loadPokemonDetail, loadSpeciesDetail } from './data/pokedex.js'
import { DiscoverPage } from './pages/discover.js'
import { DetailPage } from './pages/detail.js'
import { SpeciesPage } from './pages/species.js'
import './styles.css'

export const appRoutes = [
  <Route
    path="/"
    component={DiscoverPage}
    load={async () => loadDiscoverData('discover')}
  />,
  <Route
    path="/discover"
    component={DiscoverPage}
    load={async () => loadDiscoverData('discover')}
  />,
  <Route
    path="/pokemon/:slug"
    component={DetailPage}
    load={async (params) => loadPokemonDetail(params.slug)}
  />,
  <Route
    path="/species/:slug"
    component={SpeciesPage}
    load={async (params) => loadSpeciesDetail(params.slug)}
  />,
] as JSXElement[]

export function App({ initialUrl }: { initialUrl?: string } = {}): JSXElement {
  return (
    <Router initialUrl={initialUrl} fallback={<div class="route-loading">Charting a fresh route...</div>}>
      {appRoutes}
    </Router>
  )
}
