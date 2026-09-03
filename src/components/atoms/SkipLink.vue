<script setup lang="ts">
withDefaults(
  defineProps<{
    href?: string
    label?: string
  }>(),
  {
    href: '#main',
    label: 'Skip to content',
  },
)
</script>

<template>
  <a
    :href="href"
    class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--tv-radius)] focus:bg-[var(--tv-cta)] focus:px-3 focus:py-2 focus:font-medium focus:text-[var(--tv-on-cta)]"
    data-testid="skip-link"
  >
    {{ label }}
  </a>
</template>
