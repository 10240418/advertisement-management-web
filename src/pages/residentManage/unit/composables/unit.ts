import { Ref, ref } from 'vue';
import { unit_type } from '@/data/unit';
import { type Filters, Pagination, Sorting } from '@/data/page';
import {
  fetchUnitList,
  addUnit,
  deleteUnit,
  updateUnit,
} from '@/apis/unit';
import { useToast } from 'vuestic-ui';

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 0 });
const makeSortingRef = () => ref<Sorting>({ sortBy: undefined, sortingOrder: 'desc' });
const makeFiltersRef = () => ref<Filters>({ isActive: true, search: '' });

export const useUnits = (options?: { 
  pagination?: Ref<Pagination>; 
  sorting?: Ref<Sorting>;
  filters?: Ref<Partial<Filters>>;
}) => {
  const isLoading = ref(false);
  const units = ref<unit_type[]>([]);
  const error = ref<string | null>(null); // Error state
  const toast = useToast(); // Toast for notifications

  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {};

  const fetch = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetchUnitList({
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        desc: sorting.value.sortingOrder === 'desc' ? true : false,
      });
      units.value = res.data.units;
      pagination.value.total = res.data.pagination.total;
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to fetch units') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const add = async (unit: Omit<unit_type, 'id'>) => {
    isLoading.value = true;
    error.value = null;
    try {
      await addUnit(unit);
      await fetch();
      toast.init({ message: 'Unit added successfully', color: 'success' });
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to add unit') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const remove = async (ids: number[]) => {
    isLoading.value = true;
    error.value = null;
    try {
      await deleteUnit({ ids });
      await fetch();
      toast.init({ message: 'Unit(s) deleted successfully', color: 'success' });
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to delete unit(s)') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const update = async (unit: unit_type) => {
    isLoading.value = true;
    error.value = null;
    try {
      await updateUnit(unit);
      await fetch();
      toast.init({ message: 'Unit updated successfully', color: 'success' });
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to update unit') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  fetch();

  return {
    isLoading,
    units,
    error, // Expose error state
    filters,
    sorting,
    pagination,
    fetch,
    add,
    remove,
    update,
  };
};
