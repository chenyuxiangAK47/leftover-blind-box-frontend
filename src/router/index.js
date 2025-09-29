import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD

// 懒加载
const HomeView = () => import('../views/HomeView.vue')
const MerchantView = () => import('../views/MerchantView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
=======
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310
  routes: [
    {
      path: '/',
      name: 'home',
<<<<<<< HEAD
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
=======
      component: HomeView
    }
  ],
>>>>>>> c58538bbe15c6cb1563317a18b1b686b96df0310
})

export default router
