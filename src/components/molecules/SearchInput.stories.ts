import preview from '../../../.storybook/preview'
import { expect, fn, userEvent } from 'storybook/test'
import { ref, watch } from 'vue'
import SearchInput from './SearchInput.vue'

const meta = preview.meta({
  title: 'Molecules/SearchInput',
  component: SearchInput,
  argTypes: {
    modelValue: { control: 'text', description: 'Controlled search query' },
    placeholder: { control: 'text' },
    label: { control: 'text', description: 'Accessible label for screen readers' },
    id: { control: 'text' },
  },
  args: {
    modelValue: '',
    placeholder: 'Search shows by name',
    label: 'Search TV shows',
    onSubmit: fn(),
    'onUpdate:modelValue': fn(),
  },
  render: (args) => ({
    components: { SearchInput },
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
      <SearchInput
        v-model="value"
        :placeholder="args.placeholder"
        :label="args.label"
        :id="args.id"
        @submit="args.onSubmit"
      />
    `,
  }),
})

export const Empty = meta.story()

Empty.test('submits the typed query', async ({ canvas, args }) => {
  const search = await canvas.findByRole('searchbox')
  await userEvent.clear(search)
  await userEvent.type(search, 'girls')
  await userEvent.keyboard('{Enter}')
  await expect(args.onSubmit).toHaveBeenCalled()
})

Empty.test('exposes a labelled search form', async ({ canvas }) => {
  await expect(
    await canvas.findByRole('search', { name: 'Search TV shows' }),
  ).toBeInTheDocument()
  await expect(
    await canvas.findByRole('searchbox', { name: 'Search TV shows' }),
  ).toBeInTheDocument()
})

export const Prefilled = meta.story({
  args: { modelValue: 'girls' },
})
