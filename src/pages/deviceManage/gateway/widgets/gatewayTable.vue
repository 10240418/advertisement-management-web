<!-- widgets/gatewayTable.vue -->
<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui';
import { PropType, computed, toRef } from 'vue';
import { gateway_type } from '../../../../data/gateway';

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: 'Name', key: 'name', sortable: true },
  { label: 'IP Address', key: 'ip_address', sortable: true },
  { label: 'Remark', key: 'remark', sortable: true },
  { label: 'Created At', key: 'created_at', sortable: true },
  { label: 'Updated At', key: 'updated_at', sortable: true },
  { label: 'Actions', key: 'actions', sortable: false },
]);

const props = defineProps({
  gateways: {
    type: Array as PropType<gateway_type[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<any>, required: true },
  sortBy: { type: String as PropType<any>, required: true },
  sortingOrder: { type: String as PropType<any>, required: false },
});

const emit = defineEmits<{
  (event: 'edit-gateway', gateway: any): void;
  (event: 'delete-gateway', gateway: any): void;
}>();

const gateways = toRef(props, 'gateways');
const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize));

const { confirm } = useModal();

const onGatewayDelete = async (gateway: any) => {
  const agreed = await confirm({
    title: 'Delete Gateway',
    message: `Are you sure you want to delete ${gateway.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  });

  if (agreed) {
    emit('delete-gateway', gateway);
  }
};

const currentPageData = computed(() => {
  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize;
  const endIndex = startIndex + props.pagination.pageSize;
  return gateways.value.slice(startIndex, endIndex);
});
</script>

<template>
  <VaDataTable :columns="columns" :items="currentPageData" :loading="$props.loading">
    <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.name }}
      </div>
    </template>

    <template #cell(ip_address)="{ rowData }">
      <div class="ellipsis max-w-[120px]">
        {{ rowData.ip_address }}
      </div>
    </template>

    <template #cell(remark)="{ rowData }">
      <div class="ellipsis max-w-[120px]">
        {{ rowData.remark }}
      </div>
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="Edit Gateway"
          @click="$emit('edit-gateway', rowData as any)"
        />
        <VaButton preset="primary" size="small" icon="mso-delete" color="danger" aria-label="Delete Gateway"
          @click="onGatewayDelete(rowData)" />
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
        @click="$props.pagination.pageNum++;"
      />
    </div>
  </div>
</template>
