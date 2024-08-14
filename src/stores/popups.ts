import  { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
   openedPopups: [] as string[]
  }),
  getters: {
    getOpenedPopups: (state) => state.openedPopups
  },
  actions: {
    addPopup(popupName: string) {
      this.openedPopups.push(popupName)
    },
    closePopup(popupName: string) {
      this.openedPopups = this.openedPopups.filter(popup => popup !== popupName)
    }
  }
})