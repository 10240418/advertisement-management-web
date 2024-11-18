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
              @click="doShowEditbuildingModal = true"
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
            { key: 'title', label: 'Title', sortable: true, width: '10%' },
            { key: 'status', label: 'Status', sortable: true, width: '10%' },
            { key: 'video_duration', label: 'Duration', sortable: true, width: '5%' },
            { key: 'image_url', label: 'Image URL', sortable: true, width: '20%' },
            { key: 'video_url', label: 'Video URL', sortable: true, width: '20%' },
            { key: 'actions', label: 'Actions', sortable: false, width: '10%' },
          ]"
          class="mr-3 va-data-table"
          :style="{
            '--va-data-table-height': '360px',
            '--va-data-table-thead-background': '#ffffff',
          }"
          sticky-header
        >
          <!-- ID -->
          <template #cell(ID)="{ rowData }">
            <span>{{ rowData.advertisement_id }}</span>
          </template>
          <!-- title -->
          <template #cell(title)="{ rowData }">
            <span>{{ rowData.Advertisement.title }}</span>
          </template>
          <!-- status -->
          <template #cell(status)="{ rowData }">
            <span>{{ rowData.Advertisement.status }}</span>
          </template>
          <!-- video_duration -->
          <template #cell(video_duration)="{ rowData }">
            <span>{{ rowData.Advertisement.video_duration }}</span>
          </template>
          <!-- image_url -->
          <template #cell(image_url)="{ rowData }">
            <div class="tooltip-container">
              <span class="url-span">
                {{ rowData.Advertisement.image_url }}
              </span>
              <span class="tooltip-text">
                {{ rowData.Advertisement.image_url }}
              </span>
            </div>
          </template>
          <!-- video_url -->
          <template #cell(video_url)="{ rowData }">
            <div class="tooltip-container">
              <span class="url-span">
                {{ rowData.Advertisement.video_url }}
              </span>
              <span class="tooltip-text">
                {{ rowData.Advertisement.video_url }}
              </span>
            </div>
          </template>
          <!-- actions -->
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
                    v-show="showContentbuilding?.ID === rowData.ID"
                    class="tooltip-content flex flex-col justify-center z-999 items-center relative border p-1 rounded-md"
                  >
                    <!-- <VaButton
                      preset="secondary"
                      size="small"
                      icon="mso-edit"
                      aria-label="Edit building"
                      class="w-full justify-between"
                      @click="showEidtModal(rowData)"
                    >
                      <span>编辑单位</span>
                    </VaButton> -->
                    <VaButton
                      preset="secondary"
                      size="small"
                      icon="mso-not_started"
                      aria-label="Update building"
                      class="w-full justify-between"
                      @click="showUpdateStatusModal(rowData, 'active')"
                    >
                      <span>设为使用</span>
                    </VaButton>
                    <VaButton
                      preset="secondary"
                      size="small"
                      icon="mso-cancel"
                      aria-label="Update building"
                      class="w-full justify-between"
                      @click="showUpdateStatusModal(rowData, 'inactive')"
                    >
                      <span>设为闲置</span>
                    </VaButton>
                    <VaButton
                      preset="secondary"
                      size="small"
                      icon="mso-info"
                      aria-label="Info building"
                      class="w-full justify-between"
                      @click="showDeleteModal(rowData)"
                    >
                      <span>删除关联</span>
                    </VaButton>
                  </div>
                </Transition>
              </template>
            </VaPopover>
          </template>
        </VaDataTable>

        <!-- Dialog Footer -->
        <div class="flex flex-row gap-2 justify-end mr-2 mb-3">
          <VaButton color="primary" class="h-[30px] w-[92px]" @click="doShowAddadvertisementModal = true"
            ><span class="text-[14px]">Bind New</span></VaButton
          >
        </div>
      </div>
    </VaCard>

    <!-- Edit building Modal -->
    <VaModal v-model="doShowEditbuildingModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit building</h1>
      <EditbuildingForm :building="buildingToEdit" @close="onCloseEditbuildingModal" />
    </VaModal>

    <!-- Add advertisement Modal -->
    <VaModal v-model="doShowAddadvertisementModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add advertisement</h1>
      <AddadvertisementForm :building="buildingToEdit" @close="onCloseAddadvertisementModal" @fetch="fetch" />
    </VaModal>

    <!-- Edit advertisement Modal -->
    <VaModal v-model="doShowEditadvertisementModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit advertisement</h1>
      <EditadvertisementForm
        v-model="advertisementToEdit"
        @close="doShowEditadvertisementModal = false"
        @save="onSaveEditadvertisement"
      />
    </VaModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import EditbuildingForm from './editBuildingForm.vue'
