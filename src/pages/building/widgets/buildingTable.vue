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

    <template #cell(address)="{ rowData }">
      <div class="max-w-[120px] ellipsis">{{ rowData.address }}</div>
    </template>

    <template #cell(blg_id)="{ rowData }">
      <div class="max-w-[120px] ellipsis">{{ rowData.blg_id }}</div>
    </template>

    <template #cell(detail)="{ rowData }">
      <VaButton
        preset="secondary"
        size="small"
        icon="mso-info"
        aria-label="Info building"
        class="w-full justify-between ml-[-5px]"
        @click="$emit('detail-building', rowData as any)"
      >
        <span>Detail</span>
      </VaButton>
    </template>

    <template #cell(actions)="{ rowData }">
      <VaPopover placement="bottom" trigger="click" color="backgroundSecondary" class="flex felx-row">
        <div
          class="flex justify-center items-center relative hover:bg-blue-200 rounded-[4px]"
          @click.stop="showContent(rowData)"
        >
          <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" />
        </div>
        <template #body>
          <Transition name="fade">
            <div
              v-show="showContentbuilding?.ID === rowData.ID"
              class="tooltip-content flex flex-col justify-center z-999 items-center relative border p-1 rounded-md"
            >
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-edit"
                aria-label="Edit building"
                class="w-full justify-between"
                @click="$emit('edit-building', rowData as any)"
              >
                <span>Edit</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-delete"
                color="danger"
                aria-label="Delete building"
                class="w-full justify-between"
                @click="onbuildingDelete(rowData)"
              >
                <span>delete</span>
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
import { defineVaDataTableColumns, useModal, VaPopover, VaButton, VaIcon, VaSelect, VaPagination } from 'vuestic-ui'
import { computed, ref, watch } from 'vue'
import { building_type } from '@/data/advertisement/building_type'
import { useBuildings } from '@/pages/building/composables/buildings'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'ID', sortable: true, width: '5%' },
  { label: 'Name', key: 'name', sortable: false, width: '20%' },
  { label: 'Address', key: 'address', sortable: false, width: '20%' },
  { label: 'BuildingID', key: 'blg_id', sortable: false, width: '10%' },
  { label: 'Detail', key: 'detail', sortable: false, width: '5%' },
  { label: 'Actions', key: 'actions', sortable: false, width: '5%' },
])
const { isLoading, buildings, sorting, pagination, ...buildingApi } = useBuildings()

const emit = defineEmits<{
  (event: 'detail-building', building: any): void
  (event: 'fetch-building'): void
  (event: 'edit-building', building: any): void
  (event: 'delete-building', building: any): void
}>()
const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.pageSize))
const pagesOptions = computed(() => {
  const options = []
  for (let i = 1; i <= totalPages.value; i++) {
    options.push(i)
  }
  return options
})

const { confirm } = useModal()

const onbuildingDelete = async (building: any) => {
  const agreed = await confirm({
    title: 'Delete',
    message: `Are you sure you want to delete ${building.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-building', building)
  }
}

const currentPageData = computed(() => {
  let buildingsArray: any = []
  if (Array.isArray(buildings.value)) {
    buildingsArray = buildings.value
  } else if (buildings.value && typeof buildings.value === 'object') {
    buildingsArray = [buildings.value]
  }
  const startIndex = (pagination.value.pageNum - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize
  if (buildingsArray.length <= pagination.value.pageSize) return buildings.value
  else return buildingsArray.slice(startIndex, endIndex)
})
const showContentbuilding = ref<building_type | null>(null)
const showContent = (rowData: any) => {
  showContentbuilding.value = rowData
}

watch(
  () => [pagination.value.pageNum, pagination.value.pageSize, sorting.value.sortingOrder, sorting.value.sortBy],
  () => {
    if (pagination.value.total < pagination.value.pageSize * (pagination.value.pageNum - 1)) {
      pagination.value.pageNum = 1
    }
    buildingApi.fetch()
  },
)
</script>

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
