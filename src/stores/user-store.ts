import { defineStore } from 'pinia'

interface User {
  userName: string
  email: string
  passWord: string
}

export const useUserStore = defineStore('user', {
  state: (): User => ({
    userName: '',
    email: '',
    passWord: '',
  }),
  getters: {
    getUserName: (state) => state.userName,
    getEmail: (state) => state.email,
    getPassWord: (state) => state.passWord,
  },
  actions: {
    changeUserName(userName: string) {
      this.userName = userName
    },
    changeEmail(email: string) {
      this.email = email
    },
    changePassWord(passWord: string) {
      this.passWord = passWord
    },
    reset() {
      this.userName = ''
      this.email = ''
      this.passWord = ''
    },
  },
})
