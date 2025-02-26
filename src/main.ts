import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './core/router'
import { initI18n } from './core/i18n'
import '@/assets/styles/main.less'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(initI18n)

app.mount('#app')
