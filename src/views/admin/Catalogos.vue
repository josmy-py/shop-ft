<template>
   <div>
    <h2 class="text-2xl font-bold mb-6">
        Catalogos del sistema
    </h2>
    <p class="text-gray-500 mb-8">
        Administra los Cátalogos de sistema como marcas
        y categorías de productos.
    </p>
    <div class="grid grid-cols-1 md: grid-cols-2 gap-6">
<div @click="goTo('/admin/catalogos/marcas')" class="catalog.card">
    <div class="icon bg-blue-100 text-blue-600">
        <i class="pi pi-tag text-2xl"></i>  
    </div>
    <h3 class="titles">Marcas</h3>
    <p class="descripcion">
        Gestión marcas de productos
    </p>
</div>
<div @click="goTo('/admin/catalogos/categorias')"
 class="catalog.card">
    <div class="icon bg-green-100 text-green-600">
        <i class="pi pi-tag text-2xl"></i>
    </div>
    <h3 class="titles">Categorias</h3>
    <p class="descripcion">
        Organiza productos en diferentes categorias
    </p>
</div>
    </div>
   </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goTo = (ruta) => {
  router.push(ruta);
};
</script>
<style scoped>
 .catalog-card{
    @apply bg-white p-6 rounded-xl shadow cursor-pointer flex items-center gap-4 transition;
 }
 .catalog-card:hover{
    @apply shadow-lg scale-[1.02];
 }
 .icon{
    @apply w-14 flex items-center justify-center rounded-lg;
 }
 .title{
    @apply text-lg font-semibold;
 }
 .descripcion{
    @apply text-sm text-gray-500;
 }
</style>
