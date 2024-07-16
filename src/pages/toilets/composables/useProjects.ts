import { Ref, ref, unref } from 'vue'
import { fetchToilets, updateToilet, addToilet, deleteToilet } from '../../../apis/toilet'

export const useProjects = (options?: { sorting?: Ref<any>; pagination?: Ref<any> }) => {
  const isLoading = ref(false)
  const toilets = ref<any[]>([])

  const fetch = async () => {
    isLoading.value = true
    const res = await fetchToilets({})
    toilets.value = res.data.data as any[]
    isLoading.value = false
  }

  const add = async (toilet: Omit<any, 'id'>) => {
    isLoading.value = true
    await addToilet(toilet)
    await fetch()
    isLoading.value = false
  }

  const update = async (toilet: any) => {
    isLoading.value = true
    await updateToilet(toilet)
    await fetch()
    isLoading.value = false
  }

  const remove = async (id: number) => {
    isLoading.value = true
    await deleteToilet(id)
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
