<script setup lang="ts">
import type { ShowCardModel } from '../../types'
import RatingBadge from '../atoms/RatingBadge.vue'

defineProps<{
  show: ShowCardModel
  to?: string
}>()
</script>

<template>
  <component
    :is="to ? 'a' : 'div'"
    :href="to"
    class="group block w-36 shrink-0 snap-start focus-visible:outline-none"
    data-testid="show-card"
  >
    <article
      class="overflow-hidden rounded-[var(--tv-radius)] border border-[var(--tv-border)] bg-[var(--tv-surface)] shadow-sm transition group-hover:-translate-y-0.5 group-hover:border-[var(--tv-accent)]"
    >
      <div class="relative aspect-[2/3] bg-[var(--tv-surface-2)]">
        <img
          v-if="show.image?.medium"
          :src="show.image.medium"
          :alt="`Poster for ${show.name}`"
          class="h-full w-full object-cover"
          loading="lazy"
          data-testid="show-image"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center px-2 text-center text-xs text-[var(--tv-muted)]"
          data-testid="show-image-placeholder"
        >
          No image
        </div>
        <div class="absolute bottom-2 left-2">
          <RatingBadge :value="show.rating?.average" />
        </div>
      </div>
      <div class="px-2 py-2">
        <h3 class="line-clamp-2 text-sm font-medium text-[var(--tv-text)]" data-testid="show-name">
          {{ show.name }}
        </h3>
      </div>
    </article>
  </component>
</template>
