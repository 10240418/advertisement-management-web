<!-- pages/gatewayPage.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { useGateways } from '../gateway/composables/gateway';
import EditGatewayForm from '../gateway/widgets/editGatewayForm.vue';
import GatewayTable from '../gateway/widgets/gatewayTable.vue';
import { gateway_type } from '../../../data/gateway';

const {
  isLoading,
  pagination,
  sorting,
  filters,
  gateways,
  fetch,
  add,
  update,
  remove,
} = useGateways();

const showEditGatewayForm = ref(false);
const editingGateway = ref<gateway_type | null>(null);

const openEditForm = (gateway:any) => {
  editingGateway.value = gateway;
  showEditGatewayForm.value = true;
};

const closeEditForm = () => {
  showEditGatewayForm.value = false;
  editingGateway.value = null;
};

const saveGateway = async (gateway:gateway_type) => {
  if (gateway.id) {
    await update(gateway);
  } else {
    await add(gateway);
  }
  closeEditForm();
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end">
      <VaButton @click="openEditForm(null)">Add New Gateway</VaButton>
    </div>

    <GatewayTable
      :gateways="gateways"
      :loading="isLoading"
      :pagination="pagination"
      :sortBy="sorting.sortBy"
      :sortingOrder="sorting.sortingOrder"
      @edit-gateway="openEditForm"
      @delete-gateway="remove"
    />

    <VaModal v-model:show="showEditGatewayForm">
      <EditGatewayForm :gateway="editingGateway" @close="closeEditForm" @save="saveGateway" />
    </VaModal>
  </div>
</template>
