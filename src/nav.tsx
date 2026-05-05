import { useRouter } from '@stewie-js/router'
import type { JSXElement } from '@stewie-js/core'

// NavLink highlights itself when its path matches the current URL.
// The class prop is a reactive function so only that attribute re-runs —
// no component re-render needed.
function NavLink({ to, children }: { to: string; children: string }): JSXElement {
  const router = useRouter()
  return (
    <a
      href={to}
      class={() => `nav-link${router.location.pathname === to ? ' active' : ''}`}
      onClick={(e: Event) => {
        e.preventDefault()
        router.navigate(to)
      }}
    >
      {children}
    </a>
  )
}

export function Nav({ title }: { title: string }): JSXElement {
  return (
    <header class="nav">
      <span class="nav-brand">{title}</span>
      <nav class="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/counter">Counter</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}
