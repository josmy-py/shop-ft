<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Crear Usuario</h2>
      <div v-if="errorMessage" class="mb-4 p-3 text-sm text-red-600 bg-red-100 rounded-lg">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="sendRegister" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Nombre </label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Email </label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Password </label>
          <input
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Password </label>
          <input
            v-model="form.confirm"
            type="password"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 disabled:opacity-50"
        >
          {{ loading ? "Registrando..." : "Registrarse" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="text-blue-600 hover:underline font-medium">
          Iniciar Sesión
        </router-link>
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const loading = ref(false);
const errorMessage = ref(null);

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirm:''
});

const sendRegister = async () => {
  loading.value = true;
  errorMessage.value = null;

  try {
    if(form.password !== form.confirm){
        errorMessage.value = "Las contraseñas no coinciden, verifique";
        return;
    }
    await authStore.register(form);
  } catch (err) {
    if (err.response.status === 422) {
      console.log(err.response);
    } else {
      errorMessage.value = "Error al registrar el usuario";
    }
  } finally {
    loading.value = false;
  }
};
</script>
