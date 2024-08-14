<template>
  <VaCard class=" border rounded-[1px]  w-38%">
    <h1 class="text-[10px] text-secondary font-bold uppercase mb-2">Abnormal Status</h1>
    <div class="flex flex-col gap-4 ml-2 mr-2">
      
      <!-- 用户统计 -->
      <div class="flex flex-row gap-4 items-center">
        <span class="indicator bg-blue-300"></span>
        <span class="text-[16px] font-bold">用户</span>
        <span class="text-[16px]">{{ globalStore.residentsTotal }}</span>
      </div>
      
      <!-- 单元统计 -->
      <div class="flex flex-row gap-4 items-center">
        <span class="indicator bg-blue-400"></span>
        <span class="text-[16px] font-bold">单元</span>
        <span class="text-[16px] text-green-600">正常</span>
        <span class="text-[16px]">{{ globalStore.unitsTotal.normal }}</span>
        <span class="text-[16px] text-red-600">异常</span>
        <span class="text-[16px] text-red-600">{{ globalStore.unitsTotal.abnormal }}</span>
      </div>
  
      <!-- 设备统计 -->
      <div class="flex flex-row gap-4 items-center">
        <span class="indicator bg-blue-500"></span>
        <span class="text-[16px] font-bold">设备</span>
        <span class="text-[16px] text-green-600">正常</span>
        <span class="text-[16px]">{{ globalStore.metersTotal.normal }}</span>
        <span class="text-[16px] text-red-600">异常</span>
        <span class="text-[16px] text-red-600">{{ globalStore.metersTotal.abnormal }}</span>
      </div>

    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/stores/global-store'

const globalStore = useGlobalStore()
</script>

<style scoped>
.greek-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.font-bold {
  font-weight: bold;
}
</style>
