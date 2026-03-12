<template>
    <Dialog v-model:visible="dialogVisible" header="Detalle de Orden" :style="{ width: '700px' }" modal :breakpoints="{ '960px': '75vw', '641px': '95vw' }">
        <div v-if="order" class="p-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="flex flex-col gap-1">
                    <p class="m-0"><span class="font-bold text-gray-700">Orden:</span> {{ order.correlativo }}</p>
                    <p class="m-0"><span class="font-bold text-gray-700">Cliente:</span> {{ order.user?.name }}</p>
                </div>
                <div class="flex flex-col gap-1 md:items-end">
                    <p class="m-0"><span class="font-bold text-gray-700">Fecha:</span> {{ formatFecha(order.fecha) }}</p>
                    <p class="m-0">
                        <span class="font-bold text-gray-700">Estado:</span> 
                        <Tag :value="order.estado" :severity="getSeverity(order.estado)" />
                    </p>
                </div>
            </div>

            <DataTable :value="order.items" responsiveLayout="scroll" class="p-datatable-sm">
                <Column header="Producto">
                    <template #body="slotProps">
                        {{ slotProps.data.producto?.nombre }}
                    </template>
                </Column>
                <Column field="cantidad" header="Cant." class="text-center" />
                <Column header="Precio" class="text-right">
                    <template #body="slotProps">
                        {{ formatMoney(slotProps.data.precio_unitario) }}
                    </template>
                </Column>
                <Column header="Subtotal" class="text-right">
                    <template #body="slotProps">
                        {{ formatMoney(slotProps.data.subtotal) }}
                    </template>
                </Column>
            </DataTable>

            <div class="flex justify-end mt-4">
                <div class="w-full md:w-5/12 border-t pt-3">
                    <div class="flex justify-between mb-1">
                        <span class="text-gray-600">Subtotal:</span>
                        <span>{{ formatMoney(order.subtotal) }}</span>
                    </div>
                    <div class="flex justify-between mb-1">
                        <span class="text-gray-600">Impuesto:</span>
                        <span>{{ formatMoney(order.impuesto) }}</span>
                    </div>
                    <div class="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                        <span>Total:</span>
                        <span class="text-primary">{{ formatMoney(order.total) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { computed } from "vue"
import Tag from 'primevue/tag' // para mejorar visualmente el estado

const props = defineProps({
    visible: Boolean,
    order: Object
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
})

const formatFecha = (fecha) => {
    if (!fecha) return ""
    const d = new Date(fecha)
    return d.toLocaleDateString('es-SV', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const formatMoney = (valor) => {
    return new Intl.NumberFormat('es-SV', {
        style: 'currency',
        currency: 'USD'
    }).format(valor || 0)
}

// Colores para el Tag de estado
const getSeverity = (estado) => {
    switch (estado?.toUpperCase()) {
        case 'COMPLETADO': return 'success';
        case 'PENDIENTE': return 'warning';
        case 'CANCELADO': return 'danger';
        default: return 'info';
    }
}
</script>