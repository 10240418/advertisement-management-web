import { Ref, ref, unref, watch } from 'vue'
import { admin_user_type } from '../../../data/admin_user'
import { type Filters, Pagination, Sorting } from '../../../data/page'
import { fetchAdminUsers, addAdminUser, deleteAdminUser, updateAdminUser } from '../../../apis/adminUser'
import { useToast } from 'vuestic-ui/web-components'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: undefined, sortingOrder: 'desc' })
const makeFiltersRef = () => ref<Filters>({ isActive: true, search: '' })

export const useAdminUsers = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Partial<Filters>>>
}) => {
  const isLoading = ref(false)
  const adminusers = ref<admin_user_type[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}
  const toast = useToast()

  const fetch = async () => {
    isLoading.value = true
    try {
      const res = await fetchAdminUsers({
        g: 2,
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        desc: sorting.value.sortingOrder === 'desc' ? true : false,
      })
      adminusers.value = res.data.data
      pagination.value.total = res.data.pagination.total
    } catch (error) {
      toast.init({ message: `faid to fetch ${error} `, color: 'danger' })

      console.error(error)
    }
    isLoading.value = false
  }
  const add = async (user: Omit<any, 'id'>) => {
    isLoading.value = true
    try {
      await addAdminUser(user)
      await fetch()
      toast.init({ message: `${user.name} add success`, color: 'success' })
    } catch (error) {
      toast.init({ message: `faid to fetch ${error} `, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }
  const remove = async (ids: number[]) => {
    isLoading.value = true
    try {
      await deleteAdminUser({ ids })
      await fetch()
    } catch (error) {
      toast.init({ message: `faid to fetch ${error} `, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }
  const update = async (user: admin_user_type) => {
    isLoading.value = true
    try {
      if (user.password) {
        await updateAdminUser({ id: user.id, password: user.password })
      }
      await fetch()
    } catch (error) {
      toast.init({ message: `faid to fetch ${error} `, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }
  fetch()
  return {
    isLoading,
    adminusers,
    filters,
    sorting,
    pagination,
    fetch,
    add,
    remove,
    update,
  }
}
