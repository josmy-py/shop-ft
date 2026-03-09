import { defineStore } from "pinia";
import api from "@/services/api";
import { useAuthStore } from "./authStore";

export const useOrderStore = defineStore("order", {
  state: () => ({
    items: [],
    orders: [],
    loading: false,
  }),

  getters: {
    total: (state) => state.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0),

    totalItems: (state) => state.items.reduce((acc, item) => acc + item.cantidad, 0),
  },

  actions: {
    //definimos las acciones o funcionalidades que se utilizaran en el componente de OrderView
    //método para agregar productos a la orden
    addItem(product) {
      const existing = this.items.find((p) => p.id === product.id);
      if (existing) {
        //si un producto ya esta en items, se incrementa la cantidad
        existing.cantidad++;
      } else {
        this.items.push({
          id: product.id,
          nombre: product.nombre,
          descripcion: product.descripcion,
          modelo: product.modelo,
          marca: product.marca?.nombre,
          precio: Number(product.precio),
          cantidad: 1,
        });
      }
    },

    removeItem(id) {
      this.items = this.items.filter((p) => p.id !== id);
    },

    increment(id) {
      const item = this.items.find((p) => p.id === id);
      if (item) item.cantidad++;
    },
    decrement(id) {
      const item = this.items.find((p) => p.id === id);
      if (item && item.cantidad > 1) item.cantidad--;
    },

    clearOrder() {
      this.items = [];
    },
    //método para enviar la orden al backend
    async confirmOrder(order) {
      this.loading = true;
      try {
        const response = await api.post(`/orders`, order);
        return response;
      } finally {
        this.loading = false;
      }
    },
    async fetchMyOrders() {
      const authStore = useAuthStore();

      this.loading = true;

      try {
        const { data } = await api.get("/orders", {
          params: {
            user_id: authStore.user.id,
          },
        });

        this.orders = data;
      } catch (error) {
        console.error("Error cargando órdenes", error);
      } finally {
        this.loading = false;
      }
    },

    async cancelOrder(id) {
      try {
        const { data } = await api.put(`/ordenes/estado/${id}`, {
          estado: "CANCELADA",
        });

        // actualizar en el store
        const order = this.orders.find((o) => o.id === id);

        if (order) {
          order.estado = "CANCELADA";
        }

        return data;
      } catch (error) {
        console.error("Error al anular la orden", error);
        throw error;
      }
    },
  },
});
