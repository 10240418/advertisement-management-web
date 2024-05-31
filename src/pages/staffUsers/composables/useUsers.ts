import { Ref, ref, unref, watch } from 'vue'
import { User } from '../types'
import {
  fetchStaffUsers,
  addStaffUser,
  activateStaffUser,
  deactivateStaffUser,
  deleteStaffUser,
  addStaffAccountPermission,
  deleteStaffAccountPermission,
} from '../../../api_mocks/staffUser'

export const useUsers = (options?: { pagination?: Ref<any>; sorting?: Ref<any>; filters?: Ref<Partial<any>> }) => {
  const isLoading = ref(false)
  const users = ref<User[]>([])

  const fetch = async () => {
    isLoading.value = true
    const res = await fetchStaffUsers({})
    users.value = res.data as User[]
    isLoading.value = false
  }

  const add = async (user: Omit<User, 'id'>) => {
    isLoading.value = true
    await addStaffUser({})
    await fetch()
    isLoading.value = false
  }

  const remove = async () => {
    isLoading.value = true
    await deleteStaffUser({})
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
