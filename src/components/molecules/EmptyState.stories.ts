import preview from '../../../.storybook/preview'
import EmptyState from './EmptyState.vue'

const meta = preview.meta({
  title: 'Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
  },
  args: {
    title: 'No matches',
    message: 'Try a different spelling or a shorter query.',
  },
})

export const Default = meta.story()
