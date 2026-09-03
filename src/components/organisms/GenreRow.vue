<script setup lang="ts">
import type { ShowCardModel } from '../../types'
import ShowCard from '../molecules/ShowCard.vue'

withDefaults(
  defineProps<{
    category: string
    shows: ShowCardModel[]
    getShowLink?: (show: ShowCardModel) => string
    /** When true, omit horizontal padding (parent PageContainer already pads). */
    flush?: boolean
  }>(),
  {
    flush: false,
  },
)
</script>

<template>
  <section
    v-if="shows.length > 0"
    class="space-y-3"
    :aria-label="`${category} shows`"
    data-testid="genre-row"
  >
    <h2
      class="text-lg font-semibold tracking-tight text-[var(--tv-accent)]"
      :class="flush ? undefined : 'px-4 sm:px-6'"
      data-testid="genre-title"
    >
      {{ category }}
    </h2>
    <div
      class="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
      :class="flush ? undefined : 'px-4 sm:px-6'"
      role="list"
      tabindex="0"
    >
      <div v-for="show in shows" :key="show.id" role="listitem">
        <ShowCard :show="show" :to="getShowLink?.(show)" />
      </div>
    </div>
  </section>
</template>
