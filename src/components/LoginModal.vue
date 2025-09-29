<template>
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
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 如果你没有配置 @ 别名，请把下一行改成：import { useUserStore } from '../stores/user'
import { useUserStore } from '@/stores/user'

const emit = defineEmits(['close'])
const user = useUserStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
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
  }
}
</script>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: grid; place-items: center; z-index: 1001; }
.modal { width: 360px; background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,.2); }
.form { display: grid; gap: 10px; }
input { padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
.primary { padding: 10px; border: none; border-radius: 8px; background: #007bff; color: #fff; cursor: pointer; }
.ghost { padding: 10px; border: 1px solid #ddd; border-radius: 8px; background: #fff; cursor: pointer; }
.error { color: #e74c3c; font-size: 13px; }
</style>
