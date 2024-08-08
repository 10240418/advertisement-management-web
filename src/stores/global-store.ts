import { defineStore } from 'pinia'

interface MeterTotal {
  normal: number
  abnormal: number
}

interface GatewayTotal {
  normal: number
  abnormal: number
}
interface unitsTotal {
  normal: number
  abnormal: number
}
export const useGlobalStore = defineStore('global', {
  state: (): {
    isSidebarMinimized: boolean
    unitsTotal: unitsTotal
    residentsTotal: number
    metersTotal: MeterTotal
    gatewaysTotal: GatewayTotal
    tasksTotal: number
  } => ({
    isSidebarMinimized: false, // 侧边栏是否最小化
    unitsTotal: { normal: 0, abnormal: 0 },
    residentsTotal: 0,
    metersTotal: { normal: 0, abnormal: 0 },
    gatewaysTotal: { normal: 0, abnormal: 0 },
    tasksTotal: 0,
  }),
  getters: {
    getUnitsTotal: (state) => state.unitsTotal,
    getResidentsTotal: (state) => state.residentsTotal,
    getMetersTotal: (state) => state.metersTotal,
    getGatewaysTotal: (state) => state.gatewaysTotal,
    getTasksTotal: (state) => state.tasksTotal,
  },
  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },
    setUnitsTotal(total: unitsTotal) {
      this.unitsTotal = total
    },
    setResidentsTotal(total: number) {
      this.residentsTotal = total
    },
    setMetersTotal(total: MeterTotal) {
      this.metersTotal = total
    },
    setGatewaysTotal(total: GatewayTotal) {
      this.gatewaysTotal = total
    },
    setTasksTotal(total: number) {
      this.tasksTotal = total
    },
    reset() {
      this.unitsTotal = { normal: 0, abnormal: 0 }
      this.residentsTotal = 0
      this.metersTotal = { normal: 0, abnormal: 0 }
      this.gatewaysTotal = { normal: 0, abnormal: 0 }
      this.tasksTotal = 0
    },
  },
})
