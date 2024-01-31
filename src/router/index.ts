import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/input_default',
      name: 'input_default',
      component: () => import('../views/Input/Index.vue')
    },
    {
      path: '/button',
      name: 'button',
      component: () => import('../views/Button/Index.vue')
    }
  ]
})

export default router
