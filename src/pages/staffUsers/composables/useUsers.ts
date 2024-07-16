import { Ref, ref, unref, watch } from 'vue'

import {
  fetchStaffUsers,
  addStaffUser,
  activateStaffUser,
  deactivateStaffUser,
  deleteStaffUser,
  addStaffAccountPermission,
  deleteStaffAccountPermission,
} from '../../../apis/staffUser'

export const useUsers = (options?: { pagination?: Ref<any>; sorting?: Ref<any>; filters?: Ref<Partial<any>> }) => {
  const isLoading = ref(false)
  const users = ref<any[]>([])

  const fetch = async () => {
    isLoading.value = true
    const res = await fetchStaffUsers({})
    users.value = res.data.data
    isLoading.value = false
  }

  const add = async (user: Omit<any, 'id'>) => {
    isLoading.value = true
    await addStaffUser(user)
    await fetch()
    isLoading.value = false
  }

  const remove = async (id: number) => {
    isLoading.value = true
    await deleteStaffUser({ids: [id]})
    await fetch()
    isLoading.value = false
  }

  const activate = async (id: number | string) => {
    isLoading.value = true
    await activateStaffUser(id)
    await fetch()
    isLoading.value = false
  }

  const deactivate = async (id: number | string) => {
    isLoading.value = true
    await deactivateStaffUser(id)
    await fetch()
    isLoading.value = false
  }

  fetch()

  return {
    isLoading,
    users,

    fetch,
    add,
    remove,
    activate,
    deactivate,
  }
}
