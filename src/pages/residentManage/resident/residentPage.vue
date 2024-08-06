<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-end">
        <!-- <VaInput v-model="searchValue" placeholder="Search" class="w-full md:w-2/3" @keyup.enter="onSearch(searchValue)" /> -->
        <VaButton @click="showAddResidentModal">Add Resident</VaButton>
      </div>

      <ResidentTable :pagination="pagination" :residents="residentsShowInTable" :loading="isLoading" :sorting="sorting"
        @detail-resident="showEditResidentDialog" @update-resident="onResidentUpdateActive"
        @fetch-resident="fetchResidents" @edit-resident="onResidentEdit" />
    </VaCardContent>
    <VaModal v-model="doShowAddResidentModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Resident</h1>
      <EditResidentForm :resident="residentToEdit" @close="doShowAddResidentModal = false"
        />
    </VaModal>
    <VaModal v-model="doShowEditResidentModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Resident</h1>
      <EditResidentForm :resident="residentToEdit" @close="doShowEditResidentModal = false"
         />
    </VaModal>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount, toRef } from 'vue';
import { useResidents } from './composables/resident';
import { useToast } from 'vuestic-ui';
import { resident_user_type } from '@/data/resident_user';
import _ from 'lodash';
import ResidentTable from './widgets/residentTable.vue';
import EditResidentForm from './widgets/editResidentForm.vue';

const { init: notify } = useToast();
const { isLoading, residents, sorting, pagination, ...residentApi } = useResidents();
const residentsShowInTable = ref<resident_user_type[]>([]);
const residentToEdit = ref<resident_user_type | null>(null);
const doShowAddResidentModal = ref(false);
const doShowEditResidentModal = ref(false);
//add
const showAddResidentModal = () => {
  doShowAddResidentModal.value = true;
  residentToEdit.value = null;
};
//... 下拉气泡框 

//detail 
const newWindow =ref<any>()
const showEditResidentDialog = (resident: resident_user_type) => {
  const newWindow = window.open(`/residentDetail?id=${resident.id}`, '_blank', 'width=900,height=500,left=500,top=500,menubar=no,location=no,status=no,titlebar=no,toolbar');
};
//edit
const onResidentEdit = (resident: resident_user_type) => {
  residentToEdit.value = resident;
  doShowEditResidentModal.value = true;
  
};
//update
const onResidentUpdateActive = async (resident: any) => {
  await residentApi.updateActive({ id: resident.id, active: !resident.active });
};

// 搜索居民
const fetchResidents = async () => {
  await residentApi.fetch();
};




watch(
  residents,
  () => {
    residentsShowInTable.value = _.cloneDeep(toRaw(residents.value));
  },
  { deep: true }
);

onBeforeMount(() => {
  fetchResidents();
});
</script>

<style scoped>
.resident-page {
  padding: 16px;
}
</style>
