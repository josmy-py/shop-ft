<template>
  <section class="bg-gray-50 py-10">
    <div class="container mx-auto px-6">
      <div v-if="store.loading" class="text-center py-20">
        Cargando productos...
      </div>

      <div
        v-else
        class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <ProductCard
          v-for="product in store.filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "./ProductCard.vue";

const store = useProductStore();

onMounted(() => {
  store.fetchProducts();
});
</script>
