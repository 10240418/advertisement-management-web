<template>
    <VaCard class="w-full h-full flex">
        <div class="w-full h-full flex flex-col ml-3">
            <!-- top -->
            <div class="flex flex-row justify-between">
                <div class="grid grid-cols-[1fr_3fr_1fr_3fr]" :class="{ 'gap-y-[2.2px]': !editable }">
                    <VaListLabel class="flex justify-start">ID</VaListLabel>
                    <span>{{ meter?.id }}</span>
                    <VaListLabel class="flex justify-start">Name</VaListLabel>
                    <span>{{ meter?.name }}</span>
                    <VaListLabel class="flex justify-start">UnitID</VaListLabel>
                    <div class="flex flex-row justify-between mr-3 items-center gap-3">
                        <span>{{ meter?.unitId }}</span>
                        <VaPopover color="backgroundSecondary" trigger="click"
                            :style="{ '--va-popover-content-background-color': '#ffffff', }">
                            <VaIcon :name="arrowDirection(isUnitCollapsed)" size="20px"
                                @click="isUnitCollapsed = !isUnitCollapsed" />
                            <template #body>
                                <div class="grid grid-cols-[1fr_3fr] border border-solid p-2 rounded-md shadow-lg">
                                    <VaListLabel class="flex justify-start">ID</VaListLabel>
                                    <span>{{ meter?.unit.id }}</span>
                                    <VaListLabel class="flex justify-start">Floor</VaListLabel>
                                    <span>{{ meter?.unit.floor }}</span>
                                    <VaListLabel class="flex justify-start">Unit</VaListLabel>
                                    <span>{{ meter?.unit.unit }}</span>
                                    <VaListLabel class="flex justify-start">Remark</VaListLabel>
                                    <span>{{ meter?.unit.remark }}</span>
                                    <VaListLabel class="flex justify-start">createdAt</VaListLabel>
                                    <span>{{ meter?.unit.createdAt }}</span>
                                </div>
                            </template>
                        </VaPopover>
                    </div>
                    <VaListLabel class="flex justify-start">type</VaListLabel>
                    <span v-if="meter?.type === 1" class="flex justify-start">Electricity</span>
                    <span v-if="meter?.type === 0" class="flex justify-start">Water</span>
                    <VaListLabel class="flex justify-start">GatewayID</VaListLabel>
                    <div class="flex flex-row justify-between mr-3 items-center gap-3">
                        <span>{{ meter?.gatewayId }}</span>
                        <VaPopover color="backgroundSecondary" trigger="click"
                            :style="{ '--va-popover-content-background-color': '#ffffff', }">
                            <VaIcon :name="arrowDirection(isGatewayCollapsed)" size="20px"
                                @click="isGatewayCollapsed = !isGatewayCollapsed" />
                            <template #body>
                                <div class="grid grid-cols-[1fr_3fr] border border-solid p-2 rounded-md shadow-lg">
                                    <VaListLabel class="flex justify-start">ID</VaListLabel>
                                    <span>{{ meter?.gateway.id }}</span>
                                    <VaListLabel class="flex justify-start">Name</VaListLabel>
                                    <span>{{ meter?.gateway.name }}</span>
                                    <VaListLabel class="flex justify-start">IPAddr</VaListLabel>
                                    <span>{{ meter?.gateway.ipAddr }}</span>
                                    <VaListLabel class="flex justify-start">Remark</VaListLabel>
                                    <span>{{ meter?.gateway.remark }}</span>
                                    <VaListLabel class="flex justify-start">createdAt</VaListLabel>
                                    <span>{{ meter?.gateway.createdAt }}</span>
                                </div>
                            </template>
                        </VaPopover>
                    </div>


                    <VaListLabel class="flex justify-start">ModbusAddr</VaListLabel>
                    <span>{{ meter?.modbusAddr }}</span>

                    <VaListLabel class="flex justify-start">Remark</VaListLabel>
                    <span>{{ meter?.remark }}</span>
                </div>
                <div class="flex flex-col justify-between items-end w-[120px] mt-[3px] mr-1">
                    <VaButton color="primary" @click="openEditModal" icon="mso-edit" class="h-[30px] w-[72px]">
                        Edit
                    </VaButton>
                </div>
            </div>
            <!-- chart -->
            <div class="flex  min-h-[100px] h-[200px]">
                <VaChart :data="chartData" class="h-24" type="line" :options="options" />
            </div>
            <!-- operate timeling -->
            <div class="flex flex-row *:">
                <meterOperateLogsCard :isfetch="logsCardFetch"></meterOperateLogsCard>
            </div>
            <!-- footer -->
            <div class="dialog-footer flex flex-row gap-2">
                <div class="flex flex-row items-center gap-5">
                    <div class="w-[20px] h-[20px]  rounded-full border border-solid shadow-lg"
                        :class="{ 'bg-green-600': meterStatus === true, 'bg-red-500': meterStatus !== true }"></div>
                    <VaButton color="primary" :loading="isOperating?true:false" @click="operateMeterStatus" class="h-[30px] w-[72px]">
                        Operate
                    </VaButton>
                </div>
                <VaButton color="primary" @click="read" class="h-[30px] w-[72px]">Read</VaButton>
                <VaButton @click="cancel">Cancel</VaButton>
            </div>
            <!-- edit modal -->
            <VaModal v-model="showEditModal" size="small" mobile-fullscreen close-button hide-default-actions>
                <h1>Edit Meter</h1>
                <EditMeterForm :modelValue="meter" @update:modelValue="updateMeterData" @save="saveMeter"
                    @close="closeEditModal" />
            </VaModal>
            <VaModal v-model="showReadModal" size="small" mobile-fullscreen close-button hide-default-actions>
                <div v-if="meter?.type === 1"
                    class="flex flex-col p-4">
                    <h1 class="text-xl font-bold mb-4 flex flex-row items-start justify-start">Status</h1>
                    <div class="space-y-2 w-full">
                        <div class="flex justify-between">
                            <VaListLabel class="flex justify-start">Voltage</VaListLabel>
                            <span class="font-semibold">{{ readMeterData.voltage }}</span>
                        </div>
                        <div class="flex justify-between">
                            <VaListLabel class="flex justify-start">Current</VaListLabel>
                            <span class="font-semibold">{{ readMeterData.current }}</span>
                        </div>
                        <div class="flex justify-between">
                            <VaListLabel class="flex justify-start">Frequency</VaListLabel>
                            <span class="font-semibold">{{ readMeterData.frequency }}</span>
                        </div>
                        <div class="flex justify-between">
                            <VaListLabel class="flex justify-start">Power</VaListLabel>
                            <span class="font-semibold">{{ readMeterData.power }}</span>
                        </div>
                        <div class="flex justify-between">
                            <VaListLabel class="flex justify-start">Power Factor</VaListLabel>
                            <span class="font-semibold">{{ readMeterData.powerFactor }}</span>
                        </div>
                        <div class="flex justify-between">
                            <VaListLabel class="flex justify-start">Switch</VaListLabel>
                            <span class="font-semibold">{{ readMeterData.switch }}</span>
                        </div>
                        <div class="flex justify-between">
                            <VaListLabel class="flex justify-start">Power Energy</VaListLabel>
                            <span class="font-semibold">{{ readMeterData.powerEnergy }}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="flex flex-col p-4 ">
                    <h1 class="text-xl font-bold mb-4 flex  justify-start items-start ml-[-2px]">Status</h1>
                    <div class="space-y-2 w-full">
                        <div class="flex justify-between">
                            <VaListLabel class="flex justify-start">Volume</VaListLabel>
                            <span class="font-semibold">{{ readMeterData.volume }}</span>
                        </div>
                        <div class="flex justify-between">
                            <VaListLabel class="flex justify-start">Switch</VaListLabel>
                            <span class="font-semibold">{{ readMeterData.valve }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row items-end justify-end mt-2">
                   <VaButton   @click="showReadModal=false">Cancel</VaButton>
                </div>          
            </VaModal>
        </div>
    </VaCard>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue';
import { meter_type, read_meter_log_type } from '../../../../data/meter';
import VaChart from '../../../../components/va-charts/VaChart.vue';
import { useChartData } from '../../../../data/charts/composables/useChartData';
import { lineChartData } from '../../../../data/charts/lineChartData';
import { ChartOptions } from 'chart.js';
import { useRoute } from 'vue-router';
import { fetchMeter } from '../../../../apis/meter';
import EditMeterForm from './editMeterForm.vue';
import { useToast } from 'vuestic-ui';
import { updateMeter, operateMeter, readMeter } from '../../../../apis/meter';
import { useMeters } from '../composables/meter';
import { MeterOperationType } from '../../../../data/api_field_type/api_field_type';
import { fetchReadMeterLogsData } from '../../../../apis/meter';
import meterOperateLogsCard from './meterOperateLogsCard.vue';

const toast = useToast();
const meter = ref<meter_type | null>(null);
const route = useRoute();
const meterId = ref(route.query.id);

const editable = ref(false);
const isUnitCollapsed = ref(true);
const isGatewayCollapsed = ref(true);
const showEditModal = ref(false);
const pagination = ref({
    pageNum: 1,
    pageSize: 15,
    desc: false
});

const readLogsData = ref<read_meter_log_type[]>([]);
const labelsReadMeterLogs = ref<string[]>([]);
const dataReadMeterLogs = ref<number[]>([]);
const logsCardFetch = ref(false)
const isOperating = ref(false);


const arrowDirection = (state: boolean) => (state ? 'va-arrow-up' : 'va-arrow-down');

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

const fetch = async () => {
    if (meterId.value) {
        try {
            const res = await fetchMeter({ id: meterId.value });
            meter.value = res.data.data;
            const reslog = await fetchReadMeterLogsData({ id: meterId.value, ...pagination.value });
            readLogsData.value = reslog.data.data;
            labelsReadMeterLogs.value = reslog.data.data.map((log: read_meter_log_type) => formattedDate(log.createdAt));
            dataReadMeterLogs.value = reslog.data.data.map((log: read_meter_log_type) => log.powerEnergy);
            const resStatus = await readMeter({ id: meterId.value });
            if (meter.value?.type === 1) {
                meterStatus.value = resStatus.data.data.switch;
                console.log(meterStatus.value)
            }
            else {
                meterStatus.value = resStatus.data.data.valve;
                console.log(meterStatus.value)
            }


        } catch (error: any) {
            toast.init({ color: 'danger', message: error.message });
        }
    }
};
onBeforeMount(() => {
    fetch();
});

const lineChartMeterReadLogsData = ref({
    datasets: [
        {
            label: 'PowerEnergy',
            backgroundColor: 'rgba(75,192,192,0.4)',
            data: dataReadMeterLogs.value, // Random values
        },
    ],
    labels: labelsReadMeterLogs.value
});
//侦听labelsReadMeterLogs.value变化时，更新lineChartMeterReadLogsData.value
watch([labelsReadMeterLogs, dataReadMeterLogs], () => {
    lineChartMeterReadLogsData.value.labels = labelsReadMeterLogs.value;
    lineChartMeterReadLogsData.value.datasets[0].data = dataReadMeterLogs.value;
});

const chartData = useChartData(lineChartMeterReadLogsData.value);

const options: ChartOptions<'line'> = {
    scales: {
        x: { display: true, grid: { display: true } },
        y: { display: true, grid: { display: true }, ticks: { display: true } },
    },
    interaction: { intersect: false, mode: 'index' },
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
    },
};
//读出来的弹窗
const readMeterData = ref<any>()
const showReadModal = ref(false)
const read = async () => {
    try {
        const res = await readMeter({ id: meterId.value });
        readMeterData.value = res.data.data
        showReadModal.value = true
        toast.init({ message: 'Read Meter successfully', color: 'success' });
    }
    catch (error) {
        toast.init({ message: 'Read Meter failed', color: 'danger' });
    }
};
const openEditModal = () => {
    showEditModal.value = true;
};

