<template>
  <div class="container mx-auto px-6 py-10">
    <div
      class="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold">Mis Órdenes</h1>
        <p class="text-gray-600">
          Cliente: <span class="font-semibold">{{ authStore.user?.name }}</span>
        </p>
      </div>

      <router-link
        to="/"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2 w-max"
      >
        <i class="pi pi-arrow-left"></i>
        Seguir comprando
      </router-link>
    </div>

    <div v-if="orderStore.loading" class="text-center py-20">
      <i class="pi pi-spin pi-spinner text-4xl text-gray-500"></i>
    </div>

    <div
      v-else-if="orderStore.orders.length > 0"
      class="bg-white shadow-xl rounded-xl overflow-x-auto"
    >
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-6 py-4 text-left">Orden</th>
            <th class="px-6 py-4 text-left">Fecha</th>
            <th class="px-6 py-4 text-right">Total</th>
            <th class="px-6 py-4 text-center">Estado</th>
            <th class="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="order in orderStore.orders"
            :key="order.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4 font-semibold">
              {{ order.correlativo }}
            </td>

            <td class="px-6 py-4">
              {{ formatDate(order.fecha) }}
            </td>

            <td class="px-6 py-4 text-right font-semibold">
              {{ formatCurrency(order.total) }}
            </td>

            <td class="px-6 py-4 text-center">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="statusClass(order.estado)"
              >
                {{ order.estado }}
              </span>
            </td>

            <td class="px-6 py-4 text-center space-x-2">
              <button
                @click="openDetail(order)"
                class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
              >
                <i class="pi pi-eye"></i>
              </button>

              <button
                v-if="order.estado === 'PENDIENTE'"
                @click="cancel(order)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
              >
                <i class="pi pi-times"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-500 py-20">
      <i class="pi pi-shopping-bag text-4xl mb-4"></i>

      <p>No tienes órdenes registradas.</p>

      <router-link
        to="/"
        class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Explorar productos
      </router-link>
    </div>
  </div>

  <div
    v-if="selectedOrder"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
    >

      <div class="flex justify-between items-center border-b p-6">
        <div>
          <h2 class="text-xl font-bold">
            Detalle de Orden {{ selectedOrder.correlativo }}
          </h2>

          <p class="text-gray-500 text-sm">
            {{ formatDate(selectedOrder.fecha) }}
          </p>
        </div>

        <button
          @click="selectedOrder = null"
          class="text-gray-500 hover:text-gray-800"
        >
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <div class="p-6">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th class="px-4 py-3 text-left">Producto</th>
              <th class="px-4 py-3 text-center">Cantidad</th>
              <th class="px-4 py-3 text-right">Precio</th>
              <th class="px-4 py-3 text-right">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in selectedOrder.items"
              :key="item.id"
              class="border-b"
            >
              <td class="px-4 py-3">
                <div class="font-semibold">
                  {{ item.producto.nombre }}
                </div>

                <div class="text-gray-500 text-xs">
                  {{ item.producto.descripcion }} - {{ item.producto.modelo }}
                </div>
              </td>

              <td class="px-4 py-3 text-center">
                {{ item.cantidad }}
              </td>

              <td class="px-4 py-3 text-right">
                {{ formatCurrency(item.precio_unitario) }}
              </td>

              <td class="px-4 py-3 text-right font-semibold">
                {{ formatCurrency(item.subtotal) }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-end mt-6">
          <div class="w-full md:w-1/3 space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ formatCurrency(selectedOrder.subtotal) }}</span>
            </div>

            <div class="flex justify-between">
              <span>IVA</span>
              <span>{{ formatCurrency(selectedOrder.impuesto) }}</span>
            </div>

            <div class="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>{{ formatCurrency(selectedOrder.total) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useOrderStore } from "@/stores/orderStore";
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";

const orderStore = useOrderStore();
const authStore = useAuthStore();

const selectedOrder = ref(null);

onMounted(async () => {
  await orderStore.fetchMyOrders(authStore.user.id);
 
});

const openDetail = (order) =>{
  selectedOrder.value = order;
}

const formatCurrency = (value) =>{
  return new Intl.NumberFormat("es-SV", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-SV");
}

const statusClass = (status) =>{
  switch (status) {
    case "PENDIENTE":
      return "bg-yellow-100 text-yellow-700";

    case "PAGADA":
      return "bg-green-100 text-green-700";

    case "CANCELADA":
      return "bg-red-100 text-red-700";

    case "REEMBOLSADA":
      return "bg-purple-100 text-purple-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

const cancel = async(order) => {
  const result = await Swal.fire({
    title: "¿Cancelar orden?",
    text: `Orden ${order.correlativo}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí cancelar",
    cancelButtonText: "No",
  });

  if (!result.isConfirmed) return;

  try {
    const resp = await orderStore.cancelOrder(order.id);

    Swal.fire("Orden cancelada", resp.message, "success");

    await orderStore.fetchMyOrders(authStore.user.id);
  } catch (error) {
    Swal.fire(
      "Error",
      error.response?.data?.message || "No se pudo cancelar",
      "error"
    );
  }
}
</script>
