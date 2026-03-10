import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
//importamos el plugin de pinia que mantiene la persistencia del estado
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import setupPrimeVue from './utils/primevue'

// 1. IMPORTAR ESTILOS DE Tailwind
import './assets/main.css' 

// 2. ESTILOS DE PRIMEVUE
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

setupPrimeVue(app)
//creamos instancia de pinia
const pinia = createPinia()
//hacemos que pinia use el plugin de persistencia del estado
pinia.use(piniaPluginPersistedstate)
//hacemos que el objeto vue(app) use pinia
app.use(pinia)
app.use(router)
app.mount('#app')
