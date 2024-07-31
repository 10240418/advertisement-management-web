<template>
    <VaCard>
      <div class="w-full h-full flex flex-col gap-4 justify-center items-center">
        <!-- Form Inputs -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 items-end">
          <VaInput v-if="resident" v-model="resident.id" placeholder="ID" label="ID" />
          <VaInput v-if="resident" v-model="resident.name" placeholder="Name" label="Name" />
          <VaInput v-if="resident" v-model="resident.email" placeholder="Email" label="Email" />
        </div>
  
        <!-- Chart Section -->
        <div>
          <VaChart :data="chartData" class="h-24" type="line" :options="options" />
        </div>
  
        <!-- Dialog Footer -->
        <div class="dialog-footer">
          <VaButton @click="onClose">Cancel</VaButton>
          <VaButton color="primary" @click="onConfirm">Confirm</VaButton>
        </div>
      </div>
    </VaCard>
  </template>
  
  <script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue';
  import { resident_user_type } from '@/data/resident_user';
  import VaChart from '../../../../components/va-charts/VaChart.vue';
  import { useChartData } from '../../../../data/charts/composables/useChartData';
  import { lineChartData } from '../../../../data/charts/lineChartData';
  import { ChartOptions } from 'chart.js';
  import { useRoute } from 'vue-router';
  import { fetchResident } from '../../../../apis/resident';
  
  const resident = ref<resident_user_type | null>(null);
  const route = useRoute();
  const residentId = ref(route.query.id);
  
  const fetch = async () => {
    if (residentId.value) {
      const res = await fetchResident({id: residentId.value});
      resident.value = res.data.data;
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
  
  const onConfirm = () => {
    // Confirm action logic
    console.log('Confirm action triggered');
  };
  
  const onClose = () => {
    // Close dialog logic
    console.log('Close action triggered');
  };
  </script>
  
  <style scoped>
  .resident-dialog {
    min-width: 400px;
  }
  
  .dialog-footer {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
  </style>
  