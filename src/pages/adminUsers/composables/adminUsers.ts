import { Ref, ref } from 'vue'
import { admin_user_type } from '../../../data/admin_user'
import { type Filters, Pagination, Sorting } from '../../../data/page'
import {
  fetchAdminUsers,
  addAdminUser,
  deleteAdminUser,
  resetPasswordAdminUser,
  changePasswordAdminUser,
} from '../../../apis/adminUser'
import { useToast } from 'vuestic-ui/web-components'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 5, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: undefined, sortingOrder: 'desc' })
const makeFiltersRef = () => ref<Filters>({ isActive: true, search: '' })

export const useAdminUsers = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Partial<Filters>>>
}) => {
  const isLoading = ref(false)
  const adminUsers = ref<admin_user_type[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}
  const toast = useToast()

  const fetch = () => {
    isLoading.value = true
    fetchAdminUsers({
      pageNum: pagination.value.pageNum,
      pageSize: pagination.value.pageSize,
      desc: sorting.value.sortingOrder === 'desc' ? true : false,
    })
      .then((res) => {
        adminUsers.value = res.data.data
        pagination.value.total = res.data.pagination.total
      })
      .catch((error) => {
        toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const add = (user: any) => {
    isLoading.value = true
    addAdminUser(user)
      .then(() => {
        fetch()
        toast.init({ message: `${user.name} added successfully`, color: 'success' })
      })
      .catch((error) => {
        toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const remove = (ids: number[]) => {
    isLoading.value = true
    deleteAdminUser({ ids })
      .then(() => {
        fetch()
        toast.init({ message: `${ids.length} users deleted successfully`, color: 'success' })
      })
      .catch((error) => {
        toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const reset = (user: any) => {
    isLoading.value = true
    resetPasswordAdminUser({ id: user.id })
      .then(() => {
        toast.init({ message: `${user.name} reset successfully`, color: 'success' })
      })
      .catch((error) => {
        toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const change = (user: any) => {
    isLoading.value = true
    changePasswordAdminUser({ oldPassword: user.oldPassword, newPassword: user.newPassword })
      .then(() => {
        toast.init({ message: `${user.name} password changed successfully`, color: 'success' })
      })
      .catch((error) => {
        toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  fetch()

  return {
    isLoading,
    adminUsers,
    filters,
    sorting,
    pagination,
    fetch,
    add,
    remove,
    reset,
    change,
  }
}
