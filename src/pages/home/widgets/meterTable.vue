<template>
  <div class="flex flex-row gap-4 items-center">
    <VaButtonToggle 
      v-model="meterTypeValue" 
      preset="secondary" 
      border-color="primary" 
      :options="meterTypeOptions"
      class="mb-2 border border-solid shadow-lg rounded" 
    />
    <VaButtonToggle 
      v-model="meterStatusValue" 
      preset="secondary" 
      border-color="primary" 
      :options="meterStatusOptions"
      class="mb-2 border border-solid shadow-lg rounded" 
    />
  </div>
  <div class="flex flex-col gap-4 border border-solid shadow-ls rounded">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border border-solid shadow-lg rounded">
      <meterCard 
        v-for="meter in dashboardMeters" 
        :key="meter.id" 
        :name="meter.name" 
        :remark="meter.remark"
        :changeDirection="meter.changeDirection"
        :iconBackground="meter.iconBackground"
        :iconColor="meter.iconColor"
        class="border border-solid shadow-lg rounded hover:bg-slate-200"
        @click="showEditMeterDialog(meter.id)"
        
      >
        <template #icon>
          <VaIcon :name="meter.icon" size="small" />
        </template>
      </meterCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useColors } from 'vuestic-ui'
import meterCard from './meterCard.vue'
import { useHomes } from '@/pages/home/composables/home'
import { meter_type } from '@/data/meter'

const { fetchMetersData, meters } = useHomes()

const showEditMeterDialog = (meterId: number) => {
  const newWindow = window.open(`/meterDetail?id=${meterId}`, '_blank', 'width=800,height=600,left=500,top=500');
};


const meterTypeOptions = [
  { label: 'All', value: 'All' },
  { label: 'Electricity', value: 'Electricity' },
  { label: 'Water', value: 'Water' }
]

const meterTypeValue = ref('All')

const meterStatusOptions = [
  { label: 'All', value: 'All' },
  { label: 'On', value: 'On' },
  { label: 'Off', value: 'Off' }
]

const meterStatusValue = ref('All')

interface meterCardType {
  id: number
  name: string
  type: number
  model: number
  icon: string
  remark: string
  changeDirection: 'up' | 'down'
  iconBackground: string
  iconColor: string
}

const { getColor } = useColors()

const dashboardMeters = computed<meterCardType[]>(() => {
  const metersData = meters.value
  const meterCards: meterCardType[] = []
  console.log(metersData)

  metersData.forEach((meter: meter_type) => {
    meterCards.push({
      id: meter.id,
      name: meter.name,
      type: meter.type,
      model: meter.model ?? 0, // 如果 model 为 null，默认值为 0
      icon: meter.type === 1 ? 'mso-flash_on' : 'mso-water_drop',
      remark: meter.remark,
      changeDirection: meter.type === 1 ? 'up' : 'down',
      iconBackground: meter.type === 1 ? getColor('success') : getColor('primary'),
      iconColor: meter.type === 1 ? getColor('on-success') : getColor('on-primary'),
    })
  })

  return meterCards
})
</script>
