<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'
import { useUnits } from './composables/unit'
import { useToast } from 'vuestic-ui'
import { unit_type } from '../../../data/unit'
import _ from 'lodash'
import UnitsTable from './widgets/UnitsTable.vue'
import EditUnitForm from './widgets/EditUnitForm.vue'
import { openWindow } from '@/utils/openWindow'

const doShowEditUnitModal = ref(false)
const doShowAddUnitModal = ref(false)
const { isLoading, units, sorting, pagination, ...unitApi } = useUnits()
const unitsShowInTable = ref<unit_type[]>([])
const unitToEdit = ref<unit_type | null>(null)

//编辑或者是新增
const showEditUnitModal = (unit: unit_type) => {
  unitToEdit.value = unit
  doShowEditUnitModal.value = true
}

//新增Modal
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
//watch监听units
const fetchUnits = async () => {
  await unitApi.fetch()
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

watch(
  units,
  () => {
    unitsShowInTable.value = _.cloneDeep(toRaw(units.value))
  },
  { deep: true },
)
//detail
const showEditUnitDialog = (unit: unit_type) => {
  openWindow({ path: '/unitDetail', query: { id: unit.id }, width: 900, height: 500 })
}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start"></div>
        <VaButton @click="showAddUnitModal">Add Unit</VaButton>
      </div>

      <UnitsTable
        :pagination="pagination"
        :sorting="sorting"
        :units="unitsShowInTable"
        :loading="isLoading"
        @editUnit="showEditUnitModal"
        @deleteUnit="onUnitDelete"
        @fetchUnits="fetchUnits"
        @detailUnit="showEditUnitDialog"
      />
    </VaCardContent>
  </VaCard>

  <VaModal
    v-model="doShowAddUnitModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
  >
    <h1 class="va-h5">Add Unit</h1>
    <EditUnitForm
      v-model="unitToEdit"
      @close="doShowAddUnitModal = false"
      @save="onSave(unitToEdit)"
    />
  </VaModal>
  <VaModal
    v-model="doShowEditUnitModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
  >
    <h1 class="va-h5">Edit Unit</h1>
    <EditUnitForm
      v-model="unitToEdit"
      @close="doShowEditUnitModal = false"
      @save="onSave"
    />
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
