<template>
  <DataTable
    :value="productosFiltrados"
    paginator
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    dataKey="id"
    :filters="filters"
    :globalFilterFields="['nombre', 'descripcion', 'modelo', 'marca.nombre']"
    responsiveLayout="scroll"
  >
    <!-- HEADER -->

    <template #header>
      <div class="table-header">
        <h3 class="text-2xl">Gestión de Productos</h3>

        <div class="header-filters">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Buscar producto" />
          </span>

          <Dropdown
            v-model="marcaSeleccionada"
            :options="marcas"
            optionLabel="nombre"
            placeholder="Filtrar marca"
            class="marca-dropdown"
            showClear
          />

          <Button label="Nuevo" icon="pi pi-plus" severity="success" @click="$emit('nuevo')" />
        </div>
      </div>
    </template>

    <!-- COLUMNAS -->

    <Column field="nombre" header="Nombre" sortable />

    <Column field="descripcion" header="Descripción" />

    <Column field="modelo" header="Modelo" sortable />

    <!-- Marca -->

    <Column header="Marca">
      <template #body="slotProps">
        {{ slotProps.data.marca?.nombre }}
      </template>
    </Column>

    <!-- Precio -->

    <Column header="Precio" sortable>
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.precio) }}
      </template>
    </Column>

    <Column field="stock" header="Stock" sortable />

    <Column header="Activo">
      <template #body="slotProps">
        <InputSwitch :modelValue="slotProps.data.activo" @change="emit('toggle', slotProps.data)" />
      </template>
    </Column>

    <!-- ACCIONES -->

    <Column header="Acciones" style="width: 140px">
      <template #body="slotProps">
        <div class="acciones">
          <Button icon="pi pi-pencil" severity="warning" @click="$emit('editar', slotProps.data)" />

          <Button icon="pi pi-trash" severity="danger" @click="$emit('eliminar', slotProps.data)" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, computed } from "vue";
import { FilterMatchMode } from "primevue/api";

const emit = defineEmits(["edit", "toggle", "delete"]);

const props = defineProps({
  productos: Array,
  marcas: Array,
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const marcaSeleccionada = ref(null);

const productosFiltrados = computed(() => {
  if (!marcaSeleccionada.value) {
    return props.productos;
  }

  return props.productos.filter((p) => p.marca?.id === marcaSeleccionada.value.id);
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-SV", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.header-filters {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.marca-dropdown {
  min-width: 160px;
}

.acciones {
  display: flex;
  gap: 8px;
}

/* RESPONSIVO */

@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-filters {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .marca-dropdown {
    width: 100%;
  }
}
</style>
