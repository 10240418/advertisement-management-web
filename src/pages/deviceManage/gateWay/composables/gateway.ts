import { onBeforeMount, Ref, ref } from 'vue';
import { gateway_type } from '../../../../data/gateway';
import { type Filters, Pagination, Sorting } from '../../../../data/page';
import {
  fetchGateways,
  addGateway,
  deleteGateway,
  updateGateway,
  getGateway
} from '../../../../apis/gateway';
import { useThrottle } from '../../../../data/dataControl';
import { useToast } from 'vuestic-ui'; // Import Vuestic UI Toast

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 });
const makeSortingRef = () => ref<Sorting>({ sortBy: "id", sortingOrder: "asc" });

let useGatewaysInstance: any = null;

export const useGateways = (options?: {
  pagination?: Ref<Pagination>;
  sorting?: Ref<Sorting>;
}) => {
  if (useGatewaysInstance) {
    return useGatewaysInstance;
  }

  const isLoading = ref(false);
  const gateways = ref<gateway_type[]>([]);
  const error = ref<string | null>(null); // Error state
  const toast = useToast(); // Toast for notifications
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {};

  const fetch = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetchGateways({
        data: { email: localStorage.getItem('AdminEmail'), password: localStorage.getItem('AdminPassword') },
        params: { pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize }
      });
      gateways.value = res.data.data;
      pagination.value.total = res.data.pagination.total;

      if (pagination.value.pageSize <= 0) pagination.value.pageSize = 10;
      if (pagination.value.pageNum <= 0) pagination.value.pageNum = 1;
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to fetch gateways') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const add = async (gateway: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      await addGateway(gateway);
      await fetch();
      toast.init({ message: 'Gateway added successfully', color: 'success' });
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to add gateway') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const remove = async (ids: number[]) => {
    isLoading.value = true;
    error.value = null;
    try {
      await deleteGateway({ ids });
      await fetch();
      toast.init({ message: 'Gateway deleted successfully', color: 'success' });
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to delete gateway') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const update = async (gateway: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      await updateGateway(gateway);
      await fetch();
      toast.init({ message: 'Gateway updated successfully', color: 'success' });
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to update gateway') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const searchGatewayByid = async (query: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await getGateway(query);
      gateways.value = res.data.data;
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to fetch gateway by ID') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const searchGateway = useThrottle(searchGatewayByid, 500);

  onBeforeMount(() => {
    fetch();
  });

  useGatewaysInstance = {
    isLoading,
    gateways,
    error, // Expose error state
    sorting,
    pagination,
    fetch,
    add,
    remove,
    update,
    searchGateway,
  };

  return useGatewaysInstance;
};
