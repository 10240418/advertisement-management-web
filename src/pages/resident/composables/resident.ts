import { Ref, ref, unref, watch } from 'vue'
import { watchIgnorable } from '@vueuse/core'
import { Pagination, Sorting, Filters } from '../../../data/page'
import { resident_user_type } from '../../../data/resident_user'
import { get } from 'lodash'
import { getResidentUsers, addResidentUser, updateResidentUser, deleteResidentUser } from '../../../api_mocks/residentUser'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: null })
const makeFiltersRef = () => ref<Partial<Filters>>({ isActive: true, search: '' })

export const useResidentUsers = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const residentUsers = ref<resident_user_type[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    const res = await getResidentUsers()
    residentUsers.value = res.data;
    isLoading.value = false
    // pagination.value = res.pagination
  }

  fetch()

  return {
    isLoading,
    filters,
    sorting,
    pagination,
    residentUsers,
    fetch,
    async add(user: resident_user_type) {
      isLoading.value = true
      await addResidentUser(user)
      await fetch()
      isLoading.value = false
    },
    async update(user: resident_user_type) {
      isLoading.value = true
      await updateResidentUser(user)
      await fetch()
      isLoading.value = false
    },
    async remove(user: resident_user_type) {
      isLoading.value = true
      await deleteResidentUser(user)
      await fetch()
      isLoading.value = false
    },
  }
}
