import { signal, computed, batch, reactiveScope, Show, Switch, Match } from '@stewie-js/core'
import type { JSXElement } from '@stewie-js/core'
import { Shell } from '../shell.js'

export function CounterPage(): JSXElement {
  let count!: ReturnType<typeof signal<number>>
  let doubled!: ReturnType<typeof computed<number>>
  let resets!: ReturnType<typeof signal<number>>
  reactiveScope(() => {
    count = signal(0)
    doubled = computed(() => count() * 2)
    resets = signal(0)
  })

  return (
    <Shell>
      <div class="page">
        <h1 class="page-title">Counter</h1>
        <p class="page-subtitle">
          Signals update only the exact DOM nodes that depend on them —
          no component re-render, no diffing.
        </p>

        <div class="card counter-card">
          <div class="counter-value">{() => count()}</div>
          <div class="counter-meta">
            {/* Switch/Match: only the first matching branch is mounted in the DOM */}
            <Switch>
              <Match when={() => count() < 0}><span>negative · </span></Match>
              <Match when={() => count() === 0}><span>zero · </span></Match>
              <Match when={() => count() > 0}><span>positive · </span></Match>
            </Switch>
            <span>{() => `doubled: ${doubled()}`}</span>
          </div>
          <div class="counter-controls">
            <button class="btn btn-outline" onClick={() => count.update((n) => n - 1)}>−</button>
            {/* batch() groups two signal writes into one notification pass */}
            <button class="btn btn-ghost" onClick={() => batch(() => { count.set(0); resets.update((n) => n + 1) })}>Reset</button>
            <button class="btn btn-primary" onClick={() => count.update((n) => n + 1)}>+</button>
          </div>
          <Show when={() => resets() > 0}>
            <p class="counter-meta">{() => `Reset ${resets()} ${resets() === 1 ? 'time' : 'times'}`}</p>
          </Show>
        </div>
      </div>
    </Shell>
  )
}
