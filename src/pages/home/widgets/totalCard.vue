<template>
  <VaCard class="border rounded-[3px] w-38% flex flex-col">
    <h1 class="text-[14px] font-bold text-secondary uppercase ml-2 my-3">Abnormal Status</h1>
    <div class="flex flex-col justify-around px-4 pt-1 pb-3 gap-4 grow">
      <div class="w-full flex justify-between">
        <div class="flex content-center gap-1">
          <VaIcon name="mso-location_away" color="primary"></VaIcon>
          <span :class="fontClass">Users:</span>
        </div>
        <span :class="valueClass">{{ globalStore?.totalResidents }}</span>
      </div>
      <div class="w-full flex justify-between">
        <div class="flex content-center gap-1">
          <VaIcon name="mso-home" color="primary"></VaIcon>
          <span :class="fontClass">Units:</span>
        </div>
        <span :class="valueClass">{{ globalStore?.totalUnits }}</span>
      </div>
      <div class="w-full flex justify-between">
        <div class="flex content-center gap-1">
          <VaIcon name="mso-wifi" color="primary"></VaIcon>
          <span :class="fontClass">Gateways:</span>
        </div>
        <span :class="valueClass">{{ globalStore?.totalGateways }}</span>
      </div>
      <div class="w-full flex justify-between">
        <div class="flex content-center gap-1">
          <VaIcon name="mso-keyboard_alt" color="primary"></VaIcon>
          <span :class="fontClass">Devices:</span>
        </div>
        <span :class="valueClass">{{ globalStore?.totalMeters }}</span>
      </div>
      <div class="w-full flex justify-between">
        <div class="flex content-center gap-1">
          <VaIcon name="mso-water_drop" color="primary"></VaIcon>
          <span :class="fontClass">Water Meters:</span>
        </div>
        <span :class="valueClass">{{ globalStore?.totalWaterMeters }}</span>
      </div>
      <div class="w-full flex justify-between">
        <div class="flex content-center gap-1">
          <VaIcon name="mso-bolt" color="primary"></VaIcon>
          <span :class="fontClass">Electric Meters:</span>
        </div>
        <span :class="valueClass">{{ globalStore?.totalElectricMeters }}</span>
      </div>
    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { fetchTotalStatus } from '@/apis/home'
import { onBeforeMount, ref } from 'vue'

type totalStatus = {
  totalGateways: number
  totalResidents: number
  totalUnits: number
  totalMeters: number
  totalWaterMeters: number
  totalElectricMeters: number
}

const globalStore = ref<totalStatus>()
onBeforeMount(() => {
  fetchTotalStatus().then((res) => {
    globalStore.value = res.data
    console.log(res.data)
  })
})

const fontClass = 'text-[18px] text-primary font-bold'
const valueClass = 'text-[18px] font-bold'
</script>

<style scoped>
.VaCard {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  padding: 1rem;
}
</style>
