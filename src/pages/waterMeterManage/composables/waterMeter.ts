import { Ref, ref, unref } from 'vue'
import { Pagination, Sorting, Filters } from '../../../data/page'
import { water_meter_type } from '../../../data/water_meter'
import { getWaterMeters, addWaterMeter, updateWaterMeter, deleteWaterMeter } from '../../../api_mocks/waterMeter'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: null })
const makeFiltersRef = () => ref<Partial<Filters>>({ isActive: true, search: '' })

export const useWaterMeters = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const waterMeters = ref<water_meter_type[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    const res = await getWaterMeters({
      ...unref(pagination),
    })
    waterMeters.value = res.data
    isLoading.value = false
    pagination.value = res.pagination
  }

  fetch()

  return {
    isLoading,
    filters,
    sorting,
    pagination,
    waterMeters,
    fetch,
    async add(meter: water_meter_type) {
      isLoading.value = true
      await addWaterMeter(meter)
      await fetch()
      isLoading.value = false
    },
    async update(meter: water_meter_type) {
      isLoading.value = true
      await updateWaterMeter(meter)
      await fetch()
      isLoading.value = false
    },
    async remove(meter: water_meter_type) {
      isLoading.value = true
      await deleteWaterMeter(meter)
      await fetch()
      isLoading.value = false
    },
  }
}
