import preview from '../../../.storybook/preview'
import RatingBadge from './RatingBadge.vue'

const meta = preview.meta({
  title: 'Atoms/RatingBadge',
  component: RatingBadge,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 10, step: 0.1 },
      description: 'Average rating from TVmaze. Null/undefined shows Unrated.',
    },
  },
  args: {
    value: 8.4,
  },
})

export const Rated = meta.story()

export const Unrated = meta.story({
  args: { value: null },
})
