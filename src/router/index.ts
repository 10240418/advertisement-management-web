import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: { name: 'home' },
  // },
  {
    name: 'admin',
    path: '/',
    component: AppLayout,
    redirect: { name: 'adminUsers' },
    children: [
      {
        path: '/',
        children: [],
      },
      {
        path: '/deviceMange',
        children: [
          // {
          //   name: 'status',
          //   path: 'status',
          //   component: () => import('@/pages/deviceManage/status/devicesStatus.vue'),
          // },
          // {
          //   name: 'meter',
          //   path: 'meter',
          //   component: () => import('@/pages/deviceManage/meter/meterPage.vue'),
          // },
          // {
          //   name: 'gateway',
          //   path: 'gateway',
          //   component: () => import('@/pages/deviceManage/gateWay/gatewayPage.vue'),
          // },
        ],
      },
      {
        path: '/task',
        children: [
          // {
          //   name: 'controlTask',
          //   path: 'controlTask',
          //   component: () => import('@/pages/task/controlTask/controlTaskPage.vue'),
          // },
          // {
          //   name: 'systemTask',
          //   path: 'systemTask',
          //   component: () => import('@/pages/task/systemTask/systemTaskPage.vue'),
          // },
        ],
      },
      {
        name: 'adminUsers',
        path: 'adminUsers',
        component: () => import('@/pages/adminUsers/adminUsersPage.vue'),
      },
      {
        name: 'building',
        path: 'building',
        component: () => import('@/pages/building/buildingPage.vue'),
      },
      {
        name: 'advertisement',
        path: 'advertisement',
        component: () => import('@/pages/advertisement/advertisementPage.vue'),
      },
      {
        name: 'notice',
        path: 'notice',
        component: () => import('@/pages/notice/noticePage.vue'),
      },
    ],
  },

  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/pages/auth/Login.vue'),
      },
    ],
  },
  {
    name: 'buildingDetail',
    path: '/buildingDetail/:id?',
    component: () => import('@/pages/building/widgets/buildingDialog.vue'),
  },

  {
    name: 'advertisementDetail',
    path: '/advertisementDetail/:id?',
    component: () => import('@/pages/advertisement/widgets/advertisementDialog.vue'),
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../pages/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes,
})

router.beforeResolve((to, from, next) => {
  const token = localStorage.getItem('AdminToken')
  const hasLogin = token != null && token != ''

  if (to.name !== 'login' && !hasLogin) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
