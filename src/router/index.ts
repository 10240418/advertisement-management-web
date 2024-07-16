import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'

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
      {
        name: 'management',
        path: 'management',
        component: RouteViewComponent,
        children: [
          {
            name: 'toilet',
            path: 'toilet',
            component: () => import('../pages/toilets/ToiletsPage.vue'),
          },
          {
            name: 'toiletDetail',
            path: 'toilet/:id',
            component: () => import('../pages/cubicle/ToiletDetail.vue'),
          },
          // {
          //   name: 'cubicle',
          //   path: 'cubicle',
          //   component: () => import('../pages/cubicle/PaymentsPage.vue'),
          // },
          {
            name: 'logs',
            path: 'logs',
            component: () => import('../pages/devices/BillingPage.vue'),
          },
        ],
      },
      {
        name: 'open-api',
        path: 'open-api',
        component: () => import('../pages/openApi/Invoices.vue'),
      },
      {
        name: 'staff-users',
        path: 'staff-users',
        component: () => import('../pages/staffUsers/UsersPage.vue'),
      },
      {
        name: 'admin-users',
        path: 'admin-users',
        component: () => import('../pages/adminUsers/UsersPage.vue'),
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
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
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
  let token = localStorage.getItem('toiletAdminToken')
  let hasLogin = token != null && token != ''

  if ((to.name !== 'login') && !hasLogin) {
      next({ name: 'login' })
  }

  next()
});


export default router
