<template>
    <VaDataTable :columns="columns" :items="currentPageData" :loading="props.loading"
      v-model:sort-by="props.sorting.sortBy" v-model:sorting-order="props.sorting.sortingOrder">
      <template #cell(actions)="{ rowData }">
        <VaPopover placement="bottom" trigger="click" color="backgroundSecondary">
          <div class="flex justify-start items-center relative hover:bg-blue-200 rounded-[4px]"
            @click.stop="showContent(rowData)">
            <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" />
          </div>
          <template #body>
            <transition name="fade">
              <div v-show="showContentTask?.id === rowData.id"
                class="tooltip-content flex flex-col justify-center z-999 items-center relative border p-1 rounded-md">
                <VaButton preset="secondary" id="detailTask" size="small" icon="mso-info" aria-label="Info Task"
                  @click="$emit('detail-task', rowData as any)" class="w-full justify-between">
                  <span>Detail</span>
                </VaButton>
                <VaButton preset="secondary" size="small" icon="mso-edit" aria-label="Edit task"
                  @click="$emit('edit-task', rowData as any)" class="w-full justify-between">
                  <span>Edit</span>
                </VaButton>
                <VaButton preset="secondary" size="small" icon="mso-delete" color="danger" aria-label="Delete task"
                  @click="onTaskDelete(rowData)" class="w-full justify-between">
                  <span>Delete</span>
                </VaButton>
              </div>
            </transition>
          </template>
        </VaPopover>
      </template>
    </VaDataTable>
    <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
      <div>
        <b>Total: {{ props.pagination.total }} </b>
        Page Number:
        <VaInput v-model="props.pagination.pageNum" class="!w-16" />
        Page Size:
        <VaSelect v-model="props.pagination.pageSize" class="!w-20" :options="[5, 10, 20, 50, 100]" />
      </div>
  
      <div v-if="totalPages > 1" class="flex">
        <VaButton preset="secondary" icon="va-arrow-left" aria-label="Previous page"
          :disabled="props.pagination.pageNum === 1" @click="props.pagination.pageNum--" />
        <VaButton class="mr-2" preset="secondary" icon="va-arrow-right" aria-label="Next page"
          :disabled="props.pagination.pageNum === totalPages" @click="props.pagination.pageNum++" />
        <VaPagination v-model="props.pagination.pageNum" buttons-preset="secondary" :pages="totalPages" :visible-pages="5"
          :boundary-links="false" :direction-links="false" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, computed, ref, watch, toRef, PropType } from 'vue';
  import { defineVaDataTableColumns, VaPopover, VaButton, VaIcon, VaInput, VaSelect, VaPagination } from 'vuestic-ui';
  import { task_type } from '../../../../data/task';
  
  const columns = defineVaDataTableColumns([
    { label: 'ID', key: 'id', sortable: true, width: '5%' },
    { label: 'Name', key: 'name', sortable: true, width: '20%' },
    { label: 'Tag', key: 'tag', sortable: true, width: '10%' },
    { label: 'Operation', key: 'operation', sortable: true, width: '10%' },
    { label: 'Active', key: 'active', sortable: true, width: '5%' },
    { label: 'Editable', key: 'editable', sortable: true, width: '5%' },
    { label: 'Interval', key: 'interval', sortable: true, width: '10%' },
    { label: 'Start At', key: 'startAt', sortable: true, width: '15%' },
    { label: 'Gateway ID', key: 'gatewayId', sortable: true, width: '5%' },
    { label: 'Meter ID', key: 'meterId', sortable: true, width: '5%' },
    { label: 'Actions', key: 'actions', sortable: false, width: '5%' },
  ]);
  
  const props = defineProps({
    tasks: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    pagination: { type: Object as PropType<any>, required: true },
    sorting: { type: Object as PropType<any>, required: true },
  });
  
  const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize));
  const emit = defineEmits(['edit-task', 'delete-task', 'fetch-task', 'detail-task']);
  
  const onTaskDelete = (task: any) => {
    emit('delete-task', task);
  };
  
  watch(
    () => [props.pagination.pageNum, props.pagination.pageSize, props.sorting.sortBy, props.sorting.sortingOrder],
    () => {
      if (props.pagination.total < props.pagination.pageSize * (props.pagination.pageNum - 1)) {
        props.pagination.pageNum = 1;
      }
      emit('fetch-task', { pageNum: props.pagination.pageNum, pageSize: props.pagination.pageSize });
    }
  );
  
  const currentPageData = computed(() => {
    let tasksArray: any = []
  
    if (Array.isArray(props.tasks)) {
      tasksArray = props.tasks;
    } else {
      tasksArray = [props.tasks];
    }
    const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize;
    const endIndex = startIndex + props.pagination.pageSize;
  
    if (tasksArray.length <= props.pagination.pageSize) return tasksArray;
    else return tasksArray.slice(startIndex, endIndex);
  });
  
  const showContentTask = ref<task_type | null>(null);
  const showContent = (task: any) => {
    showContentTask.value = task;
  };
  </script>
  
  <style lang="scss" scoped>
  .va-data-table {
    ::v-deep(.va-data-table__table-tr) {
      border-bottom: 1px solid var(--va-background-border);
    }
  }
  
  .tooltip-content {
    position: relative;
    border: 1px solid #d1d5db;
    padding: 6px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .tooltip-content::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #d1d5db transparent;
  }
  
  .tooltip-content::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
  </style>
  