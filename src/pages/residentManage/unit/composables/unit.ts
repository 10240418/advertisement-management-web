import { Ref, ref, unref, watch } from 'vue';
import { unit_type  } from '@/data/unit';
import { type Filters, Pagination, Sorting } from '@/data/page';
import {
  fetchUnitList,
  addUnit,
  deleteUnit,
  updateUnit,
} from '@/apis/unit';

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 0 });
const makeSortingRef = () => ref<Sorting>({ sortBy: undefined, sortingOrder: 'desc' });
const makeFiltersRef = () => ref<Filters>({ isActive: true, search: '' });

export const useUnits = (options?: { 
  pagination?: Ref<Pagination>; 
  sorting?: Ref<Sorting>;
  filters?: Ref<Partial<Filters>>;
}) => {

  const isLoading = ref(false);
  const units = ref<unit_type []>([]);
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {};
  const fetch = async () => {
    isLoading.value = true;
    try {
      const res = await fetchUnitList({
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        desc: sorting.value.sortingOrder === 'desc'? true : false,
      });
      units.value = res.data.units;
      pagination.value.total = res.data.pagination.total;
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  const add = async (unit: Omit<unit_type , 'id'>) => {
    isLoading.value = true;
    try {
      await addUnit(unit);
      await fetch(); 
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  const remove = async (ids: number[]) => {
    isLoading.value = true;
    try {
    await deleteUnit({ids}); 
      await fetch(); 
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  const update = async (unit: unit_type ) => {
    isLoading.value = true;
    try {
      await updateUnit(unit);
      await fetch(); 
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  fetch();

  return {
    isLoading,
    units,
    filters,
    sorting,
    pagination,
    fetch,
    add,
    remove,
    update,
  };
};
