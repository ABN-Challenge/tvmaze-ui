import preview from '../../../.storybook/preview'
import AppHeader from './AppHeader.vue'
import SearchInput from '../molecules/SearchInput.vue'
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
    components: { AppHeader, SearchInput },
    setup() {
      const query = ref('girls')
      return { args, query }
    },
    template: `
      <AppHeader v-bind="args">
        <SearchInput v-model="query" />
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
