<script setup lang="ts">
import { ref } from 'vue'
import { advertisement_type } from '../../data/advertisement/advertisement_type'
import AdvertisementTable from './widgets/advertisementTable.vue'
import EditAdvertisementForm from './widgets/editAdvertisementForm.vue'

const doShowEditAdvertisementModal = ref(false)
const doShowAddAdvertisementModal = ref(false)

const advertisementToEdit = ref<advertisement_type | null>(null)

const showEditAdvertisementModal = (advertisement: advertisement_type) => {
  advertisementToEdit.value = advertisement
  doShowEditAdvertisementModal.value = true
}

const showAddAdvertisementModal = () => {
  doShowAddAdvertisementModal.value = true
  advertisementToEdit.value = null
}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start"></div>
        <VaButton @click="showAddAdvertisementModal">Add Advertisement</VaButton>
      </div>

      <AdvertisementTable @editAdvertisement="showEditAdvertisementModal" />
    </VaCardContent>
  </VaCard>

  <VaModal v-model="doShowAddAdvertisementModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Add Advertisement</h1>
    <EditAdvertisementForm v-model="advertisementToEdit" @close="doShowAddAdvertisementModal = false" />
  </VaModal>

  <VaModal v-model="doShowEditAdvertisementModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Edit Advertisement</h1>
    <EditAdvertisementForm v-model="advertisementToEdit" @close="doShowEditAdvertisementModal = false" />
  </VaModal>
</template>

<style scoped>
.span-filter {
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
</style>
