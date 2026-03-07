<template>
  <section class="bg-gray-50">
    <div class="container mx-auto px-6 py-6">

      <div class="relative max-w-2xl mx-auto">

        <!-- Icono -->
        <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

        <!-- Input -->
        <input
          v-model="search"
          type="text"
          placeholder="Buscar productos..."
          class="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200
                 focus:outline-none focus:ring-2 focus:ring-primary
                 transition-all duration-300 shadow-sm"
        />

        <!-- Botón limpiar -->
        <button
          v-if="search"
          @click="clearSearch"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
        >
          <i class="pi pi-times"></i>
        </button>

      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

const search = computed({
  get: () => productStore.searchQuery,
  set: (value) => productStore.setSearch(value)
})

const clearSearch = () => {
  productStore.setSearch('')
}
</script>