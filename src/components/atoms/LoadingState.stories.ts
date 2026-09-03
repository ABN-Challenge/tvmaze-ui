import preview from '../../../.storybook/preview'
import LoadingState from './LoadingState.vue'

const meta = preview.meta({
  title: 'Atoms/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
  args: {
    message: 'Loading…',
  },
})

export const Default = meta.story()

export const CustomMessage = meta.story({
  args: { message: 'Fetching shows from TVmaze…' },
})
