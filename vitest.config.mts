import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    exclude: [...configDefaults.exclude, 'e2e/*', '**/*{.,-}{type}.?ts'],
    coverage: {
      include: [
        // global
        'src/shared/utils/*.ts',
        'src/shared/transforms/*.ts',
        // frontend
        'src/frontend/hooks/*.ts',
        'src/frontend/utils/*.ts',
        'src/frontend/transforms/*.ts',
        'src/frontend/features/**/services/*.ts',
        'src/frontend/features/**/utils/*.ts',
        'src/frontend/features/**/transforms/*.ts',
        // payload
        'src/payload/features/**/utils/*.ts',
        // add test collection
        'src/payload/features/**/collections/*.ts',
      ],
      exclude: ['**/*.style.ts', '**/*.stories.ts', '**/*{.,-}{type}.?ts'],
    },
  },
})
