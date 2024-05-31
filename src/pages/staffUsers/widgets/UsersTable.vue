<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { User } from '../types'
import { PropType, computed, toRef } from 'vue'
import { Pagination, Sorting } from '../../../data/pages/users'
import { useVModel } from '@vueuse/core'
import { Project } from '../../projects/types'

const columns = defineVaDataTableColumns([
  { label: 'Username', key: 'username', sortable: true },
  { label: 'Email', key: 'email', sortable: true },
  { label: 'Notes', key: 'notes', sortable: true },
  { label: 'Active', key: 'active', sortable: true },
  { label: ' ', key: 'actions', align: 'right' },
])

const props = defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  // pagination: { type: Object as PropType<Pagination>, required: true },
  // sortBy: { type: String as PropType<Sorting['sortBy']>, required: true },
  // sortingOrder: { type: String as PropType<Sorting['sortingOrder']>, required: true },
})

const emit = defineEmits<{
  (event: 'edit-user', user: User): void
  (event: 'delete-user', user: User): void
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const users = toRef(props, 'users')

const getStatusText = (status: boolean) => (status ? 'Active' : 'Inactive')
const getStatusColors = (status: boolean) => (status ? 'success' : 'danger')

const { confirm } = useModal()

const onUserDelete = async (user: User) => {
  const agreed = await confirm({
    title: 'Delete user',
    message: `Are you sure you want to delete ${user.username}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-user', user)
  }
}
</script>

<template>
  <VaDataTable :columns="columns" :items="users" :loading="$props.loading">
    <template #cell(username)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.username }}
      </div>
    </template>

    <template #cell(email)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.email }}
      </div>
    </template>

    <template #cell(notes)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.notes }}
      </div>
    </template>

    <template #cell(active)="{ rowData }">
      <VaBadge :text="getStatusText(rowData.active)" :color="getStatusColors(rowData.active)" />
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="Edit user"
          @click="$emit('edit-user', rowData as User)"
        />
        <VaButton
          preset="primary"
          size="small"
          icon="mso-delete"
          color="danger"
          aria-label="Delete user"
          @click="onUserDelete(rowData as User)"
        />
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
