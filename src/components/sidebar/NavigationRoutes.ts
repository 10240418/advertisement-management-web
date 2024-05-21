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
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'management',
      displayName: 'menu.management',
      meta: {
        icon: 'group',
      },
      children: [
        {
          name: 'toilet',
          displayName: 'menu.toilet',
        },
        {
          name: 'device',
          displayName: 'menu.device',
        },
      ],
    },
    {
      name: 'open-api',
      displayName: 'menu.openApi',
      meta: {
        icon: 'group',
      },
    },
    {
      name: 'staff-users',
      displayName: 'menu.staffUser',
      meta: {
        icon: 'group',
      },
    },
    {
      name: 'admin-users',
      displayName: 'menu.adminUser',
      meta: {
        icon: 'group',
      },
    },
    {
      name: 'preferences',
      displayName: 'menu.preferences',
      meta: {
        icon: 'manage_accounts',
      },
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
