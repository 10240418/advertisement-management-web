import { Pagination, Sorting } from '@/data/page'
import { meter_type } from '@/data/meter'
import { onBeforeMount, Ref, ref } from 'vue'
import { useToast } from 'vuestic-ui/web-components'
import { fetchMeterStatus, fetchMeterStatusByType } from '@/apis/meter'
const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: 'asc' })
export const useHomes = (options?: { sorting?: Ref<any>; pagination?: Ref<any> }) => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const toast = useToast()
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}
  const meters = ref<meter_type[]>([])

  const fetchMetersStatus = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetchMeterStatus()
      meters.value = res.data.data
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    }

    isLoading.value = false
  }
  const fetchMetersStatusByType = async (type: string) => {
    isLoading.value = true
    error.value = null
    fetchMeterStatusByType(type)
      .then((res) => {
        meters.value = res.data.data ?? []
      })
      .catch((error: any) => {
        toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
        console.error(error)
      })
    setTimeout(() => {
      pagination.value.total = meters.value.length
    }, 10000)
    isLoading.value = false
  }

  onBeforeMount(() => {
    fetchMetersStatus()
  })

  return {
    isLoading,
    meters,
    sorting,
    pagination,
    fetchMetersStatusByType,
    fetchMetersStatus,
  }
}
