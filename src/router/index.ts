import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import DeviceLayout from '../layouts/DeviceLayout.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'preferences' },
  },
  
  {
    name: 'admin',
    path: '/',
    component: AppLayout,
    redirect: { name: 'preferences' },
    children: [
    
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/dashboard/Dashboard.vue'),
      },
      // {
      //   name: 'management',
      //   path: 'management',
      //   component: RouteViewComponent,
      //   children: [
      //     {
      //       name: 'toilet',
      //       path: 'toilet',
      //       component: () => import('../pages/toilets/ToiletsPage.vue'),
      //     },
      //     {
      //       name: 'toiletDetail',
      //       path: 'toilet/:id',
      //       component: () => import('../pages/cubicle/ToiletDetail.vue'),
      //     },
      //     {
      //       name: 'cubicle',
      //       path: 'cubicle',
      //       component: () => import('../pages/cubicle/PaymentsPage.vue'),
      //     },
      //     {
      //       name: 'logs',
      //       path: 'logs',
      //       component: () => import('../pages/devices/BillingPage.vue'),
      //     },
      //   ],
      // },
      // {
      //   name: 'openApi',
      //   path: 'openApi',
      //   component: () => import('../pages/openApi/Invoices.vue'),
      // },
      {
        name:'resident',
        path: 'resident',
        component: () => import('../pages/resident/residentPage.vue'),
      },
      {
        path:'/deviceMange',
        children:[
          {
            name:'status',
            path:'status',
            component:()=>import('../../src/pages/deviceManage/status/devicesStatus.vue')
          },
          {
            name:'meter',
            path:'meter',
            component:()=>import('../../src/pages/deviceManage/meter/meterManage.vue')
          },
          {
            name:'gateway',
            path:'gateway',
            component:()=>import('../../src/pages/deviceManage/gateway/gatewayPage.vue')
          }
        ]
      },
      {
        name: 'adminUsers',
        path: 'adminUsers',
        component: () => import('../pages/adminUsers/adminUsersPage.vue'),
      },
      {
        name: 'electricMeterManage',
        path: 'electricMeterManage',
        component: () => import('../pages/electricMeterManage/electricMeterManage.vue'),
        
      },
      {
        name: 'waterMeterManage',
        path: 'waterMeterManage',
        component: () => import('../pages/waterMeterManage/waterMeterManage.vue'),

      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('../pages/settings/Settings.vue'),
      },
      {
        name: 'preferences',
        path: 'preferences',
        component: () => import('../pages/preferences/Preferences.vue'),
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
        component: () => import('../pages/auth/Login.vue'),
      }
    ],
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
  // 清
  // localStorage.removeItem('toiletAdminToken')
  let token = localStorage.getItem('toiletAdminToken')
  let hasLogin = token != null && token != ''

  if ((to.name !== 'login') && !hasLogin) {
      next({ name: 'login' })
  }
  else{
    next()
  }

  
});


export default router
