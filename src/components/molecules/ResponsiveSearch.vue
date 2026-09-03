<script setup lang="ts">
import SearchInput from './SearchInput.vue'

defineProps<{
  modelValue: string
  placeholder?: string
  /** Accessible name for the header search landmark. */
  label?: string
  id?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()
</script>

<template>
  <div class="w-full min-w-0 max-w-xs sm:w-80 sm:max-w-none" data-testid="responsive-search">
    <SearchInput
      :model-value="modelValue"
      :placeholder="placeholder"
      :label="label ?? 'Site search'"
      :id="id ?? 'tvmaze-header-search'"
      @update:model-value="emit('update:modelValue', $event)"
      @submit="emit('submit')"
    />
  </div>
</template>
