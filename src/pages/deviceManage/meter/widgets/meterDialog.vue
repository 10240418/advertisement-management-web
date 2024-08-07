<template>
    <VaCard>
        <div class="w-full h-full flex flex-col gap-4 justify-center items-center">

            <!-- table -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 items-end">
                <VaInput v-if="meter" v-model="meter.name" placeholder="Name" label="Name" />
                <VaInput v-if="meter" v-model="meter.id" placeholder="ID" label="ID" />
                <VaInput v-if="meter" v-model="meter.modbusAddr" placeholder="IP Address" label="IP Address" />
                <VaInput v-if="meter" v-model="meter.remark" placeholder="Remark" label="Remark" />
            </div>
            <VaDataTable :items="currentPageData" :columns="[
                { key: 'id', label: 'ID', sortable: true ,width: '10%' },
                { key: 'unit', label: 'Unit', sortable: true ,width: '10%' },
                { key: 'floor', label: 'Floor', sortable: true ,width: '10%' },
                { key: 'remark', label: 'Remark', sortable: true ,width: '30%' },
                { key: 'actions', label: 'Actions', sortable: false,width: '20%'  },
            ]" class="mr-3" :style="{
                '--va-data-table-height': '320px',
                '--va-data-table-thead-background': 'var(--va-background-element)',
                '--va-data-table-tfoot-background': 'var(--va-background-element)',
                '--va-data-table-thead-color': '#2C82E0',
            }" sticky-header footer-clone sticky-footer>


                <template #cell(actions)="{ rowData }">
                    <VaPopover placement="bottom" trigger="click" color="backgroundSecondary">
                        <div class="flex justify-start items-center relative hover:bg-blue-200 rounded-[4px]"
                            @click.stop="showContent(rowData)">
                            <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" />
                        </div>
                        <template #body>
                            <transition name="fade">
                                <div v-show="showContentResident?.id === rowData.id"
                                    class="tooltip-content flex flex-col justify-center z-999 items-center relative border  p-1 rounded-md">
                                    <VaButton preset="secondary" size="small" icon="mso-edit" aria-label="Edit Resident"
                                        @click="showEidtModal(rowData)" class="w-full justify-between">
                                        <span>编辑单位</span>
                                    </VaButton>
                                    <VaButton preset="secondary" size="small" icon="mso-not_started"
                                        aria-label="Update Resident" class="w-full justify-between">
                                        <span>设为使用</span>
                                    </VaButton>
                                    <VaButton preset="secondary" size="small" icon="mso-cancel"
                                        aria-label="Update Resident" class="w-full justify-between">
                                        <span>设为闲置</span>
                                    </VaButton>
                                    <VaButton preset="secondary" size="small" icon="mso-info" aria-label="Info Resident"
                                        @click="showDeleteModal(rowData)" class="w-full justify-between">
                                        <span>删除关联</span>
                                    </VaButton>
                                </div>
                            </transition>
                        </template>
                    </VaPopover>
                </template>
            </VaDataTable>

            <!-- chart -->
            <div>
                <VaChart :data="chartData" class="h-24" type="line" :options="options" />
            </div>

            <!-- footer -->
            <div class="dialog-footer">
                <VaButton @click="cancel">Cancel</VaButton>
                <VaButton @click="save">Confirm</VaButton>
            </div>
        </div>
    </VaCard>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { meter_type } from '../../../../data/meter';
import VaChart from '../../../../components/va-charts/VaChart.vue';
import { useChartData } from '../../../../data/charts/composables/useChartData';
import { lineChartData } from '../../../../data/charts/lineChartData';
import { ChartOptions } from 'chart.js';
import { useRoute } from 'vue-router';
import { fetchMeter } from '../../../../apis/meter';

const meter = ref<meter_type | null>(null);
const route = useRoute();
const meterId = ref(route.query.id);
const fetch = async () => {
    if (meterId.value) {
        const res = await fetchMeter({ id: meterId.value });
        meter.value = res.data.data;
        console.log(meter.value)
    }
};

onBeforeMount(() => {
    fetch();
});

const chartData = useChartData(lineChartData);
const options: ChartOptions<'line'> = {
    scales: {
        x: { display: false, grid: { display: false } },
        y: { display: false, grid: { display: false }, ticks: { display: false } },
    },
    interaction: { intersect: false, mode: 'index' },
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
    },
};

const cancel = () => {
    fetch();
};

const save = () => {
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