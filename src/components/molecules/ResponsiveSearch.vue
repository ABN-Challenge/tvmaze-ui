<script setup lang="ts">
import SearchInput from './SearchInput.vue'

withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    /** Accessible name for the header search landmark. */
    label?: string
    id?: string
    /** Collapse the submit button to an icon on small screens. */
    compact?: boolean
  }>(),
  {
    compact: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()
</script>

<template>
  <div class="w-full min-w-0 flex-1 sm:w-80 sm:flex-none" data-testid="responsive-search">
    <SearchInput
      :model-value="modelValue"
      :placeholder="placeholder"
      :label="label ?? 'Site search'"
      :id="id ?? 'tvmaze-header-search'"
      :compact="compact"
      @update:model-value="emit('update:modelValue', $event)"
      @submit="emit('submit')"
    />
  </div>
</template>
