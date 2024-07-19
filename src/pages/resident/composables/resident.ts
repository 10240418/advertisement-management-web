// 导入 Vue 的 Composition API 相关工具
import { Ref, ref, unref, watch } from 'vue';

// 导入与工作人员用户相关的 API 调用
import {
  fetchResidents,
  addResident,
  activateResident,
  deactivateResident,
  deleteResident,
  // 注意：以下两个 API 在当前实现中未被使用
  // addStaffAccountPermission,
  // deleteStaffAccountPermission,
} from '../../../api_mocks/resident';

/**
 * 定义一个组合式函数，用于管理工作人员用户的业务逻辑
 * @param options 可选参数，用于接收分页、排序和过滤器的 Ref 对象
 * @returns 用户数据和相关操作的 Ref 对象及函数
 */
export const useResidents = (options?: { pagination?: Ref<any>; sorting?: Ref<any>; filters?: Ref<Partial<any>> }) => {
  // 创建一个 Ref 对象，用于跟踪数据加载状态
  const isLoading = ref(false);
  // 创建一个 Ref 对象，用于存储从后端获取的用户列表
  const users = ref<any[]>([]);

  /**
   * 异步函数，用于从后端获取用户列表并更新 state
   */
  const fetch = async () => {
    // 设置 isLoading 为 true，表示数据正在加载中
    isLoading.value = true;
    // 调用 fetchResidents API 获取用户列表
    const res = await fetchResidents({});
    // 更新用户列表
    users.value = res.data;
    // 设置 isLoading 为 false，表示数据加载完成
    isLoading.value = false;
  };

  /**
   * 异步函数，用于向后端添加新用户，然后重新获取用户列表
   * @param user 新用户的详细信息，不包括 'id' 字段
   */
  const add = async (resident: Omit<any, 'id'>) => {
    // 设置 isLoading 为 true，表示数据正在加载中
    isLoading.value = true;
    // 调用 addResident API 添加新用户 
    await addResident(resident);
    // 重新获取用户列表
    await fetch();
    // 设置 isLoading 为 false，表示数据加载完成
    isLoading.value = false;
  };

  /**
   * 异步函数，用于从后端删除指定 ID 的用户，然后重新获取用户列表
   * @param id 需要删除的用户的 ID
   */
  const remove = async (id: number) => {
    // 设置 isLoading 为 true，表示数据正在加载中
    isLoading.value = true;
    // 调用 deleteResident API 删除用户
    await deleteResident({ ids: [id] });
    // 重新获取用户列表
    await fetch();
    // 设置 isLoading 为 false，表示数据加载完成
    isLoading.value = false;
  };

  /**
   * 异步函数，用于激活指定 ID 的用户，然后重新获取用户列表
   * @param id 需要激活的用户的 ID
   */
  const activate = async (id: number | string) => {
    // 设置 isLoading 为 true，表示数据正在加载中
    isLoading.value = true;
    // 调用 activateResident API 激活用户
    await activateResident(id);
    // 重新获取用户列表
    await fetch();
    // 设置 isLoading 为 false，表示数据加载完成
    isLoading.value = false;
  };

  /**
   * 异步函数，用于停用指定 ID 的用户，然后重新获取用户列表
   * @param id 需要停用的用户的 ID
   */
  const deactivate = async (id: number | string) => {
    // 设置 isLoading 为 true，表示数据正在加载中
    isLoading.value = true;
    // 调用 deactivateResident API 停用用户
    await deactivateResident(id);
    // 重新获取用户列表
    await fetch();
    // 设置 isLoading 为 false，表示数据加载完成
    isLoading.value = false;
  };

  // 在组合函数的最后，立即调用 fetch 函数以初始化用户数据
  fetch();

  // 返回一个对象，包含用户数据状态和相关操作函数
  return {
    isLoading,
    users,

    fetch,
    add,
    remove,
    activate,
    deactivate,
  };
};
