import { Ref, ref } from 'vue'
import { meter_type } from '../../../../data/meter'
import { type Filters, Pagination, Sorting } from '../../../../data/page';
import {
  fetchMeters,
  addMeter,
  deleteMeter,
  updateMeter,
} from '../../../../apis/meter'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 })
const makeSortingRef = () => ref<Sorting>({ sortBy: undefined, sortingOrder: null })

export const useMeters = (options?: {
  pagination?: Ref<Pagination>;
  sorting?: Ref<Sorting>;
}) => {
  const isLoading = ref(false)
  const meters = ref<meter_type[]>([])
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async (body: any) => {
    isLoading.value = true
    try {
      const res = await fetchMeters(body ? body : body.value);
      meters.value = res.data.data
      pagination.value.total = res.data.pagination.total
      if (pagination.value.pageSize <= 0) pagination.value.pageSize = 10
      if (pagination.value.pageNum <= 0) pagination.value.pageNum = 1
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const add = async (meter: Omit<any, 'id'>) => {
    isLoading.value = true
    try {
      await addMeter(meter);
      await fetch({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize });
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const remove = async (ids: number[]) => {
    isLoading.value = true
    try {
      await deleteMeter({ ids });
      await fetch({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize });
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const update = async (meter: meter_type) => {
    isLoading.value = true
    try {
      await updateMeter({ id: meter.id, modbus_address: meter.modbus_address });
      await fetch({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize });
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  fetch({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize })

  return {
    isLoading,
    meters,
    sorting,
    pagination,
    fetch,
    add,
    remove,
    update,
  }
}
