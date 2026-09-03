<script setup lang="ts">
import { ref } from 'vue'
import AppShell from './components/organisms/AppShell.vue'
import AppHeader from './components/organisms/AppHeader.vue'
import ShowCard from './components/molecules/ShowCard.vue'
import GenreRow from './components/organisms/GenreRow.vue'
import SearchInput from './components/molecules/SearchInput.vue'
import SkeletonRow from './components/molecules/SkeletonRow.vue'
import EmptyState from './components/molecules/EmptyState.vue'
import ErrorBanner from './components/molecules/ErrorBanner.vue'
import ShowHero from './components/organisms/ShowHero.vue'
import type { ShowCardModel } from './types'

const query = ref('')
const demoShows: ShowCardModel[] = [
  {
    id: 1,
    name: 'Demo Drama',
    rating: { average: 8.4 },
    image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg' },
  },
  {
    id: 2,
    name: 'Unrated Comedy',
    rating: { average: null },
    image: null,
  },
]
</script>

<template>
  <AppShell>
    <template #header>
      <AppHeader title="tvmaze-ui playground">
        <SearchInput v-model="query" />
      </AppHeader>
    </template>

    <div class="mx-auto max-w-7xl space-y-8 py-6">
      <ErrorBanner message="Sample error banner" />
      <SkeletonRow />
      <GenreRow category="Drama" :shows="demoShows" :get-show-link="(s) => `/shows/${s.id}`" />
      <EmptyState title="Nothing here" message="This is the local UI playground." />
      <div class="px-4 sm:px-6">
        <ShowHero :show="demoShows[0]" :cast-names="['Alice', 'Bob']" />
      </div>
      <div class="px-4 sm:px-6">
        <ShowCard :show="demoShows[1]" />
      </div>
    </div>
  </AppShell>
</template>
