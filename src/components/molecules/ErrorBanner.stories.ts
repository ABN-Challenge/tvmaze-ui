import preview from '../../../.storybook/preview'
import { expect, fn, userEvent } from 'storybook/test'
import ErrorBanner from './ErrorBanner.vue'

const meta = preview.meta({
  title: 'Molecules/ErrorBanner',
  component: ErrorBanner,
  argTypes: {
    message: { control: 'text' },
    actionLabel: { control: 'text' },
    flush: { control: 'boolean' },
  },
  args: {
    message: 'Could not load shows from TVmaze. Please try again.',
    actionLabel: 'Try again',
    flush: false,
    onRetry: fn(),
  },
})

export const Default = meta.story()

Default.test('emits retry when the action is clicked', async ({ canvas, args }) => {
  const retry = await canvas.findByTestId('error-retry')
  await userEvent.click(retry)
  await expect(args.onRetry).toHaveBeenCalled()
})

export const Flush = meta.story({
  args: { flush: true },
  decorators: [
    () => ({
      template: '<div class="px-4 sm:px-6"><story /></div>',
    }),
  ],
})
