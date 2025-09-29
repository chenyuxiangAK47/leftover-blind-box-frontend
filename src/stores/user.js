import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../utils/api'
import { JSEncrypt } from 'jsencrypt'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const username = ref(localStorage.getItem('username') || '')
  const publicKey = ref(localStorage.getItem('publicKey') || '')
  const isLoggedIn = computed(() => !!token.value)

  // 1) 获取公钥
  const fetchPublicKey = async () => {
    const res = await api.get('/auth/key')
    const k = res?.data?.data || res?.data?.publicKeyPem || res?.data?.publicKey || ''
    if (!k) throw new Error('Public key missing in response')
    publicKey.value = k
    localStorage.setItem('publicKey', k)
    return k
  }

  // 2) 公钥加密
  const encryptPassword = (pwd) => {
    if (!publicKey.value) throw new Error('Public key not loaded')
    const enc = new JSEncrypt()
    enc.setPublicKey(publicKey.value)
    return enc.encrypt(pwd)
  }

  // 3) 登录
  const login = async (usernameInput, password) => {
    try {
      if (!publicKey.value) await fetchPublicKey()
      const encryptedPassword = encryptPassword(password)

      const res = await api.post('/auth/login', {
        username: usernameInput,
        encryptedPassword, // 后端接这个字段
      })

      const userToken =
        res?.data?.token ||
        res?.data?.accessToken ||
        ''
      const userUsername =
        res?.data?.username ||
        res?.data?.user?.username ||
        res?.data?.user?.name ||
        usernameInput

      token.value = userToken
      username.value = userUsername
      localStorage.setItem('token', userToken)
      localStorage.setItem('username', userUsername)

      if (userToken) {
        api.defaults.headers.common.Authorization = `Bearer ${userToken}`
      }
      return { success: true, data: res.data }
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed (check backend / public key)'
      console.error('Login error:', error)
      return { success: false, message }
    }
  }

  // 4) 登出
  const logout = () => {
    token.value = ''
    username.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    delete api.defaults.headers.common.Authorization
  }

  // 5) 初始化（刷新恢复）
  const initialize = () => {
    const savedToken = localStorage.getItem('token')
    const savedUsername = localStorage.getItem('username')
    const savedPublicKey = localStorage.getItem('publicKey')
    if (savedToken) {
      token.value = savedToken
      api.defaults.headers.common.Authorization = `Bearer ${savedToken}`
    }
    if (savedUsername) username.value = savedUsername
    if (savedPublicKey) publicKey.value = savedPublicKey
  }

  return { token, username, publicKey, isLoggedIn, fetchPublicKey, login, logout, initialize }
})
