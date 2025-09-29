<template>
<<<<<<< HEAD
  <section class="wrap">
    <div class="title-row">
      <h1>All Products</h1>
      <div class="sub">Items: {{ products.length }}</div>
    </div>

    <div class="product-grid">
      <ProductCard
        v-for="p in products"
        :key="p.id"
        :product="p"
        @add="cart.add(p)"
        @open="openProduct(p)"
      />
    </div>

    <!-- 这里修改了 @close -->
    <ProductModal
      v-if="selected"
      :open="showProduct"
      :product="selected"
      @close="() => { showProduct = false; selected = null }"
      @open-merchant="m => openMerchant(m)"
    />

    <!-- 顺手把商家弹窗关闭逻辑也完善 -->
    <MerchantModal
      :open="showMerchant"
      :merchant="selectedMerchant"
      :products="merchantProducts"
      @close="() => { showMerchant = false; selectedMerchant = null; merchantProducts = [] }"
      @open-product="p => { selected = p; showProduct = true }"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'
import ProductModal from '@/components/ProductModal.vue'
import MerchantModal from '@/components/MerchantModal.vue'
import { mockProducts } from '@/mocks/data.js'

const cart = useCartStore()

const products = ref([])
const showProduct = ref(false)
const selected = ref(null)
function openProduct(p){ selected.value = p; showProduct.value = true }

const showMerchant = ref(false)
const selectedMerchant = ref(null)
const merchantProducts = ref([])
function openMerchant(m){
  selectedMerchant.value = m
  merchantProducts.value = mockProducts.filter(x => x.merchant.id === m.id)
  showMerchant.value = true
}

onMounted(()=>{ products.value = mockProducts })
function closeProduct() {
  showProduct.value = false
  selected.value = null
}
</script>

<style scoped>
.wrap{
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
.title-row{
  display:flex; align-items:center; justify-content:space-between;
  margin-bottom: 16px;
}
.title-row h1{ font-size: 22px; font-weight: 800; }
.title-row .sub{ color:#666; font-size:13px; }

/* 纯 CSS 网格：自动多列，小卡片 */
.product-grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
@media (min-width: 1400px){
  .product-grid{ grid-template-columns: repeat(6, minmax(0,1fr)); }
=======
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
>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310
}
</style>
