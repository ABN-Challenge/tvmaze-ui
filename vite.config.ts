/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'
import { fileURLToPath, URL } from 'node:url'

const isTest = Boolean(process.env.VITEST)
const isStorybook = Boolean(process.env.STORYBOOK) || process.argv.some((arg) => arg.includes('storybook'))
const disableFederation = isTest || isStorybook
const isProd = process.env.NODE_ENV === 'production'
const base = isProd && !isStorybook ? '/tvmaze-ui/' : '/'

export default defineConfig({
  base,
  plugins: [
    vue(),
    tailwindcss(),
    !disableFederation &&
      federation({
        name: 'tvmaze_ui',
        filename: 'remoteEntry.js',
        exposes: {
          './theme': './src/theme.ts',
          './styles': './src/load-styles.ts',
          './SkipLink': './src/components/atoms/SkipLink.vue',
          './Button': './src/components/atoms/Button.vue',
          './RatingBadge': './src/components/atoms/RatingBadge.vue',
          './LoadingState': './src/components/atoms/LoadingState.vue',
          './SearchInput': './src/components/molecules/SearchInput.vue',
          './ResponsiveSearch': './src/components/molecules/ResponsiveSearch.vue',
          './ShowCard': './src/components/molecules/ShowCard.vue',
          './ShowCardGrid': './src/components/molecules/ShowCardGrid.vue',
          './EmptyState': './src/components/molecules/EmptyState.vue',
          './ErrorBanner': './src/components/molecules/ErrorBanner.vue',
          './SkeletonRow': './src/components/molecules/SkeletonRow.vue',
          './AppHeader': './src/components/organisms/AppHeader.vue',
          './AppFooter': './src/components/organisms/AppFooter.vue',
          './AppShell': './src/components/organisms/AppShell.vue',
          './PageContainer': './src/components/organisms/PageContainer.vue',
          './GenreRow': './src/components/organisms/GenreRow.vue',
          './ShowHero': './src/components/organisms/ShowHero.vue',
        },
        shared: {
          vue: { singleton: true, requiredVersion: '3.5.13' },
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5001,
    strictPort: true,
    origin: 'http://localhost:5001',
    cors: true,
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true,
  },
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    modulePreload: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  esbuild: {
    target: 'esnext',
  },
  test: {
    // Unit defaults; vitest.workspace.ts defines named unit + storybook projects.
    environment: 'jsdom',
    globals: true,
  },
})
