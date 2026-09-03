<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href?: string
    label?: string
  }>(),
  {
    href: '#main',
    label: 'Skip to content',
  },
)

/**
 * Moves focus to the target without navigating. Under hash routing a real
 * `#main` navigation would be parsed as the route `/main` and unmount the page.
 */
function focusTarget() {
  const id = props.href.replace(/^#/, '')
  const target = document.getElementById(id)
  if (!target) return

  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1')
  }
  target.focus()
  target.scrollIntoView()
}
</script>

<template>
  <a
    :href="href"
    class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--tv-radius)] focus:bg-[var(--tv-cta)] focus:px-3 focus:py-2 focus:font-medium focus:text-[var(--tv-on-cta)]"
    data-testid="skip-link"
    @click.prevent="focusTarget"
  >
    {{ label }}
  </a>
</template>
