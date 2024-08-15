<template>
  <VaCard >
    <VaCardContent>
      <div class="flex flex-row mb-2 stretch-container">
        <!-- Total Page Component -->
        <totalPage class="stretch-item"></totalPage>

        <!-- Logs Card Component -->
        <logsCard class="stretch-item"></logsCard>
      </div>
      <section class="flex flex-col border rounded-[1px]">
        <h1 class="text-[10px] text-secondary font-bold uppercase mb-2 ml-1">Meter Status</h1>
        <meterTable></meterTable>
      </section>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import totalPage from './widgets/totalCard.vue'
import logsCard from './widgets/logsCard.vue'
import meterTable from './widgets/meterTable.vue'
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
