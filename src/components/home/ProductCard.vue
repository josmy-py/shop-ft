<template>
  <div
    class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
  >
    <!-- IMAGEN / SLIDER -->
    <div
      class="relative h-56 bg-gray-50 flex items-center justify-center overflow-hidden"
    >
      <!-- Imagen actual -->
      <img
        v-if="currentImage"
        :src="imageUrl(currentImage)"
        class="h-full object-contain p-6 transition duration-300"
      />

      <div v-else class="text-gray-400 text-sm">Sin imagen</div>

      <!-- Flecha izquierda -->
      <button
        v-if="hasMultipleImages"
        @click="prevImage"
        class="absolute left-3 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60 transition"
      >
        ‹
      </button>

      <!-- Flecha derecha -->
      <button
        v-if="hasMultipleImages"
        @click="nextImage"
        class="absolute right-3 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60 transition"
      >
        ›
      </button>

      <!-- Indicador -->
      <div
        v-if="hasMultipleImages"
        class="absolute bottom-3 bg-black/50 text-white text-xs px-2 py-1 rounded"
      >
        {{ currentIndex + 1 }} / {{ product.imagenes.length }}
      </div>

      <!-- Badge Sin stock -->
      <span
        v-if="product.stock <= 0"
        class="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow"
      >
        Sin stock
      </span>

      <!-- Badge Inactivo -->
      <span
        v-if="!product.activo"
        class="absolute top-3 right-3 bg-gray-700 text-white text-xs px-3 py-1 rounded-full shadow"
      >
        Inactivo
      </span>
    </div>

    <!-- INFORMACION DEL PRODUCTO -->
    <div class="p-5 flex flex-col gap-2">
      <!-- Nombre -->
      <h3 class="text-gray-900 font-semibold text-lg leading-snug line-clamp-2">
        {{ product.nombre }}
      </h3>

      <!-- Descripción -->
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ product.descripcion }}
      </p>

      <!-- Detalles -->
      <div class="text-xs text-gray-500 space-y-1 mt-1">
        <div>
          Marca:
          <span class="font-medium text-gray-700">
            {{ product.marca?.nombre }}
          </span>
        </div>

        <div>
          Categoría:
          <span class="font-medium text-gray-700">
            {{ product.categoria?.nombre }}
          </span>
        </div>

        <div>
          Modelo:
          <span class="text-gray-700">
            {{ product.modelo }}
          </span>
        </div>
      </div>

      <!-- Precio y botón -->
      <div class="flex justify-between items-center mt-4">
        <span class="text-2xl font-bold text-primary">
          ${{ parseFloat(product.precio).toFixed(2) }}
        </span>

        <button v-if="authStore.isAuthenticated && authStore.isCliente"
   :disabled="product.stock <= 0"
   @click="addToOrder(product)"
   class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
const authStore = useAuthStore()

const addToOrder = (product) => {
  orderStore.addItem(product)
}

const props = defineProps({
  product: Object,
});

/* SLIDER */

const currentIndex = ref(0);

const hasMultipleImages = computed(() => props.product.imagenes?.length > 1);

const currentImage = computed(
  () => props.product.imagenes?.[currentIndex.value]?.nombre || null
);

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

const imageUrl = (imageName) => {
  return `${baseUrl}/images/productos/${imageName}`;
};

const nextImage = () => {
  if (!props.product.imagenes) return;
  currentIndex.value =
    (currentIndex.value + 1) % props.product.imagenes.length;
};

const prevImage = () => {
  if (!props.product.imagenes) return;
  currentIndex.value =
    (currentIndex.value - 1 + props.product.imagenes.length) %
    props.product.imagenes.length;
};
</script>
