<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaInput v-model="searchValue" placeholder="Search By ID" class="w-full md:w-2/3"
          @keyup.enter="onSearch(searchValue)" />
        <VaButton @click="showAddMeterModal">Add Meter</VaButton>
      </div>

      <meterTable :pagination="pagination" :meters="metersShowInTable" :loading="isLoading" :sorting="sorting"
        @edit-meter="showEditMeterModal" @detail-meter="showEditMeterDialog" @delete-meter="onMeterDelete"
        @fetch-meter="fetchMeter" />
    </VaCardContent>
    <VaModal v-model="doShowAddMeterModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Meter</h1>
      <editMeterForm v-model="meterToEdit" @close="doShowAddMeterModal = false" @save="onSave" />
    </VaModal>
    <VaModal v-model="doShowEditMeterModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Meter</h1>
      <editMeterForm v-model="meterToEdit" @close="doShowEditMeterModal = false" @save="onSave" />
    </VaModal>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount } from 'vue';
import { useMeters } from './composables/meter';
import { useToast ,useModal} from 'vuestic-ui';
import { meter_type } from '../../../data/meter';
import _ from 'lodash';
import meterTable from './widgets/meterTable.vue';
import meterDialog from './widgets/meterDialog.vue';
import editMeterForm from './widgets/editMeterForm.vue';

const { init: notify } = useToast();
const doShowAddMeterModal = ref(false);
const doShowEditMeterModal = ref(false);
const { isLoading, meters, sorting, pagination, ...meterApi } = useMeters();
const metersShowInTable = ref<meter_type[]>([]);
const meterToEdit = ref<meter_type | null>(null);

//打开新的标签页弹窗
const showEditMeterDialog = (meter: meter_type) => {
  const newWindow = window.open(`/meterDetail?id=${meter.id}`, '_blank', 'width=800,height=600,left=500,top=500');
};

//添加弹窗
const showAddMeterModal = () => {
  doShowAddMeterModal.value = true;
  meterToEdit.value = null;
};
const showEditMeterModal = (meter: meter_type) => {
  doShowEditMeterModal.value = true;
  meterToEdit.value = meter;
}
const { confirm } = useModal()
const onMeterDelete = async (meter: meter_type) => {
  const agreed = await confirm({
    title: 'Delete Meter',
    message: `Are you sure you want to delete ${meter.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    await meterApi.remove([meter.id])
  }
}


const fetchMeter = async (fetch: any) => {
  await meterApi.fetch({ ...fetch });
  metersShowInTable.value = meters.value;
};

const onSave = async (newMeter: any) => {
  if (newMeter.id) {
    await meterApi.update(newMeter);
  } else {
    console.log('newMeter', newMeter);
    await meterApi.add(newMeter);
  }
  doShowAddMeterModal.value = false;
};

const searchValue = ref('');
const onSearch = async (searchValue: any) => {
  const res = await meterApi.search({
    id: Number(searchValue),
  });
};

watch(
  meters,
  () => {
    metersShowInTable.value = _.cloneDeep(toRaw(meters.value));
  },
  { deep: true }
);

onBeforeMount(() => {
  fetchMeter({});
});
</script>
