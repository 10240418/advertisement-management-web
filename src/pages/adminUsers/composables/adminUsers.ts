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
 // Correct usage of fetchAdminUsers
const fetch = async (body: any = {}) => {
  isLoading.value = true
  try {
    const res = await fetchAdminUsers(body);
    // console.log(res)
    // console.log(body)
    // 其实是不用带参数的
    
    adminusers.value = res.data.data
    console.log(adminusers.value)
    pagination.value = res.data.pagination
    if(pagination.value.pageSize <=0)pagination.value.pageSize = 10
    if(pagination.value.pageNum <=0)pagination.value.pageNum = 1

  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
}

// Correct usage of addAdminUser
const add = async (user: Omit<any, 'id'>) => {
  isLoading.value = true
  try {
    await addAdminUser(user);
    console.log(user)
    await fetch(); // Call fetch after adding the user
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
}

// Correct usage of deleteAdminUser
const remove = async (ids: number[]) => {
  isLoading.value = true
  try {
    console.log(ids)
    await deleteAdminUser({ids}); // Pass the id to delete
    await fetch(); // Call fetch after deleting the user
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
}
watch ( pagination, async (newValue, oldValue) => {
  console.log(newValue, oldValue)
})

// Correct usage of update
const update = async (user: admin_user_type) => {
  isLoading.value = true
  try {
    // Assuming there's an updateAdminUser function
    await updateAdminUser(user);
    await fetch(); // Call fetch after updating the user
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
}
  fetch()

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

