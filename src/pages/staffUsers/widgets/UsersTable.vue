<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { PropType, computed, toRef } from 'vue'

const columns = defineVaDataTableColumns([
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Email', key: 'email', sortable: true },
  { label: 'Active', key: 'active', sortable: true },
  { label: ' ', key: 'actions', align: 'right' },
])

const props = defineProps({
  users: {
    type: Array as PropType<any[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  // pagination: { type: Object as PropType<Pagination>, required: true },
  // sortBy: { type: String as PropType<Sorting['sortBy']>, required: true },
  // sortingOrder: { type: String as PropType<Sorting['sortingOrder']>, required: true },
})

const emit = defineEmits<{
  (event: 'delete-user', user: any): void
  (event: 'activate-user', user: any): void
  (event: 'deactivate-user', user: any): void
}>()

const users = toRef(props, 'users')

const getStatusText = (status: boolean) => (status ? 'Active' : 'Inactive')
const getStatusColors = (status: boolean) => (status ? 'success' : 'danger')

const { confirm } = useModal()

const onUserDelete = async (user: any) => {
  const agreed = await confirm({
    title: 'Delete user',
    message: `Are you sure you want to delete ${user.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-user', user)
  }
}

const onActivate = (user: any) => {
  if (user.active) {
    emit('deactivate-user', user)
  } else {
    emit('activate-user', user)
  }
}
</script>

<template>
  <VaDataTable :columns="columns" :items="users" :loading="$props.loading">
    <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.name }}
      </div>
    </template>

    <template #cell(email)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.email }}
      </div>
    </template>

    <template #cell(active)="{ rowData }">
      <VaBadge :text="getStatusText(rowData.active)" :color="getStatusColors(rowData.active)" />
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton preset="primary" size="small" aria-label="Activate" @click="onActivate(rowData)">{{
    rowData.active ? 'Deactivate' : 'Activate' }}
        </VaButton>
        <VaButton preset="primary" size="small" icon="mso-delete" color="danger" aria-label="Delete user"
          @click="onUserDelete(rowData)" />
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
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
