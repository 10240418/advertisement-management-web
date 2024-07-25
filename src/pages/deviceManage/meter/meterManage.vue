<script setup lang="ts">
import { ref, reactive, toRaw, watch } from 'vue'
import { useMeters } from './composables/meter'
import { useModal, useToast } from 'vuestic-ui'
import { meter_type } from '../../../data/meter'
import _ from 'lodash'
import meterTable from './widgets/meterTable.vue'
import editMeterForm from './widgets/editMeterForm.vue'
import draggableDialog from '../../../../src/components/reusableModal/draggableDialog.vue'

const doShowEditMeterModal = ref(false)
const doShowAddMeterModal = ref(false)

const { isLoading, meters,  sorting, pagination, ...meterApi } = useMeters()

const metersShowInTable = ref<meter_type[]>([])
const meterToEdit = ref<meter_type | null>(null)

const showEditMeterModal = (meter: meter_type) => {
  meterToEdit.value = meter
  doShowEditMeterModal.value = true
}

const showAddMeterModal = () => {
  doShowAddMeterModal.value = true
  meterToEdit.value = null
}

const { init: notify } = useToast()

const onMeterDelete = async (meter: any) => {
  await meterApi.remove([meter.id])
  notify({
    message: `${meter.name} has been deleted`,
    color: 'success',
  })
} 
const fetchMeterByPa = async (pagination: any) => {
  await meterApi.fetch(pagination)
  metersShowInTable.value  = meters.value
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

watch(
  meters,
  () => {
    metersShowInTable.value = _.cloneDeep(toRaw(meters.value))
  },
  { deep: true }
)

</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
        </div>
        <VaButton @click="showAddMeterModal">Add Meter</VaButton>
      </div>

      <meterTable 
        :pagination="pagination" :meters="metersShowInTable" :loading="isLoading" @edit-meter="showEditMeterModal"
        @delete-meter="onMeterDelete"
        @fetch-meter="fetchMeterByPa" />
    </VaCardContent>
  </VaCard>

  <VaModal v-model="doShowAddMeterModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Add Meter</h1>
    <editMeterForm v-model="meterToEdit" @close="doShowAddMeterModal = false" @save="onSave(meterToEdit)" />
  </VaModal>
  <VaModal v-model="doShowEditMeterModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Edit Meter</h1>
    <editMeterForm v-model="meterToEdit" @close="doShowEditMeterModal = false" @save="onSave" />
  </VaModal>
  <!-- <draggableDialog></draggableDialog> -->
</template>


