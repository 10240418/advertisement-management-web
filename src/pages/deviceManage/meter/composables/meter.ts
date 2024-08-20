import { onBeforeMount, Ref, ref } from 'vue'
import { meter_type } from '../../../../data/meter'
import { Pagination, Sorting } from '../../../../data/page'
import { fetchMeters, fetchMeter, addMeter, updateMeter, deleteMeter} from '../../../../apis/meter'
import { useThrottle } from '../../../../data/dataControl'
import { useToast } from 'vuestic-ui'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: 'asc' })

let useMetersInstance: any = null

export const useMeters = (options?: { pagination?: Ref<Pagination>; sorting?: Ref<Sorting> }) => {
  if (useMetersInstance) {
    return useMetersInstance
  }

  const isLoading = ref(false)
  const meters = ref<meter_type[]>([])
  const error = ref<string | null>(null) // Error state
  const toast = useToast() // Toast for notifications
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetchMeters({
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        desc: sorting.value.sortingOrder === 'asc' ? true : false,
      })

      meters.value = res.data.data

      pagination.value.total = res.data.pagination.total
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const add = async (meter: any) => {
    isLoading.value = true
    error.value = null
    try {
      await addMeter(meter)
      await fetch()
      toast.init({ message: 'Meter added successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const remove = async (ids: any) => {
    isLoading.value = true
    error.value = null
    try {
      await deleteMeter(ids)
      await fetch()
      toast.init({ message: 'Meter deleted successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const update = async (meter: any) => {
    isLoading.value = true
    error.value = null
    try {
      await updateMeter(meter)
      await fetch()
      toast.init({ message: 'Meter updated successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  // Throttled search function
  const searchById = async (searchValue: any) => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetchMeter({ id: searchValue.id })
      meters.value = res.data.data
      pagination.value.total = 1
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const search = useThrottle(searchById, 500)

  onBeforeMount(() => {
    fetch()
  })

  useMetersInstance = {
    isLoading,
    meters,
    error, // Expose error state
    sorting,
    pagination,
    fetch,
    add,
    remove,
    update,
    search,
  }

  return useMetersInstance
}
