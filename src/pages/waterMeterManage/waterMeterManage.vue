<script setup lang="ts">
import { ref, reactive, toRaw, watch } from 'vue'
import { useWaterMeters } from './composables/waterMeter'
import { useModal, useToast } from 'vuestic-ui'
import { water_meter_type } from '../../data/water_meter'
import _ from 'lodash'
import waterMeterTable from './widgets/waterMeterTable.vue'
import editWaterMeterForm from './widgets/editWaterMeterForm.vue'

const doShowEditMeterModal = ref(false)
const doShowAddMeterModal = ref(false)

const { isLoading, waterMeters, filters, sorting, pagination, ...meterApi } = useWaterMeters()

const waterMetersShowInTable = ref<water_meter_type[]>([])
const meterToEdit = ref<water_meter_type | null>(null)

const showEditMeterModal = (meter: water_meter_type) => {
  meterToEdit.value = meter
  doShowEditMeterModal.value = true
}

const showAddMeterModal = () => {
  doShowAddMeterModal.value = true
  meterToEdit.value = null
}

const { init: notify } = useToast()

const onMeterDelete = async (meter: any) => {
  await meterApi.remove(meter)
  notify({
    message: `${meter.name} has been deleted`,
    color: 'success',
  })
}

const onSave = (meter: any) => {
  if (meter.id) {
    meterApi.update(meter)
  } else {
    meterApi.add(meter)
  }
  doShowEditMeterModal.value = false
  doShowAddMeterModal.value = false
}

const filterData = (search: any) => {
  const rawMeters = toRaw(waterMeters.value)
  const filteredMeters = rawMeters.filter((item: water_meter_type) => item.name.includes(search))
  waterMetersShowInTable.value = _.cloneDeep(filteredMeters)
}

watch(
  () => filters.value.search,
  (newSearch) => {
    return filterData(newSearch)
  }
)

watch(
  waterMeters,
  () => {
    waterMetersShowInTable.value = _.cloneDeep(toRaw(waterMeters.value))
  },
  { deep: true }
)
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <span>Filter by Name</span>
          <VaInput v-model="filters.search" placeholder="Search">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="xl" />
            </template>
          </VaInput>
        </div>
        <VaButton @click="showAddMeterModal">Add Meter</VaButton>
      </div>

      <waterMeterTable 
      v-model:sort-by="sorting.sortBy"
      v-model:sorting-order="sorting.sortingOrder"
      :pagination="pagination"
      :meters="waterMetersShowInTable" 
      :loading="isLoading" 
      @edit-meter="showEditMeterModal"
      @delete-meter="onMeterDelete" />
    </VaCardContent>
  </VaCard>

  <VaModal v-slot="{ cancel, ok }" v-model="doShowAddMeterModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Add Water Meter</h1>
    <editWaterMeterForm :WaterMeter="meterToEdit" @close="cancel" @save="onSave" />
  </VaModal>
  <VaModal v-slot="{ cancel, ok }" v-model="doShowEditMeterModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Edit Water Meter</h1>
    <editWaterMeterForm :WaterMeter="meterToEdit" @close="cancel" @save="onSave" />
  </VaModal>
</template>
