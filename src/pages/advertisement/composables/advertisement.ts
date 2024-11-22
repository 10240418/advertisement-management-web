import { onBeforeMount, Ref, ref } from 'vue'
import { Pagination, Sorting } from '@/data/page'
import { getAds, createAd, updateAd, deleteAd } from '@/apis/advertisement/ad_advertisement'
import { useToast } from 'vuestic-ui'
import { Advertisement_type } from '@/data/advertisement/advertisement_type'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: 'asc' })

const useAdvertisementsInstance: any = null

export const useAdvertisements = (options?: { pagination?: Ref<Pagination>; sorting?: Ref<Sorting> }) => {
  if (useAdvertisementsInstance) {
    return useAdvertisementsInstance
  }

  const isLoading = ref(false)
  const Advertisements = ref<Advertisement_type[]>([])
  const error = ref<string | null>(null) // Error state
  const toast = useToast() // Toast for notifications
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await getAds({
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        sortBy: sorting.value.sortBy,
        sortingOrder: sorting.value.sortingOrder,
      })

      Advertisements.value = res.data.data
      pagination.value.total = res.data.total
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response?.data.error || error.message}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const add = async (Advertisement: Advertisement_type) => {
    isLoading.value = true
    error.value = null
    try {
      await createAd(Advertisement)
      await fetch()
      toast.init({ message: 'Advertisement added successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response?.data.error || error.message}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const update = async (adId: number, adData: any) => {
    isLoading.value = true
    error.value = null
    try {
      await updateAd(adId, adData)
      await fetch()
      toast.init({ message: 'Advertisement updated successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response?.data.error || error.message}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const remove = async (adId: number) => {
    isLoading.value = true
    error.value = null
    try {
      await deleteAd(adId)
      await fetch()
      toast.init({ message: 'Advertisement deleted successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response?.data.error || error.message}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  onBeforeMount(() => {
    fetch()
  })

  return {
    isLoading,
    Advertisements,
    error, // Expose error state
    sorting,
    pagination,
    fetch,
    add,
    update,
    remove,
  }
}
