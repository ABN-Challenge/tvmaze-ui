<script setup lang="ts">
import SkipLink from '../atoms/SkipLink.vue'
import AppFooter from './AppFooter.vue'

withDefaults(
  defineProps<{
    mainId?: string
    showFooter?: boolean
  }>(),
  {
    mainId: 'main',
    showFooter: true,
  },
)
</script>

<template>
  <div class="min-h-screen" data-testid="app-shell">
    <SkipLink :href="`#${mainId}`" />
    <slot name="header" />
    <main :id="mainId">
      <slot />
    </main>
    <slot v-if="showFooter" name="footer">
      <AppFooter />
    </slot>
  </div>
</template>
