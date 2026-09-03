import preview from '../../../.storybook/preview'
import { expect, fn, userEvent } from 'storybook/test'
import { ref, watch } from 'vue'
import ResponsiveSearch from './ResponsiveSearch.vue'

const meta = preview.meta({
  title: 'Molecules/ResponsiveSearch',
  component: ResponsiveSearch,
  parameters: {
    docs: {
      description: {
        component: 'Desktop search field + mobile Search button for the app header.',
      },
    },
  },
  args: {
    modelValue: '',
    onSubmit: fn(),
    onMobileSearch: fn(),
    'onUpdate:modelValue': fn(),
  },
  render: (args) => ({
    components: { ResponsiveSearch },
    setup() {
      const value = ref(args.modelValue)
      watch(
        () => args.modelValue,
        (next) => {
          value.value = next
        },
      )
      return { args, value }
    },
    template: `
      <div class="bg-[var(--tv-header)] p-4">
        <ResponsiveSearch
          v-model="value"
          :placeholder="args.placeholder"
          @submit="args.onSubmit"
          @mobile-search="args.onMobileSearch"
        />
      </div>
    `,
  }),
})

export const Desktop = meta.story({
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
})

Desktop.test('shows the desktop search field', async ({ canvas }) => {
  await expect(await canvas.findByRole('searchbox')).toBeInTheDocument()
})

export const Mobile = Desktop.extend({
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
})

Mobile.test('shows the mobile Search button', async ({ canvas, args }) => {
  const button = await canvas.findByRole('button', { name: 'Search' })
  await userEvent.click(button)
  await expect(args.onMobileSearch).toHaveBeenCalled()
})
