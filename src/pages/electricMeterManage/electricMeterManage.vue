<script setup lang="ts">
import { ref, reactive, toRaw, watch } from 'vue'
import { useElectricMeters } from './composables/electricMeter'
import { useModal, useToast } from 'vuestic-ui'
import { eletric_energy_meter_type } from '../../data/electric_energy_meter'
import _ from 'lodash'
import electricMeterTable from './widgets/electricMeterTable.vue'
import editElectricMeterForm from './widgets/editElectricMeterForm.vue'


const doShowEditMeterModal = ref(false)
const doShowAddMeterModal = ref(false)

const { isLoading, electricMeters, filters, sorting, pagination, ...meterApi } = useElectricMeters()

const electricMetersShowInTable = ref<eletric_energy_meter_type[]>([])
const meterToEdit = ref<eletric_energy_meter_type | null>(null)

const showEditMeterModal = (meter: eletric_energy_meter_type) => {
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

// 根据名字过滤
const filterData = (search: any) => {
  // 重新获取深拷贝，确保筛选前的数据是最新的
  const rawMeters = toRaw(electricMeters.value)
  const filteredMeters = rawMeters.filter((item: eletric_energy_meter_type) => item.name.includes(search))
  electricMetersShowInTable.value = _.cloneDeep(filteredMeters)
}

watch(
  () => filters.value.search,
  (newSearch) => {
    return filterData(newSearch)
  }
)

// 初始时填充数据
watch(
  electricMeters,
  () => {
    electricMetersShowInTable.value = _.cloneDeep(toRaw(electricMeters.value))
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

      <electricMeterTable 
      v-model:sort-by="sorting.sortBy"
      v-model:sorting-order="sorting.sortingOrder"
      :pagination="pagination"
      :meters="electricMetersShowInTable" 
      :loading="isLoading" 
      @edit-meter="showEditMeterModal"
      @delete-meter="onMeterDelete" />
    </VaCardContent>
  </VaCard>

  <VaModal v-slot="{ cancel, ok }" v-model="doShowAddMeterModal" size="small" mobile-fullscreen close-button
    hide-default-actions>
    <h1 class="va-h5">Add Electric Meter</h1>
    <editElectricMeterForm :ElectricMeter="meterToEdit" @close="cancel" @save="onSave" />
  </VaModal>
  <VaModal v-slot="{ cancel, ok }" v-model="doShowEditMeterModal" size="small" mobile-fullscreen close-button
    hide-default-actions>
    <h1 class="va-h5">Edit Electric Meter</h1>
    <editElectricMeterForm :ElectricMeter="meterToEdit" @close="cancel" @save="onSave" />
  </VaModal>
</template>
