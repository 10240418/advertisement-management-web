import { Pagination ,Sorting} from '@/data/page';
import { meter_type } from '@/data/meter';
import { resident_user_type } from '@/data/resident_user';
import { unit_type } from '@/data/unit';
import { onBeforeMount, Ref, ref, unref } from 'vue'
import { useToast } from 'vuestic-ui/web-components';
import { fetchUnitList } from '@/apis/unit';
import { fetchMeters } from '@/apis/meter';

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 });
const makeSortingRef = () => ref<Sorting>({ sortBy: "id", sortingOrder: "asc" });
export const useHomes = (options?: { sorting?: Ref<any>; pagination?: Ref<any> }) => {
  const isLoading = ref(false)

  const error = ref<string | null>(null); // Error state
  const toast = useToast(); // Toast for notifications
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {};
  
  const meters = ref<meter_type[]>([])

  const fetchMetersData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetchMeters({
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        desc: sorting.value.sortingOrder === "asc" ? true : false,
      });
      meters.value = res.data.data;
      pagination.value.total = res.data.pagination.total;
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to fetch meters') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };


 
  onBeforeMount(() => {
    fetchMetersData();
  });

  return {
    isLoading,
    meters,
    sorting,
    pagination,
    
    fetchMetersData,
  }
}
