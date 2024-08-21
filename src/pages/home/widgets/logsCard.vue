<script setup lang="ts">
import VaTimelineItem from '@/components/va-timeline-item.vue'
import { onBeforeMount, ref } from 'vue'
import { fetchErrorLogs } from '@/apis/task'
import { useToast } from 'vuestic-ui/web-components'
import { openWindow } from '@/utils/openWindow'

const errorLogs = ref<any>([])
const toast = useToast()
const fetch = async () => {
  fetchErrorLogs()
    .then((res) => {
      errorLogs.value = res.data.data
    })
    .catch((error: any) => {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    })
}

onBeforeMount(() => {
  fetch()
})

const formattedDate = (isoDate: string): string => {
  const date = new Date(isoDate)
  return date
    .toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
    })
    .replace(',', '') // Remove the comma between date and time
}

const showTaskWindow = (taskId: number) => {
  openWindow({ path: '/taskDetail', query: { id: taskId } })
}
</script>

<template>
  <VaCard class="border rounded-[3px] w-full">
    <h1 class="text-[14px] font-bold text-secondary uppercase ml-2 my-3">Error Logs</h1>
    <VaCard class="h-[260px] w-full overflow-y-scroll">
      <table class="mt-1 ml-2">
        <tbody>
          <tr v-for="(item, index) in errorLogs" :key="index">
            <VaTimelineItem :date="formattedDate(item.taskInstance.startAt)">
              <VaPopover
                color="backgroundSecondary"
                trigger="click"
                :style="{ '--va-popover-content-background-color': '#ffffff' }"
              >
                <div class="flex flex-col mr-2 hover:bg-blue-50 mb-3">
                  <div class="flex flex-row gap-2">
                    <span class="flex-none text-slate-400 text-[18px]">Error while executing task: </span>
                    <span class="flex-none text-primary text-[18px]" @click="showTaskWindow(item.taskInstance.Id)">{{
                      item.taskInstance.name
                    }}</span>
                    <span class="flex-none text-slate-400 text-[18px]">Err: </span>
                    <div>
                      <span class="flex-none text-red-300 text-[18px]">{{ item.error }}</span>
                    </div>
                  </div>
                </div>

                <template #body>
                  <div class="border border-solid flex flex-col justify-start rounded-md shadow-lg p-4">
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> Error:</VaListLabel>
                      <span class="flex-grow">{{ item.error }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> Name:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.name }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> Tag:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.tag }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> Operation:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.operation }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> Active:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.active }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> Editable:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.editable }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> Interval:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.interval }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> StartAt:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.startAt }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> ID:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.id }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> CreatedAt:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.createdAt }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> UUID:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.uuid }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> GatewayID:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.gatewayId }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2"> MeterID:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.meterId }}</span>
                    </div>
                  </div>
                </template>
              </VaPopover>

              <template #date>
                <span class="text-[18px]"> {{ formattedDate(item.taskInstance.startAt) }}</span>
              </template>
            </VaTimelineItem>
          </tr>
        </tbody>
      </table>
    </VaCard>
  </VaCard>
</template>
