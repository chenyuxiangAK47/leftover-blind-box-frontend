import { fileURLToPath, URL } from 'node:url'
<<<<<<< HEAD
=======

>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://localhost:8080', // 后端地址
        changeOrigin: true,
        // 如果你的后端其实没有 /api 前缀，可以解开下面一行做路径重写：
        // rewrite: (path) => path.replace(/^\/api/, '')
=======
        target: 'http://localhost:8080',
        changeOrigin: true
>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310
      }
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
