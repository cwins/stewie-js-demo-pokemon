import { Router, Route } from '@stewie-js/router'
import type { JSXElement } from '@stewie-js/core'
import { loadAbilitiesData, loadAbilityDetail, loadDiscoverData, loadPokemonDetail } from './data/pokedex.js'
import { AbilityDetailPage } from './pages/ability-detail.js'
import { AbilitiesPage } from './pages/abilities.js'
import { DiscoverPage } from './pages/discover.js'
import { DetailPage } from './pages/detail.js'
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
    path="/abilities"
    component={AbilitiesPage}
    load={async () => loadAbilitiesData()}
  />,
  <Route
    path="/abilities/:ability"
    component={AbilityDetailPage}
    load={async (params) => loadAbilityDetail(params.ability)}
  />,
  <Route
    path="/detail/:pokemon"
    component={DetailPage}
    load={async (params) => loadPokemonDetail(params.pokemon)}
  />,
] as JSXElement[]

export function App({ initialUrl }: { initialUrl?: string } = {}): JSXElement {
  return (
    <Router initialUrl={initialUrl} fallback={<div class="route-loading">Charting a fresh route...</div>}>
      {appRoutes}
    </Router>
  )
}
