<template>
  <div class="w-full h-full bg-white flex">  
    <VaCard class="w-full h-full flex">
      <div class="w-full h-full flex flex-col ml-3">
        <!-- Top section -->
        <div class="flex flex-row justify-between">
          <div class="grid grid-cols-[1fr_3fr]" :class="{ 'gap-y-[2.2px]': !editable }">
            <VaListLabel class="flex justify-start">ID</VaListLabel>
            <VaInput v-if="resident" v-model="resident.id" placeholder="ID" class="custom-input" :class="{ 'read-only': !editable }" />
            <VaListLabel class="flex justify-start">Name</VaListLabel>
            <VaInput v-if="resident" v-model="resident.name" placeholder="Name" class="custom-input" :class="{ 'read-only': !editable }" />
            <VaListLabel class="flex justify-start">Email</VaListLabel>
            <VaInput v-if="resident" v-model="resident.email" placeholder="Email" class="custom-input" :class="{ 'read-only': !editable }" />
          </div>
          <div class="flex flex-col justify-between w-[72px] mt-[3px] mr-4">
            <VaButton color="primary" @click="doShowEditResidentModal = true" icon="mso-edit" class="h-[30px] w-[72px]">Edit</VaButton>
            <VaButton color="primary" @click="doShowAddUnitModal = true"  class="h-[30px] w-[72px]">AddUnit</VaButton>
          </div>
        </div>
    
        <!-- Table Section -->
        <VaDataTable
          :items="currentPageData"
          class="mr-3"
          :style="{
            '--va-data-table-height': '320px',
            '--va-data-table-thead-background': 'var(--va-background-element)',
            '--va-data-table-tfoot-background': 'var(--va-background-element)',
            '--va-data-table-thead-color': '#2C82E0',
          }"
          sticky-header
          footer-clone
          sticky-footer
        />
      
        <!-- Dialog Footer -->
        <div class="dialog-footer">
          <VaButton @click="onClose" class="h-[30px] w-[72px] mr-5">Cancel</VaButton>
        </div>
      </div>
    </VaCard>

    <!-- Edit Resident Modal -->
    <VaModal v-model="doShowEditResidentModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Resident</h1>
      <EditResidentForm :resident="residentToEdit" @close="onCloseEditResidentModal" />
    </VaModal>

    <!-- Add Unit Modal -->
    <VaModal v-model="doShowAddUnitModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Unit</h1>
      <addUnitForm :resident="residentToEdit" @close="onCloseAddUnitModal" @fetch="fetch" />
    </VaModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { resident_user_type } from '@/data/resident_user';
import { fetchResident, updateResidentActive } from '../../../../apis/resident';
import EditResidentForm from '../widgets/editResidentForm.vue';
import addUnitForm from '../widgets/addUnitForm.vue';

const route = useRoute();
const residentId = ref(route.query.id);
const resident = ref<resident_user_type | null>(null);
const residentToEdit = ref<resident_user_type | null>(null);
const editable = ref(false);

const fetch = async () => {
  if (residentId.value) {
    try {
      const res = await fetchResident({ id: residentId.value });
      resident.value = res.data.data;
      residentToEdit.value = res.data.data;
    } catch (error) {
      console.error('Error fetching resident:', error);
      resident.value = null;
      residentToEdit.value = null;
    }
  }
};

// units table
const currentPageData = computed(() => {
  let unitsArray: any = [];
  if (Array.isArray(resident.value?.units)) {
    unitsArray = resident.value?.units;
  } else if (resident.value?.units && typeof resident.value?.units === 'object') {
    unitsArray = [resident.value?.units];
  }
  return unitsArray;
});

// Show Edit Resident Modal
const doShowEditResidentModal = ref(false);
const doShowAddUnitModal = ref(false);

const onSave = async (resident: any) => {
  if (resident.id) {
    await updateResidentActive(resident);
    fetch();
  }
  doShowEditResidentModal.value = false;
};

const onClose = () => {
  doShowEditResidentModal.value = false;
};

const onCloseEditResidentModal = () => {
  doShowEditResidentModal.value = false;
};

const onCloseAddUnitModal = () => {
  doShowAddUnitModal.value = false;
};

// Fetch resident data on component mount
onBeforeMount(() => {
  fetch();
});
</script>

<style >
.custom-input {
  --va-input-line-height: 8px;
  --va-input-wrapper-min-height: 20px;
  --va-input-font-stretch: expanded;
  --va-input-letter-spacing: 0.05em;
  --va-input-disabled-opacity: 0.5;
}

.read-only .va-input-wrapper__field {
  --va-form-element-border-width: 0px;
  border-width: 0px;
}

.va-input-wrapper__field {
  padding: 4px 12px;
}

.dialog-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}
</style>
