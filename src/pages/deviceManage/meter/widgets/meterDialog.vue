<template>
    <VaCard>
        <div class="w-full h-full flex flex-col gap-4 justify-center items-center">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 items-end">
                <VaInput v-if="meter" v-model="meter.name" placeholder="Name" label="Name" />
                <VaInput v-if="meter" v-model="meter.id" placeholder="ID" label="ID" />
                <VaInput v-if="meter" v-model="meter.modbusAddr" placeholder="IP Address" label="IP Address" />
                <VaInput v-if="meter" v-model="meter.remark" placeholder="Remark" label="Remark" />
            </div>
            <div>
                <VaChart :data="chartData" class="h-24" type="line" :options="options" />
            </div>
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