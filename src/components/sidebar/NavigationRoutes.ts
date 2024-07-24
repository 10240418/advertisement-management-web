export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    // {
    //   name: 'dashboard',
    //   displayName: 'menu.dashboard',
    //   meta: {
    //     icon: 'vuestic-iconset-dashboard',
    //   },
    // },
    // {
    //   name: 'management',
    //   displayName: 'menu.management',
    //   meta: {
    //     icon: 'group',
    //   },
    //   children: [
    //     {
    //       name: 'toilet',
    //       displayName: 'menu.toilet',
    //     },
    //     {
    //       name: 'logs',
    //       displayName: 'menu.logs',
    //     },
    //   ],
    // },
    // {
    //   name: 'open-api',
    //   displayName: 'menu.openApi',
    //   meta: {
    //     icon: 'group',
    //   },
    // },
    {
      name: 'resident',
      displayName: 'menu.resident',
      meta: {
        icon: 'group',
      },
    },
    {
      name: 'adminUsers',
      displayName: 'menu.adminUser',
      meta: {
        icon: 'group',
      },
    },
    {
      name: 'electricMeterManage',
      displayName: 'menu.electricMeterManage',
      meta: {
        icon: 'manage_accounts',
      },
    },
    {
      name: 'waterMeterManage',
      displayName: 'menu.waterMeterManage',
      meta: {
        icon: 'manage_accounts',
      },
    },
    // {
    //   name: 'preferences',
    //   displayName: 'menu.preferences',
    //   meta: {
    //     icon: 'manage_accounts',
    //   },
    // },
    {
      name: 'auth',
      displayName: 'menu.auth',
      meta: {
        icon: 'login',
      },
      children: [
        {
          name: 'login',
          displayName: 'menu.login',
        },
      ],
    },
    {
      name:'deviceManage',
      displayName:'menu.deviceManage',
      meta:{
        icon:'settings'
      },
      children:[
        {
          name:'status',
          displayName:'menu.status'
        },
        {
          name:'meter',
          displayName:'menu.meter'
        },
        {
          name:'gateway',
          displayName:'menu.gateway'
        }
      ]

    },
    {
      name: 'settings',
      displayName: 'menu.settings',
      meta: {
        icon: 'settings',
      },
    },
  ] as INavigationRoute[],
}
