<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { PropType, computed, toRef, watch } from 'vue'
import { meter_type } from '../../../../data/meter'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Gateway ID', key: 'gateway_id', sortable: true },
  { label: 'Modbus Address', key: 'modbus_address', sortable: true },
  { label: 'Type', key: 'type', sortable: true },
  { label: 'Remark', key: 'remark', sortable: false },
  { label: 'Created At', key: 'created_at', sortable: true },
  { label: 'Updated At', key: 'updated_at', sortable: true },
  { label: 'Actions', key: 'actions', sortable: false },
])

const props = defineProps({
  meters: {
    type: Array as PropType<meter_type[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<any>, required: true },
})

const emit = defineEmits<{
  (event: 'edit-meter', meter: any): void
  (event: 'delete-meter', meter: any): void
  (event: 'fetch-meter', params: any): void
}>()

const meters = toRef(props, 'meters')
const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize))

const { confirm } = useModal()

const onMeterDelete = async (meter: any) => {
  const agreed = await confirm({
    title: 'Delete meter',
    message: `Are you sure you want to delete ${meter.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-meter', meter)
  }
}

const currentPageData = computed(() => {
  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize
  const endIndex = startIndex + props.pagination.pageSize
  if (meters.value.length <= props.pagination.pageSize)
    return meters.value;
  else
    return meters.value.slice(startIndex, endIndex)
})

watch(
  () => [props.pagination.pageNum, props.pagination.pageSize],
  () => {
    if (props.pagination.total < props.pagination.pageSize * (props.pagination.pageNum - 1)) {
      props.pagination.pageNum = 1;
    }
    emit('fetch-meter', { pageNum: props.pagination.pageNum, pageSize: props.pagination.pageSize })
  }
)
</script>

<template>
  <VaDataTable
    :columns="columns"
    :items="currentPageData"
    :loading="$props.loading"
  >
    <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.name }}
      </div>
    </template>

    <template #cell(gateway_id)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.gateway_id }}
      </div>
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="Edit meter"
          @click="$emit('edit-meter', rowData as any)"
        />
        <VaButton
          preset="primary"
          size="small"
          icon="mso-delete"
          color="danger"
          aria-label="Delete meter"
          @click="onMeterDelete(rowData)"
        />
      </div>
    </template>
  </VaDataTable>

  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>total:{{ $props.pagination.total }} </b>
      pageNum:
      <VaInput v-model="$props.pagination.pageNum" class="!w-16" />
      pageSize:
      <VaSelect v-model="$props.pagination.pageSize" class="!w-20" :options="[5, 10, 20, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="$props.pagination.pageNum === 1"
        @click="$props.pagination.pageNum--"
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
