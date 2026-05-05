import { Nav } from './nav.js'
import type { JSXElement } from '@stewie-js/core'

// Shell wraps each page with the persistent nav + main container.
// It is rendered *inside* RouterContext (as part of a matched route component),
// so Nav can safely call useRouter() for the active-link highlighting.
export function Shell({ children }: { children: JSXElement }): JSXElement {
  return (
    <div class="layout">
      <Nav title="." />
      <main class="main">
        {children}
      </main>
    </div>
  )
}
