<script setup lang="ts">
import { defineVaDataTableColumns, useModal, VaPopover, VaButton, VaIcon, VaChip, VaSelect, VaPagination, VaInput } from 'vuestic-ui'
import { PropType, computed, toRef, ref, watch } from 'vue'
import { resident_user_type } from '@/data/resident_user'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true, width: '5%' },
  { label: 'Name', key: 'name', sortable: false, width: '20%' },
  { label: 'Email', key: 'email', sortable: false, width: '35%' },
  { label: 'Active', key: 'active', sortable: false, width: '10%' },
  { label: 'Detail', key: 'detail', sortable: false, width: '5%' },
  { label: 'Actions', key: 'actions', sortable: false, width: '5%' },
])

const props = defineProps({
  residents: { type: Array as PropType<resident_user_type[]>, required: true },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<any>, required: true },
  sorting: { type: Object as PropType<any>, required: true },
})

const emit = defineEmits<{
  (event: 'detail-resident', resident: any): void
  (event: 'update-resident', resident: any): void
  (event: 'fetch-resident'): void
  (event: 'edit-resident', resident: any): void
}>()

const residents = toRef(props, 'residents')
const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize))
const pagesOptions = computed(() => {
  const options = []
  for (let i = 1; i <= totalPages.value; i++) {
    options.push(i)
  }
  return options
})

const { confirm } = useModal()

const onResidentUpdate = async (resident: any) => {
  const temp = resident.active ? 'forbidden' : 'apply'
  const agreed = await confirm({
    title: 'Set Active',
    message: `Are you sure you want to ${temp} ${resident.name}?`,
    okText: temp,
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('update-resident', resident)
  }
}


const currentPageData = computed(() => {
  let residentsArray: any = []
  if (Array.isArray(residents.value)) {
    residentsArray = residents.value
  } else if (residents.value && typeof residents.value === 'object') {
    residentsArray = [residents.value]
  }
  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize
  const endIndex = startIndex + props.pagination.pageSize
  if (residentsArray.length <= props.pagination.pageSize) return residents.value
  else return residentsArray.slice(startIndex, endIndex)
})
const showContentResident = ref<resident_user_type | null>(null)
const showContent = (rowData: any) => {
  showContentResident.value = rowData
}

watch(
  () => [props.pagination.pageNum, props.pagination.pageSize, props.sorting.sortingOrder, props.sorting.sortBy],
  () => {
    console.log(props.sorting.sortingOrder)
    if (props.pagination.total < props.pagination.pageSize * (props.pagination.pageNum - 1)) {
      props.pagination.pageNum = 1
    }
    (emit('fetch-resident'))
  }
)
</script>

<template>
  <VaDataTable :columns="columns" :items="currentPageData" :loading="props.loading"
    v-model:sort-by="props.sorting.sortBy" v-model:sorting-order="props.sorting.sortingOrder">
    <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">{{ rowData.name }}</div>
    </template>

    <template #cell(email)="{ rowData }">
      <div class="ellipsis max-w-[120px]">{{ rowData.email }}</div>
    </template>

    <template #cell(unity_id)="{ rowData }">
      <div class="ellipsis max-w-[120px]">{{ rowData.unity_id }}</div>
    </template>

    <template #cell(active)="{ rowData }">

      <VaBadge :text="rowData.active ? 'Yes' : 'No'" :color="rowData.active ? 'success' : 'secondary' "/>
    </template>

    <template #cell(detail)="{ rowData }" >
      <VaButton preset="secondary" size="small" icon="mso-info" aria-label="Info Resident"
        @click="$emit('detail-resident', rowData as any)" class="w-full justify-between ml-[-5px]">
        <span>Detail</span>
      </VaButton>
    </template>

    <template #cell(actions)="{ rowData }" class="flex felx-row">
      <VaPopover placement="bottom" trigger="click" color="backgroundSecondary">
        <div class="flex justify-center items-center relative hover:bg-blue-200 rounded-[4px]"
          @click.stop="showContent(rowData)">
          <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" />
        </div>
        <template #body>
          <transition name="fade">
            <div v-show="showContentResident?.id === rowData.id"
              class="tooltip-content flex flex-col justify-center z-999 items-center relative border  p-1 rounded-md">
              <VaButton preset="secondary" size="small" icon="mso-edit" aria-label="Edit Resident"
                @click="$emit('edit-resident', rowData as any)" class="w-full justify-between">
                <span>Edit</span>
              </VaButton>
              <VaButton preset="secondary" size="small" icon="update" aria-label="Update Resident"
                @click="onResidentUpdate(rowData)" class="w-full justify-between">
                <span>Update</span>
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
      <VaButton preset="secondary" icon="va-arrow-left" aria-label="Previous page"
        :disabled="props.pagination.pageNum === 1" @click="props.pagination.pageNum--" />
      <VaButton class="mr-2" preset="secondary" icon="va-arrow-right" aria-label="Next page"
        :disabled="props.pagination.pageNum === totalPages" @click="props.pagination.pageNum++" />
      <VaPagination v-model="props.pagination.pageNum" buttons-preset="secondary" :pages="totalPages" :visible-pages="5"
        :boundary-links="false" :direction-links="false" />
    </div>
  </div>
</template>

<style lang="scss">

.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}

.va-data-table__table-td {
  border-bottom: 1px solid var(--va-background-border);
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
