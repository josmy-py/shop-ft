<template>
<DataTable :value="productos" paginator :rows="10" responsiveLayout="scroll">
    <template #header>
        <div class="table-header">
            <h3>Productos</h3>
            <Button
            label="Nuevo"
            icon="pi pi-plus"
            severity="success"
            @click="$emit('nuevo')"
        />

        </div>
    </template>

    <Column field="nombre" header="Nombre" />

    <Column field="descripcion" header="Descripción" />

    <Column field="modelo" header="Modelo" />

    <!-- Marca -->
    <Column header="Marca">
    <template #body="slotProps">
        {{ slotProps.data.marca?.nombre }}
    </template>
    </Column>

    <!-- Precio -->
    <Column header="Precio">
    <template #body="slotProps">
        {{ formatCurrency(slotProps.data.precio) }}
    </template>
    </Column>

    <Column field="stock" header="Stock" />

    <!-- Acciones -->
    <Column header="Acciones" style="width:150px">

    <template #body="slotProps">

        <div class="acciones">

            <Button
            icon="pi pi-pencil"
            severity="warning"
            class="btn-editar"
            @click="$emit('editar',slotProps.data)"
            />

            <Button
            icon="pi pi-trash"
            severity="danger"
            class="btn-eliminar"
            @click="$emit('eliminar',slotProps.data)"
            />

        </div>

    </template>

    </Column>

</DataTable>

</template>

<script setup>

defineProps({
    productos: Array
})

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-SV', {
        style: 'currency',
        currency: 'USD'
    }).format(value)

}

</script>

<style scoped>

.table-header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:10px;
}

.acciones{
display:flex;
gap:10px;
}

.btn-editar{
margin-right:6px;
}

</style>