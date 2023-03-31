import { createRouter, createWebHistory } from 'vue-router'

/**
 * routes中对象
 * {
 *   path:'', // 页面路径
 *   name:'', // 页面名称
 *   component:()=>xxx, // 组件路径
 *   meta:{
 *      onWhiteList: true // 是否为白名单，默认不是
 *   }
 * }
 **/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/Dashboard/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        onWhiteList: true,
        title: '登录'
      },
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

export default router
