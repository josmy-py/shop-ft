import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/services/api"; // axios instancia con el interceptor

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const activeCategory = ref("all");
  const searchQuery = ref("");
  const loading = ref(false);

  
  const filteredProducts = computed(() => {
    return products.value
      .filter((p) => p.activo)
      .filter((p) => {
        const matchesCategory =
          activeCategory.value === "all" ||
          p.categoria?.nombre?.toLowerCase().trim() === activeCategory.value?.toLowerCase().trim();

        const matchesSearch = p.nombre?.toLowerCase().includes(searchQuery.value.toLowerCase());

        return matchesCategory && matchesSearch;
      });
  });

  const setCategory = (category) => {
    activeCategory.value = category;
  };

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const { data } = await api.get("/productos");
      products.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const setSearch = (query) => {
    searchQuery.value = query;
  };

  return {
    products,
    activeCategory,
    searchQuery,
    loading,
    filteredProducts,
    fetchProducts,
    setCategory,
    setSearch,
  };
});
