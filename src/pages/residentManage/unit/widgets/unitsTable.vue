<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { PropType, computed, toRef, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { unit_type } from '../../../../data/unit'
import moment from 'moment'
import { exportUsageReport } from '@/apis/unit'
import { start } from 'repl'
// import { saveToFile } from '@/utils/saveFile';

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true, width: '5%' },
  { label: 'Floor', key: 'floor', sortable: true, width: '10%' },
  { label: 'Unit ', key: 'unit', sortable: true, width: '10%' },
  { label: 'Created At', key: 'createdAt', sortable: false, width: '25%' },
  { label: 'remark', key: 'remark', sortable: false, width: '25%' },
  { label: 'Export', key: 'export', sortable: false, width: '5%' },
  { label: 'Actions', key: 'actions', sortable: false, width: '5%' },
])

const props = defineProps({
  units: {
    type: Array as PropType<unit_type[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<any>, required: true },
  sorting: { type: Object as PropType<any>, required: true },
})

const emit = defineEmits<{
  (event: 'edit-unit', unit: any): void
  (event: 'delete-unit', unit: any): void
  (event: 'fetch-units'): void
}>()

const units = toRef(props, 'units')
const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize))
const pagesOptions = computed(() => {
  const options = []
  for (let i = 1; i <= totalPages.value; i++) {
    options.push(i)
  }
  return options
})

const { confirm } = useModal()

const onUnitDelete = async (unit: any) => {
  const agreed = await confirm({
    title: 'Delete Unit',
    message: `Are you sure you want to delete unit ${unit.unit} on floor ${unit.floor}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-unit', unit)
  }
}

// 每一页的数据处理
const currentPageData = computed(() => {
  let unitsArray: any = []
  if (Array.isArray(units.value)) {
    unitsArray = units.value
  } else if (units.value && typeof units.value === 'object') {
    unitsArray = [units.value]
  }
  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize
  const endIndex = startIndex + props.pagination.pageSize

  if (unitsArray.length <= props.pagination.pageSize) return units.value
  else return unitsArray.slice(startIndex, endIndex)
})

const range = ref<any>({ start: new Date(), end: new Date() })
const showRangePicker = ref<boolean>(false)
const pickingRangeFor = ref<string>('')
const isExportButtonLoading = ref<boolean>(false)

const pickupRange = (id: string) => {
  showRangePicker.value = true
  pickingRangeFor.value = id
}

const doExport = () => {
  isExportButtonLoading.value = true
  exportUsageReport(pickingRangeFor.value, {
    start: range.value['start'],
    end: range.value['end'],
  })
    .then((res) => {
      showRangePicker.value = false
      pickingRangeFor.value = ''
      isExportButtonLoading.value = false

      window.open(res.request.responseURL)
    })
    .catch((err) => {
      showRangePicker.value = false
      pickingRangeFor.value = ''
      isExportButtonLoading.value = false
    })
}

//watch pagination和sorting 变化fetch 数据
watch(
  () => [props.pagination.pageNum, props.pagination.pageSize, props.sorting.sortingOrder, props.sorting.sortBy],
  () => {
    console.log(props.sorting.sortingOrder)
    if (props.pagination.total < props.pagination.pageSize * (props.pagination.pageNum - 1)) {
      props.pagination.pageNum = 1
    }
    emit('fetch-units')
  },
)
//控制气泡下拉框
const showContentUnit = ref<unit_type | null>(null)
const showContent = (rowData: any) => {
  showContentUnit.value = rowData
}
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const dropdowns = document.querySelectorAll('.dropdown-content')
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(target)) {
      showContentUnit.value = null
    }
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <VaDataTable
    :columns="columns"
    :items="currentPageData"
    :loading="$props.loading"
    v-model:sort-by="props.sorting.sortBy"
    v-model:sorting-order="props.sorting.sortingOrder"
  >
    <template #cell(createdAt)="{ rowData }">
      <div class="max-w-[120px]">{{ moment(rowData.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
    </template>
    <template #cell(floor)="{ rowData }">
      <div class="max-w-[120px] ellipsis">{{ rowData.floor }}</div>
    </template>

    <template #cell(unit)="{ rowData }">
      <div class="max-w-[120px] ellipsis">{{ rowData.unit }}</div>
    </template>

    <template #cell(export)="{ rowData }">
      <div class="text-primary" @click="pickupRange(rowData.id)">Export</div>
    </template>

    <template #cell(actions)="{ rowData }" class="overflow-y-scroll max-h[40px]">
      <VaPopover placement="bottom" trigger="click" color=" backgroundSecondary">
        <div
          class="flex items-center justify-center relative hover:bg-slate-100 rounded-[4px]"
          @click.stop="showContent(rowData)"
        >
          <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer"></VaIcon>
        </div>
        <template #body>
          <transition name="fade">
            <div
              v-show="showContentUnit?.id === rowData.id"
              class="tooltip-content flex flex-col justify-center z-999 items-center relative border border-solid border-gray-300 p-2 rounded-md shadow-lg"
            >
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-edit"
                aria-label="Edit unit"
                @click="$emit('edit-unit', rowData as any)"
                class="w-full justify-between"
              >
                <span>Edit</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-delete"
                color="danger"
                aria-label="Delete unit"
                @click="onUnitDelete(rowData)"
                class="w-full"
              >
                <span>Delete</span>
              </VaButton>
            </div>
          </transition>
        </template>
      </VaPopover>
    </template>
  </VaDataTable>

  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>total: {{ $props.pagination.total }} </b>
      pageNum:
      <VaSelect v-model="$props.pagination.pageNum" class="!w-16" selected-top-shown :options="pagesOptions" />
      pageSize:
      <VaSelect v-model="$props.pagination.pageSize" class="!w-20" selected-top-shown :options="[5, 10, 20, 50, 100]" />
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

  <VaModal v-model="showRangePicker" size="small" mobile-fullscreen close-button hide-default-actions>
    <h5 class="va-h6">Pickup Range</h5>
    <div class="w-full flex justify-center">
      <VaDatePicker v-model="range" mode="range" />
    </div>
    <div class="w-full flex justify-end">
      <VaButton preset="primary" @click="doExport" :loading="isExportButtonLoading">Export</VaButton>
    </div>
  </VaModal>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 0 8px;
}

.dropdown-content > * {
  margin-bottom: 0%;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0s;
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
