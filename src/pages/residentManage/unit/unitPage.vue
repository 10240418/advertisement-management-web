<script setup lang="ts">
import { ref, reactive, toRaw, watch } from 'vue'
import { useUnits } from './composables/unit'
import { useModal, useToast } from 'vuestic-ui'
import { unit_type } from '../../../data/unit'
import _ from 'lodash'
import unitsTable from './widgets/unitsTable.vue'
import editUnitForm from './widgets/editUnitForm.vue'

const doShowEditUnitModal = ref(false)
const doShowAddUnitModal = ref(false)

const { isLoading, units, sorting, pagination, ...unitApi } = useUnits()

const unitsShowInTable = ref<unit_type[]>([])
const unitToEdit = ref<unit_type | null>(null)

const showEditUnitModal = (unit: unit_type) => {
  unitToEdit.value = unit
  doShowEditUnitModal.value = true
}

const showAddUnitModal = () => {
  doShowAddUnitModal.value = true
  unitToEdit.value = null
}

const { init: notify } = useToast()

const onUnitDelete = async (unit: any) => {
  await unitApi.remove([unit.id])
  notify({
    message: `Unit ${unit.unit} has been deleted`,
    color: 'success',
  })
}

const fetchUnits = async (params: any) => {
  console.log(sorting.value.sortingOrder)
  await unitApi.fetch()
  // unitsShowInTable.value = units.value
}

const onSave = (unit: any) => {
  if (unit.id) {
    unitApi.update(unit)
  } else {
    unitApi.add(unit)
  }
  doShowEditUnitModal.value = false
  doShowAddUnitModal.value = false
}

const filterData = (search: any) => {
  const rawUnits = toRaw(units.value)
  const filteredUnits = rawUnits.filter((item: unit_type) => item.unit.includes(search))
  unitsShowInTable.value = _.cloneDeep(filteredUnits)
}

watch(
  units,
  () => {
    unitsShowInTable.value = _.cloneDeep(toRaw(units.value))
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
        <VaButton @click="showAddUnitModal">Add Unit</VaButton>
      </div>

      <unitsTable 
        :pagination="pagination" :sorting="sorting" :units="unitsShowInTable" :loading="isLoading" @edit-unit="showEditUnitModal"
        @delete-unit="onUnitDelete"
        @fetch-units="fetchUnits" />
    </VaCardContent>
  </VaCard>

  <VaModal v-model="doShowAddUnitModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Add Unit</h1>
    <editUnitForm v-model="unitToEdit" @close="doShowAddUnitModal = false" @save="onSave(unitToEdit)" />
  </VaModal>
  <VaModal v-model="doShowEditUnitModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Edit Unit</h1>
    <editUnitForm v-model="unitToEdit" @close="doShowEditUnitModal = false" @save="onSave" />
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
