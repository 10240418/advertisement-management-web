<template>
  <VaCard>
    <div class="w-full h-full flex flex-col mt-[-10px]">
      <!-- Top part with Unit details -->
      <div class="flex flex-row justify-between">
        <DetailCard
          :labels="labelsProp"
          :datas="datasProp"
        />
        <div class="flex flex-col justify-end items-end mt-[0px] mr-4">
          <VaButton
            preset="secondary"
            border-color="primary"
            class="h-[24px] w-[82px]"
            @click="doShowEditUnitModal = true"
          >
            Edit
          </VaButton>
        </div>
      </div>

      <!-- Meters Table -->
      <VaDataTable
        :items="unitMeters"
        :columns="[
          { label: 'ID', key: 'id', width: '5%' },
          { label: 'Name', key: 'name', width: '15%' },
          { label: 'Type', key: 'type', width: '10%' },
          { label: 'ModbusAddr', key: 'modbusAddr', width: '5%' },
          { label: 'Remark', key: 'remark', width: '15%' },
          { label: 'Created At', key: 'createdAt', width: '15%' },
          { label: 'Actions', key: 'actions', width: '5%' },
        ]"
        class="mr-3 va-data-table"
        :style="{
          '--va-data-table-height': '140px',
          '--va-data-table-thead-background': '#ffffff',
        }"
        sticky-header
      >
        <template #cell(name)="{ rowData }">
          <div class="flex truncate">{{ rowData.name }}</div>
        </template>
        <template #cell(type)="{ rowData }">
          <div v-if="rowData.type === 0">WaterMeter</div>
          <div v-else-if="rowData.type === 1">PowerMeter</div>
        </template>

        <template #cell(createdAt)="{ rowData }">
          {{ moment(rowData.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>

        <template #cell(actions)="{ rowData }">
          <VaPopover
            placement="bottom"
            trigger="click"
            color="backgroundSecondary"
          >
            <div
              class="flex justify-center items-center relative hover:bg-blue-200 rounded-[4px]"
              @click.stop="showContentMeter(rowData)"
            >
              <VaIcon
                name="more_horiz"
                size="20px"
                class="mr-2 cursor-pointer"
              />
            </div>
            <template #body>
              <Transition name="fade">
                <div
                  v-show="isShowContentMeter?.id === rowData.id"
                  class="tooltip-content flex flex-col justify-center z-999 items-center relative border p-1 rounded-md"
                >
                  <VaButton
                    preset="secondary"
                    size="small"
                    icon="mso-edit"
                    aria-label="Edit Meter"
                    class="w-full justify-between"
                    @click="showEditMeterModal(rowData)"
                  >
                    <span>编辑水表</span>
                  </VaButton>

                  <!-- Other buttons for meter actions -->
                </div>
              </Transition>
            </template>
          </VaPopover>
        </template>
      </VaDataTable>

      <!-- Residents Table -->
      <VaDataTable
        :items="unitResidents"
        :columns="[
          { label: 'ID', key: 'id', width: '5%' },
          { label: 'Name', key: 'name', width: '15%' },
          { label: 'Email', key: 'email', width: '15%' },
          { label: 'Active', key: 'active', width: '15%' },
          { label: 'Created At', key: 'createdAt', width: '15%' },
          { label: 'Actions', key: 'actions', width: '5%' },
        ]"
        class="mr-3 va-data-table"
        :style="{
          '--va-data-table-height': '140px',
          '--va-data-table-thead-background': '#ffffff',
        }"
        sticky-header
      >
        <template #cell(active)="{ rowData }">
          <VaBadge
            :text="rowData.active ? 'Yes' : 'No'"
            :color="rowData.active ? 'success' : 'secondary'"
          />
        </template>

        <template #cell(createdAt)="{ rowData }">
          {{ moment(rowData.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #cell(actions)="{ rowData }">
          <VaPopover
            placement="bottom"
            trigger="click"
            color="backgroundSecondary"
          >
            <div
              class="flex justify-center items-center relative hover:bg-blue-200 rounded-[4px]"
              @click.stop="showContentResident(rowData)"
            >
              <VaIcon
                name="more_horiz"
                size="20px"
                class="mr-2 cursor-pointer"
              />
            </div>
            <template #body>
              <Transition name="fade">
                <div
                  v-show="isShowContentResident?.id === rowData.id"
                  class="tooltip-content flex flex-col justify-center z-999 items-center relative border p-1 rounded-md"
                >
                  <VaButton
                    preset="secondary"
                    size="small"
                    icon="mso-edit"
                    aria-label="Edit Resident"
                    class="w-full justify-between"
                    @click="showEditResidentModal(rowData)"
                  >
                    <span>编辑住户</span>
                  </VaButton>
                  <VaButton
                    preset="secondary"
                    size="small"
                    icon="mso-info"
                    aria-label="Info Resident"
                    class="w-full justify-between"
                    @click="showDeleteModal(rowData)"
                  >
                    <span>删除关联</span>
                  </VaButton>
                  <!-- Other buttons for resident actions -->
                </div>
              </Transition>
            </template>
          </VaPopover>
        </template>
      </VaDataTable>

      <!-- Edit Meter Modal -->
      <VaModal
        v-model="isShowEditMeterModal"
        size="small"
        mobile-fullscreen
        close-button
        hide-default-actions
      >
        <h1>Edit Meter</h1>
        <EditMeterForm
          :model-value="unitMeterEdit"
          @save="saveMeter"
          @close="closeEditModal"
        />
      </VaModal>

      <VaModal
        v-model="doShowEditUnitModal"
        size="small"
        mobile-fullscreen
        close-button
        hide-default-actions
      >
        <h1 class="va-h5">Edit Unit</h1>
        <EditUnitForm
          v-model="unit"
          @close="doShowEditUnitModal = false"
          @save="onSave"
        />
      </VaModal>

      <!-- Edit Resident Modal -->
      <VaModal
        v-model="isShowEditResidentModal"
        size="small"
        mobile-fullscreen
        close-button
        hide-default-actions
      >
        <h1>Edit Resident</h1>
        <EditResidentForm
          :resident="unitResidentEdit"
          @save="saveResident"
          @close="closeEditResidentModal"
        />
      </VaModal>

      <!-- Bind Resident Modal -->
      <VaModal
        v-model="isShowAddUnitModal"
        size="small"
        mobile-fullscreen
        close-button
        hide-default-actions
      >
        <h1 class="va-h5">Add Unit</h1>
        <BindResidentForm
          :resident="unit"
          @close="isShowAddUnitModal = false"
          @fetch="fetch"
        />
      </VaModal>

      <div class="flex flex-row justify-end gap-3">
        <VaButton
          color="primary"
          class="h-[26px] w-[112px]"
          @click="isShowAddUnitModal = true"
        >BindResident</VaButton>
        <VaButton
          class="h-[26px] w-[72px] mr-5"
          @click="onClose"
        >Cancel</VaButton>
      </div>
    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useToast, useModal } from 'vuestic-ui'
import DetailCard from '@/components/cards/DetailCard.vue'
import EditMeterForm from '@/pages/deviceManage/meter/widgets/editMeterForm.vue'
import EditResidentForm from '@/pages/residentManage/resident/widgets/editResidentForm.vue'
import BindResidentForm from './BindResidentForm.vue'
import { useRoute } from 'vue-router'
import { fetchUnit } from '@/apis/unit'
import EditUnitForm from './EditUnitForm.vue'
import { useUnits } from '@/pages/residentManage/unit/composables/unit'
import moment from 'moment'
import { unbindUnitResident } from '@/apis/unit'
import { useMeters } from '@/pages/deviceManage/meter/composables/meter'
import { useResidents } from '@/pages/residentManage/resident/composables/resident'

const route = useRoute()
const unitId = ref(route.query.id)
const unit = ref<any>({})
const toast = useToast()
const doShowEditUnitModal = ref(false)
const { update } = useUnits()
const { ...meterApi } = useMeters()
const { ...residentApi } = useResidents()

const fetch = async () => {
  try {
    const res = await fetchUnit(unitId.value)
    unit.value = res.data.data
    console.log(res.data.data)
  } catch (err: any) {
    toast.init({ message: `Error: ${err.response.data.error}`, color: 'danger' })
    console.log(err)
  }
}

// Unit Details
const labelsProp = ref(['ID', 'Floor', 'Unit', 'Remark', 'CreatedAt'])
const datasProp = computed(() => [
  unit.value.id,
  unit.value.floor,
  unit.value.unit,
  unit.value.remark,
  unit.value.createdAt,
])

// Meters and Residents Data
const unitMeters = computed(() => unit.value.meters || [])
const unitResidents = computed(() => unit.value.residents || [])

//unit edit
const onSave = (unit: any) => {
  update(unit)
  doShowEditUnitModal.value = false
}
// Modals and Actions
const isShowContentMeter = ref<any>(null) //气泡提示
const isShowEditMeterModal = ref(false)
const unitMeterEdit = ref<any>(null)

const isShowContentResident = ref<any>(null) //气泡提示
const isShowEditResidentModal = ref(false)
const unitResidentEdit = ref<any>(null)

const isShowAddUnitModal = ref(false)

const showContentMeter = (rowData: any) => {
  isShowContentMeter.value = rowData
}
const showEditMeterModal = (rowData: any) => {
  isShowEditMeterModal.value = true
  unitMeterEdit.value = rowData
}
const closeEditModal = () => {
  isShowEditMeterModal.value = false
}

const saveMeter = async (newMeter: any) => {
  await meterApi.update(newMeter)
  isShowEditMeterModal.value = false
  fetch()
}

const saveResident = async (newResident: any) => {
  await residentApi.update(newResident)
  isShowEditResidentModal.value = false
  await fetch()
}
const showContentResident = (rowData: any) => {
  isShowContentResident.value = rowData
}
const showEditResidentModal = (rowData: any) => {
  console.log(rowData)
  unitResidentEdit.value = rowData
  isShowEditResidentModal.value = true
}
const closeEditResidentModal = () => {
  isShowEditResidentModal.value = false
}

const { confirm } = useModal()
const showDeleteModal = async (rowData: any) => {
  const agreed = await confirm({
    title: 'Delete Unit',
    message: `Are you sure you want to delete ${rowData.unit}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    if (unit.value) {
      try {
        await unbindUnitResident({ unitId: unit.value.id, residentUserId: rowData.id })
        fetch()
        toast.init({ message: 'Delete successfully', color: 'success' })
      } catch (err: any) {
        toast.init({ message: `Error:${err.response.data.err}`, color: 'danger' })
        console.error(err)
      }
    }
  }
}
const onClose = () => {
  window.close()
}

onBeforeMount(fetch)
</script>
<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
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
.dialog-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
