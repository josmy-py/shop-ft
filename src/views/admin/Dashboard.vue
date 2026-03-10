<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Resumen Operativo</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <!-- Ventas -->
      <div class="card">
        <div class="icon bg-blue-100 text-blue-600">
          <i class="pi pi-chart-line"></i>
        </div>

        <div>
          <p class="label">Ventas Totales</p>
          <h3 class="value">$1,250.75</h3>
        </div>
      </div>

      <!-- Ordenes Pendientes -->
      <div class="card">
        <div class="icon bg-yellow-100 text-yellow-600">
          <i class="pi pi-clock"></i>
        </div>

        <div>
          <p class="label">Órdenes Pendientes</p>
          <h3 class="value">8</h3>
        </div>
      </div>

      <!-- Ordenes Pagadas -->
      <div class="card">
        <div class="icon bg-green-100 text-green-600">
          <i class="pi pi-check-circle"></i>
        </div>

        <div>
          <p class="label">Órdenes Pagadas</p>
          <h3 class="value">25</h3>
        </div>
      </div>

      <!-- Ordenes Canceladas -->
      <div class="card">
        <div class="icon bg-red-100 text-red-600">
          <i class="pi pi-times-circle"></i>
        </div>

        <div>
          <p class="label">Órdenes Canceladas</p>
          <h3 class="value">3</h3>
        </div>
      </div>

      <!-- Ordenes Reembolsadas -->
      <div class="card">
        <div class="icon bg-purple-100 text-purple-600">
          <i class="pi pi-refresh"></i>
        </div>

        <div>
          <p class="label">Órdenes Reembolsadas</p>
          <h3 class="value">2</h3>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card {
  @apply bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 transition hover:shadow-md;
}

.icon {
  @apply flex items-center justify-center w-12 h-12 rounded-lg text-xl;
}

.label {
  @apply text-gray-500 text-sm;
}

.value {
  @apply font-bold text-xl text-gray-800;
}
</style>