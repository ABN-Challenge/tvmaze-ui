<script setup lang="ts">
import { computed } from 'vue'
import Button from '../atoms/Button.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    label?: string
    id?: string
    /** Collapse the submit button to an icon below the `sm` breakpoint. */
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()

const inputId = computed(() => props.id ?? 'tvmaze-search')
const submitLabel = computed(() => props.label ?? 'Search TV shows')
</script>

<template>
  <form
    class="flex w-full min-w-0 max-w-xl items-center gap-2"
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
      class="w-full min-w-0 flex-1 rounded-[var(--tv-radius)] border border-[var(--tv-border)] bg-[var(--tv-surface)] px-3 py-2 text-sm text-[var(--tv-text)] placeholder:text-[var(--tv-muted)]"
      data-testid="search-input"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <Button
      type="submit"
      variant="cta"
      class="shrink-0"
      :aria-label="compact ? submitLabel : undefined"
      data-testid="search-submit"
    >
      <svg
        v-if="compact"
        class="h-4 w-4 sm:hidden"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
        data-testid="search-submit-icon"
      >
        <circle cx="8.5" cy="8.5" r="5.5" />
        <path d="M12.5 12.5 17 17" stroke-linecap="round" />
      </svg>
      <span :class="compact ? 'sr-only sm:not-sr-only' : undefined">Search</span>
    </Button>
  </form>
</template>
