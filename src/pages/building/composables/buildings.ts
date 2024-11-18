import { onBeforeMount, Ref, ref } from 'vue'
import { Pagination, Sorting } from '@/data/page'
import {
  getBuildings,
  addBuilding,
  updateBuilding,
  deleteBuilding,
  getBuildingDetail,
} from '@/apis/advertisement/ad_building'
import { useThrottle } from '@/data/dataControl'
import { useToast } from 'vuestic-ui'
import { building_type } from '@/data/advertisement/building_type'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: 'asc' })

const useBuildingsInstance: any = null

export const useBuildings = (options?: { pagination?: Ref<Pagination>; sorting?: Ref<Sorting> }) => {
  if (useBuildingsInstance) {
    return useBuildingsInstance
  }

  const isLoading = ref(false)
  const buildings = ref<building_type[]>([])
  const error = ref<string | null>(null) // Error state
  const toast = useToast() // Toast for notifications
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await getBuildings({
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        sortBy: sorting.value.sortBy,
        sortingOrder: sorting.value.sortingOrder,
      })

      buildings.value = res.data.data
      pagination.value.total = res.data.total
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response?.data.error || error.message}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const add = async (building: building_type) => {
    isLoading.value = true
    error.value = null
    try {
      await addBuilding(building)
      await fetch()
      toast.init({ message: 'Building added successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response?.data.error || error.message}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const update = async (building: building_type) => {
    isLoading.value = true
    error.value = null
    try {
      await updateBuilding(building.ID, {
        name: building.name,
        address: building.address,
      })
      await fetch()
      toast.init({ message: 'Building updated successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response?.data.error || error.message}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const remove = async (buildingId: number) => {
    isLoading.value = true
    error.value = null
    try {
      await deleteBuilding(buildingId)
      await fetch()
      toast.init({ message: 'Building deleted successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response?.data.error || error.message}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }

  const searchBuildings = useThrottle(async (query: any) => {
    isLoading.value = true
    error.value = null
    try {
      // Implement search functionality if supported by the API
      const res = await getBuildingDetail(query)
      buildings.value = res.data.data
      pagination.value.total = res.data.pagination.total
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response?.data.error || error.message}`, color: 'danger' })
      console.error(error)
    }
    isLoading.value = false
  }, 500)

  onBeforeMount(() => {
    fetch()
  })

  return {
    isLoading,
    buildings,
    error, // Expose error state
    sorting,
    pagination,
    fetch,
    add,
    update,
    remove,
    searchBuildings,
  }
}
