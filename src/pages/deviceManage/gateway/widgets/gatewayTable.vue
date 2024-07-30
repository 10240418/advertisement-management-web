<!-- gatewayTable.vue -->
<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { PropType, computed, toRef, watch ,ref} from 'vue'
import { gateway_type } from '../../../../data/gateway'


const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: 'Name', key: 'name', sortable: true },
  { label: 'IP Address', key: 'ip_address', sortable: true },
  { label: 'Remark', key: 'remark', sortable: false },
  // { label: 'Created At', key: 'created_at', sortable: true },
  // { label: 'Updated At', key: 'updated_at', sortable: true },
  { label: 'device', key: 'device', sortable: false },
  { label: 'Actions', key: 'actions', sortable: false },

])

const props = defineProps({
  gateways: { type: Array as PropType<gateway_type[]>, required: true },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<any>, required: true },
  sorting: { type: Object as PropType<any>, required: true },
})

const emit = defineEmits<{
  (event: 'edit-gateway', gateway: any): void
  (event: 'delete-gateway', gateway: any): void
  (event: 'fetch-gateway', params: any): void
}>()

const gateways = toRef(props, 'gateways')

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize))

const { confirm } = useModal()

const onGatewayDelete = async (gateway: any) => {
  const agreed = await confirm({
    title: 'Delete gateway',
    message: `Are you sure you want to delete ${gateway.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-gateway', gateway)
  }
}

const currentPageData = computed(() => {
  let gatewaysArray : any = [];

  // 检查是否为数组，如果不是，则包裹在数组中
  if (Array.isArray(gateways.value)) {
    gatewaysArray = gateways.value;
  } else if (gateways.value && typeof gateways.value === 'object') {
    gatewaysArray = [gateways.value];
  }

  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize;
  const endIndex = startIndex + props.pagination.pageSize;
  
  return gatewaysArray.slice(startIndex, endIndex);
});
watch(
  () => [props.pagination.pageNum, props.pagination.pageSize, props.sorting.sortingOrder, props.sorting.sortBy],
  () => {
    if (props.pagination.total < props.pagination.pageSize * (props.pagination.pageNum - 1)) {
      props.pagination.pageNum = 1
    }
    emit('fetch-gateway', { pageNum: props.pagination.pageNum, pageSize: props.pagination.pageSize })
  }
)
//气泡下拉框
const showContentGateway = ref<gateway_type | null>(null)
const showContent = (rowData: any) => {
  console.log(rowData)
  if (showContentGateway.value === rowData) {
    showContentGateway.value = null
  } else {
    showContentGateway.value = rowData
  }
}



 

</script>

<template>
  <VaDataTable
    :columns="columns"
    :items="currentPageData"
    :loading="props.loading"
    v-model:sort-by="props.sorting.sortBy"
    v-model:sorting-order="props.sorting.sortingOrder"
  >
    <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">{{ rowData.name }}</div>
    </template>

    <template #cell(ip_address)="{ rowData }">
      <div class="ellipsis max-w-[230px]">{{ rowData.ip_address }}</div>
    </template>
    

    <template #cell(device)="{ row, isExpanded }">
      <VaButton
        :icon="isExpanded ? 'va-arrow-up': 'va-arrow-down'"
        preset="secondary"
        class="justify-center items-center relative fontsize-[8px]"
        @click="row.toggleRowDetails()"
      >
        {{ isExpanded ? 'Hide': 'More info' }}
      </VaButton>
    </template>
    
    <template #expandableRow="{ rowData }">
      <div class="flex gap-2">
        <!-- <VaAvatar :src="`https://randomuser.me/api/portraits/men/${rowData.id}.jpg`" /> -->
        <div class="pl-2">
          <div class="flex gap-1">
            <span>{{ rowData.name }}</span>
          </div>
          <div class="flex items-center">
            <VaIcon size="small" name="phone" color="secondary" class="mr-2" />
            <span>{{ rowData.phone }}</span>
          </div>
          <div class="flex items-center">
            <VaIcon size="small" name="email" color="secondary" class="mr-2" />
            <span>{{ rowData.email }}</span>
          </div>
          <div class="flex items-center">
            <VaIcon size="small" name="language" color="secondary" class="mr-2" />
            <span class="va-link">{{ rowData.website }}</span>
          </div>
        </div>
      </div>
    </template>



    <template #cell(actions)="{ rowData }" class= " overflow-y-scroll">
      <VaPopover placement="bottom" trigger="click" color="backgroundSecondary">
      <div class="flex justify-center items-center relative hover:bg-slate-400 rounded-[4px] " @click.stop="showContent(rowData)">
        <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" >
        </VaIcon>
      </div>

      <template #body>
      <transition name="fade">
    <div v-show="showContentGateway?.id === rowData.id" class="tooltip-content flex flex-col  justify-center z-999 items-center relative  border border-solid p-2 rounded-md shadow-lg">
      <VaButton
        preset="secondary"
        size="small"
        icon="mso-edit"
        aria-label="Edit user"
        @click="$emit('edit-gateway', rowData as any)"
        class="w-full"
      >
        <span>明细</span>
      </VaButton>
      <VaButton
        preset="secondary"
        size="small"
        icon="mso-delete"
        color="danger"
        aria-label="Delete user"
        @click="onGatewayDelete(rowData)"
        class="w-full"
      >
        <span>删除</span>
      </VaButton>
    </div>
    </transition>
    </template>
</VaPopover>
    </template>
  </VaDataTable>
  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>Total: {{ props.pagination.total }} </b>
      Page Number:
      <VaInput v-model="props.pagination.pageNum" class="!w-16" />
      Page Size:
      <VaSelect v-model="props.pagination.pageSize" class="!w-20" :options="[5, 10, 20, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="props.pagination.pageNum === 1"
        @click="props.pagination.pageNum--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
        :disabled="props.pagination.pageNum === totalPages"
        @click="props.pagination.pageNum++"
      />
      <VaPagination
        v-model="props.pagination.pageNum"
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
.tooltip-content {
  position: relative;
  // background-color: white;
  border: 1px solid #d1d5db; 
  padding: 6px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tooltip-content::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent #d1d5db transparent; 
}

.tooltip-content::after {
  content: '';
  position: absolute;
  bottom: 100%; 
  left: 50%;
  transform: translateX(-50%);
  border-width: 7px;
  border-style: solid;
  border-color: transparent transparent white transparent; // 
}
</style>
