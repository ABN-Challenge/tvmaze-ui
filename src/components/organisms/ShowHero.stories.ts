import preview from '../../../.storybook/preview'
import ShowHero from './ShowHero.vue'
import { demoShow } from '../../storybook/fixtures'

const meta = preview.meta({
  title: 'Organisms/ShowHero',
  component: ShowHero,
  tags: ['autodocs'],
  argTypes: {
    show: { control: 'object' },
    castNames: { control: 'object' },
  },
  args: {
    show: demoShow,
    castNames: ['Damian Lewis', 'Ron Livingston', 'Donnie Wahlberg'],
  },
})

export const Default = meta.story()

export const WithoutCast = meta.story({
  args: { castNames: [] },
})
