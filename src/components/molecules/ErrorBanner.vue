<script setup lang="ts">
import Button from '../atoms/Button.vue'

withDefaults(
  defineProps<{
    message: string
    actionLabel?: string
    /** When true, omit horizontal outer margins (parent already pads). */
    flush?: boolean
  }>(),
  {
    flush: false,
  },
)

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div
    class="my-4 flex flex-col gap-3 rounded-[var(--tv-radius)] border border-[var(--tv-danger)]/30 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
    :class="flush ? undefined : 'mx-4 sm:mx-6'"
    role="alert"
    data-testid="error-banner"
  >
    <p class="text-sm text-[var(--tv-text)]">{{ message }}</p>
    <Button variant="danger" data-testid="error-retry" @click="emit('retry')">
      {{ actionLabel ?? 'Try again' }}
    </Button>
  </div>
</template>
