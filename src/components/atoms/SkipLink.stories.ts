import preview from '../../../.storybook/preview'
import { expect, userEvent } from 'storybook/test'
import SkipLink from './SkipLink.vue'

const meta = preview.meta({
  title: 'Atoms/SkipLink',
  component: SkipLink,
  parameters: {
    docs: {
      description: {
        component: 'Visually hidden until focused. Tab into the canvas to reveal the skip link.',
      },
    },
  },
  argTypes: {
    href: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    href: '#main',
    label: 'Skip to content',
  },
})

export const Default = meta.story()

Default.test('reveals the skip link on focus', async ({ canvas }) => {
  const link = await canvas.findByTestId('skip-link')
  await expect(link).toHaveAttribute('href', '#main')
  link.focus()
  await expect(link).toHaveFocus()
  await userEvent.tab()
})
