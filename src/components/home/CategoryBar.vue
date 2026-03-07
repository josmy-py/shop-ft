<template>
  <section class="bg-white border-b border-gray-100 sticky top-20 z-30">
    <div class="container mx-auto px-6 py-6">
      <div class="flex gap-6 overflow-x-auto md:justify-center scrollbar-hide">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="productStore.setCategory(cat)"
          class="relative flex items-center gap-2 pb-2 font-medium whitespace-nowrap transition-all duration-300"
          :class="
            productStore.activeCategory === cat
              ? 'text-primary'
              : 'text-gray-500 hover:text-primary'
          "
        >
          <i :class="getIcon(cat)"></i>

          {{ cat === "all" ? "Todos" : cat }}

          <span
            v-if="productStore.activeCategory === cat"
            class="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-full animate-slide"
          ></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();

const categories = computed(() => {
  const unique = new Set(
    productStore.products
      .map((p) => p.categoria?.nombre?.trim())
      .filter(Boolean)
  );

  return ["all", ...unique];
});

/* Iconos tecnológicos dinámicos */
const getIcon = (name) => {
  if (name === "all") return "pi pi-th-large";

  const n = name.toLowerCase();

  if (n.includes("laptop")) return "pi pi-desktop";
  if (n.includes("monitor")) return "pi pi-window-maximize";
  if (n.includes("hardware")) return "pi pi-cog";
  if (n.includes("red")) return "pi pi-share-alt";
  if (n.includes("accesorio")) return "pi pi-headphones";
  if (n.includes("almacen")) return "pi pi-database";
  if (n.includes("componente")) return "pi pi-microchip";
  if (n.includes("impresora")) return "pi pi-print";
  if (n.includes("audio")) return "pi pi-volume-up";
  if (n.includes("gaming")) return "pi pi-star";

  return "pi pi-tag";
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.animate-slide {
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>