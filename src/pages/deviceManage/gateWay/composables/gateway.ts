// composables/gateways.ts
import { ref, unref } from 'vue';
import { Pagination, Sorting, Filters } from '../../../../data/page';
import { gateway_type } from '../../../../data/gateway';
import { getGateways, addGateway, updateGateway, deleteGateway } from '../../../../api_mocks/gateway';

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 });
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: null });
const makeFiltersRef = () => ref<Partial<Filters>>({ search: '' });

export const useGateways = (options?: {
  pagination?: Pagination,
  sorting?: Sorting,
  filters?: Filters,
}) => {
  const isLoading = ref(false);
  const gateways = ref<gateway_type[]>([]);
  const pagination = options?.pagination ? ref(options.pagination) : makePaginationRef();
  const sorting = options?.sorting ? ref(options.sorting) : makeSortingRef();
  const filters = options?.filters ? ref(options.filters) : makeFiltersRef();

  const fetch = async () => {
    isLoading.value = true;
    const res = await getGateways({
      ...unref(pagination.value),
    //   ...unref(filters.value),
    });
    gateways.value = res.data;
    isLoading.value = false;
    pagination.value = res.pagination;
  };

  fetch();

  return {
    isLoading,
    filters,
    sorting,
    pagination,
    gateways,
    fetch,
    async add(gateway: gateway_type) {
      isLoading.value = true;
      await addGateway(gateway);
      await fetch();
      isLoading.value = false;
    },
    async update(gateway: gateway_type) {
      isLoading.value = true;
      await updateGateway(gateway);
      await fetch();
      isLoading.value = false;
    },
    async remove(gateway: gateway_type) {
      isLoading.value = true;
      await deleteGateway(gateway);
      await fetch();
      isLoading.value = false;
    },
  };
};
