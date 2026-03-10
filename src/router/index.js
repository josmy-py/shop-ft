import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [

    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true }
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guest: true }
    },

    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/OrderView.vue'),
      meta: { requiresAuth: true, role: 'CLIENTE' }
    },

    {
      path: '/mis-ordenes',
      name: 'mis-ordenes',
      component: () => import('@/views/MisOrdenes.vue'),
      meta: { requiresAuth: true, role: 'CLIENTE' }
    },

    // ADMIN PANEL
    {
      path:'/admin',
      component: () => import('@/components/layouts/AdminLayout.vue'),
      meta:{ requiresAuth:true, role:['ADMIN','VENDEDOR'] },

      children:[

        {
          path:'dashboard',
          name:'admin-dashboard',
          component: () => import('@/views/admin/Dashboard.vue')
        },

        {
          path:'catalogos',
          name:'admin-catalogos',
          component: () => import('@/views/admin/Catalogos.vue')
        },
        
        {
          path:'catalogos/categorias',
          name:'admin-categorias',
          component: () => import('@/views/admin/Categorias.vue')
        },
        

        {
          path:'productos',
          name:'admin-productos',
          component: () => import('@/views/admin/Productos.vue')
        },

        {
          path:'ordenes',
          name:'admin-ordenes',
          component: () => import('@/views/admin/Ordenes.vue')
        },

        {
          path:'usuarios',
          name:'admin-usuarios',
          component: () => import('@/views/admin/Usuarios.vue')
        },

        {
          path:'reportes',
          name:'admin-reportes',
          component: () => import('@/views/admin/Reportes.vue')
        }

      ]
    }

  ]
})


//para proteger las rutas
router.beforeEach((to) => {

  const authStore = useAuthStore()

  // requiere login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login'
  }

  // validación de roles
  if (to.meta.role) {

    const userRoles = authStore.user?.roles?.map(r => r.name) || []

    // si la ruta acepta varios roles
    if (Array.isArray(to.meta.role)) {

      const hasRole = to.meta.role.some(role => userRoles.includes(role))

      if (!hasRole) return '/'

    } 
    // si la ruta acepta un solo rol
    else {

      if (!userRoles.includes(to.meta.role)) {
        return '/'
      }

    }

  }

  // rutas solo invitados
  if (to.meta.guest && authStore.isAuthenticated) {
    return '/'
  }

})

export default router