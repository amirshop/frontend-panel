import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './core/router'
import { initI18n } from './core/i18n'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import './assets/styles/main.less'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'

// ایجاد یک QueryClient
const queryClient = new QueryClient()

const app = createApp(App)
const pinia = createPinia()

// استفاده از Vue Query Plugin
app.use(pinia)
app.use(router)
app.use(initI18n)
app.use(VueQueryPlugin, { queryClient }) // اضافه کردن Vue Query به اپلیکیشن

app.mount('#app')
