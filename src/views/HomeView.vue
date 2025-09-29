<template>
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
}
</style>
