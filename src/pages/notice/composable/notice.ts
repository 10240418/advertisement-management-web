import { Ref, ref } from 'vue'
import { notice_type } from '../../../data/advertisement/notice_type'
import { type Filters, Pagination, Sorting } from '../../../data/page'
import { fetchNotices, addNotice, deleteNotice, changeNotice } from '../../../apis/advertisement/ad_notice'
import { useToast } from 'vuestic-ui/web-components'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 5, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: undefined, sortingOrder: 'desc' })
const makeFiltersRef = () => ref<Filters>({ isActive: true, search: '' })

export const useNotices = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const notices = ref<notice_type[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}
  const toast = useToast()

  const fetch = () => {
    isLoading.value = true
    fetchNotices({
      pageNum: pagination.value.pageNum,
      pageSize: pagination.value.pageSize,
      desc: sorting.value.sortingOrder === 'desc',
    })
      .then((res: any) => {
        notices.value = res.data.data
        pagination.value.total = res.data.pagination.total
      })
      .catch((error: any) => {
        toast.init({ message: `Error: ${error.response?.data?.error || 'Failed to fetch notices'}`, color: 'danger' })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const add = (notice: any) => {
    isLoading.value = true
    addNotice(notice)
      .then(() => {
        fetch()
        toast.init({ message: `${notice.name} added successfully`, color: 'success' })
      })
      .catch((error: any) => {
        toast.init({ message: `Error: ${error.response?.data?.error || 'Failed to add notice'}`, color: 'danger' })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const remove = (ids: number[]) => {
    isLoading.value = true
    deleteNotice({ ids })
      .then(() => {
        fetch()
        toast.init({ message: `${ids.length} notices deleted successfully`, color: 'success' })
      })
      .catch((error: any) => {
        toast.init({ message: `Error: ${error.response?.data?.error || 'Failed to delete notices'}`, color: 'danger' })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const change = (notice: any) => {
    isLoading.value = true
    changeNotice(notice)
      .then(() => {
        toast.init({ message: `${notice.name} changed successfully`, color: 'success' })
      })
      .catch((error: any) => {
        toast.init({ message: `Error: ${error.response?.data?.error || 'Failed to change password'}`, color: 'danger' })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  fetch()

  return {
    isLoading,
    notices,
    filters,
    sorting,
    pagination,
    fetch,
    add,
    remove,
    change,
  }
}
