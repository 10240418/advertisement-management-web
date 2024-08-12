<template>
  <VaCard class="border border-solid ">
    <VaCardContent>
      <div class="flex flex-row gap-4 mb-2 stretch-container">
        <!-- Total Page Component -->
        <totalPage class="stretch-item"></totalPage>

        <!-- Logs Card Component -->
        <logsCard class="stretch-item"></logsCard>
      </div>
      <section>
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
  gap: 16px;
  width: 100%;
}

.stretch-item {
  flex-grow: 1;
  flex-basis: 0;
}

.stretch-item:first-child {
  flex-grow: 1;
}

.stretch-item:last-child {
  flex-grow: 3.918;
}
</style>
