<template>
  <VaCard>
    <div class="w-full h-full flex flex-col ml-1">
      <!-- top part -->
      <div class="flex flex-row justify-between gap-0">
        <DetailCard :labels="labelsProp" :datas="datasProp" />
        <div class="flex flex-col justify-end mr-4">
          <VaButton preset="secondary" border-color="primary" class="h-[26px] w-[82px]" @click="showEditGatewayModal">
            <span class="text-[14px]">Edit</span>
          </VaButton>
        </div>
      </div>

      <!-- table part -->
      <VaDataTable
        :items="meters"
        :columns="[
          { label: 'ID', key: 'id', width: '5%' },
          { label: 'Name', key: 'name', width: '20%' },
          { label: 'Type', key: 'type', width: '5%' },
          { label: 'ModbusAddr', key: 'modbusAddr', width: '15%' },
          { label: 'UnitId', key: 'unitId', width: '5%' },
          { label: 'Remark', key: 'remark', width: '30%' },
          { label: 'Actions', key: 'actions', width: '5%' },
        ]"
        class="mr-3 va-data-table"
        :style="{
          '--va-data-table-height': '280px',
          '--va-data-table-thead-background': '#ffffff',
        }"
        sticky-header
      >
        <template #cell(type)="{ rowData }">
          <span v-if="rowData.type === 0">WaterMeter</span>
          <span v-else>ElectricMeter</span>
        </template>
        <template #cell(actions)="{ rowData }">
          <VaPopover placement="bottom" trigger="click" color="backgroundSecondary">
            <div
              class="flex justify-start items-center relative hover:bg-blue-200 rounded-[4px]"
              @click.stop="showContent(rowData)"
            >
              <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" />
            </div>
            <template #body>
              <Transition name="fade">
                <div
                  v-show="showContentMeter?.id === rowData.id"
                  class="tooltip-content flex flex-col justify-center z-999 items-center relative border p-1 rounded-md"
                >
                  <VaButton
                    preset="secondary"
                    size="small"
                    icon="mso-edit"
                    aria-label="Edit Resident"
                    class="w-full justify-between"
                    @click="showEidtModal(rowData)"
                  >
                    <span>编辑单位</span>
                  </VaButton>
                  <VaButton
                    preset="secondary"
                    size="small"
                    icon="mso-not_started"
                    aria-label="Update Resident"
                    class="w-full justify-between"
                    @click="operateMeterStatus(MeterOperationType.WaterMeterValveOn)"
                  >
                    <span>设为使用</span>
                  </VaButton>
                  <VaButton
                    preset="secondary"
                    size="small"
                    icon="mso-cancel"
                    aria-label="Update Resident"
                    class="w-full justify-between"
                    @click="operateMeterStatus(MeterOperationType.WaterMeterValveOff)"
                  >
                    <span>设为闲置</span>
                  </VaButton>
                </div>
              </Transition>
            </template>
          </VaPopover>
        </template>
      </VaDataTable>
      <div class="dialog-footer flex flex-row gap-2 justify-end items-center mr-4">
        <!-- <VaButton @click="showEditGatewayModal">Edit</VaButton> -->
        <VaButton class="h-[26px] w-[82px]" @click="pingGatewayByID"><span class="text-[12px]]">Ping</span></VaButton>
      </div>

      <!-- edit modal -->
      <VaModal v-model="showEditModal" size="small" mobile-fullscreen close-button hide-default-actions>
        <h1>Edit Meter</h1>
        <EditMeterForm
          :model-value="showContentMeter"
          @update:modelValue="updateMeterData"
          @save="saveMeter"
          @close="closeEditModal"
        />
      </VaModal>
      <!-- Edit Gateway Modal -->
      <VaModal v-model="isShowEditGatewayModal" size="small" mobile-fullscreen close-button hide-default-actions>
        <h1>Edit Gateway</h1>
        <EditGatewayForm
          :model-value="gatewayToEdit"
          @update:modelValue="updateGatewayData"
          @save="saveGateway"
          @close="closeEditGatewayModal"
        />
      </VaModal>
    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { gateway_type } from '../../../../data/gateway'
