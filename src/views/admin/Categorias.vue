<template>
    <div>
        <toast/>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Nueva Categoria" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="categorias" dataKey="id"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} categorias">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Gestión de Categorías</h4>

                        <div class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </div>
                    </div>
                </template>
                <Column field="nombre" header="Categoría" sortable style="min-width:16rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <div class="flex gap-2">
                            <Button icon="pi pi-pencil" outlined rounded @click="editCategoria(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteCategoria(slotProps.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
        <!--Formulario modal de primevue-->
        <Dialog v-model:visible="dialog" :style="{width: '450px'}" :header="titleDialog" :modal="true" class="p-fluid">
            <div class="field">
                <label for="name">Nombre</label>
                <InputText id="nombre" v-model.trim="categoria.nombre" required="true" autofocus :invalid="submitted && !categoria.nombre" />
                <small class="p-error" v-if="submitted && !categoria.nombre">Nombre es requerido.</small>
            </div>
            
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog"/>
                <Button :label="labelButton" security="primary" icon="pi pi-save" text @click="saveOrUpdate" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteCategoriaDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Seguro/a de eliminar la categoría <b>{{categoria.nombre}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteCategoriaDialog = false"/>
                <Button label="Si" icon="pi pi-check" text @click="deleteCategoria" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import api from '@/services/api';
import { i } from 'vite/dist/node/chunks/moduleRunnerTransport';

onMounted(() => {
    loadCategorias()
});

const toast = useToast();
const dt = ref();
const categorias = ref([]);
const categoria = ref({
    id:null,
    nombre:''
});
const dialog = ref(false);
const deleteCategoriaDialog = ref(false);

const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);

const openNew = () => {
    categoria.value = {};
    submitted.value = false;
    dialog.value = true;
};
const hideDialog = () => {
    dialog.value = false;
    submitted.value = false;
};

//función para obtener las marcas
const loadCategorias = async () =>{
    try{
        const {data} = await api.get('/categorias');
        categorias.value = data;
    }catch(err){
        console.log("Error al obtener las categorias", err)
    }
}

const saveOrUpdate = async () => {
    submitted.value = true;
    if(!categoria.value.nombre.trim()){
        return;
    }
    try{
        let response;
        if(categoria.value.id){
          //se va actualizar la categoria
          response = await api.put(`/categorias/${categoria.value.id}`, categoria.value);
          if(response.status === 202){
            const catUpdate = response.data.categoria;
            //odtener el indice del producto actualizado
            const index = categorias.value.findIndex(cat => cat.id === catUpdate.id);
            if(index !== -1){
                categorias.value[index] = catUpdate;
            }
          }
        }else{
          //se va crear nueva categoria
        }
        toast.add({
          severity:'success',
          summary: 'Opercion exitosa', 
          detail: response.data.message,
          life: 3000});
        dialog.value = {};
    }catch(err){
  
    }
};
const editCategoria = (cat) => {
    categoria.value = {...cat};
    dialog.value = true;
};
const confirmDeleteCategoria = (cat) => {
    categoria.value = cat;
    deleteCategoriaDialog.value = true;
};
const deleteCategoria = () => {
    categorias.value = categorias.value.filter(val => val.id !== categoria.value.id);
    deleteCategoriaDialog.value = false;
    categoria.value = {};
    toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};

//funciones computables para determinar si esta agregando o etidando un registro
const titleDialog = computed(() => {
    return categoria.value.id ? "Edición de Categorías" : "Registro de Categorías"
})

const labelButton = computed(() => {
    return categoria.value.id ? "Actualizar" : "Guardar"
})

</script>
