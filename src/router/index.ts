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
      path: '/input',
      name: 'input',
      component: () => import('../views/Input/Index.vue')
    },
    {
      path: '/textarea',
      name: 'textarea',
      component: () => import('../views/Textarea/Index.vue')
    },
    {
      path: '/button',
      name: 'button',
      component: () => import('../views/Button/Index.vue')
    },
    {
      path: '/code=:code',
      name: 'code',
      component: () => import('../views/Button/Index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
