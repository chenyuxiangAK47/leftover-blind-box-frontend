<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">Sugar Rush</div>
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Pages</a></li>
        <li><a href="#">Blogs</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
      <div class="actions">
        <button @click="showLogin = true">Login</button>
        <button>🛒 Cart</button>
      </div>
    </nav>

    <!-- 登录弹窗 -->
    <LoginModal v-if="showLogin" @close="showLogin = false" />

    <!-- 页面内容 -->
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginModal from './components/LoginModal.vue';

const showLogin = ref(false);
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: #fdf2e9;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 28px;
  font-weight: bold;
  color: #e74c3c;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #e74c3c;
}

.actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.actions button:nth-child(1) {
  background: #007bff;
  color: white;
}

.actions button:nth-child(2) {
  background: #f39c12;
  color: white;
}

/* 响应式 */
@media (max-width: 768px) {
  .navbar {
    padding: 15px 20px;
    flex-direction: column;
    gap: 15px;
  }
  .nav-links {
    gap: 15px;
  }
}
</style>
