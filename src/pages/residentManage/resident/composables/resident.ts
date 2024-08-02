import { onBeforeMount, Ref, ref } from 'vue';
import { resident_user_type } from '@/data/resident_user';
import { type Filters, Pagination, Sorting } from '../../../../data/page';
import {
  fetchResidents,
  addResident,
  fetchResident,
  resetResidentPassword,
  updateResidentActive
} from '../../../../apis/resident';
import { useThrottle } from '../../../../data/dataControl';

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 });
const makeSortingRef = () => ref<Sorting>({ sortBy: "id", sortingOrder: "asc" });

let useResidentsInstance: any = null;

export const useResidents = (options?: {
  pagination?: Ref<Pagination>;
  sorting?: Ref<Sorting>;
}) => {
  if (useResidentsInstance) {
    return useResidentsInstance;
  }

  const isLoading = ref(false);
  const residents = ref<resident_user_type[]>([]);
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {};

  const fetch = async () => {
    isLoading.value = true;
    try {
      const res = await fetchResidents({
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        desc: sorting.value.sortingOrder === "asc" ? false : true,
      });
      residents.value = res.data.data;
      pagination.value.total = res.data.pagination.total;
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  const add = async (resident: any) => {
    isLoading.value = true;
    try {
      await addResident(resident);
      await fetch();
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  const updateActive = async (data: any) => {
    isLoading.value = true;
    try {
      await updateResidentActive(data)
      await fetch();
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  const resetP = async (resident: any) => {
    isLoading.value = true;
    try {
      await resetResidentPassword(resident);
      await fetch();
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  const searchResidentByid = async (query: any) => {
    isLoading.value = true;
    try {
      const res = await fetchResidents(query);
      residents.value = res.data.data;
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };
  const searchResident = useThrottle(searchResidentByid, 500);

  onBeforeMount(() => {
    fetch();
  });

  useResidentsInstance = {
    isLoading,
    residents,
    sorting,
    pagination,
    fetch,
    add,
    resetP,
    updateActive,
    searchResident,
  };
  return useResidentsInstance;
};
