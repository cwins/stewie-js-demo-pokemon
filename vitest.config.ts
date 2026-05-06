import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    // Use @stewie-js/core's jsx-runtime for TSX test files.
    jsxImportSource: '@stewie-js/core',
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
})
