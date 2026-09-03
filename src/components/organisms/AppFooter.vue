<script setup lang="ts">
withDefaults(
  defineProps<{
    sourceName?: string
    sourceHref?: string
    licenseNote?: string
  }>(),
  {
    sourceName: 'TVmaze',
    sourceHref: 'https://www.tvmaze.com/',
    licenseNote: 'CC BY-SA',
  },
)
</script>

<template>
  <footer
    class="mx-auto max-w-7xl px-4 py-8 text-xs text-[var(--tv-muted)] sm:px-6"
    data-testid="app-footer"
  >
    <slot>
      Show data from
      <a
        class="font-medium text-[var(--tv-accent-2)] underline-offset-2 hover:underline"
        :href="sourceHref"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ sourceName }}
      </a>
      ({{ licenseNote }}).
    </slot>
  </footer>
</template>
