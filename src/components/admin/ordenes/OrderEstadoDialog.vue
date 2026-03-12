<template>
    <Dialog v-model:visible="dialogVisible" header="Cambiar Estado" modal :style="{ width: '400px' }">
        <div v-if="order">
            <p><b>Orden: </b> {{ order.correlativo }}</p>
            <Dropdown v-model="estado" :options="estados" placeholder="Seleccione estado" class="w-full mt-2 mb-3" />
            <Button label="Actualizar" icon="pi pi-check" class="mt-3" @click="actualizarEstado" />
        </div>
    </Dialog>
</template>

<script setup>

import { ref, watch, computed } from "vue"
import api from "@/services/api"

const props = defineProps({
    visible: Boolean,
    order: Object
})

const emit = defineEmits(['update:visible', 'actualizado'])

const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
})

const estado = ref(null)

const estados = [
    'PAGADA',
    'ENTREGADA',
    'CANCELADA',
    'REEMBOLSADA'
]

watch(() => props.order, (o) => {
    estado.value = o?.estado
})

const actualizarEstado = async () => {
    await api.put(`/ordenes/estado/${props.order.id}`, {
        estado: estado.value
    })
    emit('actualizado')
    emit('update:visible', false)
}

</script>