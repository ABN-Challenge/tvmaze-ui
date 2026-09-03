import preview from '../../../.storybook/preview'
import ShowCard from './ShowCard.vue'
import { demoShow, unratedShow } from '../../storybook/fixtures'

const meta = preview.meta({
  title: 'Molecules/ShowCard',
  component: ShowCard,
  tags: ['autodocs'],
  argTypes: {
    to: { control: 'text', description: 'Optional href for navigation' },
    show: { control: 'object' },
  },
  args: {
    show: demoShow,
    to: '#/shows/1',
  },
})

export const WithImage = meta.story()

export const MissingImageUnrated = meta.story({
  args: {
    show: unratedShow,
    to: undefined,
  },
})
