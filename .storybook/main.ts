import { defineMain } from '@storybook/vue3-vite/node'

export default defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  features: {
    experimentalTestSyntax: true,
    componentsManifest: true,
    experimentalComponentsManifest: true,
    experimentalDocgenServer: true,
  },
  tags: {
    live: { defaultFilterSelection: 'exclude' },
  },
  async viteFinal(config, { configType }) {
    config.plugins = config.plugins?.flat().filter((plugin) => {
      if (!plugin || typeof plugin !== 'object' || !('name' in plugin)) return true
      const name = String(plugin.name)
      return !/federation|module-federation|proxyRemoteEntry|^mf/i.test(name)
    })

    if (configType === 'PRODUCTION') {
      config.base = '/tvmaze-ui/'
    }

    return config
  },
})
