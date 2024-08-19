<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaInput
          v-model="searchValue"
          placeholder="Search"
          class="w-full md:w-2/3"
          @keyup.enter="onSearch(searchValue)"
        />
        <VaButton @click="showAddGatewayModal">Add Gateway</VaButton>
      </div>

      <GatewayTable
        :pagination="pagination"
        :gateways="gatewaysShowInTable"
        :loading="isLoading"
        :sorting="sorting"
        @editGateway="showEditGatewayModal"
        @detailGateway="showEditGatewayDialog"
        @deleteGateway="onGatewayDelete"
        @fetchGateway="fetchGateway"
      />
    </VaCardContent>
    <VaModal v-model="doShowAddGatewayModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Add Gateway</h1>
      <EditGatewayForm v-model="gatewayToEdit" @close="doShowAddGatewayModal = false" @save="onSave(gatewayToEdit)" />
    </VaModal>
    <VaModal v-model="doShowEditGatewayModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Gateway</h1>
      <EditGatewayForm v-model="gatewayToEdit" @close="doShowEditGatewayModal = false" @save="onSave(gatewayToEdit)" />
    </VaModal>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, onBeforeMount } from 'vue'
import { useGateways } from './composables/gateway'
import { useToast } from 'vuestic-ui'
import { gateway_type } from '../../../data/gateway'
import _ from 'lodash'
import gatewayTable from './widgets/gatewayTable.vue'
import editGatewayForm from './widgets/editGatewayForm.vue'
import { openWindow } from '@/utils/openWindow'

const { init: notify } = useToast()
const doShowAddGatewayModal = ref(false)
const doShowEditGatewayModal = ref(false)
const { isLoading, gateways, sorting, pagination, ...gatewayApi } = useGateways()
const gatewaysShowInTable = ref<gateway_type[]>([])
const gatewayToEdit = ref<gateway_type | null>(null)

const showEditGatewayDialog = (gateway: gateway_type) => {
  openWindow({ path: '/gatewayDetail', query: { id: gateway.id }, width: 900 })
}

const showAddGatewayModal = () => {
  doShowAddGatewayModal.value = true
  gatewayToEdit.value = null
}
const showEditGatewayModal = (newGateway: any) => {
  doShowEditGatewayModal.value = true
  console.log(newGateway)
  gatewayToEdit.value = newGateway
}

const onGatewayDelete = async (gateway: any) => {
  await gatewayApi.remove([gateway.id])
}

//搜索网关
const fetchGateway = async (fetch: any) => {
  await gatewayApi.fetch({ ...fetch })
  gatewaysShowInTable.value = gateways.value
}

const onSave = async (gateway: any) => {
  if (gateway.id) {
    await gatewayApi.update(gateway)
    doShowEditGatewayModal.value = false
  } else {
    await gatewayApi.add(gateway)
    doShowAddGatewayModal.value = false
  }
}

const searchValue = ref('')
const onSearch = async (searchValue: any) => {
  const res = await gatewayApi.searchGateway({
    data: { email: localStorage.getItem('AdminEmail'), password: localStorage.getItem('AdminPassword') },
    params: Number(searchValue),
  })
}

watch(
  gateways,
  () => {
    gatewaysShowInTable.value = _.cloneDeep(toRaw(gateways.value))
  },
  { deep: true },
)

onBeforeMount(() => {
  fetchGateway({})
})
</script>

<!-- gatewayPage.vue -->
