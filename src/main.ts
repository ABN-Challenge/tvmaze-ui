import { createApp, h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// The playground only needs enough routing for RouterLink targets to resolve.
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: { render: () => h('div') } },
    { path: '/shows/:id', name: 'show', component: { render: () => h('div') } },
  ],
})

createApp(App).use(router).mount('#app')
