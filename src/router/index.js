import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 
    {
    path: '/login',
    name: 'login',
    component: Login
    },
    {
    path: '/register',
    name: 'register',
    component: Register
    },
    // RUTAS PÚBLICAS
    // ruta para componente order - interfaz publica
    {
      path: '/order',
      name: 'Order',
      component: () => import('@/views/OrderView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/categoria/:slug',
      name: 'categoria',
      component: () => import('@/views/CategoryView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
