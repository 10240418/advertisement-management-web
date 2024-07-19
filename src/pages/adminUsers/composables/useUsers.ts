import { Ref, ref, unref, watch } from 'vue'
import { adminUserType } from '../type';
import { type Filters, Pagination,Sorting} from '../../../data/page';
import { sleep } from '../../../services/utils';
import {
  fetchAdminUsers,
  addAdminUser,
  deleteAdminUser,
} from '../../../api_mocks/adminUser'


//分页配置
const makePaginationRef=()=>  ref<Pagination>({page :1,perPage:10,total:0})
//排序配置
const makeSortingRef = () => ref<Sorting>({sortBy:undefined,sortingOrder:null})
//过滤器配置
const makeFiltersRef = () => ref<Filters>({isActive:true,search:''})

export const useAdminUsers = (options?: { pagination?: Ref<Pagination>; sorting?: Ref<Sorting>; filters?: Ref<Partial<Partial<Filters>>> }) => {
  const isLoading = ref(false)
  const users = ref<adminUserType[]>([])
  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async (query: any) => {
    isLoading.value = true
    const res = await fetchAdminUsers()
    users.value = res.data
    // console.log(users.value);//主要获取的数据
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
    // await deleteAdminUser({ids: [id]})
    await fetch({})
    isLoading.value = false
  }


  fetch({})

  return {
    isLoading,
    users,

    filters,
    sorting,
    pagination,

    fetch,
    add,
    remove,
  }
}

