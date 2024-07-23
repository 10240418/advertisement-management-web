<script setup lang="ts">
import { ref, reactive, toRaw, watch } from 'vue'
import {  useResidentUsers } from './composables/resident'
import { useModal, useToast } from 'vuestic-ui'
import { resident_user_type } from '../../data/resident_user'
import _ from 'lodash'
import residentTable from './widgets/residentUserTable.vue'
import editResidentForm from './widgets/editResidentForm.vue'

const doShowEditResidentModal = ref(false)
const doShowAddResidentModal = ref(false)

const { isLoading, residentUsers, filters, sorting, pagination, ...residentApi } =  useResidentUsers()

const residentUsersShowInTable = ref<resident_user_type[]>([])
const residentToEdit = ref<resident_user_type | null>(null)

const showEditResidentModal = (resident: resident_user_type) => {
  residentToEdit.value = resident
  doShowEditResidentModal.value = true
}

const showAddResidentModal = () => {
  doShowAddResidentModal.value = true
  residentToEdit.value = null
}

const { init: notify } = useToast()

const onResidentDelete = async (resident: any) => {
  await residentApi.remove(resident)
  notify({
    message: `${resident.name} has been deleted`,
    color: 'success',
  })
}

const onSave = (resident: any) => {
  if (resident.id) {
    residentApi.update(resident)
  } else {
    residentApi.add(resident)
  }
  doShowEditResidentModal.value = false
  doShowAddResidentModal.value = false
}

const filterData = (search: any) => {
  const rawResidents = toRaw(residentUsers.value)
  const filteredResidents = rawResidents.filter((item: resident_user_type) => item.name.includes(search))
  residentUsersShowInTable.value = _.cloneDeep(filteredResidents)
}

watch(
  () => filters.value.search,
  (newSearch) => filterData(newSearch)
)

watch(
  residentUsers,
  () => {
    residentUsersShowInTable.value = _.cloneDeep(toRaw(residentUsers.value))
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
        <VaButton @click="showAddResidentModal">Add Resident</VaButton>
      </div>

      <residentTable 
      v-model:sort-by="sorting.sortBy"
      v-model:sorting-order="sorting.sortingOrder"
      :pagination="pagination"
      :residentUsers="residentUsersShowInTable" 
      :loading="isLoading" 
      @edit-resident="showEditResidentModal"
      @delete-resident="onResidentDelete" />
    </VaCardContent>
  </VaCard>

  <VaModal v-slot="{ cancel, ok }" v-model="doShowAddResidentModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Add Resident</h1>
    <editResidentForm :ResidentUsers="residentToEdit" @close="cancel" @save="onSave" />
  </VaModal>
  <VaModal v-slot="{ cancel, ok }" v-model="doShowEditResidentModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Edit Resident</h1>
    <editResidentForm :ResidentUsers="residentToEdit" @close="cancel" @save="onSave" />
  </VaModal>
</template>