import { useRoute } from 'vue-router'
import { useToast } from 'vuestic-ui'
import { getGateway, pingGateway, updateGateway } from '../../../../apis/gateway'
import EditMeterForm from '@/pages/deviceManage/meter/widgets/EditMeterForm.vue'
import EditGatewayForm from '@/pages/deviceManage/gateway/widgets/EditGatewayForm.vue'
import { updateMeter, operateMeter } from '../../../../apis/meter'
import { meter_type } from '../../../../data/meter'
import { MeterOperationType } from '../../../../data/api_field_type/api_field_type'
import DetailCard from '@/components/cards/DetailCard.vue'

// State and Reactive Properties
const gateway = ref<gateway_type | null>(null)
const labelsProp = ref<string[]>(['ID', 'Name', 'IPAddr', 'Remark', 'CreatedAt'])
const datasProp = computed(() => {
  return [
    gateway.value?.id,
    gateway.value?.name,
    gateway.value?.ipAddr,
    gateway.value?.remark,
    gateway.value?.createdAt,
  ]
})
const route = useRoute()
const gatewayId = ref(route.query.id)
const toast = useToast()
const meters = ref<any[]>([])
const showContentMeter = ref<meter_type | null>(null)
const showEditModal = ref(false)
const unitEditMeter = ref<meter_type>()

// Lifecycle Hooks
onBeforeMount(() => {
  fetchGateway()
})

// Methods
const fetchGateway = async () => {
  if (gatewayId.value) {
    try {
      const res = await getGateway({ params: gatewayId.value })
      gateway.value = res.data.data
      meters.value = res.data.data.meters
    } catch (error: any) {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    }
  }
}

//控制气泡弹窗框的显示
const showContent = (rowData: any) => {
  showContentMeter.value = rowData
}
//操作开关表
const operateMeterStatus = async (query: number) => {
  try {
    await operateMeter({ id: Number(showContentMeter.value?.id), body: { type: query } })
    toast.init({ message: 'operate successfully', color: 'success' })
  } catch (error: any) {
    toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
    console.error(error)
    return
  }
}

//编辑Meter
const updateMeterData = (newMeter: meter_type) => {
  unitEditMeter.value = newMeter
}
const showEidtModal = (rowData: any) => {
  showEditModal.value = true
  unitEditMeter.value = rowData
}
const saveMeter = async (updatedMeter: any) => {
  try {
    await updateMeter({ id: Number(showContentMeter.value?.id), ...updatedMeter })
    toast.init({ message: 'Edit Meter successfully', color: 'success' })
  } catch (error: any) {
    toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
    console.error(error)
    return
  }
  await fetchGateway() // Refresh data
  closeEditModal()
}

const closeEditModal = () => {
  showEditModal.value = false
}

//pingGateway
const pingGatewayByID = async () => {
  try {
    await pingGateway({ id: Number(gatewayId.value) })
    toast.init({ message: 'ping successfully', color: 'success' })
  } catch (error: any) {
    toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
    console.error(error)
    return
  }
}

// State and Reactive Properties
const gatewayToEdit = ref<gateway_type | null>(null)
const isShowEditGatewayModal = ref(false)

// Methods
const showEditGatewayModal = () => {
  gatewayToEdit.value = gateway.value
  console.log(gatewayToEdit.value)
  isShowEditGatewayModal.value = true
}

const updateGatewayData = (updatedGateway: gateway_type) => {
  gatewayToEdit.value = updatedGateway
}

const saveGateway = async (updatedGateway: gateway_type) => {
  try {
    console.log(updatedGateway)
    await updateGateway({ ...updatedGateway })
    toast.init({ message: 'Edit Gateway successfully', color: 'success' })
  } catch (error: any) {
    toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
    console.error(error)
  }
  closeEditGatewayModal()
}

const closeEditGatewayModal = () => {
  isShowEditGatewayModal.value = false
}
</script>

<style lang="scss" scoped>
.va-data-table__table-tr {
  border-bottom: 1px solid var(--va-background-border);
}

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

.tooltip-content {
  position: relative;
  border: 1px solid #d1d5db;
  padding: 6px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tooltip-content::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent #d1d5db transparent;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 7px;
  border-style: solid;
  border-color: transparent transparent white transparent;
}
.va-button {
  min-height: 30px;
}
</style>
<!-- gatewayDialog.vue -->
