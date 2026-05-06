import { mount } from '@stewie-js/core'
import { App } from './app.js'

if (typeof document !== 'undefined') {
  const root = document.getElementById('app')
  if (root) {
    mount(<App />, root)
  }
}
