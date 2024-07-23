<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { PropType, computed, toRef } from 'vue'
import { resident_user_type } from '../../../data/resident_user'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Email', key: 'email', sortable: true },
  { label: 'Unity ID', key: 'unity_id', sortable: true },
  { label: 'Active', key: 'active', sortable: true },
  { label: 'Created At', key: 'created_at', sortable: true },
  { label: 'Updated At', key: 'updated_at', sortable: true },
  { label: 'Actions', key: 'actions', sortable: false },
])

const props = defineProps({
  residentUsers: {
    type: Array as PropType<resident_user_type[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<any>, required: true },
  sortBy: { type: String as PropType<any>, required: true },
  sortingOrder: { type: String as PropType<any>, required: false },
})

const emit = defineEmits<{
  (event: 'edit-resident', resident: any): void
  (event: 'delete-resident', resident: any): void
}>()

const residents = toRef(props, 'residentUsers')
const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize))

const { confirm } = useModal()

const onResidentDelete = async (resident: any) => {
  const agreed = await confirm({
    title: 'Delete Resident',
    message: `Are you sure you want to delete ${resident.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-resident', resident)
  }
}

const currentPageData = computed(() => {
  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize
  const endIndex = startIndex + props.pagination.pageSize
  return residents.value.slice(startIndex, endIndex)
})
</script>

<template>
  <VaDataTable :columns="columns" :items="currentPageData" :loading="$props.loading">
    <!-- <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.name }}
      </div>
    </template>

    <template #cell(email)="{ rowData }">
      <div class="ellipsis max-w-[120px]">
        {{ rowData.email }}
      </div>
    </template>

    <template #cell(unity_id)="{ rowData }">
      <div class="ellipsis max-w-[120px]">
        {{ rowData.unity_id }}
      </div>
    </template> -->

    <template #cell(active)="{ rowData }">
      <VaChip class="ellipsis max-w-[120px]">
        {{ rowData.active ? 'Yes' : 'No' }}
      </VaChip>
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="Edit Resident"
          @click="$emit('edit-resident', rowData as any)"
        />
        <VaButton preset="primary" size="small" icon="mso-delete" color="danger" aria-label="Delete Resident"
          @click="onResidentDelete(rowData)" />
      </div>
    </template>
  </VaDataTable>

  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>{{ $props.pagination.total }} results.</b>
      Results per page
      <VaSelect v-model="$props.pagination.pageSize" class="!w-20" :options="[10, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="$props.pagination.pageNum === 1"
        @click="$props.pagination.pageNum--;"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
        :disabled="$props.pagination.pageNum === totalPages"
        @click="$props.pagination.pageNum++"
      />
      <VaPagination
        v-model="$props.pagination.pageNum"
        buttons-preset="secondary"
        :pages="totalPages"
        :visible-pages="5"
        :boundary-links="false"
        :direction-links="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
