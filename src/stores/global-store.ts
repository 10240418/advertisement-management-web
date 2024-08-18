import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: (): {
    isSidebarMinimized: boolean
  } => ({
    isSidebarMinimized: false, // 侧边栏是否最小化
  }),
  getters: {
  },
  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },
    reset() {

    },
  },
})
