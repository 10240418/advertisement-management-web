<template>
  <VaCard class="border rounded-[1px] w-38% ">
    <h1 class="text-[10px] text-secondary font-bold uppercase ml-1">Abnormal Status</h1>
    <div class="grid grid-cols-[1fr_7fr_3fr] mt-2  ml-3 mr-2 gap-4">
      <VaIcon name="mso-location_away" color="primary"></VaIcon>
      <span class="text-[16px]">Users:</span>
      <span class="text-[16px]">{{ globalStore?.totalResidents }}</span>
      <VaIcon name="mso-home" color="primary"></VaIcon>
      <span class="text-[16px]">Units:</span>
      <span class="text-[16px]">{{ globalStore?.totalUnits }}</span>
      <VaIcon name="mso-wifi" color="primary"></VaIcon>
      <span class="text-[16px]">Gateways:</span>
      <span class="text-[16px]">{{ globalStore?.totalGateways }}</span>
      <VaIcon name="mso-keyboard_alt" color="primary"></VaIcon>
      <span class="text-[16px]">Devices:</span>
      <span class="text-[16px]">{{ globalStore?.totalMeters }}</span>
      <VaIcon name="mso-water_drop" color="primary"></VaIcon>
      <span class="text-[16px]">Water Meters:</span>
      <span class="text-[16px]">{{ globalStore?.totalWaterMeters }}</span>
      <VaIcon name="mso-bolt" color="primary"></VaIcon>
      <span class="text-[16px]">Electric Meters:</span>
      <span class="text-[16px]">{{ globalStore?.totalElectricMeters }}</span>
    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { fetchTotalStatus } from '@/apis/home';
import { onBeforeMount, ref } from 'vue';

type totalStatus = {
  totalGateways: number,
  totalResidents: number,
  totalUnits: number,
  totalMeters: number,
  totalWaterMeters: number,
  totalElectricMeters: number,
}

const globalStore = ref<totalStatus>();
onBeforeMount(() => {
  fetchTotalStatus().then((res) => {
    globalStore.value = res.data;
    console.log(res.data);
  })
})
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
