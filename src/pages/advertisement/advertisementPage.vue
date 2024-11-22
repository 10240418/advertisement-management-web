<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-end">
        <!-- <VaInput v-model="searchValue" placeholder="Search" class="w-full md:w-2/3" @keyup.enter="onSearch(searchValue)" /> -->
        <VaButton @click="showAddAdvertisementModal">Add Advertisement</VaButton>
      </div>

      <AdvertisementTable
        :pagination="pagination"
        :Advertisements="AdvertisementsShowInTable"
        :loading="isLoading"
        :sorting="sorting"
        @detailAdvertisement="showEditAdvertisementDialog"
        @updateAdvertisement="onAdvertisementUpdateActive"
        @fetchAdvertisement="fetchAdvertisements"
        @editAdvertisement="onAdvertisementEdit"
        @deleteAdvertisement="onAdvertisementDelete"
      />
    </VaCardContent>
    <VaModal v-model="doShowAddAdvertisementModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Advertisement</h1>
      <EditAdvertisementForm :Advertisement="AdvertisementToEdit" @close="doShowAddAdvertisementModal = false" />
    </VaModal>
    <VaModal v-model="doShowEditAdvertisementModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Advertisement</h1>
      <EditAdvertisementForm :Advertisement="AdvertisementToEdit" @close="doShowEditAdvertisementModal = false" />
    </VaModal>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount } from 'vue'
import { useAdvertisements } from './composables/advertisement'
import _ from 'lodash'
import AdvertisementTable from './widgets/advertisementTable.vue'
import EditAdvertisementForm from './widgets/editAdvertisemenForm.vue'
import { openWindow } from '@/utils/openWindow'
import { Advertisement_type } from '@/data/advertisement/advertisement_type'

const { isLoading, Advertisements, sorting, pagination, ...AdvertisementApi } = useAdvertisements()
const AdvertisementsShowInTable = ref<Advertisement_type[]>([])
const AdvertisementToEdit = ref<Advertisement_type | null>(null)
const doShowAddAdvertisementModal = ref(false)
const doShowEditAdvertisementModal = ref(false)

//add
const showAddAdvertisementModal = () => {
  doShowAddAdvertisementModal.value = true
  AdvertisementToEdit.value = null
}
//detail
const showEditAdvertisementDialog = (Advertisement: Advertisement_type) => {
  openWindow({ path: '/AdvertisementDetail', query: { id: Advertisement.ID }, width: 900, height: 500 })
}
//edit
const onAdvertisementEdit = (Advertisement: Advertisement_type) => {
  AdvertisementToEdit.value = Advertisement
  doShowEditAdvertisementModal.value = true
}
//update
const onAdvertisementUpdateActive = async (Advertisement: Advertisement_type) => {
  console.log(Advertisement)
  // await AdvertisementApi.updateActive({ id: Advertisement.id, active: !Advertisement.active })
}
//delete
const onAdvertisementDelete = async (Advertisement: Advertisement_type) => {
  console.log(Advertisement)
  await AdvertisementApi.remove(Advertisement.ID).then(() => {
    fetchAdvertisements()
  })
}
// 搜索居民
const fetchAdvertisements = async () => {
  await AdvertisementApi.fetch()
}
watch(
  Advertisements,
  () => {
    AdvertisementsShowInTable.value = _.cloneDeep(toRaw(Advertisements.value))
  },
  { deep: true },
)
onBeforeMount(() => {
  fetchAdvertisements()
})
</script>
<style scoped>
.Advertisement-page {
  padding: 16px;
}
</style>
