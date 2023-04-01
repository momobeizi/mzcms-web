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
      component: () => import('@/views/Layout/index.vue'),
      redirect: {
        name: 'dashboard'
      },
      children: [{
        path: '/dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        name: 'dashboard',
        meta: {
          title: 'Dashboard'
        }
      }]
    },
    {
      path: '/system',
      component: () => import('@/views/Layout/index.vue'),
      meta: {
        title: '系统管理'
      },
      redirect: {
        name: 'systemManage'
      },
      children: [{
        path: '/systemManage',
        component: () => import('@/views/SystemManage/index.vue'),
        name: 'systemManage',
        meta: {
          title: '系统设置'
        }
      }]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        onWhiteList: true,
        title: '登录',
        hidden: true
      },
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

export default router
