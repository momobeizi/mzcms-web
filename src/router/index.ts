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
          title: '首页',
          icon: 'dashboard'
        }
      }]
    },
    {
      path: '/article',
      component: () => import('@/views/layout/index.vue'),
      meta: {
        title: '内容管理',
        icon: 'neirongguanli'
      },
      redirect: {
        name: 'articleManage',
      },
      children: [{
        path: '/articleManage',
        component: () => import('@/views/articleManage/index.vue'),
        name: 'articleManage',
        meta: {
          title: '文章列表',
          icon: 'wenzhangliebiao'
        }
      },
      {
        path: '/comment',
        component: () => import('@/views/articleManage/comment.vue'),
        name: 'comment',
        meta: {
          title: '评论管理',
          icon: 'pinglunguanli'
        }
      },
      // {
      //   path: '/classification',
      //   component: () => import('@/views/articleManage/classification.vue'),
      //   name: 'classification',
      //   meta: {
      //     title: '分类管理',
      //     icon: 'fenleiliebiao'
      //   }
      // },
      {
        path: '/updateArticle',
        component: () => import('@/views/articleManage/updateArticle.vue'),
        name: 'updateArticle',
        meta: {
          title: '更新文章',
          icon: 'wdfl',
          hidden: true
        }
      }
      ]
    },
    {
      path: '/category',
      component: () => import('@/views/layout/index.vue'),
      meta: {
        title: '栏目管理',
        icon: 'leibie'
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
      path: '/user',
      component: () => import('@/views/layout/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'yonghuguanli'
      },
      redirect: {
        name: 'userManage',
      },
      children: [{
        path: '/userManage',
        component: () => import('@/views/userManage/index.vue'),
        name: 'userManage',
        meta: {
          title: '用户管理',
          icon: 'yonghuguanli'
        }
      }]
    },
    {
      path: '/friendlyLinks',
      component: () => import('@/views/layout/index.vue'),
      meta: {
        title: '友情链接',
        icon: 'youqinglianjie'
      },
      redirect: {
        name: 'friendlyLinksManage',
      },
      children: [{
        path: '/friendlyLinksManage',
        component: () => import('@/views/friendlyLinks/index.vue'),
        name: 'friendlyLinksManage',
        meta: {
          title: '友情链接',
          icon: 'youqinglianjie'
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
    },
    {
      path: '/account',
      name: 'account',
      redirect: {
        name: 'accountBasic'
      },
      meta: {
        title: '用户中心',
        hidden: true
      },
      component: () => import('@/views/layout/index.vue'),
      children: [{
        path: '/basic',
        component: () => import('@/views/account/basic.vue'),
        name: 'accountBasic',
        meta: {
          title: '基本设置',
        }
      }]
    }
  ]
})

export default router
