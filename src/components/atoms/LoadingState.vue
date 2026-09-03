<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
  }>(),
  {
    message: 'Loading…',
  },
)
</script>

<template>
  <div
    class="py-8 text-sm text-[var(--tv-muted)]"
    aria-busy="true"
    data-testid="loading-state"
  >
    {{ message }}
  </div>
</template>
