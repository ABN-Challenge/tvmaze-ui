<script setup lang="ts">
import { computed } from 'vue'
import Button from '../atoms/Button.vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  label?: string
  id?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()

const inputId = computed(() => props.id ?? 'tvmaze-search')
</script>

<template>
  <form
    class="flex w-full max-w-xl items-center gap-2"
    role="search"
    :aria-label="label ?? 'Search TV shows'"
    @submit.prevent="emit('submit')"
  >
    <label class="sr-only" :for="inputId">{{ label ?? 'Search TV shows' }}</label>
    <input
      :id="inputId"
      :value="modelValue"
      type="search"
      autocomplete="off"
      :placeholder="placeholder ?? 'Search shows by name'"
      class="w-full rounded-[var(--tv-radius)] border border-[var(--tv-border)] bg-[var(--tv-surface)] px-3 py-2 text-sm text-[var(--tv-text)] placeholder:text-[var(--tv-muted)]"
      data-testid="search-input"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <Button type="submit" variant="cta" data-testid="search-submit">Search</Button>
  </form>
</template>
