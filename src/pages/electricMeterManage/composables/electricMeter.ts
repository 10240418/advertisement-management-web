import { Ref, ref, unref, watch } from 'vue'
import { watchIgnorable } from '@vueuse/core'
import { Pagination, Sorting, Filters } from '../../../data/page'
import { eletric_energy_meter_type } from '../../../data/electric_energy_meter'
import { get } from 'lodash'
import { getElectricMeters, addElectricMeter, updateElectricMeter,deleteElectricMeter } from '../../../api_mocks/electricEnergy'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: null })
const makeFiltersRef = () => ref<Partial<Filters>>({ isActive: true, search: '' })

export const useElectricMeters = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const electricMeters = ref<eletric_energy_meter_type[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    const res= await getElectricMeters({
      // ...unref(filters),
      // ...unref(sorting),
      ...unref(pagination),
    })
    electricMeters.value = res.data
    isLoading.value = false
    pagination.value = res.pagination;
  }

  fetch()

  return {
    isLoading,

    filters,
    sorting,
    pagination,

    electricMeters,

    fetch,

    async add(meter: eletric_energy_meter_type) {
      isLoading.value = true
      await addElectricMeter(meter)
      await fetch()
      isLoading.value = false
    },

    async update(meter: eletric_energy_meter_type) {
      isLoading.value = true
      await updateElectricMeter(meter)
      await fetch()
      isLoading.value = false
    },

    async remove(meter: eletric_energy_meter_type) {
      isLoading.value = true
      await deleteElectricMeter(meter)
      await fetch()
      isLoading.value = false
    },
  }
}
