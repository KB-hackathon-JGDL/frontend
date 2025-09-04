import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vue3Toastify, { toast } from 'vue3-toastify'
import '@/assets/styles/reset.css'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(Vue3Toastify, {
  newestOnTop: true,
})


app.mount('#app')