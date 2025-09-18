import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { JSEncrypt } from 'jsencrypt'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const username = ref(localStorage.getItem('username') || '')
  const publicKey = ref('') // 存储从后端获取的公钥
  const isLoggedIn = computed(() => !!token.value)

  // 1. 获取公钥
  const fetchPublicKey = async () => {
    try {
      const response = await axios.get('/api/auth/key')
      publicKey.value = response.data.data
      // 保存到 localStorage（可选）
      localStorage.setItem('publicKey', publicKey.value)
      return publicKey.value
    } catch (error) {
      console.error('Failed to fetch public key:', error)
      throw error
    }
  }

  // 2. 用公钥加密密码
  const encryptPassword = (password) => {
    if (!publicKey.value) {
      throw new Error('Public key not loaded')
    }
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey.value)
    return encrypt.encrypt(password) // 返回 base64 编码的加密字符串
  }

  // 3. 登录（先获取公钥，再加密，再登录）
  const login = async (usernameInput, password) => {
    try {
      // 确保有公钥
      if (!publicKey.value) {
        await fetchPublicKey()
      }

      // 加密密码
      const encryptedPassword = encryptPassword(password)

      // 发送登录请求
      const response = await axios.post('/api/auth/login', {
        username: usernameInput,
        encryptedPassword // 注意：后端要接收 encryptedPassword
      })

      const { token: userToken, username: userUsername } = response.data

      token.value = userToken
      username.value = userUsername || usernameInput

      localStorage.setItem('token', userToken)
      localStorage.setItem('username', username.value)

      return { success: true, data: response.data }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Login failed (check network or public key)'
      return { success: false, message }
    }
  }

  // 4. 登出
  const logout = () => {
    token.value = ''
    username.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  // 5. 初始化
  const initialize = () => {
    const savedToken = localStorage.getItem('token')
    const savedUsername = localStorage.getItem('username')
    const savedPublicKey = localStorage.getItem('publicKey')
    if (savedToken) token.value = savedToken
    if (savedUsername) username.value = savedUsername
    if (savedPublicKey) publicKey.value = savedPublicKey
  }

  return {
    token,
    username,
    publicKey,
    isLoggedIn,
    fetchPublicKey,
    login,
    logout,
    initialize
  }
})
