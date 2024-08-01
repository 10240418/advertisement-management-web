<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaInput v-model="searchValue" placeholder="Search" class="w-full md:w-2/3" @keyup.enter="onSearch(searchValue)" />
        <VaButton @click="showAddResidentModal">Add Resident</VaButton>
      </div>

      <ResidentTable :pagination="pagination" :residents="residentsShowInTable" :loading="isLoading" :sorting="sorting"
        @edit-resident="showEditResidentDialog" @update-resident="onResidentUpdateActive" @fetch-resident="fetchResident" />
    </VaCardContent>
    <VaModal v-model="doShowAddResidentModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Resident</h1>
      <EditResidentForm v-model="residentToEdit" @close="doShowAddResidentModal = false" @save="onSave(residentToEdit)" />
    </VaModal>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount } from 'vue';
import { useResidents } from './composables/resident';
import { useToast } from 'vuestic-ui';
import { resident_user_type } from '@/data/resident_user';
import _ from 'lodash';
import ResidentTable from './widgets/residentTable.vue';
import EditResidentForm from './widgets/editResidentForm.vue';

const { init: notify } = useToast();
const doShowAddResidentModal = ref(false);
const { isLoading, residents, sorting, pagination, ...residentApi } = useResidents();
const residentsShowInTable = ref<resident_user_type[]>([]);
const residentToEdit = ref<resident_user_type | null>(null);

const showEditResidentDialog = (resident: resident_user_type) => {
  const newWindow = window.open(`/residentDetail?id=${resident.id}`, '_blank','width=600,height=400,left=500,top=500,menubar=no,location=no,status=no,titlebar=no,toolbar');
};

const showAddResidentModal = () => {
  doShowAddResidentModal.value = true;
  residentToEdit.value = null;
};

const onResidentUpdateActive = async (resident: any) => {
  await residentApi.updateActive({ id: resident.id, active: !resident.active });
  notify({
    message: `${resident.name} has been deleted`,
    color: 'success',
  });
};

// 搜索居民
const fetchResident = async (fetch: any) => {
  await residentApi.fetch({ ...fetch });
  residentsShowInTable.value = residents.value;
};

const onSave = async (resident: any) => {
  if (resident.id) {
    await residentApi.update(resident);
  } else {
    await residentApi.add(resident);
  }
  doShowAddResidentModal.value = false;
};

const searchValue = ref('');
const onSearch = async (searchValue: any) => {
  const res = await residentApi.searchResident({
    data: { email: localStorage.getItem('AdminEmail'), password: localStorage.getItem('AdminPassword') },
    params: Number(searchValue),
  });
};

watch(
  residents,
  () => {
    residentsShowInTable.value = _.cloneDeep(toRaw(residents.value));
  },
  { deep: true }
);

onBeforeMount(() => {
  fetchResident({});
});
</script>

<style scoped>
.resident-page {
  padding: 16px;
}
</style>
