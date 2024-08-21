<template>
  <VaCard>
    <div class="flex flex-col">
      <!-- Show loading spinner or message -->
      <div v-if="loading" class="text-center">Loading...</div>

      <!-- Show data table when not loading -->
      <VaDataTable v-else :columns="columns" :items="meters" :loading="loading" class="flex flex-grow w-[700px]">
        <template #cell(name)="{ rowData }">
          <div class="relative">
            <div class="truncate max-w-[150px] w-[150px]" :title="rowData.name">
              {{ rowData.name }}
            </div>
            <!-- Tooltip for full text on hover -->
            <div
              class="w-[150px] selection:absolute bottom-full left-0 p-2 text-white opacity-0 transition-opacity duration-300"
              :style="{ display: 'none', visibility: 'hidden' }"
              data-tooltip
            >
              {{ rowData.name }}
            </div>
          </div>
        </template>

        <template #cell(ipAddr)="{ rowData }">
          <div class="relative">
            <div class="truncate max-w-[230px] w-[150px]" :title="rowData.ipAddr">
              {{ rowData.ipAddr }}
            </div>
            <!-- Tooltip for full text on hover -->
            <div
              class="absolute bottom-full left-0 w-[150px] p-2 text-white bg-black rounded-lg opacity-0 transition-opacity duration-300"
              :style="{ display: 'none', visibility: 'hidden' }"
              data-tooltip
            >
              {{ rowData.ipAddr }}
            </div>
          </div>
        </template>

        <template #cell(remark)="{ rowData }">
          <div class="relative">
            <div class="truncate w-[150px] max-w-[300px]" :title="rowData.remark">
              {{ rowData.remark }}
            </div>
            <!-- Tooltip for full text on hover -->
            <div
              class="absolute bottom-full left-0 w-[150px] p-2 text-white rounded-lg transition-opacity duration-300"
              :style="{ display: 'none', visibility: 'hidden' }"
              data-tooltip
            >
              {{ rowData.remark }}
            </div>
          </div>
        </template>
      </VaDataTable>
    </div>
  </VaCard>
</template>

<script setup lang="ts">
import { defineProps, ref, onBeforeMount } from 'vue'
import { useToast, defineVaDataTableColumns, VaDataTable } from 'vuestic-ui'
import { getGateway } from '@/apis/gateway'

// Define the columns for the VaDataTable
const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', width: '5%' },
  { label: 'Name', key: 'name', width: '20%' },
  { label: 'Type', key: 'type', width: '5%' },
  { label: 'ModbusAddr', key: 'modbusAddr', width: '15%' },
  { label: 'UnitId', key: 'unitId', width: '5%' },
  { label: 'Remark', key: 'remark', width: '30%' },
  // { label: 'CreatedAt', key: 'createdAt', width: '20%' }
])

const props = defineProps({
  gatewayId: { type: Number, required: true },
})

const loading = ref(false)
const meters = ref<any[]>([])
const toast = useToast()

onBeforeMount(() => {
  loading.value = true
  getGateway({ params: props.gatewayId })
    .then((res) => {
      meters.value = res.data.data.meters
      console.log('Data fetched:', meters.value)
      loading.value = false
    })
    .catch((error: any) => {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    })
})
</script>

<style lang="scss" scoped></style>
