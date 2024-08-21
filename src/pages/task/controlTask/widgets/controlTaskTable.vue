<template>
  <VaDataTable
    v-model:sort-by="sorting.sortBy"
    v-model:sorting-order="sorting.sortingOrder"
    :columns="columns"
    :items="currentPageData"
    :loading="isLoading"
  >
    <template #cell(startAt)="{ rowData }">
      <span>{{ moment(rowData.startAt).format('YYYY-MM-DD HH:mm') }}</span>
    </template>

    <template #cell(detail)="{ rowData }">
      <VaButton
        id="detailTask"
        preset="secondary"
        size="small"
        icon="mso-info"
        aria-label="Info Task"
        class="w-full justify-between ml-[-5px]"
        @click="$emit('detail-task', rowData as any)"
      >
        <span>Detail</span>
      </VaButton>
    </template>
    <template #cell(actions)="{ rowData }">
      <VaPopover
        placement="bottom"
        trigger="click"
        color="backgroundSecondary"
      >
        <div
          class="flex justify-center items-center relative hover:bg-blue-200 rounded-[4px]"
          @click.stop="showContent(rowData)"
        >
          <VaIcon
            name="more_horiz"
            size="20px"
            class="mr-2 cursor-pointer"
          />
        </div>
        <template #body>
          <Transition name="fade">
            <div
              v-show="showContentTask?.id === rowData.id"
              class="tooltip-content flex flex-col justify-center z-999 items-center relative border p-1 rounded-md"
            >
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-edit"
                aria-label="Edit task"
                class="w-full justify-between"
                @click="$emit('edit-task', rowData as any)"
              >
                <span>Edit</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-delete"
                color="danger"
                aria-label="Delete task"
                class="w-full justify-between"
                @click="onTaskDelete(rowData)"
              >
                <span>Delete</span>
              </VaButton>
            </div>
          </Transition>
        </template>
      </VaPopover>
    </template>
  </VaDataTable>
  <div
    class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2"
  >
    <div>
      <b>total: {{ pagination.total }} </b>
      pageNum:
      <VaSelect
        v-model="pagination.pageNum"
        class="!w-16"
        selected-top-shown
        :options="pagesOptions"
      />
      pageSize:
      <VaSelect
        v-model="pagination.pageSize"
        class="!w-20"
        selected-top-shown
        :options="[5, 10, 20, 50, 100]"
      />
    </div>

    <div
      v-if="totalPages > 1"
      class="flex"
    >
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="pagination.pageNum === 1"
        @click="pagination.pageNum--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
        :disabled="pagination.pageNum === totalPages"
        @click="pagination.pageNum++"
      />
      <VaPagination
        v-model="pagination.pageNum"
        buttons-preset="secondary"
        :pages="totalPages"
        :visible-pages="5"
        :boundary-links="false"
        :direction-links="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, computed, ref, watch } from 'vue'
import { defineVaDataTableColumns, VaPopover, VaButton, VaIcon, VaSelect, VaPagination } from 'vuestic-ui'
import { task_type } from '../../../../data/task'
import { useTasks } from '../composables/controlTask'
import moment from 'moment'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true, width: '5%' },
  { label: 'Name', key: 'name', sortable: true, width: '10%' },
  { label: 'Tag', key: 'tag', sortable: true, width: '5%' },
  { label: 'Operation', key: 'operation', sortable: true, width: '5%' },
  { label: 'Active', key: 'active', sortable: true, width: '5%' },
  { label: 'Interval', key: 'interval', sortable: true, width: '5%' },
  { label: 'Start At', key: 'startAt', sortable: true, width: '10%' },
  { label: 'Gateway ID', key: 'gatewayId', sortable: true, width: '5%' },
  { label: 'Meter ID', key: 'meterId', sortable: true, width: '5%' },
  { label: 'Detail', key: 'detail', sortable: false, width: '5%' },
  { label: 'Actions', key: 'actions', sortable: false, width: '5%' },
])

const { isLoading, tasks, sorting, pagination, ...taskApi } = useTasks()

const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.pageSize))
const pagesOptions = computed(() => {
  const options = []
  for (let i = 1; i <= totalPages.value; i++) {
    options.push(i)
  }
  return options
})
const emit = defineEmits(['edit-task', 'delete-task', 'fetch-task', 'detail-task'])

const onTaskDelete = (task: any) => {
  emit('delete-task', task)
}

watch(
  () => [pagination.value.pageNum, pagination.value.pageSize, sorting.value.sortBy, sorting.value.sortingOrder],
  () => {
    if (pagination.value.total < pagination.value.pageSize * (pagination.value.pageNum - 1)) {
      pagination.value.pageNum = 1
    }
    taskApi.fetch()
  },
)

const currentPageData = computed(() => {
  let tasksArray: any = []
  if (Array.isArray(tasks.value)) {
    tasksArray = tasks.value
  } else {
    tasksArray = [tasks.value]
  }
  const startIndex = (pagination.value.pageNum - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize

  if (tasksArray.length <= pagination.value.pageSize) return tasksArray
  else return tasksArray.slice(startIndex, endIndex)
})

const showContentTask = ref<task_type | null>(null)
const showContent = (task: any) => {
  showContentTask.value = task
}
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
