import type { JSXElement } from '@stewie-js/core'
import { useLocation, useRouter } from '@stewie-js/router'

function isActive(pathname: string, itemPath: string): boolean {
  if (itemPath === '/discover') {
    return pathname === '/' || pathname === '/discover'
  }

  if (itemPath === '/abilities') {
    return pathname.startsWith('/abilities')
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

  return (
    <header class="top-nav">
      <div class="top-nav__bar">
        <button
          class="top-nav__brand"
          onClick={() => void router.navigate('/discover')}
          aria-label="Open Discover page"
        >
          <span class="top-nav__brand-mark">JS</span>
          <span class="top-nav__brand-copy">
            <strong>Stewie-JS Demo</strong>
            <small>Pokedex showcase</small>
          </span>
        </button>

        <nav class="top-nav__links" aria-label="Primary">
          <NavLink to="/discover" label="Discover" />
          <NavLink to="/abilities" label="Abilities" />
        </nav>

        <div class="top-nav__actions">
          <button class="top-nav__icon" aria-label="Search">⌕</button>
          <button class="top-nav__icon" aria-label="Alerts">◔</button>
        </div>
      </div>
    </header>
  )
}
