<script setup lang="ts">
import { PropType, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import VaTimelineItem from '../../../../components/va-timeline-item.vue'
import { fetchOperateMeterLogsData } from '../../../../apis/meter'
import { operate_meter_log_type } from '../../../../data/meter'

const pagination = ref({
    pageSize: 20,
    pageNum: 1
})

const route = useRoute();
const meterID = ref(route.query.id);
const operateLogs = ref<operate_meter_log_type[]>([])
const fetchOperateMeterLogs = async () => {
    try {
        const res = await fetchOperateMeterLogsData({ id: meterID.value, ...pagination.value })
        console.log(res.data.data)
        operateLogs.value = res.data.data
    } catch (error) {

    }
}

onBeforeMount(() => {
    fetchOperateMeterLogs()
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
    <VaCard class=" h-[240px] min-w-[300px] w-full md overflow-y-scroll">
        <VaCardContent>
            <table class="mt-0">
                <tbody>
                    <tr v-for="(item, index) in operateLogs" :key="index">
                        <VaTimelineItem :date="formattedDate(item.createdAt)">
                            <div class="flex flex-col sm:flex-row mr-2">
                                <div>
                                    <span>{{ item.meterName }}({{ item.meterId }})</span>
                                </div>
                                <div class="flex flex-row ml-2">
                                    <span class="text-slate-400">Operation:</span>
                                    <span v-if="item.operation === 1" class="text-blue-500">Open</span>
                                    <span v-if="item.operation === 0">Close</span>
                                </div>
                            </div>
                        </VaTimelineItem>
                    </tr>
                </tbody>
            </table>
        </VaCardContent>
    </VaCard>
</template>