import { For } from '@stewie-js/core'
import type { JSXElement } from '@stewie-js/core'
import { Shell } from '../shell.js'

const PRIMITIVES = [
  { name: 'signal(value)', desc: 'Reactive value — read with sig(), write with sig.set()' },
  { name: 'sig.peek()', desc: 'Read current value without registering a subscription' },
  { name: 'computed(fn)', desc: 'Derived value — lazy, memoized, auto-tracked' },
  { name: 'effect(fn)', desc: 'Side effect — re-runs when any accessed signal changes' },
  { name: 'store(object)', desc: 'Reactive object — path-level subscriptions via Proxy' },
]

export function AboutPage(): JSXElement {
  return (
    <Shell>
      <div class="page">
        <h1 class="page-title">About</h1>
        <p class="page-subtitle">
          Stewie is a TypeScript web framework with fine-grained signal-based reactivity
          and no virtual DOM. This app was scaffolded with <code>create-stewie</code>.
        </p>

        <div class="section">
          <h2 class="section-title">Core primitives</h2>
          <p class="section-desc">Everything reactive builds on these four primitives.</p>
          <ul class="features-list">
            <For each={PRIMITIVES}>
              {(getP: () => typeof PRIMITIVES[number]) => (
                <li>
                  <span>
                    <strong>{() => getP().name}</strong>
                    {' — '}
                    {() => getP().desc}
                  </span>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </Shell>
  )
}
