<script setup lang="ts">
defineProps<{
  value?: number | null
}>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full bg-[var(--tv-header)] px-2 py-0.5 text-xs font-semibold text-[var(--tv-cta)]"
    data-testid="rating-badge"
  >
    {{ value != null ? `★ ${value.toFixed(1)}` : 'Unrated' }}
  </span>
</template>
