<template>
  <div class="flex flex-wrap gap-4 mb-2 ml-3">
    <VaButtonToggle
      v-model="meterTypeValue"
      preset="secondary"
      border-color="primary"
      :options="meterTypeOptions"
      class="border rounded-md"
    />
    <VaButtonToggle
      v-if="false"
      v-model="meterStatusValue"
      preset="secondary"
      border-color="primary"
      :options="meterStatusOptions"
      class="border rounded-md"
    />
  </div>
  <div class="flex flex-col gap-4 rounded-md">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ml-3 mb-4">
      <MeterCard
        v-for="meter in dashboardMeters"
        :id="meter.id"
        :key="meter.id"
        :name="meter.name"
        :type="meter.type"
        :remark="meter.remark"
        :change-direction="meter.changeDirection"
        :icon-background="meter.iconBackground"
        :icon-color="meter.iconColor"
        :amount="meter.amount"
        :switch="meter.switch"
        :updated-at="meter.updatedAt"
        class="border-t border-l border-gray-300 shadow-md rounded-md bg-red-50 w-full h-full hover:bg-gray-100 cursor-pointer"
        @click="showEditMeterDialog(meter.id)"
      >
        <template #icon>
          <VaIcon :name="meter.icon" size="small" />
        </template>
      </MeterCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useColors } from 'vuestic-ui'
import MeterCard from './MeterCard.vue'
import { useHomes } from '@/pages/home/composables/home'

const { fetchMetersStatus, fetchMetersStatusByType, meters } = useHomes()

const showEditMeterDialog = (meterId: number) => {
  window.open(`/meterDetail?id=${meterId}`, `/meterDetail?id=${meterId}`, 'width=800,height=600,left=500,top=500')
}

const meterTypeOptions = [
  { label: 'All', value: 'All' },
  { label: 'Electricity', value: 'electric' },
  { label: 'Water', value: 'water' },
]
const meterTypeValue = ref('All')
watch(meterTypeValue, () => {
  if (meterTypeValue.value === 'All') {
    fetchMetersStatus()
  } else {
    fetchMetersStatusByType(meterTypeValue.value)
  }
})
const meterStatusOptions = [
  { label: 'All', value: 'All' },
  { label: 'On', value: 'On' },
  { label: 'Off', value: 'Off' },
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
  amount: number
  switch: boolean
  updatedAt: string
}

const { getColor } = useColors()
const dashboardMeters = computed<meterCardType[]>(() => {
  const metersData = meters.value
  const meterCards: meterCardType[] = []
  metersData.forEach((meter: any) => {
    meterCards.push({
      id: meter.meter.id,
      name: meter.meter.name,
      type: meter.meter.type,
      model: meter.meter.model ?? 0,
      icon: meter.meter.type === 1 ? 'mso-flash_on' : 'mso-water_drop',
      remark: meter.meter.remark,
      changeDirection: meter.meter.type === 1 ? 'up' : 'down',
      iconBackground: meter.meter.type === 1 ? getColor('success') : getColor('primary'),
      iconColor: meter.meter.type === 1 ? getColor('on-success') : getColor('on-primary'),

      amount: meter.meter.type === 0 ? meter.status?.volume : meter.status?.powerEnergy,
      switch: meter.meter.type === 0 ? meter.status?.valve : meter.status?.switch,
      updatedAt: meter.status?.updatedAt,
    })
  })
  return meterCards
})
</script>
