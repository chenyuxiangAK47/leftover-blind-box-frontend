<template>
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
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'  // ← 引入 store
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const loading = ref(false)

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
  }
}
</script>

<style scoped>
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
</style>
