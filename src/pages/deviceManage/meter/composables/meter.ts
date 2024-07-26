// meter.ts
import { onBeforeMount, Ref, ref } from 'vue'
import { meter_type } from '../../../../data/meter'
import { type Filters, Pagination, Sorting } from '../../../../data/page';
import {
  fetchMeters,
  addMeter,
  deleteMeter,
  updateMeter,
} from '../../../../api_mocks/meter'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: "id", sortingOrder: "asc" })

let useMetersInstance: any = null;

export const useMeters = (options?: {
  //初始化值的提交
  pagination?: Ref<Pagination>;
  sorting?: Ref<Sorting>;
}) => {
  //缓存 避免重复创建 
  if (useMetersInstance) {
    return useMetersInstance;
  }

  const isLoading = ref(false)
  const meters = ref<meter_type[]>([])
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  //fetch获取数据,并且赋值
  const fetch = async (meter: any) => {
    isLoading.value = true
    try {   
      const res = await fetchMeters({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize ,sortingOrder: sorting.value.sortingOrder ,sortBy: sorting.value.sortBy });
      
      console.log(res)
      meters.value = res.data
      pagination.value.total = res.pagination.total

      if (pagination.value.pageSize <= 0) pagination.value.pageSize = 10
      if (pagination.value.pageNum <= 0) pagination.value.pageNum = 1
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  //实现crud
  const add = async (meter: any) => {
    isLoading.value = true
    try {
      await addMeter(meter);
      await fetch({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize ,sortingOrder: sorting.value.sortingOrder ,sortBy: sorting.value.sortBy });
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const remove = async (meter: any) => {
    isLoading.value = true
    try {
      await deleteMeter(meter.ids);
      await fetch({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize ,sortingOrder: sorting.value.sortingOrder ,sortBy: sorting.value.sortBy });
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const update = async (meter: any) => {
    isLoading.value = true
    try {
      await updateMeter(meter);
      await fetch({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize ,sortingOrder: sorting.value.sortingOrder ,sortBy:sorting.value.sortBy });
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  onBeforeMount(() => {
    fetch({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize ,sortingOrder: sorting.value.sortingOrder ,sortBy: sorting.value.sortBy });
  })

  useMetersInstance = {
    isLoading,
    meters,
    sorting,
    pagination,
    fetch,
    add,
    remove,
    update,
  }

  return useMetersInstance;
}
