<script setup lang="ts">
import { PropType, computed } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: 'Toilet name', key: 'name', sortable: true },
  { label: 'Toilet location', key: 'location', sortable: true },
  { label: 'Remark', key: 'remark', sortable: true },
  { label: ' ', key: 'actions' },
])

const props = defineProps({
  toilets: {
    type: Array as PropType<any[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  // sortBy: {
  //   type: Object,
  //   required: true,
  // },
  // sortingOrder: {
  //   type: Object,
  //   required: true,
  // },
  // pagination: {
  //   type: Object,
  //   required: true,
  // },
})

const emit = defineEmits<{
  (event: 'edit', toilet: any): void
  (event: 'delete', toilet: any): void
}>()


</script>

<template>
  <div>
    <VaDataTable :items="toilets" :columns="columns" :loading="loading">
      <template #cell(name)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ rowData.name }}
        </div>
      </template>
      <template #cell(location)="{ rowData }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          {{ rowData.location }}
        </div>
      </template>
      <template #cell(status)="{ rowData: toilet }">
        <ProjectStatusBadge :status="toilet.status" />
      </template>

      <template #cell(actions)="{ rowData: toilet }">
        <div class="flex gap-2 justify-end">
          <VaButton preset="primary" size="small" color="primary" icon="mso-edit" aria-label="Edit toilet"
            @click="$emit('edit', toilet as any)" />
          <VaButton preset="primary" size="small" icon="mso-delete" color="danger" aria-label="Delete toilet"
            @click="$emit('delete', toilet as any)" />
        </div>
      </template>
    </VaDataTable>
    <!-- <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
      <div>
        <b>{{ $props.pagination.total }} results.</b>
        Results per page
        <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[10, 50, 100]" />
      </div>

      <div v-if="totalPages > 1" class="flex">
        <VaButton
          preset="secondary"
          icon="va-arrow-left"
          aria-label="Previous page"
          :disabled="$props.pagination.page === 1"
          @click="$props.pagination.page--"
        />
        <VaButton
          class="mr-2"
          preset="secondary"
          icon="va-arrow-right"
          aria-label="Next page"
          :disabled="$props.pagination.page === totalPages"
          @click="$props.pagination.page++"
        />
        <VaPagination
          v-model="$props.pagination.page"
          buttons-preset="secondary"
          :pages="totalPages"
          :visible-pages="5"
          :boundary-links="false"
          :direction-links="false"
        />
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
