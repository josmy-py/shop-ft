<template>
  <div class="container mx-auto px-6 py-10">
    <!-- Encabezado -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Detalle de Orden</h1>
        <p class="text-gray-600 mt-2">
          Cliente: <span class="font-semibold">{{ authStore.user?.name }}</span>
        </p>
        <p class="text-gray-600">
          Fecha: {{ currentDate }}
        </p>
        <p class="text-gray-500 text-sm mt-1">
          Total de artículos: {{ orderStore.totalItems }}
        </p>
      </div>

      <router-link
        to="/"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Seguir agregando
      </router-link>
    </div>

    <!-- Tabla -->
    <div v-if="orderStore.items.length > 0" class="bg-white shadow-xl rounded-xl overflow-hidden">

      <table class="min-w-full text-sm text-left">

        <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-6 py-4">Item</th>
            <th class="px-6 py-4">Producto</th>
            <th class="px-6 py-4">Marca</th>
            <th class="px-6 py-4 text-center">Cantidad</th>
            <th class="px-6 py-4 text-right">Precio</th>
            <th class="px-6 py-4 text-right">Subtotal</th>
            <th class="px-6 py-4 text-center">Eliminar</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in orderStore.items"
            :key="item.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4 font-medium">
              {{ index + 1 }}
            </td>

            <td class="px-6 py-4">
              <div class="font-semibold">
                {{ item.nombre }}
              </div>
              <div class="text-gray-500 text-xs">
                {{ item.descripcion }} - {{ item.modelo }}
              </div>
            </td>

            <td class="px-6 py-4">
              {{ item.marca }}
            </td>

            <!-- CANTIDAD -->
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center items-center gap-2">
                <button
                    @click="orderStore.decrement(item.id)"
                    class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    >-</button>

                    <span class="font-semibold w-8 text-center">
                    {{ item.cantidad }}
                    </span>

                    <button
                    @click="orderStore.increment(item.id)"
                    class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    >+</button>
              </div>
            </td>

            <td class="px-6 py-4 text-right">
              {{ formatCurrency(item.precio) }}
            </td>

            <td class="px-6 py-4 text-right font-semibold">
              {{ formatCurrency(item.precio * item.cantidad) }}
            </td>

            <td class="px-6 py-4 text-center">
              <button
                @click="orderStore.removeItem(item.id)"
                class="text-red-500 hover:text-red-700 transition"
              >
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Totales -->
      <div class="p-8 bg-gray-50">

        <div class="flex justify-end">
          <div class="w-full md:w-1/3 space-y-3 text-sm">

            <div class="flex justify-between">
              <span>Subtotal (sin IVA)</span>
              <span>{{ formatCurrency(subtotalSinIVA) }}</span>
            </div>

            <div class="flex justify-between">
              <span>IVA (13%)</span>
              <span>{{ formatCurrency(iva) }}</span>
            </div>

            <div class="flex justify-between text-xl font-bold border-t pt-3 mt-3">
              <span>Total</span>
              <span>{{ formatCurrency(orderStore.total) }}</span>
            </div>

          </div>
        </div>

        <!-- BOTONES -->
        <div class="flex justify-between mt-8">

          <button
            @click="handleClearOrder"
            class="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition"
          >
            Vaciar Orden
          </button>

          <button
            @click="confirm"
            :disabled="orderStore.loading"
            class="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow disabled:opacity-50"
          >
            <span v-if="orderStore.loading">Procesando...</span>
            <span v-else>Confirmar Orden</span>
          </button>

        </div>

      </div>

    </div>

    <div v-else class="text-gray-500 text-center py-20">
      No hay productos en la orden.
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const currentDate = new Date().toLocaleDateString('es-SV')

const subtotalSinIVA = computed(() => {
  return orderStore.total / 1.13
})

const iva = computed(() => {
  return orderStore.total - subtotalSinIVA.value
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-SV', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value)
}

const handleClearOrder = async () => {
  const result = await Swal.fire({
    title: '¿Vaciar orden?',
    text: 'Se eliminarán todos los productos de la orden.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    orderStore.clearOrder()

    Swal.fire({
      icon: 'success',
      title: 'Orden vaciada',
      timer: 1500,
      showConfirmButton: false
    })
  }
}

const confirm = async () => {

   console.log("Entró a confirmOrder");
  if (!authStore.user) {
    router.push('/login')
    return
  }

  if (orderStore.items.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'No hay productos en la orden'
    })
    return
  }

  const result = await Swal.fire({
    title: '¿Confirmar orden?',
    html: `
      <p>Total a pagar:</p>
      <strong>${formatCurrency(orderStore.total)}</strong>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#16a34a',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar'
  })

  if (!result.isConfirmed) return

  try {

    const payload = {
      user_id: authStore.user.id,
      fecha: new Date().toISOString().split('T')[0],
      subtotal: subtotalSinIVA.value,
      impuesto: iva.value,
      total: orderStore.total,
      items: orderStore.items.map(item => ({
        producto_id: item.id,
        cantidad: item.cantidad
      }))
    }

    Swal.fire({
      title: 'Procesando orden...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const response = await orderStore.confirmOrder(payload)

    Swal.close()

    // VALIDACIÓN CORRECTA
    if (response.status === 201) {

      const { message, order } = response.data

      await Swal.fire({
        icon: 'success',
        title: message,
        confirmButtonColor: '#16a34a'
      })

      orderStore.clearOrder()

      router.push({
        path: '/',
        query: { id: order.id }
      })

    }

  } catch (error) {

    Swal.close()

    Swal.fire({
      icon: 'error',
      title: 'Error al crear la orden',
      text: error.response?.data?.message || 'Error inesperado'
    })
  }
}

</script> 
