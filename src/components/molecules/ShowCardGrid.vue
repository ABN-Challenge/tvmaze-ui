<script setup lang="ts">
import type { ShowCardModel } from '../../types'
import ShowCard from './ShowCard.vue'

defineProps<{
  shows: ShowCardModel[]
  getShowLink?: (show: ShowCardModel) => string
  label?: string
}>()
</script>

<template>
  <div
    v-if="shows.length > 0"
    class="flex flex-wrap gap-3"
    role="list"
    :aria-label="label ?? 'Shows'"
    data-testid="show-card-grid"
  >
    <div v-for="show in shows" :key="show.id" role="listitem">
      <ShowCard :show="show" :to="getShowLink?.(show)" />
    </div>
  </div>
</template>
