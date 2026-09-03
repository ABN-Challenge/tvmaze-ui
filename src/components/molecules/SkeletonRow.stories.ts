import preview from '../../../.storybook/preview'
import SkeletonRow from './SkeletonRow.vue'

const meta = preview.meta({
  title: 'Molecules/SkeletonRow',
  component: SkeletonRow,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 1, max: 12 } },
  },
  args: {
    count: 6,
  },
})

export const Default = meta.story()

export const FewCards = meta.story({
  args: { count: 3 },
})
