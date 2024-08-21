<template>
  <VaDataTable
    v-model:sort-by="sorting.sortBy"
    v-model:sorting-order="sorting.sortingOrder"
    :columns="columns"
    :items="currentPageData"
    :loading="isLoading"
  >
    <template #cell(type)="{ rowData }">
      <div v-if="rowData.type === 0">WaterMeter</div>
      <div v-else-if="rowData.type === 1">PowerMeter</div>
    </template>
    <template #cell(detail)="{ rowData }">
      <VaButton
        id="detailMeter"
        preset="secondary"
        size="small"
        icon="mso-info"
        aria-label="Info Resident"
        class="w-full justify-between ml-[-5px]"
        @click="$emit('detail-meter', rowData as any)"
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
          <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" />
        </div>
        <template #body>
          <Transition name="fade">
            <div
              v-show="showContentMeter?.id === rowData.id"
              class="tooltip-content flex flex-col justify-center z-999 items-center relative border p-1 rounded-md"
            >
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-edit"
                aria-label="Edit meter"
                class="w-full justify-between"
                @click="$emit('edit-meter', rowData as any)"
              >
                <span>Edit</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-delete"
                color="danger"
                aria-label="Delete meter"
                class="w-full justify-between"
                @click="onMeterDelete(rowData)"
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
      <VaSelect v-model="pagination.pageSize" class="!w-20" selected-top-shown :options="[5, 10, 20, 50, 100]" />
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
import { defineEmits, computed, ref, watch } from 'vue'
import { defineVaDataTableColumns, VaPopover, VaButton, VaIcon, VaSelect, VaPagination } from 'vuestic-ui'
import { meter_type } from '../../../../data/meter'
import { useMeters } from '../../../../pages/deviceManage/meter/composables/meter'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true, width: '5%' },
  { label: 'Name', key: 'name', sortable: true, width: '20%' },
  { label: 'Remark', key: 'remark', sortable: false, width: '20%' },
  { label: 'Type', key: 'type', sortable: true, width: '10%' },
  { label: 'ModbusAddr', key: 'modbusAddr', sortable: true, width: '15%' },
  { label: 'Detail', key: 'detail', sortable: false, width: '5%' },
  { label: 'Actions', key: 'actions', sortable: false, width: '5%' },
])
const { isLoading, meters, sorting, pagination, ...meterApi } = useMeters()
const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.pageSize))
const pagesOptions = computed(() => {
  const options = []
  for (let i = 1; i <= totalPages.value; i++) {
    options.push(i)
  }
  return options
})

const emit = defineEmits(['edit-meter', 'delete-meter', 'fetch-meter', 'detail-meter'])

const onMeterDelete = (meter: any) => {
  emit('delete-meter', meter)
}

watch(
  () => [pagination.value.pageNum, pagination.value.pageSize, sorting.value.sortBy, sorting.value.sortingOrder],
  () => {
    if (pagination.value.total < pagination.value.pageSize * (pagination.value.pageNum - 1)) {
      pagination.value.pageNum = 1
    }
    meterApi.fetch()
  },
)
const currentPageData = computed(() => {
  let metersArray: any = []

  if (Array.isArray(meters.value)) {
    metersArray = meters.value
  } else {
    metersArray = [meters.value]
  }
  const startIndex = (pagination.value.pageNum - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize

  if (metersArray.length <= pagination.value.pageSize) return metersArray
  else return metersArray.slice(startIndex, endIndex)
})

const showContentMeter = ref<meter_type | null>(null)
const showContent = (meter: any) => {
  showContentMeter.value = meter
}
</script>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
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
