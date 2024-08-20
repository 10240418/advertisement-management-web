<template>
  <VaCard class="w-full h-full flex">
    <div class="w-full h-full flex flex-col ml-3">
      <!-- Top Section -->
      <DetailCard :labels="labelsProp" :datas="datasProp" :font-weight="`font-bold`" :index-weight="3">
        <div class="flex flex-col relative">
          <div class="flex flex-row mr-3 items-center gap-3">
            <VaListLabel class="flex justify-start">Gateway</VaListLabel>
            <span class="absolute ml-20 truncate text-[16px]">{{ controlTask?.gatewayId }}</span>
            <VaPopover
              class="absolute ml-52"
              color="backgroundSecondary"
              trigger="click"
              :style="{ '--va-popover-content-background-color': '#ffffff' }"
            >
              <VaIcon
                :name="arrowDirection(isGatewayCollapsed)"
                size="20px"
                @click="isGatewayCollapsed = !isGatewayCollapsed"
              />
              <template #body>
                <div class="grid grid-cols-[1fr_3fr] border border-solid p-2 rounded-md shadow-lg">
                  <VaListLabel class="flex justify-start">ID</VaListLabel>
                  <span>{{ controlTask?.gateway.id }}</span>
                  <VaListLabel class="flex justify-start">Name</VaListLabel>
                  <span>{{ controlTask?.gateway.name }}</span>
                  <VaListLabel class="flex justify-start">IP Address </VaListLabel>
                  <span>{{ controlTask?.gateway.ipAddr }}</span>
                  <VaListLabel class="flex justify-start">Remark</VaListLabel>
                  <span>{{ controlTask?.gateway.remark }}</span>
                  <VaListLabel class="flex justify-start">Created At </VaListLabel>
                  <span>{{ controlTask?.gateway.createdAt }}</span>
                </div>
              </template>
            </VaPopover>
          </div>

          <div class="flex flex-row mr-3 items-center gap-3">
            <VaListLabel class="flex justify-start">Meter</VaListLabel>
            <span class="absolute ml-20 truncate text-[16px]">{{ controlTask?.meter?.name }}</span>
            <VaPopover
              class="absolute ml-52"
              color="backgroundSecondary"
              trigger="click"
              :style="{ '--va-popover-content-background-color': '#ffffff' }"
            >
              <VaIcon
                :name="arrowDirection(isMeterCollapsed)"
                size="20px"
                @click="isMeterCollapsed = !isMeterCollapsed"
              />
              <template #body>
                <div class="grid grid-cols-[1fr_3fr] border border-solid p-2 rounded-md shadow-lg">
                  <VaListLabel class="flex justify-start">ID</VaListLabel>
                  <span>{{ controlTask?.meter.id }}</span>
                  <VaListLabel class="flex justify-start">Name</VaListLabel>
                  <span>{{ controlTask?.meter.name }}</span>
                  <VaListLabel class="flex justify-start">Type</VaListLabel>
                  <span>{{ controlTask?.meter.type === 0 ? 'Electricity' : 'Water' }}</span>
                  <VaListLabel class="flex justify-start">UnitID</VaListLabel>
                  <span>{{ controlTask?.meter.unitId }}</span>
                  <VaListLabel class="flex justify-start">Remark</VaListLabel>
                  <span>{{ controlTask?.meter.remark }}</span>
                  <VaListLabel class="flex justify-start">Created At </VaListLabel>
                  <span>{{ controlTask?.meter.createdAt }}</span>
                </div>
              </template>
            </VaPopover>
          </div>
        </div>
      </DetailCard>

      <!-- Footer Section -->
      <div class="dialog-footer">
        <VaButton @click="cancel">Cancel</VaButton>
        <VaButton color="primary" icon="mso-edit" class="ml-2 h-[30px] w-[72px]" @click="openEditModal">Edit</VaButton>
      </div>

      <!-- Edit Modal -->
      <VaModal v-model="showEditModal" size="small" mobile-fullscreen close-button hide-default-actions>
        <h1>Edit Control Task</h1>
        <EditControlTaskForm
          :model-value="controlTask"
          @update:modelValue="updateControlTaskData"
          @save="saveControlTask"
          @close="closeEditModal"
        />
      </VaModal>
    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { fetchTask, updateTask } from '../../../../apis/task'
import EditControlTaskForm from './EditControlTaskForm.vue'
import { useToast } from 'vuestic-ui'
import DetailCard from '@/components/cards/DetailCard.vue'
interface task_type_fetch {
  id: number
  name: string
  tag: string
  operation: string
  active: boolean
  editable: boolean
  interval: number
  startAt: string
  createdAt: string
  uuid: string
  gatewayId: number
  meterId: number
  gateway: {
    id: number
    createdAt: string
    name: string
    ipAddr: string
    remark: string
    meters: null
  }
  meter: {
    id: number
    createdAt: string
    name: string
    type: number
    model: number
    modbusAddr: number
    remark: string
    unitId: number
    gatewayId: number
    tasks: any
  }
}
const toast = useToast()
const controlTask = ref<task_type_fetch | null>(null)
const labelsProp = ref<string[]>([
  'ID',
  'TAG',
  'Operation',
  'Interval',
  'Start Time',
  'Active',
  'editable',
  'CreatedAt',
  'UUID',
])
const datasProp = computed(() => {
  return [
    controlTask.value?.id,
    controlTask.value?.tag,
    controlTask.value?.operation,
    controlTask.value?.interval,
    controlTask.value?.startAt,
    controlTask.value?.active,
    controlTask.value?.editable,
    controlTask.value?.createdAt,
    controlTask.value?.uuid,
  ]
})
const route = useRoute()
const controlTaskId = ref(route.query.id)
const isGatewayCollapsed = ref(true)
const isMeterCollapsed = ref(true)
const showEditModal = ref(false)

const arrowDirection = (state: boolean) => (state ? 'va-arrow-up' : 'va-arrow-down')
const fetch = async () => {
  if (controlTaskId.value) {
    const res = await fetchTask({ id: controlTaskId.value })
    controlTask.value = res.data.data
  }
}
onBeforeMount(() => {
  fetch()
})

const openEditModal = () => {
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const updateControlTaskData = (newControlTask: task_type_fetch) => {
  controlTask.value = newControlTask
}

const saveControlTask = async (updatedControlTask: task_type_fetch) => {
  try {
    await updateTask({ ...updatedControlTask })
    toast.init({ message: 'Edit Control Task successfully', color: 'success' })
  } catch (error: any) {
    toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
    console.error(error)
    return
  }
  await fetch() // Refresh data
  closeEditModal()
}

const cancel = () => {
  window.close()
}
</script>

<style lang="scss">
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
