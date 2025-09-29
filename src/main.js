// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'            // 或 './router/index.js'
import { useUserStore } from './stores/user'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 刷新后恢复本地会话（token/username/publicKey）
useUserStore().initialize()

app.mount('#app')
