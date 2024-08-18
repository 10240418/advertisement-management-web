<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaInput
          v-model="searchValue"
          placeholder="Search By ID"
          class="w-full md:w-2/3"
          @keyup.enter="onSearch(searchValue)"
          :rules="[validators.required, validators.number]"
        >
          <!-- <VaButton @click="showAddControlTaskModal">Add Control Task</VaButton> -->
          <template #appendInner>
            <div class="search-icon-wrapper bg-white hover:bg-slate-300 z-10">
              <VaIcon name="mso-search" color="secondary" @click="onSearch(searchValue)" />
            </div>
          </template>
        </VaInput>
      </div>

      <systemTaskTable
        :pagination="pagination"
        :tasks="tasksShowInTable"
        :loading="isLoading"
        :sorting="sorting"
        @edit-task="showEditControlTaskModal"
        @detail-task="showEditControlTaskDialog"
        @delete-task="onTaskDelete"
        @fetch-task="fetchTask"
      />
    </VaCardContent>
    <!-- <VaModal v-model="doShowAddControlTaskModal" size="small" mobile-fullscreen close-button hide-default-actions>
        <h1 class="va-h5">Add Control Task</h1>
        <editSystemTaskForm v-model="taskToEdit" @close="doShowAddControlTaskModal = false" @save="onSave" />
      </VaModal>
      <VaModal v-model="doShowEditControlTaskModal" size="small" mobile-fullscreen close-button hide-default-actions>
        <h1 class="va-h5">Edit Control Task</h1>
        <editSystemTaskForm v-model="taskToEdit" @close="doShowEditControlTaskModal = false" @save="onSave" />
      </VaModal> -->
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount } from 'vue'
//   import { useControlTasks } from './composables/controlTask';
import { useToast, useModal } from 'vuestic-ui'
import { task_type } from '../../../data/task'
import _ from 'lodash'
import systemTaskTable from './widgets/systemTaskTable.vue'
import editSystemTaskForm from './widgets/editSystemTaskForm.vue'
import { useTasks } from './composables/systemTask'
import { validators } from '../../../services/utils'
import { openWindow } from '@/utils/openWindow'

const { init: notify } = useToast()
const doShowAddControlTaskModal = ref(false)
const doShowEditControlTaskModal = ref(false)
const { isLoading, tasks, sorting, pagination, ...taskApi } = useTasks()
const tasksShowInTable = ref<task_type[]>([])
const taskToEdit = ref<task_type | null>(null)

// Open new tab dialog
const showEditControlTaskDialog = (task: task_type) => {
  openWindow({path: '/sysTaskDetail', query: {id: task.id}})
}

// Add modal
const showAddControlTaskModal = () => {
  doShowAddControlTaskModal.value = true
  taskToEdit.value = null
}

// Edit modal
const showEditControlTaskModal = (task: task_type) => {
  doShowEditControlTaskModal.value = true
  taskToEdit.value = task
}

const { confirm } = useModal()

const onTaskDelete = async (task: task_type) => {
  const agreed = await confirm({
    title: 'Delete Control Task',
    message: `Are you sure you want to delete ${task.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    await taskApi.remove([task.id])
  }
}

const fetchTask = async (fetch: any) => {
  await taskApi.fetch({ ...fetch })
  tasksShowInTable.value = tasks.value
}

const onSave = async (newTask: any) => {
  if (newTask.id) {
    console.log('newTask', newTask)
    await taskApi.update(newTask)
  } else {
    await taskApi.add(newTask)
  }
  doShowAddControlTaskModal.value = false
}

const searchValue = ref('')
const onSearch = async (searchValue: any) => {
  const res = await taskApi.search({
    id: Number(searchValue),
  })
}

watch(
  tasks,
  () => {
    tasksShowInTable.value = _.cloneDeep(toRaw(tasks.value))
  },
  { deep: true },
)

onBeforeMount(() => {
  fetchTask({})
})
</script>

<style scoped>
.search-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px; /* Adjust size as needed */
  height: 36px; /* Adjust size as needed */
  cursor: pointer;
}

.va-input-wrapper__append-inner {
  position: relative;
}

.va-input-wrapper__append-inner .search-icon-wrapper {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10; /* Ensure it's on top of other elements */
}
</style>
