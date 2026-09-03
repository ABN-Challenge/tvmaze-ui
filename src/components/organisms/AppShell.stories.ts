import preview from '../../../.storybook/preview'
import AppShell from './AppShell.vue'
import AppHeader from './AppHeader.vue'

const meta = preview.meta({
  title: 'Organisms/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  argTypes: {
    mainId: { control: 'text' },
    showFooter: { control: 'boolean' },
  },
  args: {
    mainId: 'main',
    showFooter: true,
  },
  render: (args) => ({
    components: { AppShell, AppHeader },
    setup: () => ({ args }),
    template: `
      <AppShell v-bind="args">
        <template #header>
          <AppHeader title="Shell demo" />
        </template>
        <div class="px-4 py-8 sm:px-6">Main content goes here.</div>
      </AppShell>
    `,
  }),
})

export const Default = meta.story()
