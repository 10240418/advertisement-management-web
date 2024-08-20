<template>
  <div class="w-full h-full bg-white flex">
    <VaCard class="w-full h-full flex">
      <div class="w-full h-full flex flex-col ml-3">
        <!-- Top section -->
        <div class="flex flex-row justify-between">
          <DetailCard
            :labels="labelsProp"
            :datas="datasProp"
            class="ml-[-14px] mt-[-8px]"
          />
          <div class="flex flex-col justify-between w-[72px] mt-[3px] mr-4">
            <VaButton
              color="primary"
              icon="mso-edit"
              class="h-[30px] w-[72px]"
              @click="doShowEditResidentModal = true"
            >
              Edit</VaButton>
            <VaButton
              color="primary"
              class="h-[30px] w-[72px]"
              @click="doShowAddUnitModal = true"
            >AddUnit</VaButton>
          </div>
        </div>

        <!-- Table Section -->
        <VaDataTable
          :items="currentPageData"
          :columns="[
            { key: 'id', label: 'ID', sortable: true },
            { key: 'unit', label: 'Unit', sortable: true },
            { key: 'floor', label: 'Floor', sortable: true },
            { key: 'remark', label: 'Remark', sortable: true },
            { key: 'actions', label: 'Actions', sortable: false },
          ]"
          class="mr-3 va-data-table"
          :style="{
            '--va-data-table-height': '320px',
            '--va-data-table-tfoot-background': 'var(--va-background-element)',
          }"
          sticky-header
          footer-clone
          sticky-footer
        >
          <template #cell(actions)="{ rowData }">
            <VaPopover
              placement="bottom"
              trigger="click"
              color="backgroundSecondary"
            >
              <div
                class="flex justify-start items-center relative hover:bg-blue-200 rounded-[4px]"
                @click.stop="showContent(rowData)"
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
                    v-show="showContentResident?.id === rowData.id"
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
                    >
                      <span>设为使用</span>
                    </VaButton>
                    <VaButton
                      preset="secondary"
                      size="small"
                      icon="mso-cancel"
                      aria-label="Update Resident"
                      class="w-full justify-between"
                    >
                      <span>设为闲置</span>
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
                  </div>
                </Transition>
              </template>
            </VaPopover>
          </template>
        </VaDataTable>

        <!-- Dialog Footer -->
        <div class="dialog-footer">
          <VaButton
            class="h-[30px] w-[72px] mr-5"
            @click="onClose"
          >Cancel</VaButton>
        </div>
      </div>
    </VaCard>

    <!-- Edit Resident Modal -->
    <VaModal
      v-model="doShowEditResidentModal"
      size="small"
      mobile-fullscreen
      close-button
      hide-default-actions
    >
      <h1 class="va-h5">Edit Resident</h1>
      <EditResidentForm
        :resident="residentToEdit"
        @close="onCloseEditResidentModal"
      />
    </VaModal>

    <!-- Add Unit Modal -->
    <VaModal
      v-model="doShowAddUnitModal"
      size="small"
      mobile-fullscreen
      close-button
      hide-default-actions
    >
      <h1 class="va-h5">Add Unit</h1>
      <AddUnitForm
        :resident="residentToEdit"
        @close="onCloseAddUnitModal"
        @fetch="fetch"
      />
    </VaModal>

    <!-- Edit Unit Modal -->
    <VaModal
      v-model="doShowEditUnitModal"
      size="small"
      mobile-fullscreen
      close-button
      hide-default-actions
    >
      <h1 class="va-h5">Edit Unit</h1>
      <EditUnitForm
        v-model="unitToEdit"
        @close="doShowEditUnitModal = false"
        @save="onSaveEditUnit"
      />
    </VaModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { resident_user_type } from '@/data/resident_user'
import { fetchResident, updateResidentActive } from '../../../../apis/resident'
import EditResidentForm from '../widgets/editResidentForm.vue'
import addUnitForm from '../widgets/addUnitForm.vue'
import { unit_type } from '@/data/unit'
import { useToast } from 'vuestic-ui'
import editUnitForm from '../../unit/widgets/editUnitForm.vue'
import { useModal } from 'vuestic-ui'
import { unbindUnitResident, updateUnit } from '@/apis/unit'
import DetailCard from '@/components/cards/DetailCard.vue'

const route = useRoute()
const residentId = ref(route.query.id)
const labelsProp = ref<string[]>(['ID', 'NAME', 'EMAIL'])
const datasProp = computed(() => {
  if (resident.value) {
    return [resident.value.id, resident.value.name, resident.value.email]
  }
  return []
})
const resident = ref<resident_user_type | null>(null)
const residentToEdit = ref<resident_user_type | null>(null)
const editable = ref(false)
const toast = useToast() //报错提示
const error = ref<string | null>(null) // Error state

const fetch = async () => {
  if (residentId.value) {
    try {
      const res = await fetchResident({ id: residentId.value })
      resident.value = res.data.data
      residentToEdit.value = res.data.data
    } catch (error) {
      console.error('Error fetching resident:', error)
      resident.value = null
      residentToEdit.value = null
    }
  }
}
//气泡提示框
const showContentResident = ref<resident_user_type | null>(null)
const showContent = (rowData: any) => {
  showContentResident.value = rowData
}
//delete modal
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
    if (resident.value) {
      try {
        await unbindUnitResident({ unitId: rowData.id, residentUserId: resident.value?.id })
        fetch()
        toast.init({ message: 'Delete successfully', color: 'success' })
      } catch (err: any) {
        error.value = (err.message || 'Failed to update unit') as string
        toast.init({ message: 'Delete failed', color: 'danger' })
        console.error('Error Delete:', error)
      }
    }
  }
}
//unit edit modal
const doShowEditUnitModal = ref(false)
const unitToEdit = ref<unit_type | null>(null)
const onSaveEditUnit = async (unit: any) => {
  if (unit.id) {
    try {
      // console.log(unit)
      const res = await updateUnit({
        id: unit.id,
        floor: unit.floor,
        unit: unit.unit,
        remark: unit.remark,
      })
      fetch()
      toast.init({ message: 'ReEdit successfully', color: 'success' })
    } catch (error: any) {
      toast.init({ message: error.value, color: 'danger' })
      console.error('Error Save Edit:', error)
    }
  }
  doShowEditUnitModal.value = false
}
const showEidtModal = (rowData: any) => {
  unitToEdit.value = rowData
  doShowEditUnitModal.value = true
}

// units table
const currentPageData = computed(() => {
  let unitsArray: any = []
  if (Array.isArray(resident.value?.units)) {
    unitsArray = resident.value?.units
  } else if (resident.value?.units && typeof resident.value?.units === 'object') {
    unitsArray = [resident.value?.units]
  }
  return unitsArray
})

// Show Edit Resident Modal
const doShowEditResidentModal = ref(false)
const doShowAddUnitModal = ref(false)

const onSave = async (resident: any) => {
  if (resident.id) {
    await updateResidentActive(resident)
    fetch()
  }
  doShowEditResidentModal.value = false
}
//关闭
const onClose = () => {
  fetch()
  window.close()
}

const onCloseEditResidentModal = () => {
  doShowEditResidentModal.value = false
}

const onCloseAddUnitModal = () => {
  doShowAddUnitModal.value = false
}

// Fetch resident data on component mount
onBeforeMount(() => {
  fetch()
})
</script>

<style lang="scss">
.va-data-table__table-tr {
  border-bottom: 1px solid var(--va-background-border);
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
