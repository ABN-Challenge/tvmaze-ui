<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    homeHref?: string
    subtitle?: string
  }>(),
  {
    title: 'TVmaze Explorer',
    homeHref: '#/',
    subtitle: 'Browse shows by genre and rating',
  },
)
</script>

<template>
  <header
    class="sticky top-0 z-20 border-b border-[var(--tv-accent)] bg-[var(--tv-header)] text-[var(--tv-on-header)]"
    data-testid="app-header"
  >
    <div class="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6">
      <a
        :href="homeHref"
        class="shrink-0 rounded-[var(--tv-radius)] bg-[var(--tv-cta)] px-2.5 py-1 text-sm font-bold tracking-wide text-[var(--tv-on-cta)]"
      >
        TV
      </a>
      <div class="hidden min-w-0 sm:block">
        <p class="truncate text-sm font-semibold sm:text-base">
          {{ title }}
        </p>
        <p class="truncate text-xs text-white/75">
          {{ subtitle }}
        </p>
      </div>
      <div class="flex min-w-0 flex-1 items-center justify-end gap-2">
        <slot />
      </div>
    </div>
  </header>
</template>
