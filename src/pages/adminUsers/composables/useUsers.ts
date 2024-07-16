import { Ref, ref, unref, watch } from 'vue'

import {
  fetchAdminUsers,
  addAdminUser,
  deleteAdminUser,
} from '../../../apis/adminUser'

export const useUsers = (options?: { pagination?: Ref<any>; sorting?: Ref<any>; filters?: Ref<Partial<any>> }) => {
  const isLoading = ref(false)
  const users = ref<any[]>([])

  const fetch = async (query: any) => {
    isLoading.value = true
    const res = await fetchAdminUsers(query)
    users.value = res.data.data
    isLoading.value = false
  }

  const add = async (user: Omit<any, 'id'>) => {
    isLoading.value = true
    await addAdminUser(user)
    await fetch({})
    isLoading.value = false
  }

  const remove = async (id: number) => {
    isLoading.value = true
    await deleteAdminUser({ids: [id]})
    await fetch({})
    isLoading.value = false
  }

  fetch({})

  return {
    isLoading,
    users,

    fetch,
    add,
    remove,
  }
}
