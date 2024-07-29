<!-- draggableDialog.vue -->
<template>
  <el-dialog 
    v-model="$props.visible" 
    width="500" 
    draggable
    :modal="false"
    :close-on-click-modal="false"
    modal-class="dialog_class"
    :overflow="true"
    @close="$emit('close', gateway)"
  >
    <VaCard>
      <div class="w-full h-full flex flex-col gap-4 justify-center items-center">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 items-end">
        <VaInput v-model="gateway.name" placeholder="Solid" label="Name" />
        <VaInput v-model="gateway.id" placeholder="Solid" label="ID" />
        <VaInput v-model="gateway.ip_address" placeholder="Solid" label="IP Address" />
        <VaInput v-model="gateway.remark" placeholder="Solid" label="Remark" />
        <!-- <VaInput v-model="gateway.created_at" placeholder="Solid" label="Created At" />
        <VaInput v-model="gateway.updated_at" placeholder="Solid" label="Updated At" /> -->
        </div>
        
        <div>
          <VaChart :data="chartData" class="h-24" type="line" :options="options" />
        </div>

      </div>
     
    </VaCard>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('close', gateway)">Cancel</el-button>
        <el-button type="primary" @click="$emit('save', gateway)">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { gateway_type } from '../../../../data/gateway'
import VaChart from '../../../../components/va-charts/VaChart.vue'
import { useChartData } from '../../../../data/charts/composables/useChartData'
import { lineChartData } from '../../../../data/charts/lineChartData'
import { ChartOptions } from 'chart.js'

const props = defineProps({
  gateway: { type: Object as PropType<gateway_type>, required: true },
  visible: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (event: 'close', gateway: any): void
  (event: 'save', gateway: any): void
}>()

const chartData = useChartData(lineChartData)
const options: ChartOptions<'line'> = {
  scales: {
    x: {
      display: false,
      grid: {
        display: false, // Disable X-axis grid lines ("net")
      },
    },
    y: {
      display: false,
      grid: {
        display: false, // Disable Y-axis grid lines ("net")
      },
      ticks: {
        display: false, // Hide Y-axis values
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
}
</script>

<style>
.dialog_class {
  pointer-events: none;
}
.el-dialog {
  pointer-events: auto;
  border-radius: 2px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
}
</style>
