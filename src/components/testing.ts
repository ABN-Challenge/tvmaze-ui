import { createMemoryHistory, createRouter, type Router } from 'vue-router'
import { h } from 'vue'

const Blank = { render: () => h('div') }

/** Route names mirror the host so RouterLink targets resolve in isolation. */
export function createTestRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'dashboard', component: Blank },
      { path: '/search', name: 'search', component: Blank },
      { path: '/shows/:id', name: 'show', component: Blank },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: Blank },
    ],
  })
}
