import { signal, reactiveScope, Show, For, defineResource, useResource } from '@stewie-js/core'
import type { Resource, JSXElement } from '@stewie-js/core'
import { useRouter } from '@stewie-js/router'
import { Shell } from '../shell.js'

// Simulated async data load — in a real app replace with:
// const fetchTip = defineResource((_src: void, { signal }: { signal: AbortSignal }) =>
//   fetch('/api/tip', { signal }).then(r => r.json())
// )
const fetchTip = defineResource(async (_src: void, _opts: { signal: AbortSignal }): Promise<{ tip: string }> => {
  await new Promise<void>((r) => setTimeout(r, 600))
  return { tip: 'Only the DOM nodes that changed are updated — no virtual DOM diffing.' }
})

const FEATURES = [
  'Signal-based reactivity — no virtual DOM',
  'Fine-grained DOM updates (only what changed)',
  'Server-side rendering with hydration',
  'TypeScript-first with full type inference',
  'Tiny runtime, zero dependencies',
]

export function HomePage(): JSXElement {
  const router = useRouter()

  let showFeatures!: ReturnType<typeof signal<boolean>>
  let tipResource!: Resource<{ tip: string }>
  reactiveScope(() => {
    showFeatures = signal(false)
    // defineResource at module scope + useResource inside component/scope
    tipResource = useResource(fetchTip, () => undefined)
  })

  return (
    <Shell>
      <div class="page">
        <div class="hero">
          <h1 class="hero-title">Hello from <strong>Stewie</strong></h1>
          <p class="hero-subtitle">
            Fine-grained signal-based reactivity. No virtual DOM. SSR built-in.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" onClick={() => router.navigate('/counter')}>
              Try the counter →
            </button>
            {/* The compiler auto-wraps signal reads in JSX — no () => needed */}
            <button class="btn btn-outline" onClick={() => showFeatures.update((v) => !v)}>
              {showFeatures() ? 'Hide features' : 'What makes it fast?'}
            </button>
          </div>
        </div>

        {/* useResource() — reactive loading/data/error signals for async operations */}
        <div class="section">
          <h2 class="section-title">Async data</h2>
          <div class="card">
            <Show
              when={() => !tipResource.loading()}
              fallback={<p class="section-desc">Loading…</p>}
            >
              <p>{() => tipResource.data()?.tip ?? ''}</p>
            </Show>
          </div>
        </div>

        <Show when={showFeatures}>
          <ul class="features-list">
            <For each={FEATURES}>
              {(getFeature: () => string) => <li>{() => getFeature()}</li>}
            </For>
          </ul>
        </Show>
      </div>
    </Shell>
  )
}
