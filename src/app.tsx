import { Router, Route } from '@stewie-js/router'
import { lazy } from '@stewie-js/core'
import type { JSXElement } from '@stewie-js/core'
import './styles.css'

// lazy() code-splits each page — the bundle for that page is only loaded
// when the user navigates to it for the first time.
const HomePage = lazy(() => import('./pages/home.js').then((m) => m.HomePage))
const CounterPage = lazy(() => import('./pages/counter.js').then((m) => m.CounterPage))
const AboutPage = lazy(() => import('./pages/about.js').then((m) => m.AboutPage))

// Router must have only <Route> elements as direct children —
// the Router scans them to build the route table.
// Layout (nav + wrapper) lives inside each page so it has RouterContext.
export function App({ initialUrl }: { initialUrl?: string } = {}): JSXElement {
  return (
    <Router initialUrl={initialUrl}>
      <Route path="/" component={HomePage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/about" component={AboutPage} />
    </Router>
  )
}
