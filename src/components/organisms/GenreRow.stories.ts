import preview from '../../../.storybook/preview'
import GenreRow from './GenreRow.vue'
import { demoShows } from '../../storybook/fixtures'

const meta = preview.meta({
  title: 'Organisms/GenreRow',
  component: GenreRow,
  tags: ['autodocs'],
  argTypes: {
    category: { control: 'text' },
    shows: { control: 'object' },
  },
  args: {
    category: 'Drama',
    shows: demoShows,
    getShowLink: (show: { id: number }) => `/shows/${show.id}`,
  },
})

export const Default = meta.story()

export const Empty = meta.story({
  args: { shows: [] },
})
