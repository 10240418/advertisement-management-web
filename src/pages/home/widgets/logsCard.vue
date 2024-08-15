<script setup lang="ts">
import { onBeforeMount, PropType ,ref  } from 'vue'
import router from '../../../router'
import VaTimelineItem from '@/components/va-timeline-item.vue'
import { fetchErrorLogs } from '@/apis/task';
import { useToast } from 'vuestic-ui/web-components';

const errorLogs = ref<any>([])
const toast = useToast()
const fetch = async() =>{
  fetchErrorLogs().then(res =>{
    errorLogs.value = res.data.data;
  }).catch(err =>{
  toast.init({message:`err`, color: 'danger'})
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
  <VaCard class="border rounded-[1px] w-full bg-red-300">
    
    <h1 class="text-[10px] text-secondary font-bold uppercase ml-1">Error Logs</h1> 
  

          <VaCard class="h-[260px]  w-full  overflow-y-scroll">
        
            <table class="mt-1 ml-2">
                <tbody>
                    <tr v-for="(item, index) in errorLogs" :key="index">
                        <VaTimelineItem :date="formattedDate(item.taskInstance.startAt)">
                            <div class="flex flex-col sm:flex-row mr-2">
                                <div class="flex flex-row gap-2">
                                    <span>{{ item.taskInstance.name }}</span>
                                    <span class="text-slate-400">Operation:</span>
                                    <span class="text-blue-500">{{item.taskInstance.operation}}</span>
                                </div>
                                <div class="flex flex-row ml-2">
                                </div>
                            </div>
                            <div class="flex flex-col sm:flex-row mr-2">
                                <div class="flex flex-row">
                                    <span class="text-red-500 ">{{ item.error}}</span>
                                </div>

                            </div>
                        </VaTimelineItem>
                    </tr>
                </tbody>
            </table>
    </VaCard>
  </VaCard>
</template>
