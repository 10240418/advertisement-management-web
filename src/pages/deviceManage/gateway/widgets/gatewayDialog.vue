<template>
  <VaCard>
    <div class="w-full h-full flex flex-col gap-4 justify-center items-center">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 items-end">
        <VaInput v-if="gateway" v-model="gateway.name" placeholder="name" label="Name" />
        <VaInput v-if="gateway" v-model="gateway.id" placeholder="id" label="ID" />
        <VaInput v-if="gateway" v-model="gateway.ipAddr" placeholder="ip_address" label="IP Address" />
        <VaInput v-if="gateway" v-model="gateway.remark" placeholder="remark" label="Remark" />
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
import { ref ,onBeforeMount} from 'vue';
import { gateway_type } from '../../../../data/gateway';
import VaChart from '../../../../components/va-charts/VaChart.vue';
import { useChartData } from '../../../../data/charts/composables/useChartData';
import { lineChartData } from '../../../../data/charts/lineChartData';
import { ChartOptions } from 'chart.js';
import { useRoute } from 'vue-router';
import { getGateway } from '../../../../apis/gateway'; 

const gateway = ref<gateway_type | null>(null);
const route =   useRoute();
const gatewayId = ref(route.query.id);
const fetchGateway = async () => {
  if (gatewayId.value) {
    
    const res = await getGateway({params:gatewayId.value,data:{
      email:localStorage.getItem('AdminEmail'),
      password:localStorage.getItem('AdminPassword')
    }});
    console.log(res.data)
    gateway.value = res.data. data;
  }
}; 

onBeforeMount(() => {
  fetchGateway();
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
  fetchGateway();
};

const save = () => {

  window.close();
};
</script>
