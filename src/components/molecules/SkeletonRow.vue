<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
    /** When true, omit horizontal padding (parent PageContainer already pads). */
    flush?: boolean
  }>(),
  {
    flush: false,
  },
)
</script>

<template>
  <div class="space-y-3" data-testid="skeleton-row" aria-hidden="true">
    <div
      class="tv-skeleton h-6 w-32 rounded"
      :class="flush ? undefined : 'mx-4 sm:mx-6'"
    />
    <div class="flex gap-3 overflow-hidden" :class="flush ? undefined : 'px-4 sm:px-6'">
      <div
        v-for="n in count ?? 6"
        :key="n"
        class="tv-skeleton aspect-[2/3] w-36 shrink-0 rounded-[var(--tv-radius)]"
      />
    </div>
  </div>
</template>
