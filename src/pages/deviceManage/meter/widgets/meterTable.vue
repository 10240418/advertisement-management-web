<template>
  <VaCard>
    <div class="flex flex-col">
      <!-- Display loading spinner or message while loading -->
      <div v-if="!loading">Loading...</div>
      
      <!-- Display data table when not loading -->
      <VaDataTable 
        v-else
        :items="meters" 
        :columns="columns"
        :loading="loading"
        striped
        hoverable
      />
    </div>
  </VaCard>
</template>

<script setup lang="ts">
import { defineProps, ref, onBeforeMount } from 'vue';
import { useToast, defineVaDataTableColumns, VaDataTable } from 'vuestic-ui';
import { getGateway } from '@/apis/gateway';

// Define columns for VaDataTable
const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true, width: '5%' },
  { label: 'Name', key: 'name', sortable: true, width: '20%' },
  { label: 'Remark', key: 'remark', sortable: false, width: '20%' },
  { label: 'Type', key: 'type', sortable: true, width: '5%' },
  { label: 'ModbusAddr', key: 'modbusAddr', sortable: true, width: '15%' },
  { label: 'UnitId', key: 'unitId', sortable: true, width: '5%' },
  { label: 'GatewayId', key: 'gatewayId', sortable: true, width: '5%' },
]);

const props = defineProps({
  gatewayId: { type: Number, required: true }
});

const loading = ref(false);
const meters = ref<any[]>([]);
const toast = useToast();

onBeforeMount(() => {
  loading.value = true;
  getGateway({ params: props.gatewayId }).then(res => {
    meters.value = res.data.data.meters;
    console.log('Data fetched:', meters.value);
    loading.value = false;
  }).catch(err => {
    console.error(err);
    toast.init({ color: 'danger', message: 'Failed to fetch data' });
    loading.value = false;
  });
});
</script>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
