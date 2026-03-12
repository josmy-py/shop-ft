<template>
  <div class="card">
    <Toast />
    <ConfirmDialog />

    <ProductoTable
      :productos="productos"
      :marcas="marcas"
      @toggle="toggleActivo"
      @nuevo="openNew"
      @editar="editProducto"
      @eliminar="confirmDelete"
    />

    <ProductoForm
      v-model:visible="productoDialog"
      :producto="producto"
      @guardar="guardarProducto"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

import productoService from "@/services/productoService";
import marcaService from "@/services/marcaService";

import ProductoTable from "@/components/admin/productos/ProductoTable.vue";
import ProductoForm from "@/components/admin/productos/ProductoForm.vue";

const toast = useToast();
const confirm = useConfirm();

const productos = ref([]);
const productoDialog = ref(false);
const producto = ref({});
const marcas = ref([]);

const loadProductos = async () => {
  const res = await productoService.getAll();
  productos.value = res.data;
};

const loadMarcas = async () => {
  const response = await marcaService.getAll();
  marcas.value = response.data;
};

const loadData = () => {
  loadMarcas();
  loadProductos();
};
onMounted(loadData);

const openNew = () => {
  producto.value = {};
  productoDialog.value = true;
};

const editProducto = (p) => {
  producto.value = { ...p };
  productoDialog.value = true;
};

const guardarProducto = async (formData, id) => {
  confirm.require({
    message: "¿Desea guardar los cambios?",
    header: "Confirmación",
    icon: "pi pi-exclamation-triangle",

    accept: async () => {
      try {
        let res;

        if (id) {
          res = await productoService.update(id, formData);
        } else {
          res = await productoService.store(formData);
        }

        toast.add({
          severity: "success",
          summary: "Correcto",
          detail: res.data.message,
          life: 3000,
        });

        productoDialog.value = false;
        loadProductos();
      } catch (error) {
        if (error.response?.status === 422) {
          const errores = error.response.data.errors;

          Object.values(errores).forEach((e) => {
            toast.add({
              severity: "error",
              summary: "Error",
              detail: e[0],
              life: 4000,
            });
          });
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error.response?.data?.message || "Error",
            life: 4000,
          });
        }
      }
    },
  });
};

const confirmDelete = (p) => {
  confirm.require({
    message: `¿Eliminar el producto ${p.nombre}?`,
    header: "Confirmar",
    icon: "pi pi-info-circle",

    accept: async () => {
      try {
        const res = await productoService.delete(p.id);
        toast.add({
          severity: "success",
          summary: "Eliminado",
          detail: res.data.message,
          life: 3000,
        });
        loadProductos();
      } catch (error) {
        if (error.response) {
          const data = error.response.data;
          // capturando errores de validación
          if (data.errors) {
            Object.values(data.errors).forEach((err) => {
              toast.add({
                severity: "warn",
                summary: "Validación",
                detail: err[0],
                life: 4000,
              });
            });
          } else {
            toast.add({
              severity: "warn",
              summary: "Aviso",
              detail: data.message,
              life: 4000,
            });
          }
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "No se pudo conectar con el servidor",
            life: 4000,
          });
        }
      }
    },
  });
};

//función para activar/desactivar
const toggleActivo = async (producto) => {
  try {
    const res = await productoService.toggleActivo(producto.id);

    toast.add({
      severity: "success",
      summary: "Estado actualizado",
      detail: res.data.message,
      life: 3000,
    });
    loadProductos();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.response?.data?.message || "Error del servidor",
      life: 4000,
    });
  }
};
</script>
