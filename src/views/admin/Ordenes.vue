<template>
    <div class="card">
        <OrderTable :orders="orders" @ver="verOrden" @estado="cambiarEstado" />
        <OrderDetailDialog v-model:visible="showDetail" :order="selectedOrder" />
        <OrderEstadoDialog v-model:visible="showEstado" :order="selectedOrder" @actualizado="loadOrders" />
    </div>

</template>

<script setup>

import { ref, onMounted } from 'vue'
import api from '@/services/api'

import OrderTable from '@/components/admin/ordenes/OrderTable.vue'
import OrderDetailDialog from '@/components/admin/ordenes/OrderDetailDialog.vue'
import OrderEstadoDialog from '@/components/admin/ordenes/OrderEstadoDialog.vue'

const orders = ref([])

const selectedOrder = ref(null)

const showDetail = ref(false)
const showEstado = ref(false)

const loadOrders = async () => {
    const res = await api.get('/orders')
    orders.value = res.data
}

const verOrden = (order) => {
    selectedOrder.value = order
    showDetail.value = true
}

const cambiarEstado = (order) => {
    selectedOrder.value = order
    showEstado.value = true
}
onMounted(loadOrders)
</script>