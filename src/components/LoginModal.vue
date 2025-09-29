<template>
<<<<<<< HEAD
  <!-- 只点遮罩空白处才关闭 -->
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2>Login</h2>

      <form @submit.prevent="onSubmit" class="form">
        <input
          v-model.trim="username"
          type="text"
          placeholder="Email / Username"
          required
        />
        <input
          v-model.trim="password"
          type="password"
          placeholder="Password"
          minlength="6"
          required
        />

        <button class="primary" :disabled="loading">
          {{ loading ? 'Logging in…' : 'Login' }}
        </button>
        <button class="ghost" type="button" @click="$emit('close')" :disabled="loading">
          Cancel
        </button>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
=======
  <div class="overlay" @click="$emit('close')">
    <div class="login-modal" @click.stop>
      <h2>Login to Sugar Rush</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Username</label>
          <input v-model="username" type="text" placeholder="Enter your username" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <button type="button" @click="$emit('close')" class="cancel-btn">
          Cancel
        </button>
>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
<<<<<<< HEAD
// 如果你没有配置 @ 别名，请把下一行改成：import { useUserStore } from '../stores/user'
import { useUserStore } from '@/stores/user'

const emit = defineEmits(['close'])
const user = useUserStore()
=======
import { useUserStore } from '../stores/user'  // ← 引入 store
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310

const username = ref('')
const password = ref('')
const loading = ref(false)
<<<<<<< HEAD
const errorMsg = ref('')

const onSubmit = async () => {
  errorMsg.value = ''
  loading.value = true
  const res = await user.login(username.value, password.value)
  loading.value = false
  if (res.success) {
    emit('close')
  } else {
    errorMsg.value = res.message || 'Login failed'
=======

const emit = defineEmits(['close'])

const handleLogin = async () => {
  loading.value = true
  const result = await userStore.login(username.value, password.value)
  loading.value = false

  if (result.success) {
    alert('Login successful!')
    emit('close')
    router.push('/')  // 可改为 /dashboard
  } else {
    alert('Login failed: ' + result.message)
>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310
  }
}
</script>

<style scoped>
<<<<<<< HEAD
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: grid; place-items: center; z-index: 1001; }
.modal { width: 360px; background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,.2); }
.form { display: grid; gap: 10px; }
input { padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
.primary { padding: 10px; border: none; border-radius: 8px; background: #007bff; color: #fff; cursor: pointer; }
.ghost { padding: 10px; border: 1px solid #ddd; border-radius: 8px; background: #fff; cursor: pointer; }
.error { color: #e74c3c; font-size: 13px; }
=======
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.login-modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
}

.login-modal h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

button {
  padding: 10px 20px;
  margin: 10px 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button[type="submit"] {
  background: #007bff;
  color: white;
}

button[type="submit"]:disabled {
  background: #6ea8ff;
  cursor: not-allowed;
}

.cancel-btn {
  background: #95a5a6;
  color: white;
}
>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310
</style>
