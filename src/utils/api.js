// src/utils/api.js
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  withCredentials: true, // 如果后端用 cookie，会自动带上
})

// （可选）统一处理 401
 import { useUserStore } from '@/stores/user'
 api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
     try { useUserStore().logout() } catch (e) {}
   }
   return Promise.reject(err)
  }
 )
