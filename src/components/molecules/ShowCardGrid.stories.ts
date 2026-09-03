import preview from '../../../.storybook/preview'
import ShowCardGrid from './ShowCardGrid.vue'
import { demoShows } from '../../storybook/fixtures'

const meta = preview.meta({
  title: 'Molecules/ShowCardGrid',
  component: ShowCardGrid,
  tags: ['autodocs'],
  args: {
    shows: demoShows,
    label: 'Search results',
    getShowLink: (show: { id: number }) => `/shows/${show.id}`,
  },
})

export const Default = meta.story()
