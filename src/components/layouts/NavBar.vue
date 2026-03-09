<template>
  <nav class="bg-primary text-white shadow-lg fixed w-full z-50">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold tracking-wide flex items-center gap-2">
        💻 <span>TechStore</span>
      </router-link>

      <div class="hidden md:flex gap-8 font-medium items-center">
        <router-link to="/" class="hover:text-blue-200 transition">Inicio</router-link>
        <a href="#" class="hover:text-blue-200 transition">Categorías</a>
        <a href="#" class="hover:text-blue-200 transition">Ofertas</a>

        <router-link
          v-if="authStore.isAuthenticated && authStore.isCliente"
          to="/mis-ordenes"
          class="flex items-center gap-2 text-white hover:text-blue-600"
        >
          <i class="pi pi-shopping-bag"></i>
          Mis Órdenes
        </router-link>

        <router-link
          v-if="authStore.isAuthenticated && authStore.isCliente"
          to="/order"
          class="relative ml-6 hover:text-blue-200 transition"
        >
          <i class="pi pi-shopping-cart text-2xl"></i>
          <!--Contador de productos -->
          <span
            v-if="orderStore.totalItems > 0"
            class="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5"
          >
            {{ orderStore.totalItems }}
          </span>
        </router-link>

        <div class="flex gap-4 ml-6 items-center">
          <template v-if="!authStore.isAuthenticated">
            <router-link
              to="/login"
              class="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-primary transition"
            >
              Iniciar sesión
            </router-link>
            <router-link
              to="/register"
              class="px-4 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Registrarse
            </router-link>
          </template>

          <template v-else>
            <span class="text-white font-semibold border-r border-blue-400 pr-4">
              Hola, {{ authStore.user?.name }}
            </span>
            <button
              @click="authStore.logout()"
              class="text-amber-400 hover:text-amber-300 font-bold transition"
            >
              Cerrar sesión
            </button>
          </template>
        </div>
      </div>

      <button @click="toggleMenu" class="md:hidden text-2xl focus:outline-none" aria-label="Menu">
        <i :class="isOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>
    </div>

    <transition name="slide">
      <div
        v-if="isOpen"
        class="md:hidden bg-primary-dark border-t border-blue-800 px-6 py-6 space-y-6 shadow-xl"
      >
        <router-link to="/" @click="isOpen = false" class="block hover:text-blue-200 transition"
          >Inicio</router-link
        >
        <a href="#" class="block hover:text-blue-200 transition">Categorías</a>
        <a href="#" class="block hover:text-blue-200 transition">Ofertas</a>

        <div class="flex flex-col gap-3 pt-4 border-t border-blue-400">
          <template v-if="!authStore.isAuthenticated">
            <router-link
              to="/login"
              @click="isOpen = false"
              class="px-4 py-2 border border-white rounded-lg text-center hover:bg-white hover:text-primary transition"
            >
              Iniciar Sesión
            </router-link>
            <router-link
              to="/register"
              @click="isOpen = false"
              class="px-4 py-2 bg-white text-primary rounded-lg text-center font-semibold"
            >
              Registrarse
            </router-link>
          </template>

          <template v-else>
            <div class="flex flex-col gap-4">
              <span class="text-white font-bold text-lg text-center">
                {{ authStore.user?.name }}
              </span>
              <button
                @click="handleLogout"
                class="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </nav>

  <div class="h-20"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useOrderStore } from "@/stores/orderStore";

const authStore = useAuthStore();
const orderStore = useOrderStore();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
onMounted(() => {
  console.log(authStore.isAuthenticated);
  console.log(authStore.isCliente);
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
