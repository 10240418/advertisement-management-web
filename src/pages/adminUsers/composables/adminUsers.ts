import { Ref, ref } from 'vue'
import { admin_user_type } from '../../../data/admin_user'
import { Pagination, Sorting } from '../../../data/page'
import { fetchAdminUsers, addAdminUser, deleteAdminUser, updateAdminUser } from '../../../apis/adminUser'

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'id', sortingOrder: 'asc' }) // 默认排序

export const useAdminUsers = (options?: { 
  pagination?: Ref<Pagination>; 
  sorting?: Ref<Sorting>;
}) => {
  const isLoading = ref(false)
  const adminusers = ref<admin_user_type[]>([])
  const { pagination = makePaginationRef(), sorting = makeSortingRef() } = options || {}

  const fetch = async (pagination:any) => {
    isLoading.value = true
    try {
      const res = await fetchAdminUsers({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize, sortBy: sorting.value.sortBy, order: sorting.value.sortingOrder });
      adminusers.value = res.data.data
      pagination.value.total = res.data.pagination.total
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const add = async (user: Omit<any, 'id'>) => {
    isLoading.value = true
    try {
      await addAdminUser(user);
      await fetch(pagination); // 添加用户后重新获取数据
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const remove = async (ids: number[]) => {
    isLoading.value = true
    try {
      await deleteAdminUser({ ids }); // 传递要删除的ID列表
      await fetch(pagination); // 删除用户后重新获取数据
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  const update = async (user: admin_user_type) => {
    isLoading.value = true
    try {
      await updateAdminUser({ id: user.id, password: user.password });
      await fetch(pagination); // 更新用户后重新获取数据
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false
  }

  fetch(pagination); // 初次调用获取数据

  return {
    isLoading,
    adminusers,
    pagination,
    sorting,
    fetch,
    add,
    remove,
    update,
  }
}
