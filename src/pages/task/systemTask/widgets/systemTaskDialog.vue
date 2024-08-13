<template>
    <VaCard class="w-full h-full flex">
      <div class="w-full h-full flex flex-col ml-3">
        <!-- Top Section -->
        <div class="flex flex-row justify-between">
          <div class="grid grid-cols-[1fr_3fr]" :class="{ 'gap-y-[2.2px]': !editable }">
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
        </div>
            
        <!-- Footer Section -->
        <div class="dialog-footer">
          <VaButton @click="cancel">Cancel</VaButton>
        </div>
      </div>
    </VaCard>
  </template>
  
  <script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue';
  import { task_type } from '../../../../data/task';
  import { useRoute } from 'vue-router';
  import { fetchTask, updateTask} from '../../../../apis/task';
  import editSystemTaskForm from './editSystemTaskForm.vue';
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
  }
  const controlTask = ref<task_type_fetch| null>(null);
  const route = useRoute();
  const controlTaskId = ref(route.query.id);
  const editable = ref(false);
  const isGatewayCollapsed = ref(true);
  const isMeterCollapsed = ref(true);
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

  const cancel = () => {
    window.close();
  };
  </script>
  
  <style lang="scss">
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  </style>
  