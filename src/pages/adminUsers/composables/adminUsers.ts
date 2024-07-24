import { Ref, ref, unref, watch } from 'vue'
import { admin_user_type } from '../../../data/admin_user'
import { type Filters, Pagination,Sorting} from '../../../data/page';
import { sleep } from '../../../services/utils';
import {
  fetchAdminUsers,
  addAdminUser,
  deleteAdminUser,
  updateAdminUser,
} from '../../../apis/adminUser'
import { pa } from 'element-plus/es/locale';
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
 
 const body = ref({pageNum:pagination.value.pageNum,pageSize:pagination.value.pageSize})
const fetch = async (body: any) => {
  isLoading.value = true
  try {
    const res = await fetchAdminUsers(body?body:body.value);
    adminusers.value = res.data.data
    console.log(adminusers.value)
    pagination.value.total = res.data.pagination.total
    if(pagination.value.pageSize <=0)pagination.value.pageSize = 10
    if(pagination.value.pageNum <=0)pagination.value.pageNum = 1

  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
}


const add = async (user: Omit<any, 'id'>) => {
  isLoading.value = true
  try {
    await addAdminUser(user);
    console.log(user)
    await fetch({pageNum:pagination.value.pageNum,pageSize:pagination.value.pageSize}); // Call fetch after adding the user
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
}

const remove = async (ids: number[]) => {
  isLoading.value = true
  try {
    console.log(ids)
    await deleteAdminUser({ids}); // Pass the id to delete
    await fetch({pageNum:pagination.value.pageNum,pageSize:pagination.value.pageSize}); // Call fetch after deleting the user
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
}



const update = async (user: admin_user_type) => {
  isLoading.value = true
  try {
    await updateAdminUser({id:user.id,password:user.password});
    await fetch({pageNum:pagination.value.pageNum,pageSize:pagination.value.pageSize}); // Call fetch after updating the user
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
}
  fetch({pageNum:pagination.value.pageNum,pageSize:pagination.value.pageSize})

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

