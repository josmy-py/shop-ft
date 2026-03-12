<template>
  <Dialog v-model:visible="dialogVisible" :header="titleDialog" :style="{ width: '600px' }">
    <div class="p-fluid grid">
      <div class="col-12">
        <label class="form-label">Nombre</label>
        <InputText v-model="producto.nombre" placeholder="Nombre" />
      </div>

      <div class="col-12 mt-2">
        <label class="form-label">Descripción</label>
        <Textarea v-model="producto.descripcion" rows="3" placeholder="Descripción" />
      </div>

      <div class="col-6">
        <label class="form-label">Modelo</label>
        <InputText v-model="producto.modelo" placeholder="Modelo" />
      </div>

      <div class="col-6 mt-2">
        <label class="form-label">Precio</label>
        <InputNumber v-model="producto.precio" placeholder="Precio" />
      </div>

      <div class="col-6 mt-2">
        <label class="form-label">Stock</label>
        <InputNumber v-model="producto.stock" placeholder="Stock" />
      </div>

      <div class="col-6 mt-2">
        <label class="form-label">Estado</label>
        <Dropdown
          v-model="producto.activo"
          :options="estados"
          optionLabel="label"
          optionValue="value"
          placeholder="Estado"
        />
      </div>

      <div class="col-6 mt-2">
        <label class="form-label">Marca</label>
        <Dropdown
          v-model="producto.marca"
          :options="marcas"
          optionLabel="nombre"
          placeholder="Marca"
        />
      </div>

      <div class="col-6 mt-2">
        <label class="form-label">Categoría</label>
        <Dropdown
          v-model="producto.categoria"
          :options="categorias"
          optionLabel="nombre"
          placeholder="Categoría"
        />
      </div>
    </div>

    <h4 class="mt-4">Imágenes</h4>

    <FileUpload multiple customUpload mode="basic" accept="image/*" @select="onSelect" />

    <div class="flex gap-3 mt-3">
      <img
        v-for="img in preview"
        :key="img.url"
        :src="img.url"
        style="width: 80px; height: 80px; object-fit: cover"
      />
    </div>

    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" severity="secondary" @click="close" />

      <Button :label="labelButton" icon="pi pi-check" @click="submit" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";

import categoriaService from "@/services/categoriaService";
import marcaService from "@/services/marcaService";

const BASE_IMAGE_URL = "http://localhost:8000/images/productos/";

const props = defineProps({
  visible: Boolean,
  producto: Object,
});

const emit = defineEmits(["update:visible", "guardar"]);

//propiedades computables
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit("update:visible", val),
});

//funciones computables para determinar si esta agregando o etidando un registro
const titleDialog = computed(() => {
  return producto.value.id ? "Edición de Productos" : "Registro de Productos";
});

const labelButton = computed(() => {
  return producto.value.id ? "Actualizar" : "Guardar";
});

const producto = ref({});
const categorias = ref([]);
const marcas = ref([]);
const preview = ref([]);
const imagenes = ref([]);

const estados = [
  { label: "Activo", value: 1 },
  { label: "Inactivo", value: 0 },
];

const loadPreviewImages = (producto) => {
  preview.value = [];
  if (producto?.imagenes) {
    producto.imagenes.forEach((img) => {
      preview.value.push({
        id: img.id,
        url: BASE_IMAGE_URL + img.nombre,
        existente: true,
      });
    });
  }
};
watch(
  () => props.producto,
  (v) => {
    // Si no hay valor, reseteamos y salimos
    if (!v) {
      producto.value = {};
      return;
    }

    // Mapeo del objeto con conversión numérica
    producto.value = {
      ...v,
      precio: v.precio != null ? Number(v.precio) : null,
      stock: v.stock != null ? Number(v.stock) : null,
    };

    loadPreviewImages(v);
  },
  { immediate: true },
);

const loadData = async () => {
  const c = await categoriaService.getAll();
  categorias.value = c.data;

  const m = await marcaService.getAll();
  marcas.value = m.data;
};

onMounted(loadData);

const onSelect = (e) => {
  e.files.forEach((file) => {
    imagenes.value.push(file);

    preview.value.push({
      url: URL.createObjectURL(file),
      existente: false,
    });
  });
};

const close = () => emit("update:visible", false);

const submit = () => {
  const formData = new FormData();

  formData.append("producto", JSON.stringify(producto.value));

  imagenes.value.forEach((i) => {
    formData.append("imagenes[]", i);
  });

  emit("guardar", formData, producto.value.id);
};
</script>

<style scoped>
.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 0.9rem;
  color: #444;
}

.imagenes-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>