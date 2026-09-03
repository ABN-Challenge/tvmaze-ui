import preview from '../../../.storybook/preview'
import { expect, fn, userEvent } from 'storybook/test'
import Button from './Button.vue'

const meta = preview.meta({
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'cta', 'danger'],
      description: 'Visual style aligned with ABN green/yellow.',
    },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: {
    variant: 'primary',
    type: 'button',
    disabled: false,
    onClick: fn(),
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args" @click="args.onClick">{{ args.default || 'Button' }}</Button>`,
  }),
})

export const Primary = meta.story({
  args: { default: 'Primary' },
})

Primary.test('calls onClick when clicked', async ({ canvas, args }) => {
  const button = await canvas.findByRole('button', { name: 'Primary' })
  await userEvent.click(button)
  await expect(args.onClick).toHaveBeenCalled()
})

export const Cta = meta.story({
  args: { variant: 'cta', default: 'Search' },
})

export const Secondary = meta.story({
  args: { variant: 'secondary', default: 'Secondary' },
})

export const Ghost = meta.story({
  args: { variant: 'ghost', default: '← Back' },
})

export const Danger = meta.story({
  args: { variant: 'danger', default: 'Try again' },
})

export const Disabled = meta.story({
  args: { disabled: true, default: 'Disabled' },
})

Disabled.test('does not call onClick when disabled', async ({ canvas, args }) => {
  const button = await canvas.findByRole('button', { name: 'Disabled' })
  await userEvent.click(button)
  await expect(args.onClick).not.toHaveBeenCalled()
})
