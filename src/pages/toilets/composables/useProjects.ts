import { Ref, ref, unref } from 'vue'
import { Toilet } from '../types'
import { fetchToilets, updateToilet, addToilet, deleteToilet } from '../../../api_mocks/toilet'

export const useProjects = (options?: { sorting?: Ref<any>; pagination?: Ref<any> }) => {
  const isLoading = ref(false)
  const toilets = ref<Toilet[]>([])

  const fetch = async () => {
    isLoading.value = true
    const res = await fetchToilets({})
    toilets.value = res.data as Toilet[]
    isLoading.value = false
  }

  const add = async (toilet: Omit<Toilet, 'id' | 'creation_date'>) => {
    isLoading.value = true
    await addToilet({})
    await fetch()
    isLoading.value = false
  }

  const update = async (toilet: Toilet) => {
    isLoading.value = true
    await updateToilet({})
    await fetch()
    isLoading.value = false
  }

  const remove = async (toilet: Toilet) => {
    isLoading.value = true
    await deleteToilet({})
    await fetch()
    isLoading.value = false
  }

  fetch()

  return {
    isLoading,
    toilets,

    fetch,
    add,
    update,
    remove,
  }
}
