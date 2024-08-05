<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-end">
        <!-- <VaInput v-model="searchValue" placeholder="Search" class="w-full md:w-2/3" @keyup.enter="onSearch(searchValue)" /> -->
        <VaButton @click="showAddResidentModal">Add Resident</VaButton>
      </div>

      <ResidentTable :pagination="pagination" :residents="residentsShowInTable" :loading="isLoading" :sorting="sorting"
        @edit-resident="showEditResidentDialog" @update-resident="onResidentUpdateActive" @fetch-resident="fetchResidents" />
    </VaCardContent>
    <VaModal v-model="doShowAddResidentModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Resident</h1>
      <EditResidentForm :resident="residentToEdit" @close="doShowAddResidentModal = false" @save="onSave(residentToEdit)" />
    </VaModal>
    <VaModal v-model="doShowEditResidentModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Resident</h1>
      <EditResidentForm  :resident="residentToEdit" @close="doShowAddResidentModal = false" @save="onSave(residentToEdit)" />
    </VaModal>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount ,toRef} from 'vue';
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
  const newWindow = window.open(`/residentDetail?id=${resident.id}`, '_blank','width=800,height=400,left=500,top=500,menubar=no,location=no,status=no,titlebar=no,toolbar');
};

const showAddResidentModal = () => {
  doShowAddResidentModal.value = true;
  residentToEdit.value = null;
};
const doShowEditResidentModal = ref(false);
// 创建一个新的 BroadcastChannel 实例
const bc = new BroadcastChannel('resident-dialog');

// 监听收到的消息
bc.onmessage = (event) => {
  console.log('Received message:', event.data);
  if (event.data.type === 'edit') {
    // 处理接收到的数据
    console.log('Editing data:', event.data.data);
    residentToEdit.value =toRef(event.data.data) ;
    console.log(residentToEdit.value)
    doShowEditResidentModal.value = true;
  }
};



const onResidentUpdateActive = async (resident: any) => {
  await residentApi.updateActive({ id: resident.id, active: !resident.active });
  notify({
    message: `${resident.name} has been deleted`,
    color: 'success',
  });
};

// 搜索居民
const fetchResidents = async () => {
  await residentApi.fetch();
};

const onSave = async (resident: any) => {
  if (resident.id) {
    await residentApi.update(resident);
  } else {
    await residentApi.add(resident);
  }
  doShowAddResidentModal.value = false;
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
