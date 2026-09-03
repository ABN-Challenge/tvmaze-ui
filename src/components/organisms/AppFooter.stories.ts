import preview from '../../../.storybook/preview'
import AppFooter from './AppFooter.vue'

const meta = preview.meta({
  title: 'Organisms/AppFooter',
  component: AppFooter,
  tags: ['autodocs'],
  argTypes: {
    sourceName: { control: 'text' },
    sourceHref: { control: 'text' },
    licenseNote: { control: 'text' },
  },
  args: {
    sourceName: 'TVmaze',
    sourceHref: 'https://www.tvmaze.com/',
    licenseNote: 'CC BY-SA',
  },
})

export const Default = meta.story()
