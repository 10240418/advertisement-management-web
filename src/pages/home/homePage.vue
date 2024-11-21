<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-row mb-2 stretch-container">
        <!-- Total Page Component -->
        <TotalPage class="stretch-item"></TotalPage>

        <!-- Logs Card Component -->
        <LogsCard class="stretch-item"></LogsCard>
      </div>
      <section class="flex flex-col border rounded-[3px]">
        <h1 class="text-[14px] font-bold text-secondary uppercase ml-2 my-3">Meter Status</h1>
        <MeterTable></MeterTable>
      </section>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import TotalPage from './widgets/totalCard.vue'
import LogsCard from './widgets/logsCard.vue'
import MeterTable from './widgets/meterTable.vue'
</script>

<style scoped>
.stretch-container {
  display: flex;
  gap: 8px;
  width: 100%;
}

.stretch-item {
  flex-grow: 1;
  flex-basis: 0;
}

.stretch-item:first-child {
  flex-grow: 1.2;
}

.stretch-item:last-child {
  flex-grow: 3.818;
}
</style>
