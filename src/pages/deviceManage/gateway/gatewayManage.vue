<!-- gatewayManage.vue -->
<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount } from 'vue';
import { useGateways } from './composables/gateway';
import { useToast } from 'vuestic-ui';
import { gateway_type } from '../../../data/gateway';
import _ from 'lodash';
import gatewayTable from './widgets/gatewayTable.vue';
import editGatewayForm from './widgets/editGatewayForm.vue';
import draggableDialog from './widgets/draggableDialog.vue';

const doShowAddGatewayModal = ref(false);

const { isLoading, gateways, sorting, pagination, ...gatewayApi } = useGateways();

const gatewaysShowInTable = ref<gateway_type[]>([]);
const gatewayToEdit = ref<gateway_type | null>(null);

const dialogList = ref<{ gateway: gateway_type, visible: boolean }[]>([]);

const showEditGatewayDialog = (gateway: gateway_type) => {
  if (dialogList.value.find((item) => item.gateway.id === gateway.id)) {
    return;
  }
  dialogList.value.push({ gateway, visible: true });
};

const closeEditGatewayDialog = (gateway: gateway_type) => {
  dialogList.value = dialogList.value.filter((item) => item.gateway.id !== gateway.id);
};

const showAddGatewayModal = () => {
  doShowAddGatewayModal.value = true;
  gatewayToEdit.value = null;
};

const { init: notify } = useToast();

const onGatewayDelete = async (gateway: any) => {
  await gatewayApi.remove(gateway.id);
  notify({
    message: `${gateway.name} has been deleted`,
    color: 'success',
  });
};

const fetchGateway = async (fetch: any) => {
  await gatewayApi.fetch({ ...fetch });
  gatewaysShowInTable.value = gateways.value;
};

const onSave = async (gateway: any) => {
  if (gateway.id) {
    await gatewayApi.update(gateway);
  } else {
    await gatewayApi.add(gateway);
  }
  doShowAddGatewayModal.value = false;
  closeEditGatewayDialog(gateway);
};

watch(
  gateways,
  () => {
    gatewaysShowInTable.value = _.cloneDeep(toRaw(gateways.value));
  },
  { deep: true }
);

onBeforeMount(() => {
  fetchGateway({});
});
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start"></div>
        <VaButton @click="showAddGatewayModal">Add Gateway</VaButton>
      </div>

      <gatewayTable :pagination="pagination" :gateways="gatewaysShowInTable" :loading="isLoading" :sorting="sorting"
        @edit-gateway="showEditGatewayDialog" @delete-gateway="onGatewayDelete" @fetch-gateway="fetchGateway" />
    </VaCardContent>
    <div style="z-index: 9999;" v-for="(itemDialog, index) in dialogList" :key="itemDialog.gateway.id">
      <draggableDialog 
        :visible="itemDialog.visible"
        :gateway="itemDialog.gateway"
        :index="index"
        @close="closeEditGatewayDialog(itemDialog.gateway)"
        @save="onSave(itemDialog.gateway)"
      />
    </div>
  </VaCard>

  <VaModal v-model="doShowAddGatewayModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Add Gateway</h1>
    <editGatewayForm v-model="gatewayToEdit" @close="doShowAddGatewayModal = false" @save="onSave(gatewayToEdit)" />
  </VaModal>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
