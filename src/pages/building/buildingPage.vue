<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-end">
        <!-- <VaInput v-model="searchValue" placeholder="Search" class="w-full md:w-2/3" @keyup.enter="onSearch(searchValue)" /> -->
        <VaButton @click="showAddBuildingModal">Add Building</VaButton>
      </div>

      <BuildingTable
        :pagination="pagination"
        :Buildings="BuildingsShowInTable"
        :loading="isLoading"
        :sorting="sorting"
        @detailBuilding="showEditBuildingDialog"
        @updateBuilding="onBuildingUpdateActive"
        @fetchBuilding="fetchBuildings"
        @editBuilding="onBuildingEdit"
      />
    </VaCardContent>
    <VaModal v-model="doShowAddBuildingModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Building</h1>
      <EditBuildingForm :building="BuildingToEdit" @close="doShowAddBuildingModal = false" />
    </VaModal>
    <VaModal v-model="doShowEditBuildingModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Building</h1>
      <EditBuildingForm :building="BuildingToEdit" @close="doShowEditBuildingModal = false" />
    </VaModal>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount } from 'vue'
import { useBuildings } from './composables/buildings'
import _ from 'lodash'
import BuildingTable from './widgets/buildingTable.vue'
import EditBuildingForm from './widgets/editBuildingForm.vue'
import { openWindow } from '@/utils/openWindow'
import { building_type } from '@/data/advertisement/building_type'

const { isLoading, Buildings, sorting, pagination, ...BuildingApi } = useBuildings()
const BuildingsShowInTable = ref<building_type[]>([])
const BuildingToEdit = ref<building_type | null>(null)
const doShowAddBuildingModal = ref(false)
const doShowEditBuildingModal = ref(false)

//add
const showAddBuildingModal = () => {
  doShowAddBuildingModal.value = true
  BuildingToEdit.value = null
}
//detail
const showEditBuildingDialog = (Building: building_type) => {
  openWindow({ path: '/BuildingDetail', query: { id: Building.ID }, width: 900, height: 500 })
}
//edit
const onBuildingEdit = (Building: building_type) => {
  BuildingToEdit.value = Building
  doShowEditBuildingModal.value = true
}
//update
const onBuildingUpdateActive = async (Building: building_type) => {
  console.log(Building)
  // await BuildingApi.updateActive({ id: Building.id, active: !Building.active })
}

// 搜索居民
const fetchBuildings = async () => {
  await BuildingApi.fetch()
}
watch(
  Buildings,
  () => {
    BuildingsShowInTable.value = _.cloneDeep(toRaw(Buildings.value))
  },
  { deep: true },
)
onBeforeMount(() => {
  fetchBuildings()
})
</script>
<style scoped>
.Building-page {
  padding: 16px;
}
</style>
