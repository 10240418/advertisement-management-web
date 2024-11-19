<template>
  <div class="w-full h-full bg-white flex">
    <VaCard class="w-full h-full flex">
      <div class="w-full h-full flex flex-col ml-3">
        <!-- Top section -->
        <div class="flex flex-row justify-between">
          <DetailCard :labels="labelsProp" :datas="datasProp" class="ml-[-14px] mt-[-8px]" />
          <div class="flex flex-col justify-end w-[72px] mt-[3px] mr-4">
            <VaButton
              preset="secondary"
              border-color="primary"
              class="h-[26px] w-[82px]"
              @click="doShowEditAdvertisementModal = true"
            >
              <span class="text-[14px]">Edit</span>
            </VaButton>
          </div>
        </div>

        <!-- Table Section -->
        <VaDataTable
          :items="currentPageData"
          :columns="[
            { key: 'ID', label: 'ID', sortable: true, width: '5%' },
            { key: 'name', label: 'Name', sortable: true, width: '10%' },
            { key: 'address', label: 'Address', sortable: true, width: '10%' },
            { key: 'UpdateAt', label: 'Update Time', sortable: true, width: '10%' },
            { key: 'actions', label: 'Actions', sortable: false, width: '10%' },
          ]"
          class="mr-3 va-data-table"
          :style="{
            '--va-data-table-height': '300px',
            '--va-data-table-thead-background': '#ffffff',
          }"
          sticky-header
        >
          <!-- ID -->
          <template #cell(ID)="{ rowData }">
            <span>{{ rowData.advertisement_id }}</span>
          </template>

          <!-- Name -->
          <template #cell(name)="{ rowData }">
            <span>{{ rowData.Building.name }}</span>
          </template>

          <!-- Address -->
          <template #cell(address)="{ rowData }">
            <span>{{ rowData.Building.address }}</span>
          </template>

          <!-- Update Time -->
          <!-- 换成moment -->
          <template #cell(UpdateAt)="{ rowData }">
            <span>{{ moment(rowData.Building.UpdatedAt).format('YYYY-MM-DD HH:MM') }}</span>
          </template>

          <!-- Actions -->
          <template #cell(actions)="{ rowData }">
            <VaPopover placement="bottom" trigger="click" color="backgroundSecondary">
              <div
                class="flex justify-start items-center relative hover:bg-blue-200 rounded-[4px]"
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
                    <!-- <VaButton
                      preset="secondary"
                      size="small"
                      icon="mso-edit"
                      aria-label="Edit advertisement"
                      class="w-full justify-between"
                      @click="$emit('edit-advertisement', rowData)"
                    >
                      <span>Edit</span>
                    </VaButton> -->

                    <VaButton
                      preset="secondary"
                      size="small"
                      icon="mso-cancel"
                      aria-label="Delete advertisement"
                      class="w-full justify-between"
                      @click="showDeleteModal(rowData)"
                    >
                      <span>Unbind</span>
                    </VaButton>
                  </div>
                </Transition>
              </template>
            </VaPopover>
          </template>
        </VaDataTable>

        <!-- Dialog Footer -->
        <div class="flex flex-row gap-2 justify-end mr-2 mb-3">
          <VaButton color="primary" class="h-[30px] w-[92px]" @click="doShowAddadvertisementModal = true">
            <span class="text-[14px]">Bind New</span>
          </VaButton>
        </div>
      </div>
    </VaCard>

    <!-- Edit Advertisement Modal -->
    <VaModal v-model="doShowEditAdvertisementModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Advertisement</h1>
      <EditAdvertisementForm
        :Advertisement="Advertisement"
        @close="onCloseEditAdvertisementModal"
        @save="onSaveEditadvertisement"
      />
    </VaModal>

    <!-- Add Advertisement Modal -->
    <VaModal v-model="doShowAddadvertisementModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Advertisement</h1>
      <AddAdvertisementForm :advertisement="Advertisement" @close="onCloseAddadvertisementModal" @fetch="fetch" />
    </VaModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AddAdvertisementForm from './addAdvertisementForm.vue'
