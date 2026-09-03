import preview from '../../../.storybook/preview'
import { expect, fn } from 'storybook/test'
import { ref, watch } from 'vue'
import ResponsiveSearch from './ResponsiveSearch.vue'

const meta = preview.meta({
  title: 'Molecules/ResponsiveSearch',
  component: ResponsiveSearch,
  parameters: {
    docs: {
      description: {
        component: 'Header search field for all viewports.',
      },
    },
  },
  args: {
    modelValue: '',
    onSubmit: fn(),
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

Desktop.test('shows the search field', async ({ canvas }) => {
  await expect(await canvas.findByRole('searchbox')).toBeInTheDocument()
})

export const Mobile = Desktop.extend({
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
})

Mobile.test('shows the search field on mobile', async ({ canvas }) => {
  await expect(await canvas.findByRole('searchbox')).toBeInTheDocument()
})
