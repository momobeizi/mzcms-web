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
      component: () => import('@/views/layout/index.vue'),
      redirect: {
        name: 'dashboard'
      },
      children: [{
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'dashboard'
        }
      }]
    },
    {
      path: '/category',
      component: () => import('@/views/layout/index.vue'),
      meta: {
        title: '栏目管理',
        icon: 'wdfl'
      },
      redirect: {
        name: 'categoryManage',
      },
      children: [{
        path: '/categoryManage',
        component: () => import('@/views/categoryManage/index.vue'),
        name: 'categoryManage',
        meta: {
          title: '栏目列表',
          icon: 'wdfl'
        }
      }]
    },
    {
      path: '/system',
      component: () => import('@/views/layout/index.vue'),
      meta: {
        title: '系统管理',
        icon: 'systemSetting'
      },
      redirect: {
        name: 'systemManage',
      },
      children: [{
        path: '/systemManage',
        component: () => import('@/views/systemManage/index.vue'),
        name: 'systemManage',
        meta: {
          title: '系统设置',
          icon: 'xitongguanli'
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
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
