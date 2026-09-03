<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'cta' | 'danger'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-[var(--tv-radius)] px-3 py-2 text-sm font-medium transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
    :class="{
      'bg-[var(--tv-accent)] text-[var(--tv-on-header)]': variant === 'primary',
      'border border-[var(--tv-border)] bg-[var(--tv-surface)] text-[var(--tv-text)]':
        variant === 'secondary',
      'border border-transparent bg-transparent text-[var(--tv-accent-2)] hover:underline':
        variant === 'ghost',
      'bg-[var(--tv-cta)] text-[var(--tv-on-cta)]': variant === 'cta',
      'bg-[var(--tv-danger)] text-white': variant === 'danger',
    }"
    data-testid="ui-button"
  >
    <slot />
  </button>
</template>
