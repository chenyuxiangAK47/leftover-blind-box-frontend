import { createRouter, createWebHistory } from 'vue-router'

// 懒加载
const HomeView = () => import('../views/HomeView.vue')
const MerchantView = () => import('../views/MerchantView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页 - Magic Bag', requiresAuth: false }
    },
    {
      path: '/merchant/:id',
      name: 'merchant',
      component: MerchantView,
      meta: { title: '商家详情 - Magic Bag', requiresAuth: false },
      // 把 id 转成数字并作为 props 传给组件
      props: route => ({ id: Number(route.params.id) })
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})

export default router
