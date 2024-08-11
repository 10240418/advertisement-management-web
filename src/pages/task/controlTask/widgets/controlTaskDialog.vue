<template>
    <VaCard class="w-full h-full flex">
      <div class="w-full h-full flex flex-col ml-3">
        <!-- Top Section -->
        <div class="flex flex-row justify-between">
          <div class="grid grid-cols-[1fr_3fr_1fr_3fr]" :class="{ 'gap-y-[2.2px]': !editable }">
            <VaListLabel class="flex justify-start">ID</VaListLabel>
            <span>{{ controlTask?.id }}</span>
            <VaListLabel class="flex justify-start">Name</VaListLabel>
            <span>{{ controlTask?.name }}</span>
            <VaListLabel class="flex justify-start">Tag</VaListLabel>
            <span>{{ controlTask?.tag }}</span>
            <VaListLabel class="flex justify-start">Operation</VaListLabel>
            <span>{{ controlTask?.operation }}</span>
            <VaListLabel class="flex justify-start">Interval</VaListLabel>
            <span>{{ controlTask?.interval }}</span>
            <VaListLabel class="flex justify-start">Start Time</VaListLabel>
            <span>{{ controlTask?.startAt }}</span>
            <VaListLabel class="flex justify-start">Gateway ID</VaListLabel>
            <div class="flex flex-row justify-between mr-3 items-center gap-3">
              <span>{{ controlTask?.gatewayId }}</span>
              <VaPopover color="backgroundSecondary" trigger="click" :style="{ '--va-popover-content-background-color': '#ffffff' }">
                <VaIcon :name="arrowDirection(isGatewayCollapsed)" size="20px" @click="isGatewayCollapsed = !isGatewayCollapsed" />
                <template #body>
                  <div class="grid grid-cols-[1fr_3fr] border border-solid p-2 rounded-md shadow-lg">
                    <VaListLabel class="flex justify-start">ID</VaListLabel>
                    <span>{{ controlTask?.gateway.id }}</span>
                    <VaListLabel class="flex justify-start">Name</VaListLabel>
                    <span>{{ controlTask?.gateway.name }}</span>
                    <VaListLabel class="flex justify-start">IP Address</VaListLabel>
                    <span>{{ controlTask?.gateway.ipAddr }}</span>
                    <VaListLabel class="flex justify-start">Remark</VaListLabel>
                    <span>{{ controlTask?.gateway.remark }}</span>
                    <VaListLabel class="flex justify-start">Created At</VaListLabel>
                    <span>{{ controlTask?.gateway.createdAt }}</span>
                  </div>
                </template>
              </VaPopover>
            </div>
            <VaListLabel class="flex justify-start">Meter ID</VaListLabel>
            <div class="flex flex-row justify-between mr-3 items-center gap-3">
              <span>{{ controlTask?.meterId }}</span>
              <VaPopover color="backgroundSecondary" trigger="click" :style="{ '--va-popover-content-background-color': '#ffffff' }">
                <VaIcon :name="arrowDirection(isMeterCollapsed)" size="20px" @click="isMeterCollapsed = !isMeterCollapsed" />
                <template #body>
                  <div class="grid grid-cols-[1fr_3fr] border border-solid p-2 rounded-md shadow-lg">
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
                    <VaListLabel class="flex justify-start">Created At</VaListLabel>
                    <span>{{ controlTask?.meter.createdAt }}</span>
                  </div>
                </template>
              </VaPopover>
            </div>
          </div>
          <div class="flex flex-col justify-end items-end w-[120px] mt-[3px]">
            <VaButton color="primary" @click="openEditModal" icon="mso-edit" class="h-[30px] w-[72px]">Edit</VaButton>
          </div>
        </div>
        <!-- Chart Section -->
        <div>
          <VaChart :data="chartData" class="h-24" type="line" :options="options" />
        </div>
        <!-- Footer Section -->
        <div class="dialog-footer">
          <VaButton @click="cancel">Cancel</VaButton>
        </div>
        <!-- Edit Modal -->
        <VaModal v-model="showEditModal" size="small" mobile-fullscreen close-button hide-default-actions>
          <h1>Edit Control Task</h1>
          <EditControlTaskForm :modelValue="controlTask" @update:modelValue="updateControlTaskData" @save="saveControlTask" @close="closeEditModal"/>
        </VaModal>
      </div>
    </VaCard>
  </template>
  
  <script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue';
  import { task_type } from '../../../../data/task';
  import VaChart from '../../../../components/va-charts/VaChart.vue';
  import { useChartData } from '../../../../data/charts/composables/useChartData';
  import { lineChartData } from '../../../../data/charts/lineChartData';
  import { ChartOptions } from 'chart.js';
  import { useRoute } from 'vue-router';
  import { fetchTask, updateTask} from '../../../../apis/task';
  import EditControlTaskForm from './editControlTaskForm.vue';
  import { useToast } from 'vuestic-ui';
  interface task_type_fetch {
    id: number,
    name: string,
    tag: string,
    operation: string,
    active: boolean,
    editable: boolean,
    interval: number,
    startAt: string,
    createdAt: string,
    uuid: string,
    gatewayId: number,
    meterId: number,
    gateway: {
      id: number,
      createdAt: string,
      name: string,
      ipAddr: string,
      remark: string
      meters: null
      
    },
    meter: {
        id: number,
        createdAt: string,
        name: string,
        type: number,
        model: number,
        modbusAddr: number,
        remark: string,
        unitId: number,
        gatewayId: number,
        tasks:any
    }
    // "id": 7,
    //   "createdAt": "2024-07-31T01:54:09.907Z",
    //   "name": "TestMeter 003",
    //   "type": 0,
    //   "model": 0,
    //   "modbusAddr": 23,
    //   "remark": "測試水表test",
    //   "unitId": 1,
    //   "gatewayId": 1,
    //   "tasks": null

  
  }
