<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaInput v-model="searchValue" placeholder="Search" class="w-full md:w-2/3" @keyup.enter="onSearch(searchValue)" />
        <VaButton @click="showAddGatewayModal">Add Gateway</VaButton>
      </div>

      <gatewayTable :pagination="pagination" :gateways="gatewaysShowInTable" :loading="isLoading" :sorting="sorting"
        @edit-gateway="showEditGatewayDialog" @delete-gateway="onGatewayDelete" @fetch-gateway="fetchGateway" />
    </VaCardContent>
    <VaModal v-model="doShowAddGatewayModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Gateway</h1>
      <editGatewayForm v-model="gatewayToEdit" @close="doShowAddGatewayModal = false" @save="onSave(gatewayToEdit)" />
    </VaModal>
    <VaModal v-model="doShowEditGatewayModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Gateway</h1>
      <editGatewayForm v-model="gatewayToEdit" @close="doShowAddGatewayModal = false" @save="onSave(gatewayToEdit)" />
    </VaModal>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount } from 'vue';
import { useGateways } from './composables/gateway';
import { useToast } from 'vuestic-ui';
import { gateway_type } from '../../../data/gateway';
import _ from 'lodash';
import gatewayTable from './widgets/gatewayTable.vue';
import editGatewayForm from './widgets/editGatewayForm.vue';


const { init: notify } = useToast();
const doShowAddGatewayModal = ref(false);
const { isLoading, gateways, sorting, pagination, ...gatewayApi } = useGateways();
const gatewaysShowInTable = ref<gateway_type[]>([]);
const gatewayToEdit = ref<gateway_type | null>(null);

const showEditGatewayDialog = (gateway: gateway_type) => {
  const newWindow = window.open(`/gatewayDetail?id=${gateway.id}`, '_blank', 'width=900,height=600,left=500,top=500');
};

const showAddGatewayModal = () => {
  doShowAddGatewayModal.value = true;
  gatewayToEdit.value = null;
};


const onGatewayDelete = async (gateway: any) => {
  await gatewayApi.remove([gateway.id]);
  notify({
    message: `${gateway.name} has been deleted`,
    color: 'success',
  });
};


//搜索网关
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
};

const searchValue = ref('');
const onSearch = async (searchValue: any) => {
  const res = await gatewayApi.searchGateway({
    data:{email:localStorage.getItem('AdminEmail'),password:localStorage.getItem('AdminPassword')},
    params: Number(searchValue),
  });
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


<!-- gatewayPage.vue -->