import AddadvertisementForm from './addBuildingForm.vue'
import { useToast } from 'vuestic-ui'
import { useModal } from 'vuestic-ui'
import DetailCard from '@/components/cards/DetailCard.vue'
import { building_type } from '@/data/advertisement/building_type'
import { advertisement_type } from '@/data/advertisement/advertisement_type'
import { removeAdsFromBuilding, getBuildingDetail } from '@/apis/advertisement/ad_building'
import { updateAd } from '@/apis/advertisement/ad_advertisement'

const route = useRoute()
const buildingId = ref(route.query.id)
const labelsProp = ref<string[]>(['ID', 'NAME', 'Address'])
const datasProp = computed(() => {
  if (building.value) {
    return [building.value.ID, building.value.name, building.value.address]
  }
  return []
})
const building = ref<building_type | null>(null)
const buildingToEdit = ref<building_type | null>(null)
const toast = useToast()

const fetch = async () => {
  if (buildingId.value) {
    try {
      const res = await getBuildingDetail(Number(buildingId.value))
      building.value = res.data
      buildingToEdit.value = res.data
    } catch (error) {
      console.error('Error fetching building:', error)
      building.value = null
      buildingToEdit.value = null
    }
  }
}
//气泡提示框
const showContentbuilding = ref<building_type | null>(null)
const showContent = (rowData: any) => {
  showContentbuilding.value = rowData
}
//delete modal
const { confirm } = useModal()
const showDeleteModal = async (rowData: any) => {
  console.log(rowData)
  const agreed = await confirm({
    title: 'Delete advertisement',
    message: `Are you sure you want to delete ${rowData.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    if (building.value) {
      try {
        await removeAdsFromBuilding(rowData.building_id, [rowData.advertisement_id])
        fetch()
        toast.init({ message: 'Delete successfully', color: 'success' })
      } catch (error: any) {
        toast.init({ message: `Error: ${error.response.error}`, color: 'danger' })
        console.error(error)
      }
    }
  }
}

// update status
const showUpdateStatusModal = async (rowData: any, status: string) => {
  console.log(rowData, status)
  const agreed = await confirm({
    title: 'Update status',
    message: `Are you sure you want to update status to ${status}?`,
    okText: 'Update',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    if (rowData) {
      try {
        await updateAd(rowData.advertisement_id, { status: status })
        fetch()
        toast.init({ message: 'Update successfully', color: 'success' })
      } catch (error: any) {
        toast.init({ message: `Error: ${error.response.error}`, color: 'danger' })
        console.error(error)
      }
    }
  }
}

//advertisement edit modal
const doShowEditadvertisementModal = ref(false)
const advertisementToEdit = ref<advertisement_type | null>(null)
const onSaveEditadvertisement = async (advertisement: any) => {
  if (advertisement.id) {
    try {
      await updateAd(advertisement.id, {})
      fetch()
      toast.init({ message: 'ReEdit successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    }
  }
  doShowEditadvertisementModal.value = false
}
// const showEidtModal = (rowData: any) => {
//   advertisementToEdit.value = rowData
//   doShowEditadvertisementModal.value = true
// }

// Advertisements table
const currentPageData = computed(() => {
  let AdvertisementsArray: any = []
  if (Array.isArray(building.value?.advertisements_buildings)) {
    AdvertisementsArray = building.value?.advertisements_buildings
  } else if (building.value?.advertisements_buildings && typeof building.value?.advertisements_buildings === 'object') {
    AdvertisementsArray = [building.value?.advertisements_buildings]
  }
  return AdvertisementsArray
})

// Show Edit building Modal
const doShowEditbuildingModal = ref(false)
const doShowAddadvertisementModal = ref(false)

const onCloseEditbuildingModal = () => {
  doShowEditbuildingModal.value = false
}

const onCloseAddadvertisementModal = () => {
  doShowAddadvertisementModal.value = false
}

// Fetch building data on component mount
onBeforeMount(() => {
  fetch()
})
</script>

<style lang="scss" scoped>
.url-span {
  position: relative;
  width: 120px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.tooltip-container {
  position: relative;
  display: inline-block;
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
