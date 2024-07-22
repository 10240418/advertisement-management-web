import { Ref, ref, unref, watch } from 'vue'
import { watchIgnorable } from '@vueuse/core'
import { Pagination, Sorting, Filters } from '../../../data/page'
import { eletric_energy_meter_type } from '../../../data/electric_energy_meter'
import { get } from 'lodash'
import { getElectricMeters } from '../../../api_mocks/electric_energy'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
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

    const { data, pagination: newPagination } = await getElectricMeters({
    //   ...unref(options?.filters),
    //   ...unref(sorting),
      ...unref(pagination),
    })
    electricMeters.value = data

    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  watch(
    filters,
    () => {
      // Reset pagination to first page when filters changed
      pagination.value.page = 1
      fetch()
    },
    { deep: true },
  )

  fetch()

  return {
    isLoading,

    filters,
    sorting,
    pagination,

    electricMeters,

    fetch,

    // async add(user: User) {
    //   isLoading.value = true
    //   await addUser(user)
    //   await fetch()
    //   isLoading.value = false
    // },

    // async update(user: User) {
    //   isLoading.value = true
    //   await updateUser(user)
    //   await fetch()
    //   isLoading.value = false
    // },

    // async remove(user: User) {
    //   isLoading.value = true
    //   await removeUser(user)
    //   await fetch()
    //   isLoading.value = false
    // },
  }
}
