import  { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    onCancel: () => {},
  }),
  actions: {
    openPopup(title: string, message: string, confirmText: string,cancelText: string, onConfirm: () => void, onCancel)
  }
})