import EditAdvertisementForm from './editAdvertisemenForm.vue'
import { useToast } from 'vuestic-ui'
import { useModal } from 'vuestic-ui'
import DetailCard from '@/components/cards/DetailCard.vue'
import { Advertisement_type } from '@/data/advertisement/advertisement_type'
import { building_type } from '@/data/advertisement/building_type'
import { removeBuildingsFromAd, getAd } from '@/apis/advertisement/ad_advertisement'
import { updateAd } from '@/apis/advertisement/ad_advertisement'
import moment from 'moment'
const route = useRoute()
const AdvertisementId = ref(route.query.id)
const labelsProp = ref<string[]>(['ID', 'TITLE', 'Status', 'Video Duration', 'Image URL', 'Video URL'])
const datasProp = computed(() => {
  if (Advertisement.value) {
    return [
      Advertisement.value.ID,
      Advertisement.value.title,
      Advertisement.value.status,
      Advertisement.value.video_duration,
      Advertisement.value.image_url,
      Advertisement.value.video_url,
    ]
  }
  return []
})
const Advertisement = ref<Advertisement_type | null>(null)
const buildingToEdit = ref<building_type | null>(null)
const advertisementToEdit = ref<Advertisement_type | null>(null)
const toast = useToast()

const fetch = async () => {
  if (AdvertisementId.value) {
    try {
      const res = await getAd(Number(AdvertisementId.value))
      console.log(res)
      Advertisement.value = res.data
      buildingToEdit.value = res.data
      advertisementToEdit.value = res.data.data
    } catch (error) {
      console.error('Error fetching Advertisement:', error)
      Advertisement.value = null
      buildingToEdit.value = null
    }
  }
}

// 气泡提示框
const showContentAdvertisement = ref<Advertisement_type | null>(null)
const showContent = (rowData: any) => {
  showContentAdvertisement.value = showContentAdvertisement.value?.ID === rowData.ID ? null : rowData
}

// Delete modal
const { confirm } = useModal()
const showDeleteModal = async (rowData: any) => {
  console.log(rowData)
  const agreed = await confirm({
    title: 'Delete Advertisement',
    message: `Are you sure you want to delete ${rowData.title}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    if (Advertisement.value) {
      try {
        await removeBuildingsFromAd(rowData.advertisement_id, [rowData.building_id])
        fetch()
        toast.init({ message: 'Delete successfully', color: 'success' })
      } catch (error: any) {
        toast.init({ message: `Error: ${error.response.error}`, color: 'danger' })
        console.error(error)
      }
    }
  }
}

// Advertisement edit modal
const doShowEditAdvertisementModal = ref(false)
const doShowAddadvertisementModal = ref(false)
const onSaveEditadvertisement = async (advertisement: any) => {
  if (advertisement.ID) {
    try {
      await updateAd(advertisement.ID, advertisement)
      fetch()
      toast.init({ message: 'ReEdit successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    }
  }
  doShowEditAdvertisementModal.value = false
}

const currentPageData = computed(() => {
  let BuildingsArray: building_type[] = []
  if (Array.isArray(buildingToEdit.value?.advertisements_buildings)) {
    BuildingsArray = buildingToEdit.value.advertisements_buildings
  }
  const startIndex = (pagination.value.pageNum - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize
  return BuildingsArray.slice(startIndex, endIndex)
})

const pagination = ref({
  pageNum: 1,
  pageSize: 50,
  total: 0,
})
// const pagesOptions = computed(() => {
//   const totalPages = Math.ceil(pagination.value.total / pagination.value.pageSize)
//   return Array.from({ length: totalPages }, (_, i) => ({ label: String(i + 1), value: i + 1 }))
// })

// Show Edit Advertisement Modal
const onCloseEditAdvertisementModal = () => {
  doShowEditAdvertisementModal.value = false
}

// Show Add Advertisement Modal
const onCloseAddadvertisementModal = () => {
  doShowAddadvertisementModal.value = false
}

// Fetch advertisement data on component mount
onBeforeMount(() => {
  fetch()
})

// Watch pagination and sorting changes
watch(
  () => [pagination.value.pageNum, pagination.value.pageSize],
  () => {
    fetch()
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
