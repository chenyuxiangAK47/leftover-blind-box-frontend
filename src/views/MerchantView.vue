<template>
  <section class="max-w-7xl mx-auto p-4 sm:p-6 min-h-screen">
    <!-- 商家头部 -->
    <div v-if="merchant" class="merchant-header bg-white rounded-2xl shadow-sm p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-6 items-start">
        <div class="md:w-1/3">
          <img :src="merchant.image" alt="cover" class="w-full h-48 md:h-auto object-cover rounded-xl">
        </div>
        <div class="md:w-2/3">
          <h1 class="text-3xl font-bold text-red-600 mb-2">{{ merchant.name }}</h1>
          <div class="flex items-center mb-3" v-if="merchant.rating !== undefined">
            <div class="flex text-yellow-400"><span v-for="i in 5" :key="i">★</span></div>
            <span class="ml-2 font-semibold text-gray-700">{{ Number(merchant.rating).toFixed(1) }}</span>
            <span class="text-gray-500 ml-1" v-if="merchant.reviewCount">({{ merchant.reviewCount }} reviews)</span>
          </div>
          <p class="text-gray-600 mb-4">{{ merchant.bio }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div class="flex items-center gap-2" v-if="merchant.address">
              <span>{{ merchant.address }}</span>
            </div>
            <div class="flex items-center gap-2" v-if="merchant.openingHours">
              <span>{{ merchant.openingHours }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-10 text-gray-500">
      Loading merchant information...
    </div>

    <!-- 商品列表 -->
    <div v-if="products.length">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">All Products</h2>
      <div class="grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px;">
        <ProductCard
          v-for="p in products"
          :key="p.id"
          :product="p"
          @add="cart.add(p)"
          @open="openProduct(p)"
        />
      </div>
    </div>

    <div v-else-if="merchant" class="text-center py-10 text-gray-500">
      No products available for this merchant.
    </div>

    <!-- 这里修改了 @close -->
    <ProductModal
      v-if="selected"
      :open="showProduct"
      :product="selected"
      @close="() => { showProduct = false; selected = null }"
      @open-merchant="() => {}"
    />
  </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductModal from '@/components/ProductModal.vue'
import { useCartStore } from '@/stores/cart'
import { mockProducts, mockMerchants } from '@/mocks/data.js'

const props = defineProps({ id: { type: Number, required: true } })

const cart = useCartStore()
const merchant = ref(null)
const products = ref([])
const showProduct = ref(false)
const selected = ref(null)

function openProduct(p){ selected.value = p; showProduct.value = true }

watchEffect(() => {
  const id = Number(props.id)
  merchant.value = mockMerchants.find(m => Number(m.id) === id) || null
  products.value = mockProducts.filter(p => Number(p.merchant?.id) === id)
})
</script>

<style scoped>
.merchant-header { opacity:0; transform: translateY(20px); animation: fadeIn .5s ease forwards; }
@keyframes fadeIn { to { opacity:1; transform:none; } }
</style>
