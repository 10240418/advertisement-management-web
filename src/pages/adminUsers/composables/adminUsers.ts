import { Ref, ref, unref, watch } from 'vue'
import { admin_user_type } from '../../../data/admin_user'
import { type Filters, Pagination,Sorting} from '../../../data/page';
import { sleep } from '../../../services/utils';
import {
  fetchAdminUsers,
  addAdminUser,
  deleteAdminUser,
} from '../../../api_mocks/adminUser'

const makePaginationRef=()=>  ref<Pagination>({pageNum :1,pageSize:10,total:30})
const makeSortingRef = () => ref<Sorting>({sortBy:undefined,sortingOrder:null})
const makeFiltersRef = () => ref<Filters>({isActive:true,search:''})

export const useAdminUsers = (options?: { 
  pagination?: Ref<Pagination>; 
  sorting?: Ref<Sorting>;
  filters?: Ref<Partial<Partial<Filters>>> }) => {

  const isLoading = ref(false)
  const adminusers = ref<admin_user_type[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}
  
  const fetch = async (query: {pageNum?: number; pageSize?: number;total?:number; filters?: Filters; sorting?: Sorting }) => {
    isLoading.value = true
    //现在默认是没有传入参数的
    const res = await fetchAdminUsers()
    adminusers.value = res.data
    
    isLoading.value = false
  }

  const add = async (user: Omit<any, 'id'>) => {
    isLoading.value = true
    await addAdminUser(user)
    await fetch({})
    isLoading.value = false
  }

  const remove = async (id: number) => {
    isLoading.value = true
    await fetch({})
    isLoading.value = false
  }

  const update = async (user: admin_user_type) => {
    isLoading.value = true
    await fetch({})
    isLoading.value = false
  }


  fetch({})

  return {
    isLoading,
    adminusers,

    filters,
    sorting,
    pagination,

    fetch,
    add,
    remove,
    update,
  }
}

