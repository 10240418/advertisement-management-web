<!-- gatewayTable.vue -->

<template>
  <VaDataTable
    v-model:sort-by="sorting.sortBy"
    v-model:sorting-order="sorting.sortingOrder"
    :columns="columns"
    :items="currentPageData"
    :loading="isLoading"
  >
    <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">{{ rowData.name }}</div>
    </template>

    <template #cell(ipAddr)="{ rowData }">
      <div class="ellipsis max-w-[230px]">{{ rowData.ipAddr }}</div>
    </template>
    <template #cell(device)="{ row, isExpanded }">
      <VaButton
        :icon="isExpanded ? 'va-arrow-up' : 'va-arrow-down'"
        preset="secondary"
        size="small"
        class="flex justify-start h-[20px] items-center relative fontsize-[3px] ml-[-8px]"
        @click="row.toggleRowDetails()"
      >
        {{ isExpanded ? 'Hide' : 'Info' }}
      </VaButton>
    </template>
    <!-- 拓展出来的信息 -->
    <template #expandableRow="{ rowData }">
      <div class="flex w-full">
        <InfoMeterTable :gateway-id="rowData.id"></InfoMeterTable>
      </div>
    </template>

    <template #cell(Detail)="{ rowData }">
      <VaButton
        preset="secondary"
        size="small"
        icon="mso-info"
        aria-label="Edit user"
        class="w-full justify-start ml-[-5px]"
        @click="$emit('detail-gateway', rowData as any)"
      >
        <span>Detail</span>
      </VaButton>
    </template>

    <template #cell(actions)="{ rowData }">
      <VaPopover placement="bottom" trigger="click" color="backgroundSecondary">
        <div
          class="flex justify-center items-center relative hover:bg-blue-200 rounded-[4px]"
          @click.stop="showContent(rowData)"
        >
          <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer"> </VaIcon>
        </div>

        <template #body>
          <Transition name="fade">
            <div
              v-show="showContentGateway?.id === rowData.id"
              class="tooltip-content flex flex-col justify-start z-999 items-center relative border border-solid p-2 rounded-md shadow-lg"
            >
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-edit"
                aria-label="Edit user"
                class="w-full justify-start"
                @click="$emit('edit-gateway', rowData as any)"
              >
                <span>Edit</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-delete"
                color="danger"
                aria-label="Delete user"
                class="w-full flex-start"
                @click="onGatewayDelete(rowData)"
              >
                <span>Delete</span>
              </VaButton>
            </div>
          </Transition>
        </template>
      </VaPopover>
    </template>
  </VaDataTable>
  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>total: {{ pagination.total }} </b>
      pageNum:
      <VaSelect v-model="pagination.pageNum" class="!w-16" selected-top-shown :options="pagesOptions" />
      pageSize:
      <VaSelect v-model="pagination.pageSize" class="!w-20" selected-top-shown :options="[1, 2, 5, 10, 20, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="pagination.pageNum === 1"
        @click="pagination.pageNum--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
        :disabled="pagination.pageNum === totalPages"
        @click="pagination.pageNum++"
      />
      <VaPagination
        v-model="pagination.pageNum"
        buttons-preset="secondary"
        :pages="totalPages"
        :visible-pages="5"
        :boundary-links="false"
        :direction-links="false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { computed, watch, ref } from 'vue'
import { gateway_type } from '../../../../data/gateway'
import InfoMeterTable from './InfoMeterTable.vue'
import { useGateways } from '../composables/gateway'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true, width: '5%' },
  { label: 'Name', key: 'name', sortable: true, width: '10%' },
  { label: 'IP Address', key: 'ipAddr', sortable: true, width: '20%' },
  { label: 'Remark', key: 'remark', sortable: false, width: '25%' },
  { label: 'Device', key: 'device', sortable: false, width: '10%' },
  { label: 'Detail', key: 'Detail', sortable: false, width: '5%' },
  { label: 'Actions', key: 'actions', sortable: false, width: '5%' },
])

const { isLoading, gateways, sorting, pagination, fetch } = useGateways()
const emit = defineEmits<{
  (event: 'detail-gateway', gateway: any): void
  (event: 'edit-gateway', gateway: any): void
  (event: 'delete-gateway', gateway: any): void
  (event: 'fetch-gateway', params: any): void
}>()
const gatewaysShowInTable = computed(() => {
  return gateways.value
})
const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.pageSize))
const pagesOptions = computed(() => {
  const options = []
  for (let i = 1; i <= totalPages.value; i++) {
    options.push(i)
  }
  return options
})

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
  let gatewayArray: any = []
  if (Array.isArray(gatewaysShowInTable.value)) {
    gatewayArray = gatewaysShowInTable.value
  } else if (gatewaysShowInTable.value && typeof gatewaysShowInTable.value === 'object') {
    gatewayArray = [gatewaysShowInTable.value]
  }
  const startIndex = (pagination.value.pageNum - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize

  if (gatewayArray.length <= pagination.value.pageSize) return gatewaysShowInTable.value
  else return gatewayArray.slice(startIndex, endIndex)
})

// const currentPageData = computed(() => {
//   let usersArray: any = []
//   if (Array.isArray(users.value)) {
//     usersArray = users.value
//   } else if (users.value && typeof users.value === 'object') {
//     usersArray = [users.value]
//   }
//   const startIndex = (pagination.value.pageNum - 1) * pagination.value.pageSize
//   const endIndex = startIndex + pagination.value.pageSize

//   if (usersArray.length <= pagination.value.pageSize) return users.value
//   else return usersArray.value.slice(startIndex, endIndex)
// })
watch(
  () => [pagination.value.pageNum, pagination.value.pageSize, sorting.value.sortingOrder, sorting.value.sortBy],
  () => {
    if (pagination.value.total < pagination.value.pageSize * (pagination.value.pageNum - 1)) {
      pagination.value.pageNum = 1
    }
    fetch()
  },
)
//气泡下拉框
const showContentGateway = ref<gateway_type>()
const showContent = (rowData: any) => {
  if (showContentGateway.value === rowData) {
    showContentGateway.value = rowData
  } else {
    showContentGateway.value = rowData
  }
}
</script>

<style lang="scss">
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
  ::v-deep(td.va-data-table__table-td) {
    padding: 8px 10px;
  }
}
.va-data-table__table-tr--expanded td {
  background: #dce6f8;
}

.va-data-table__table-expanded-content td {
  background-color: #dce6f6;
}

.tooltip-content {
  position: relative;
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
  border-color: transparent transparent white transparent;
}
</style>
<!-- gatewayTable.vue -->
