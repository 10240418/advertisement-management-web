import { Ref, ref } from 'vue'
import { advertisement_type } from '../../../data/advertisement/advertisement_type'
import { type Filters, Pagination, Sorting } from '../../../data/page'
import {
  fetchAdvertisements,
  addAdvertisement,
  deleteAdvertisement,
  changeAdvertisement,
} from '../../../apis/advertisement/ad_advertisement'
import { useToast } from 'vuestic-ui/web-components'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 5, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: undefined, sortingOrder: 'desc' })
const makeFiltersRef = () => ref<Filters>({ isActive: true, search: '' })

export const useAdvertisements = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const advertisements = ref<advertisement_type[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}
  const toast = useToast()

  const fetch = () => {
    isLoading.value = true
    fetchAdvertisements({
      pageNum: pagination.value.pageNum,
      pageSize: pagination.value.pageSize,
      desc: sorting.value.sortingOrder === 'desc',
    })
      .then((res: any) => {
        advertisements.value = res.data.data
        pagination.value.total = res.data.pagination.total
      })
      .catch((error: any) => {
        toast.init({
          message: `Error: ${error.response?.data?.error || 'Failed to fetch advertisements'}`,
          color: 'danger',
        })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const add = (advertisement: any) => {
    isLoading.value = true
    addAdvertisement(advertisement)
      .then(() => {
        fetch()
        toast.init({ message: `${advertisement.name} added successfully`, color: 'success' })
      })
      .catch((error: any) => {
        toast.init({
          message: `Error: ${error.response?.data?.error || 'Failed to add advertisement'}`,
          color: 'danger',
        })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const remove = (ids: number[]) => {
    isLoading.value = true
    deleteAdvertisement({ ids })
      .then(() => {
        fetch()
        toast.init({ message: `${ids.length} advertisements deleted successfully`, color: 'success' })
      })
      .catch((error: any) => {
        toast.init({
          message: `Error: ${error.response?.data?.error || 'Failed to delete advertisements'}`,
          color: 'danger',
        })
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const change = (advertisement: any) => {
    isLoading.value = true
    changeAdvertisement({ oldPassword: advertisement.oldPassword, newPassword: advertisement.newPassword })
      .then(() => {
        toast.init({ message: `${advertisement.name} password changed successfully`, color: 'success' })
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
    advertisements,
    filters,
    sorting,
    pagination,
    fetch,
    add,
    remove,
    change,
  }
}
