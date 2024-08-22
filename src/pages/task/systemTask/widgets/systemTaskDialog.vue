<template>
  <VaCard class="w-full h-full flex">
    <div class="w-full h-[600px] flex flex-col ml-3">
      <!-- Top Section -->
      <DetailCard :labels="labelsProp" :datas="datasProp" :font-weight="`font-bold`" :index-weight="3">
        <div class="flex flex-col relative">
          <!-- Gateway Section -->
          <div class="flex flex-row w-full items-center">
            <VaListLabel class="flex justify-start">Gateway</VaListLabel>
            <div class="absolute ml-20">
              <span class="truncate w-[72px]">{{ controlTask?.gateway?.name }}</span>
            </div>
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
                <div class="grid grid-cols-2 gap-2 border border-solid p-2 rounded-md shadow-lg">
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
          <!-- Meter Section -->
          <div class="flex flex-row mr-3 items-center gap-3">
            <VaListLabel class="flex justify-start">Meter</VaListLabel>
            <div class="absolute ml-20">
              <span class="truncate w-[72px]">{{ controlTask?.meter?.name }}</span>
            </div>

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
                <div class="grid grid-cols-[1fr_4fr] border border-solid rounded-md shadow-lg p-2">
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
    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { fetchTask } from '../../../../apis/task'
import { useToast } from 'vuestic-ui'
import DetailCard from '../../../../components/cards/DetailCard.vue'
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
const toast = useToast()
const controlTaskId = ref(route.query.id)
const isGatewayCollapsed = ref(true)
const isMeterCollapsed = ref(true)
const arrowDirection = (state: boolean) => (state ? 'va-arrow-up' : 'va-arrow-down')

const fetch = async () => {
  if (controlTaskId.value) {
    fetchTask({ id: controlTaskId.value })
      .then((res) => {
        controlTask.value = res.data.data
        console.log(res.data.data)
      })
      .catch((error: any) => {
        toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
        console.error(error)
      })
  }
}

onBeforeMount(() => {
  fetch()
})
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.va-button {
  min-height: 30px;
}
</style>
