// meter.ts
import { onBeforeMount, Ref, ref } from 'vue'
import { meter_type } from '../../../../data/meter'
import { type Filters, Pagination, Sorting } from '../../../../data/page';
import {
  fetchMeters,
  fetchMeter,
  addMeter,
  updateMeter,
  deleteMeter,
  operateMeter,
} from '../../../../apis/meter'
import { useThrottle } from '../../../../data/dataControl';

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
  const fetch = async () => {
    isLoading.value = true
    try {
      const res = await fetchMeters({
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        desc: sorting.value.sortingOrder === "asc" ? true : false
      });
     
      meters.value = res.data.data
      pagination.value.total = res.data.pagination.total
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const add = async (meter: any) => {
    isLoading.value = true
    try {
      console.log(meter)
      await addMeter(meter);
      await fetch();
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const remove = async (ids: any) => {
    isLoading.value = true
    try {
      await deleteMeter(ids);
      await fetch();
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const update = async (meter: any) => {
    isLoading.value = true
    try {
      await updateMeter(meter);
      await fetch();
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }
  //节流实现搜索
  const searchByid = async (searchValue: any) => {
    isLoading.value = true
    try {
      const res = await fetchMeter(
        {id: searchValue.id}
      );
      meters.value = res.data.data
      pagination.value.total = 1
    }
    catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const search = useThrottle(searchByid, 500);

  onBeforeMount(() => {
    fetch();
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
    search,

  }

  return useMetersInstance;
}
