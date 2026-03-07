import { defineStore } from "pinia";
import api from "@/services/api";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    activeCategory: "all",
    searchQuery: "",
    loading: false,
  }),

  getters: {
    filteredProducts: (state) => {
      return state.products
        .filter((p) => p.activo) // solo activos
        .filter((p) => {
          const matchesCategory =
            state.activeCategory === "all" || p.categoria?.nombre === state.activeCategory;

          const matchesSearch = p.nombre.toLowerCase().includes(state.searchQuery.toLowerCase());

          return matchesCategory && matchesSearch;
        });
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await api.get("/productos");
        this.products = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    setCategory(category) {
      this.activeCategory = category;
    },

    setSearch(query) {
      this.searchQuery = query;
    },
  },
});
