<<<<<<< HEAD
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

=======
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310
app.mount('#app')
