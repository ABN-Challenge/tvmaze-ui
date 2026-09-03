import preview from '../../../.storybook/preview'
import PageContainer from './PageContainer.vue'
import EmptyState from '../molecules/EmptyState.vue'

const meta = preview.meta({
  title: 'Organisms/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
  render: (args) => ({
    components: { PageContainer, EmptyState },
    setup: () => ({ args }),
    template: `
      <PageContainer class="space-y-6">
        <EmptyState title="Inside PageContainer" message="max-w-7xl with consistent horizontal padding." />
      </PageContainer>
    `,
  }),
})

export const Default = meta.story()
