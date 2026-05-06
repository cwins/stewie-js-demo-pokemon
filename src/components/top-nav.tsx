import type { JSXElement } from '@stewie-js/core'
import { Show } from '@stewie-js/core'
import { useLocation, useRouter } from '@stewie-js/router'
import { appState } from '../state/app-state.js'

function isActive(pathname: string, itemPath: string): boolean {
  if (itemPath === '/discover') {
    return pathname === '/' || pathname === '/discover'
  }

  if (itemPath === '/pokemon') {
    return pathname.startsWith('/pokemon/')
  }

  if (itemPath === '/species') {
    return pathname.startsWith('/species/')
  }

  return pathname === itemPath
}

function NavLink({ to, label }: { to: string; label: string }): JSXElement {
  const router = useRouter()
  const location = useLocation()

  return (
    <a
      href={to}
      class={() => `top-nav__link${isActive(location.pathname, to) ? ' is-active' : ''}`}
      onClick={(event: Event) => {
        event.preventDefault()
        void router.navigate(to)
      }}
    >
      <span class="top-nav__spark" aria-hidden="true" />
      {label}
    </a>
  )
}

export function TopNav(): JSXElement {
  const router = useRouter()
  const location = useLocation()
  const detailPath = () => location.pathname.startsWith('/pokemon/')
    ? location.pathname
    : `/pokemon/${appState.selectedPokemonSlug}`
  const speciesPath = () => location.pathname.startsWith('/species/')
    ? location.pathname
    : `/species/${appState.selectedSpeciesSlug}`

  return (
    <header class="top-nav">
      <div class="top-nav__bar">
        <button
          class="top-nav__brand"
          onClick={() => void router.navigate('/discover')}
          aria-label="Open Discover page"
        >
          <span class="top-nav__brand-mark">✦</span>
          <span class="top-nav__brand-copy">
            <strong>Stewie Dex</strong>
            <small>Magical field guide</small>
          </span>
        </button>

        <nav class="top-nav__links" aria-label="Primary">
          <NavLink to="/discover" label="Discover" />
          <NavLink to={detailPath()} label="Detail" />
          <NavLink to={speciesPath()} label="Species" />
          <NavLink to="/type-lab" label="Type Lab" />
        </nav>

        <div class="top-nav__actions">
          <button class="top-nav__icon" aria-label="Search">⌕</button>
          <button class="top-nav__icon" aria-label="Alerts">◔</button>
          <button class="top-nav__avatar" aria-label="Trainer profile">
            <span>PK</span>
          </button>
        </div>
      </div>

      <Show when={() => appState.navOpen}>
        <div class="top-nav__mobile-sheet">
          <NavLink to="/discover" label="Discover" />
          <NavLink to={detailPath()} label="Detail" />
          <NavLink to={speciesPath()} label="Species" />
          <NavLink to="/type-lab" label="Type Lab" />
        </div>
      </Show>
    </header>
  )
}
