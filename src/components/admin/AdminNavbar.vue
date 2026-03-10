<template>
  <header class="w-full bg-blue-600 text-white shadow">
    <div class="flex items-center justify-between px-6 py-3">
      <!-- Botón tipo hamburguesa para mostrar/ocultar el Sidebar -->
      <div class="flex items-center gap-4">
        <button
          @click="$emit('toggleSidebar')"
          class="hover:bg-blue-500 p-2 rounded transition"
        >
          <i class="pi pi-bars text-xl"></i>
        </button>

        <h1 class="font-bold text-lg hidden sm:block">
          Sistema de Gestión ShopApp
        </h1>
      </div>

      <!-- Div en la parte derecha para mostrar datos del usuario logueado -->

      <div class="flex items-center gap-4">
        <div
          class="flex items-center gap-2 bg-blue-500 px-3 py-1 rounded-full text-sm"
        >
          <i class="pi pi-user"></i>
          <span>{{ authStore.user?.email }}</span>
        </div>

        <button
          @click="logout"
          class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded flex items-center gap-2"
        >
          <i class="pi pi-sign-out"></i>
          Salir
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
}
</script>  