<script setup lang="ts">
import { onBeforeMount, PropType, ref } from 'vue'
import router from '../../../router'
import VaTimelineItem from '@/components/va-timeline-item.vue'
import { fetchErrorLogs } from '@/apis/task';
import { useToast } from 'vuestic-ui/web-components';

const errorLogs = ref<any>([])
const toast = useToast()
const fetch = async () => {
  fetchErrorLogs().then(res => {
    errorLogs.value = res.data.data;
  }).catch(err => {
    toast.init({ message: `err`, color: 'danger' })
  })
}
onBeforeMount(() => {
  fetch()
})
const formattedDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 24-hour format
  }).replace(',', ''); // Remove the comma between date and time
};

</script>

<template>
  <VaCard class="border rounded-[1px] w-full ">
    <h1 class="text-[10px] text-secondary font-bold uppercase ml-1">Error Logs</h1>
    <VaCard class="h-[260px]  w-full overflow-y-scroll">
      <table class="mt-1 ml-2">
        <tbody>
          <tr v-for="(item, index) in errorLogs" :key="index">
            <VaTimelineItem :date="formattedDate(item.taskInstance.startAt)">
              <VaPopover color="backgroundSecondary" trigger="click"
                :style="{ '--va-popover-content-background-color': '#ffffff', }">

                <div class="flex flex-col  mr-2  hover:bg-blue-50  " @click="">
                  <div class="flex flex-row gap-2">
                    <span>{{ item.taskInstance.name }}</span>
                    <span class="text-slate-400">Operation:</span> 
                    <span >{{ item.taskInstance.operation }}</span>
                    <span class="text-slate-400">Meter:</span>

                    <span >{{ item.taskInstance.meterId }}</span>
                  </div>
                  <div class="flex flex-row">
                    <span class="text-red-500 max-w-[100%] ">{{ item.error }}</span>
                  </div>
                  <div class="h-[3px]"></div>
                </div>
                <template #body>
                  <div class="border border-solid flex flex-col justify-start rounded-md shadow-lg p-4">
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">Error:</VaListLabel>
                      <span class="flex-grow">{{ item.error }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">Name:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.name }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">Tag:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.tag }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">Operation:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.operation }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">Active:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.active }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">Editable:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.editable }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">Interval:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.interval }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">StartAt:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.startAt }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">ID:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.id }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">CreatedAt:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.createdAt }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">UUID:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.uuid }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">GatewayID:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.gatewayId }}</span>
                    </div>
                    <div class="flex items-start mb-2">
                      <VaListLabel class="flex-shrink-0 w-1/4 text-left pr-2">MeterID:</VaListLabel>
                      <span class="flex-grow">{{ item.taskInstance.meterId }}</span>
                    </div>
                  </div>
                </template>


              </VaPopover>
            </VaTimelineItem>
          </tr>
        </tbody>
      </table>
    </VaCard>
  </VaCard>
</template>
