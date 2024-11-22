<template>
  <VaDataTable
    v-model:sort-by="sorting.sortBy"
    v-model:sorting-order="sorting.sortingOrder"
    :columns="columns"
    :items="currentPageData"
    :loading="isLoading"
  >
    <template #cell(detail)="{ rowData }">
      <VaButton
        preset="secondary"
        size="small"
        icon="mso-info"
        aria-label="Info advertisement"
        class="w-full justify-between ml-[-5px]"
        @click="$emit('detail-advertisement', rowData as any)"
      >
        <span>Detail</span>
      </VaButton>
    </template>

    <!-- title -->
    <template #cell(title)="{ rowData }">
      <div class="tooltip-container">
        <span class="url-span">
          {{ rowData.title }}
        </span>
        <span class="tooltip-text">
          {{ rowData.title }}
        </span>
      </div>
    </template>
    <!-- description -->
    <template #cell(description)="{ rowData }">
      <div class="tooltip-container">
        <span class="url-span">
          {{ rowData.description }}
        </span>
        <span class="tooltip-text">
          {{ rowData.description }}
        </span>
      </div>
    </template>

    <!-- image_url -->
    <template #cell(image_url)="{ rowData }">
      <div class="tooltip-container">
        <span class="url-span">
          {{ rowData.image_url }}
        </span>
        <span class="tooltip-text">
          {{ rowData.image_url }}
        </span>
      </div>
    </template>

    <template #cell(video_url)="{ rowData }">
      <div class="tooltip-container">
        <span class="url-span">
          {{ rowData.video_url }}
        </span>
        <span class="tooltip-text">
          {{ rowData.video_url }}
        </span>
      </div>
    </template>

    <template #cell(actions)="{ rowData }">
      <VaPopover placement="bottom" trigger="click" color="backgroundSecondary" class="flex flex-row">
        <div
          class="flex justify-center items-center relative hover:bg-blue-200 rounded-[4px]"
          @click.stop="showContent(rowData)"
        >
          <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" />
        </div>
        <template #body>
          <Transition name="fade">
            <div
              v-show="showContentAdvertisement?.ID === rowData.ID"
              class="tooltip-content flex flex-col justify-center z-999 items-center relative border p-1 rounded-md"
            >
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-edit"
                aria-label="Edit advertisement"
                class="w-full justify-between"
                @click="$emit('edit-advertisement', rowData as any)"
              >
                <span>Edit</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-cancel"
                aria-label="Set Inactive advertisement"
                class="w-full justify-between"
                @click="onadvertisementUpdate(rowData, 'inactive')"
              >
                <span>Set Inactive</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="update"
                aria-label="Set Active advertisement"
                class="w-full justify-between"
                @click="onadvertisementUpdate(rowData, 'active')"
              >
                <span>Set Active</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="mso-delete"
                color="danger"
                aria-label="Delete advertisement"
                class="w-full justify-between"
                @click="$emit('delete-advertisement', rowData as any)"
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
      <b>Total: {{ pagination.total }} </b>
      Page:
      <VaSelect v-model="pagination.pageNum" class="!w-16" :options="pagesOptions" />
      Page Size:
      <VaSelect v-model="pagination.pageSize" class="!w-20" :options="[5, 10, 20, 50, 100]" />
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
import { Advertisement_type } from '@/data/advertisement/advertisement_type'
import { useAdvertisements } from '@/pages/advertisement/composables/advertisement'
import { updateAd } from '@/apis/advertisement/ad_advertisement'
import { useToast } from 'vuestic-ui'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'ID', sortable: true, width: '5%' },
  { label: 'Title', key: 'title', sortable: false, width: '20%' },
  { label: 'Description', key: 'description', sortable: false, width: '20%' },
  { label: 'Image URL', key: 'image_url', sortable: false, width: '20%' },
  { label: 'Video URL', key: 'video_url', sortable: false, width: '20%' },
  { label: 'Active', key: 'status', sortable: false, width: '5%' },
  { label: 'Detail', key: 'detail', sortable: false, width: '5%' },
  { label: 'Actions', key: 'actions', sortable: false, width: '5%' },
])

const { isLoading, Advertisements, sorting, pagination, ...advertisementApi } = useAdvertisements()
defineEmits<{
  (event: 'detail-advertisement', advertisement: any): void
  (event: 'update-advertisement', advertisement: any): void
  (event: 'fetch-advertisement'): void
  (event: 'edit-advertisement', advertisement: any): void
  (event: 'delete-advertisement', advertisement: any): void
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
const toast = useToast()
const onadvertisementUpdate = async (advertisement: any, status: string) => {
  const agreed = await confirm({
    title: 'Set Active',
    message: `Are you sure you want to set to ${status} ?`,
    okText: 'Confirm',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    try {
      await updateAd(advertisement.ID, { status: status })
      advertisementApi.fetch()
      toast.init({ message: 'Advertisement updated successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: error.message, color: 'danger' })
    }
  }
}

const currentPageData = computed(() => {
  let advertisementsArray: any = []
  if (Array.isArray(Advertisements.value)) {
    advertisementsArray = Advertisements.value
  } else if (Advertisements.value && typeof Advertisements.value === 'object') {
    advertisementsArray = [Advertisements.value]
  }
  const startIndex = (pagination.value.pageNum - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize
  if (advertisementsArray.length <= pagination.value.pageSize) return Advertisements.value
  else return advertisementsArray.slice(startIndex, endIndex)
})

const showContentAdvertisement = ref<Advertisement_type | null>(null)
const showContent = (rowData: any) => {
  showContentAdvertisement.value = rowData
}

watch(
  () => [pagination.value.pageNum, pagination.value.pageSize, sorting.value.sortingOrder, sorting.value.sortBy],
  () => {
    if (pagination.value.total < pagination.value.pageSize * (pagination.value.pageNum - 1)) {
      pagination.value.pageNum = 1
    }
    advertisementApi.fetch()
  },
)
</script>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}

.va-data-table__table-td {
  border-bottom: 1px solid var(--va-background-border);
}

.tooltip-container {
  position: relative;
  display: inline-block;
}

.url-span {
  position: relative;
  width: 140px; /* 设置最大宽度为140px */
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.tooltip-text {
  visibility: hidden;
  width: max-content;
  max-width: 300px; /* 根据需要调整最大宽度 */
  background-color: #ffffff;
  color: #000;
  text-align: left;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  bottom: -100%; /* 根据需要调整位置 */
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  white-space: normal;
}

.tooltip-container:hover ::v-deep .tooltip-text {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s;
}

.tooltip-container::v-deep .tooltip-text {
  opacity: 0;
  transition: opacity 0.3s;
}

/* 箭头 */
.tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%; /* 在tooltip下方 */
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #ccc transparent transparent transparent;
}

.tooltip-text::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #ffffff transparent transparent transparent;
}
</style>
