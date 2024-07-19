<script setup lang="ts">
// 导入 Vuestic UI 中用于定义数据表格列和模态框的工具函数
import { defineVaDataTableColumns, useModal } from 'vuestic-ui';
// 导入 Vue 的核心功能，包括计算属性、引用属性等
import { PropType, toRef } from 'vue';

// 定义数据表格的列配置
const columns = defineVaDataTableColumns([
  { label: 'name', key: 'name', sortable: true }, // 姓名列，可排序
  { label: 'phone', key: 'phone', align: 'right' }, // 操作列，显示在右侧
  { label: 'Unit', key: 'addressUnit', sortable: true }, // 邮箱列，可排序
  { label: 'floor', key: 'addressFloor', sortable: true }, // 激活状态列，可排序
  
]);

// 定义组件接收的属性
const props = defineProps({
  users: { // 用户数据数组
    type: Array as PropType<any[]>,
    required: true, // 必须提供
  },
  loading: { // 数据表格的加载状态
    type: Boolean,
    default: false, // 默认不处于加载状态
  },
});

// 定义组件可以触发的事件
const emit = defineEmits<{
  (event: 'delete-user', user: any): void; // 删除用户事件
  (event: 'activate-user', user: any): void; // 激活用户事件
  (event: 'deactivate-user', user: any): void; // 取消激活用户事件
}>();

// 使用 toRef 将 props 中的 users 转换为响应式引用
const users = toRef(props, 'users');

// 计算用户状态的文本显示
const getStatusText = (status: boolean) => (status ? '已激活' : '未激活');
// 计算用户状态的颜色显示
const getStatusColors = (status: boolean) => (status ? '成功' : '危险');

// 使用 useModal 获取模态框相关的方法
const { confirm } = useModal();

// 删除用户的异步方法
const onUserDelete = async (user: any) => {
  // 显示确认对话框
  const agreed = await confirm({
    title: '删除用户', // 对话框标题
    message: `您确定要删除 ${user.name} 吗？`, // 对话框消息
    okText: '删除', // 确认按钮文本
    cancelText: '取消', // 取消按钮文本
    size: 'small', // 对话框大小
    maxWidth: '380px', // 最大宽度
  });

  // 如果用户同意删除，则触发删除事件
  if (agreed) {
    emit('delete-user', user);
  }
};
</script>
<template>
  <VaDataTable :columns="columns" :items="users" :loading="$props.loading">
    <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.name }}
      </div>
    </template>
    <template #cell(phone)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.phone }}
      </div>
    </template>

    <template #cell(unit)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.addressUnit }}
      </div>
    </template>
    <template #cell(floor)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.addressFloor}}
      </div>
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton preset="primary" size="small" icon="mso-delete" color="danger" aria-label="Delete user"
          @click="onUserDelete(rowData)" />
      </div>
    </template>
  </VaDataTable>

  <!-- <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>{{ $props.pagination.total }} results.</b>
      Results per page
      <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[10, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="$props.pagination.page === 1"
        @click="$props.pagination.page--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
        :disabled="$props.pagination.page === totalPages"
        @click="$props.pagination.page++"
      />
      <VaPagination
        v-model="$props.pagination.page"
        buttons-preset="secondary"
        :pages="totalPages"
        :visible-pages="5"
        :boundary-links="false"
        :direction-links="false"
      />
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