const closeEditModal = () => {
    showEditModal.value = false;
};

const updateMeterData = (newMeter: meter_type) => {
    meter.value = newMeter;
};

const meterStatus = ref(false);

const operateMeterStatus = () => {
    isOperating.value = true;
    logsCardFetch.value=false
    operateMeter({ id: Number(meterId.value), body: { type: meterStatus.value === true ? MeterOperationType.ElectricMeterOff : MeterOperationType.ElectricMeterOn } })
        .then(() => {
            toast.init({ message: 'Operate successfully', color: 'success' });
            meterStatus.value = meterStatus.value === true ? false : true;
            logsCardFetch.value = true;
            isOperating.value = false;
            fetch();
        })
        .catch((error) => {
            toast.init({ message: 'Operate Meter failed', color: 'danger' });
            console.error(error);
        });
};
const saveMeter = async (updatedMeter: any) => {
    try {
        await updateMeter({ id: Number(meterId.value), ...updatedMeter });
        toast.init({ message: 'Edit Meter successfully', color: 'success' });
    } catch (error) {
        toast.init({ message: 'Edit Meter failed', color: 'danger' });
        console.error(error);
        return;
    }
    await fetch();
    console.log(meter.value);
    await useMeters().fetch();
    closeEditModal();
};

const cancel = () => {
    window.close();
};
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
