import { Pagination ,Sorting} from '@/data/page';
import { meter_type } from '@/data/meter';
import { resident_user_type } from '@/data/resident_user';
import { unit_type } from '@/data/unit';
import { onBeforeMount, Ref, ref, unref } from 'vue'
import { useToast } from 'vuestic-ui/web-components';
import { fetchUnitList } from '@/apis/unit';
import { fetchMeters,fetchMeterStatus,fetchMeterStatusByType } from '@/apis/meter';
const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 });
const makeSortingRef = () => ref<Sorting>({ sortBy: "id", sortingOrder: "asc" });
export const useHomes = (options?: { sorting?: Ref<any>; pagination?: Ref<any> }) => {
  const isLoading = ref(false)
  const error = ref<string | null>(null);
  const toast = useToast();
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {};
  const meters = ref<meter_type[]>([])

  const fetchMetersStatus = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetchMeterStatus()
      console.log(res.data.data)
      meters.value = res.data.data;
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to fetch meters') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };
  const fetchMetersStatusByType = async(type:string) =>{
    isLoading.value = true;
    error.value = null;
    fetchMeterStatusByType(type).then((res) =>{
      meters.value = res.data.data;
    }).catch((error)=>{
      console.log(error);
      toast.init({message:error.value,color:'danger'})
    })
    isLoading.value = false;

  }


 
  onBeforeMount(() => {
    fetchMetersStatus();
  });

  return {
    isLoading,
    meters,
    sorting,
    pagination,
    fetchMetersStatusByType,
    fetchMetersStatus,
  }
}
