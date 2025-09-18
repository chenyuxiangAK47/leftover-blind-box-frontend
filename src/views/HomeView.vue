<template>
  <main class="home">
    <div class="hero">
      <h1>Welcome to Magic Bag</h1>
      <p>The sweetest candies & desserts in town</p>
      <button>Shop Now</button>
    </div>

    <!-- 商品展示区 -->
    <div class="products">
      <div class="product-card" v-for="n in 6" :key="n">
        <div class="product-img"></div>
        <h3>Candy {{ n }}</h3>
        <p>$4.99</p>
        <button>Add to Cart</button>
      </div>
    </div>
  </main>
</template>

<script setup>
// 这里可以放商品数据
</script>

<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background: #fff3e6;
  border-radius: 12px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 48px;
  color: #e74c3c;
  margin-bottom: 15px;
}

.hero p {
  font-size: 20px;
  color: #555;
  margin-bottom: 30px;
}

.hero button {
  background: #e74c3c;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
}

.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  padding: 15px;
}

.product-img {
  height: 180px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff9ff3, #54a0ff);
}

.product-card h3 {
  margin-bottom: 10px;
  color: #333;
}

.product-card p {
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 15px;
}

.product-card button {
  background: #27ae60;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
