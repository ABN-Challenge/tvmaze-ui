<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import Button from '../atoms/Button.vue'

defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
  mobileSearch: []
}>()
</script>

<template>
  <div class="flex items-center gap-2" data-testid="responsive-search">
    <div class="hidden w-80 sm:block">
      <SearchInput
        :model-value="modelValue"
        :placeholder="placeholder"
        @update:model-value="emit('update:modelValue', $event)"
        @submit="emit('submit')"
      />
    </div>
    <div class="sm:hidden">
      <Button variant="secondary" @click="emit('mobileSearch')">Search</Button>
    </div>
  </div>
</template>
