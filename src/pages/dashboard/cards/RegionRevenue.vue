<template>
  <VaCard>
    <VaCardTitle class="flex justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">Toilet managed by region</h1>
    </VaCardTitle>
    <VaCardContent class="flex flex-col gap-1">
      <VaDataTable
        class="region-revenue-table"
        :columns="[
          { key: 'name', label: 'Top Region' },
          { key: 'count', label: 'Toilets managed', align: 'right' },
        ]"
        :items="data"
      >
        <template #cell(name)="{ rowData }"> {{ rowData.name }} </template>
        <template #cell(count)="{ rowData }"> {{ rowData.count }} </template>
      </VaDataTable>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
const data = [
  {
    name: 'China',
    count: '2',
  },
]
</script>

<style lang="scss" scoped>
.region-revenue-table {
  ::v-deep(tbody) {
    tr {
      border-top: 1px solid var(--va-background-border);
    }
  }
}
</style>
