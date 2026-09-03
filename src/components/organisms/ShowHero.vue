<script setup lang="ts">
import type { ShowCardModel } from '../../types'
import RatingBadge from '../atoms/RatingBadge.vue'

defineProps<{
  show: ShowCardModel
  castNames?: string[]
}>()
</script>

<template>
  <section
    class="grid gap-6 md:grid-cols-[220px_1fr]"
    data-testid="show-hero"
    :aria-label="`${show.name} details`"
  >
    <div
      class="overflow-hidden rounded-[var(--tv-radius)] border border-[var(--tv-border)] bg-[var(--tv-surface)] shadow-sm"
    >
      <div class="relative aspect-[2/3] bg-[var(--tv-surface-2)]">
        <img
          v-if="show.image?.original || show.image?.medium"
          :src="show.image.original || show.image.medium || ''"
          :alt="`Poster for ${show.name}`"
          class="h-full w-full object-cover"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center text-sm text-[var(--tv-muted)]"
        >
          No image
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="space-y-2">
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight text-[var(--tv-text)]">{{ show.name }}</h1>
          <RatingBadge :value="show.rating?.average" />
        </div>
        <p class="text-sm text-[var(--tv-muted)]">
          <span v-if="show.genres?.length">{{ show.genres.join(' · ') }}</span>
          <span v-if="show.status"> · {{ show.status }}</span>
          <span v-if="show.premiered"> · Premiered {{ show.premiered }}</span>
        </p>
        <p v-if="show.network?.name || show.webChannel?.name" class="text-sm text-[var(--tv-muted)]">
          Network: {{ show.network?.name || show.webChannel?.name }}
        </p>
      </div>

      <div
        v-if="show.summary"
        class="prose max-w-none text-sm leading-relaxed text-[var(--tv-text)]"
        data-testid="show-summary"
        v-html="show.summary"
      />

      <div v-if="castNames?.length" class="space-y-2">
        <h2 class="text-base font-semibold text-[var(--tv-accent)]">Cast</h2>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="name in castNames"
            :key="name"
            class="rounded-full border border-[var(--tv-border)] bg-[var(--tv-surface)] px-3 py-1 text-xs text-[var(--tv-text)]"
          >
            {{ name }}
          </li>
        </ul>
      </div>

      <a
        v-if="show.officialSite"
        :href="show.officialSite"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex text-sm font-medium text-[var(--tv-accent-2)] underline-offset-2 hover:underline"
      >
        Official site
      </a>
    </div>
  </section>
</template>
