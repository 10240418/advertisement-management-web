import { Pagination ,Sorting} from '@/data/page';
import { meter_type } from '@/data/meter';
import { resident_user_type } from '@/data/resident_user';
import { unit_type } from '@/data/unit';
import { Ref, ref, unref } from 'vue'
import { useToast } from 'vuestic-ui/web-components';
import { fetchUnitList } from '@/apis/unit';

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 });
const makeSortingRef = () => ref<Sorting>({ sortBy: "id", sortingOrder: "asc" });
export const useHomes = (options?: { sorting?: Ref<any>; pagination?: Ref<any> }) => {
  const isLoading = ref(false)

  const error = ref<string | null>(null); // Error state
  const toast = useToast(); // Toast for notifications
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {};
  


 
  

  


  


  

  return {
    isLoading,

   

   
  
  }
}
