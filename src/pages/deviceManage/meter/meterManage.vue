<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'
import { useMeters } from './composables/meter'
import { useToast } from 'vuestic-ui'
import { meter_type } from '../../../data/meter'
import _ from 'lodash'
import meterTable from './widgets/meterTable.vue'
import editMeterForm from './widgets/editMeterForm.vue'

const doShowEditMeterModal = ref(false)
const doShowAddMeterModal = ref(false)

const { isLoading, meters, sorting, pagination, ...meterApi } = useMeters()

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

const fetchMeter = async (fetch: any) => {
  await meterApi.fetch({ ...fetch })
  metersShowInTable.value = meters.value
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

// 每当 meters 的值改变的时候就深拷贝一次
watch(
  meters,
  () => {
    metersShowInTable.value = _.cloneDeep(toRaw(meters.value))
  },
  { deep: true }
)
// console.log(useMeters().meters.value) // 输出 meter

</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start"></div>
        <VaButton @click="showAddMeterModal">Add Meter</VaButton>
      </div>

      <meterTable 
        :pagination="pagination" 
        :meters="metersShowInTable" 
        :loading="isLoading" 
        :sorting="sorting"
        @edit-meter="showEditMeterModal"
        @delete-meter="onMeterDelete"
        @fetch-meter="fetchMeter" />
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
</template>
