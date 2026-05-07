import { describe, it, expect } from 'vitest'
import { renderToString } from '@stewie-js/testing'
import { Router, createSsrRouter } from '@stewie-js/router'
import { appRoutes } from './app.js'

describe('App', () => {
  it('renders the discover route with query-backed filtering', async () => {
    const router = await createSsrRouter('/discover?q=pika&type=electric', appRoutes)
    const result = await renderToString(<Router router={router}>{appRoutes}</Router>)
    expect(result.html).toContain('Discover')
    expect(result.html).toContain('Pikachu')
  })

  it('renders the abilities route with query-backed filtering', async () => {
    const router = await createSsrRouter('/abilities?q=blaze&category=offense', appRoutes)
    const result = await renderToString(<Router router={router}>{appRoutes}</Router>)
    expect(result.html).toContain('Abilities Atlas')
    expect(result.html).toContain('Blaze')
  })

  it('renders the detail route with loader-owned data', async () => {
    const router = await createSsrRouter('/detail/charizard', appRoutes)
    const result = await renderToString(<Router router={router}>{appRoutes}</Router>)
    expect(result.html).toContain('Charizard')
    expect(result.html).toContain('Flamethrower')
    expect(result.html).toContain('Solar Power')
  })

  it('renders the ability detail route with loader-owned data', async () => {
    const router = await createSsrRouter('/abilities/blaze', appRoutes)
    const result = await renderToString(<Router router={router}>{appRoutes}</Router>)
    expect(result.html).toContain('Blaze')
    expect(result.html).toContain('Pokemon With Blaze')
    expect(result.html).toContain('Charizard')
  })
})
