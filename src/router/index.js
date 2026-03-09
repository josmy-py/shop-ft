import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    // RUTAS PÚBLICAS
    // ruta para componente order - interfaz publica
    {
      path: "/order",
      name: "Order",
      component: () => import("@/views/OrderView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/categoria/:slug",
      name: "categoria",
      component: () => import("@/views/CategoryView.vue"),
    },
    {
      path: "/mis-ordenes",
      name: "mis-ordenes",
      component: () => import("@/views/MisOrdenes.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

//para proteger las rutas privadas, se utiliza un guardia de navegación global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
    return;
  }

  if (to.meta.role) {
    const hasRole = authStore.user?.roles?.some((r) => r.name === to.meta.role);

    if (!hasRole) {
      next("/");
      return;
    }
  }

  if (to.meta.guest && authStore.isAuthenticated) {
    next("/");
    return;
  }

  next();
});

export default router;
