// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { mount } from '@stewie-js/testing'
import { App } from './app.js'

describe('App', () => {
  it('renders without error', () => {
    // Router renders into a reactive context — verify mount/unmount is clean.
    const result = mount(<App />)
    expect(result.html).not.toBe('')
    result.unmount()
  })
})
