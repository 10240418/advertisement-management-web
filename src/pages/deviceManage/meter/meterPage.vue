<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaInput v-model="searchValue" placeholder="Search" class="w-full md:w-2/3" @keyup.enter="onSearch(searchValue)" />
        <VaButton @click="showAddMeterModal">Add Meter</VaButton>
      </div>

      <meterTable :pagination="pagination" :meters="metersShowInTable" :loading="isLoading" :sorting="sorting"
        @edit-meter="showEditMeterDialog" @delete-meter="onMeterDelete" @fetch-meter="fetchMeter" />
    </VaCardContent>
    <VaModal v-model="doShowAddMeterModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Meter</h1>
      <meterDialog v-model="meterToEdit" @close="doShowAddMeterModal = false" @save="onSave(meterToEdit)" />
    </VaModal>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount } from 'vue';
import { useMeters } from './composables/meter';
import { useToast } from 'vuestic-ui';
import { meter_type } from '../../../data/meter';
import _ from 'lodash';
import meterTable from './widgets/meterTable.vue';
import meterDialog from './widgets/meterDialog.vue';

const { init: notify } = useToast();
const doShowAddMeterModal = ref(false);
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
const onMeterDelete = async (meter: any) => {
  await meterApi.remove([meter.id]);
  notify({
    message: `${meter.name} has been deleted`,
    color: 'success',
  });
};

const fetchMeter = async (fetch: any) => {
  await meterApi.fetch({ ...fetch });
  metersShowInTable.value = meters.value;
};

const onSave = async (meter: any) => {
  if (meter.id) {
    await meterApi.update(meter);
  } else {
    await meterApi.add(meter);
  }
  doShowAddMeterModal.value = false;
};

const searchValue = ref('');
const onSearch = async (searchValue: any) => {
  const res = await meterApi.search({
    id:Number(searchValue) ,
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
