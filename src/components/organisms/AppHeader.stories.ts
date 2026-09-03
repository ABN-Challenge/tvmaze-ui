import preview from '../../../.storybook/preview'
import { expect } from 'storybook/test'
import AppHeader from './AppHeader.vue'
import ResponsiveSearch from '../molecules/ResponsiveSearch.vue'
import { ref } from 'vue'

const meta = preview.meta({
  title: 'Organisms/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    homeHref: { control: 'text' },
  },
  args: {
    title: 'TVmaze Explorer',
    subtitle: 'Browse shows by genre and rating',
    homeHref: '#/',
  },
  render: (args) => ({
    components: { AppHeader, ResponsiveSearch },
    setup() {
      const query = ref('girls')
      return { args, query }
    },
    template: `
      <AppHeader v-bind="args">
        <ResponsiveSearch v-model="query" />
      </AppHeader>
    `,
  }),
})

export const WithSearch = meta.story()

export const TitleOnly = meta.story({
  render: (args) => ({
    components: { AppHeader },
    setup: () => ({ args }),
    template: `<AppHeader v-bind="args" />`,
  }),
})

export const Mobile = meta.story({
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
})

Mobile.test('keeps the search field usable at 375px', async ({ canvas }) => {
  const search = await canvas.findByRole('searchbox')
  await expect(search).toBeVisible()
  // The field must not be squeezed out by the brand block.
  await expect(search.getBoundingClientRect().width).toBeGreaterThan(120)
})
