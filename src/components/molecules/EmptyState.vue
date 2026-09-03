<script setup lang="ts">
defineProps<{
  title: string
  message?: string
}>()
</script>

<template>
  <div
    class="mx-auto flex max-w-lg flex-col items-center gap-2 px-4 py-16 text-center"
    data-testid="empty-state"
  >
    <h2 class="text-xl font-semibold text-[var(--tv-text)]">{{ title }}</h2>
    <p v-if="message" class="text-sm text-[var(--tv-muted)]">{{ message }}</p>
    <slot />
  </div>
</template>