//   "data": {
//     "name": "test",
//     "tag": "sys",
//     "operation": "read",
//     "active": true,
//     "editable": true,
//     "interval": 20,
//     "startAt": "2024-07-30T07:00:32Z",
//     "id": 13,
//     "createdAt": "2024-08-09T11:58:48.93Z",
//     "uuid": "578f91dd-874e-4fdf-bc9d-f5bedf4b9758",
//     "gateway": {
//       "id": 4,
//       "createdAt": "2024-07-30T03:12:16.887Z",
//       "name": "test44",
//       "ipAddr": "192.168.1.11",
//       "remark": "",
//       "meters": null
//     },
//     "gatewayId": 4,
//     "meter": {
//       "id": 7,
//       "createdAt": "2024-07-31T01:54:09.907Z",
//       "name": "TestMeter 003",
//       "type": 0,
//       "model": 0,
//       "modbusAddr": 23,
//       "remark": "測試水表test",
//       "unitId": 1,
//       "gatewayId": 1,
//       "tasks": null
//     },
//     "meterId": 7
  
  const toast = useToast();
  const controlTask = ref<task_type_fetch| null>(null);
  const route = useRoute();
  const controlTaskId = ref(route.query.id);
  const editable = ref(false);
  const isGatewayCollapsed = ref(true);
  const isUnitCollapsed = ref(true);
  const isMeterCollapsed = ref(true);
  const showEditModal = ref(false);
  const controlTaskStatus = ref(0);
  const chartData = useChartData(lineChartData);
  const options: ChartOptions<'line'> = {
    scales: {
      x: { display: true, grid: { display: true } },
      y: { display: true, grid: { display: true }, ticks: { display: true } },
    },
    interaction: { intersect: true, mode: 'index' },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };
  
  const arrowDirection = (state: boolean) => (state ? 'va-arrow-up' : 'va-arrow-down');
  
  const fetch = async () => {
    if (controlTaskId.value) {
      const res = await fetchTask({ id:controlTaskId.value})
      controlTask.value = res.data.data;
    }
  };
  
  onBeforeMount(() => {
    fetch();
  });
  
  const openEditModal = () => {
    showEditModal.value = true;
  };
  
  const closeEditModal = () => {
    showEditModal.value = false;
  };
  
  const updateControlTaskData = (newControlTask: task_type_fetch) => {
    controlTask.value = newControlTask;
  };
  


  const saveControlTask = async (updatedControlTask: task_type_fetch) => {
    try {
      await updateTask({ ...updatedControlTask });
      toast.init({ message: 'Edit Control Task successfully', color: 'success' });
    } catch (error) {
      toast.init({ message: 'Edit Control Task failed', color: 'danger' });
      console.error(error);
      return;
    }
    await fetch(); // Refresh data
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
  