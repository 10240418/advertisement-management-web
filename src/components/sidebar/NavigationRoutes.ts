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
    //   name: 'home',
    //   displayName: 'menu.home',
    //   meta: {
    //     icon: 'home',
    //   },
    // },
    {
      name: 'adminUsers',
      displayName: 'menu.adminUser',
      meta: {
        icon: 'manage_accounts',
      },
    },
    {
      name: 'building',
      displayName: 'menu.building',
      meta: {
        icon: 'apartment',
      },
    },
    {
      name: 'advertisement',
      displayName: 'menu.advertisement',
      meta: {
        icon: 'featured_video',
      },
    },
    // {
    //   name: 'notice',
    //   displayName: 'menu.notice',
    //   meta: {
    //     icon: 'notifications',
    //   },
    // },
    // {
    //   name: 'resident',
    //   displayName: 'menu.residentManage',
    //   meta: {
    //     icon: 'group',
    //   },
    //   children: [
    //     {
    //       name: 'resident',
    //       displayName: 'menu.resident',
    //       meta: {
    //         icon: 'group',
    //       },
    //     },
    //     {
    //       name: 'unit',
    //       displayName: 'menu.unit',
    //       meta: {
    //         icon: 'group',
    //       },
    //     },
    //   ],
    // },
    // {
    //   name: 'deviceManage',
    //   displayName: 'menu.deviceManage',
    //   meta: {
    //     icon: 'dvr',
    //   },
    //   children: [
    //     {
    //       name: 'status',
    //       displayName: 'menu.status',
    //       meta: {
    //         icon: 'browse_activity',
    //       },
    //     },
    //     {
    //       name: 'meter',
    //       displayName: 'menu.meter',
    //       meta: {
    //         icon: 'browse_activity',
    //       },
    //     },
    //     {
    //       name: 'gateway',
    //       displayName: 'menu.gateway',
    //       meta: {
    //         icon: 'browse_activity',
    //       },
    //     },
    //   ],
    // },
    // {
    //   name: 'task',
    //   displayName: 'menu.task',
    //   meta: {
    //     icon: 'sort',
    //   },
    //   children: [
    //     {
    //       name: 'controlTask',
    //       displayName: 'menu.controlTask',
    //     },
    //     {
    //       name: 'systemTask',
    //       displayName: 'menu.systemTask',
    //     },
    //   ],
    // },
    {
      name: 'login',
      displayName: 'menu.login',
      meta: {
        icon: 'login',
      },
    },

    // {
    //   name: 'auth',
    //   displayName: 'menu.auth',
    //   meta: {
    //     icon: 'login',
    //   },
    //   children: [
    //     {
    //       name: 'login',
    //       displayName: 'menu.login',
    //     },
    //     {
    //       name: 'preferences',
    //       displayName: 'menu.preferences',
    //     }

    //   ],
    // },

    // {
    //   name: 'settings',
    //   displayName: 'menu.settings',
    //   meta: {
    //     icon: 'settings',
    //   },
    // },
  ] as INavigationRoute[],
}
