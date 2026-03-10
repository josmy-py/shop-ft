  <template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Inyectamos componente AdminNavbar -->
    <AdminNavbar @toggleSidebar="toggleSidebar" />

    <div class="flex flex-1 relative">
      <!-- Esconder el AdminSidebar automaticamente cuando es movil -->
      <div
        v-if="sidebarOpen && isMobile"
        class="fixed inset-0 bg-black/40 z-30"
        @click="closeSidebar"
      ></div>

      <!-- Inyectamos componente AdminSidebar -->
      <AdminSidebar
        :open="sidebarOpen"
        :isMobile="isMobile"
        @navigate="closeSidebar"
      />

      <!-- En main se renderizan los componentes con las opciones y rutas -->
      <main class="flex-1 p-6 overflow-y-auto">
        <router-view />
      </main>
    </div>

    <AdminFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import AdminFooter from "@/components/admin/AdminFooter.vue";

const sidebarOpen = ref(false);
const isMobile = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
}

const closeSidebar = () =>{
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
}

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768;

  if (!isMobile.value) {
    sidebarOpen.value = true;
  } else {
    sidebarOpen.value = false;
  }
}

onMounted(() => {
  checkScreen();

  window.addEventListener("resize", checkScreen);
});
</script>