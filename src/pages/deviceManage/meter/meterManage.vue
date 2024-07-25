<script setup lang="ts">
import { ref, toRaw, watch ,onBeforeMount} from 'vue'
import { useMeters } from './composables/meter'
import { useToast } from 'vuestic-ui'
import { meter_type } from '../../../data/meter'
import _ from 'lodash'
import meterTable from './widgets/meterTable.vue'
import editMeterForm from './widgets/editMeterForm.vue'
import draggableDialog from '../../../components/reusableModal/draggableDialog.vue'

const doShowAddMeterModal = ref(false)

const { isLoading, meters, sorting, pagination, ...meterApi } = useMeters()

const metersShowInTable = ref<meter_type[]>([])
const meterToEdit = ref<meter_type | null>(null)

const dialogList = ref<{ meter: meter_type, visible: boolean }[]>([])

const showEditMeterDialog = (meter: meter_type) => {
  if (dialogList.value.find((item) => item.meter.id === meter.id)) {
    return
  }
  dialogList.value.push({ meter, visible: true })
}

const closeEditMeterDialog = (meter: meter_type) => {
  console.log('closeEditMeterDialog')
  console.log(meter)
  dialogList.value = dialogList.value.filter((item) => item.meter.id !== meter.id)
  console.log(dialogList.value)
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

const onSave = async (meter: any) => {
  if (meter.id) {
    await meterApi.update(meter)
  } else {
    await meterApi.add(meter)
  }
  doShowAddMeterModal.value = false
  console.log("onSave")
  console.log(meter)
  closeEditMeterDialog(meter)
}

watch(
  meters,
  () => {
    metersShowInTable.value = _.cloneDeep(toRaw(meters.value))
  },
  { deep: true }
)
onBeforeMount(() => {
  fetchMeter({})
})
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start"></div>
        <VaButton @click="showAddMeterModal">Add Meter</VaButton>
      </div>

      <meterTable :pagination="pagination" :meters="metersShowInTable" :loading="isLoading" :sorting="sorting"
        @edit-meter="showEditMeterDialog" @delete-meter="onMeterDelete" @fetch-meter="fetchMeter" />
    </VaCardContent>
    <div style="z-index: 988;" v-for="(itemDialog, index) in dialogList" :key="itemDialog.meter.id">
    <draggableDialog 
      :visible="true"
      :meter="itemDialog.meter"
      :index="index"
      @close="closeEditMeterDialog(itemDialog.meter)"
      @save="onSave(itemDialog.meter)"
    />
  </div>
  </VaCard>

  <VaModal v-model="doShowAddMeterModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Add Meter</h1>
    <editMeterForm v-model="meterToEdit" @close="doShowAddMeterModal = false" @save="onSave(meterToEdit)" />
  </VaModal>


</template>

<style scoped>


</style>

