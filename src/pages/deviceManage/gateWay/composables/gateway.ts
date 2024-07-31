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

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 });
const makeSortingRef = () => ref<Sorting>({ sortBy: "id", sortingOrder: "asc" });

let useGatewaysInstance: any = null;

export const useGateways = (options?: {
  // 初始化值的提交
  pagination?: Ref<Pagination>;
  sorting?: Ref<Sorting>;
}) => {
  // 缓存 避免重复创建
  if (useGatewaysInstance) {
    return useGatewaysInstance;
  }

  const isLoading = ref(false);
  const gateways = ref<gateway_type[]>([]);
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {};

  // fetch 获取数据, 并且赋值
  const fetch = async () => {
    isLoading.value = true;
    try {
      console.log(pagination.value.pageNum,pagination.value.pageSize);
      const res = await fetchGateways(
        {
          data: { email: localStorage.getItem('AdminEmail'), password: localStorage.getItem('AdminPassword') },
          params: { pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize}
        });
      gateways.value = res.data.data;
      console.log(res.data.data);
      pagination.value.total = res.data.pagination.total;


      if (pagination.value.pageSize <= 0) pagination.value.pageSize = 10;
      if (pagination.value.pageNum <= 0) pagination.value.pageNum = 1;
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  // 实现 CRUD
  const add = async (gateway: any) => {
    isLoading.value = true;
    try {
      await addGateway(gateway);
      await fetch();
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  const remove = async (ids: number[]) => {
    isLoading.value = true;
    try {
      await deleteGateway({ ids });
      await fetch();
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };

  const update = async (gateway: any) => {
    isLoading.value = true;
    try {
      await updateGateway(gateway);
      await fetch();
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };
  //节流实现搜索
  const searchGatewayByid = async (query: any) => {
    isLoading.value = true;
    try {
      const res = await getGateway(query);
      gateways.value = res.data.data;
    } catch (error) {
      console.error(error);
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
