<template>
  <VaCard>
    <div class="w-full h-full flex flex-col ml-3">
      <!-- top section -->
      <div class="flex flex-row justify-between">
        <div class="grid grid-cols-[1fr_3fr] " :class="{ 'gap-y-[2.2px]': !editable }">

          <VaListLabel class="flex justify-start">ID</VaListLabel>
          <VaInput v-if="resident" v-model="resident.id" placeholder="ID" class="custom-input"
            :class="{ 'read-only': !editable }" />
          <VaListLabel class="flex justify-start">Name</VaListLabel>
          <VaInput v-if="resident" v-model="resident.name" placeholder="Name" class="custom-input"
            :class="{ 'read-only': !editable }" />
          <VaListLabel class="flex justify-start">Email</VaListLabel>
          <VaInput v-if="resident" v-model="resident.email" placeholder="Email" class="custom-input"
            :class="{ 'read-only': !editable }" />
        </div>
        <div class="flex flex-col justify-between w-[72px] mt-[3px] mr-4">
          <VaButton color="primary" @click="doShowEditResidentModal=true" icon="mso-edit" class="h-[30px] w-[72px]">Edit</VaButton>
          <!-- <VaButton color="primary" @click="postEdit" icon="mso-edit" class="h-[30px] w-[72px]">Edit</VaButton> -->

        </div>
      </div>
    
      <!-- Table Section -->
      <VaDataTable
      :items="currentPageData"
      class="mr-3"
      :style="{
        '--va-data-table-height': '220px',
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
    <VaModal v-model="doShowEditResidentModal" size="small" mobile-fullscreen close-button hide-default-actions>
      <h1 class="va-h5">Edit Resident</h1>
      <EditResidentForm  :resident="resident" @close="doShowEditResidentModal = false" @save="onSave(resident)" />
    </VaModal>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount ,computed,toRaw} from 'vue';
import { resident_user_type } from '@/data/resident_user';
import { useRoute } from 'vue-router';
import { fetchResident ,updateResidentActive} from '../../../../apis/resident';

const resident = ref<resident_user_type | null>(null);
const route = useRoute();
const residentId = ref(route.query.id);
const editable = ref(false);

const fetch = async () => {
  if (residentId.value) {
    try {
      const res = await fetchResident({ id: residentId.value });
      resident.value = res.data.data;
      // console.log(resident.value)

    } catch (error) {
      console.error('Error fetching resident:', error);
      resident.value = null;

    }
  }
};
const currentPageData = computed(() => {
  let unitsArray: any = []
  if (Array.isArray(resident.value?.units)) {
    unitsArray = resident.value?.units
  } else if (resident.value?.units && typeof resident.value?.units === 'object') {
    unitsArray = [resident.value?.units]
  }
  return unitsArray;

});
//显示编辑弹窗
const doShowEditResidentModal = ref(false);
const onSave = async (resident: any) => {
  if (resident.id) {
    await updateResidentActive(resident);
  } else {
   
  }
  doShowEditResidentModal.value = false;
};

// // 创建一个新的 BroadcastChannel 实例
// const bc = new BroadcastChannel('resident-dialog');

// // 发送编辑消息的函数
// const postEdit = () => {
//   if (resident.value) {
//     console.log('Sending message:', resident.value); // 调试信息
//     bc.postMessage({
//       type: 'edit',
//       data: toRaw(resident.value) // 发送 resident 数据
//     });
//     console.log('Message sent:', resident.value);
//   }
// };
// // 示例：调用发送编辑消息
// // 取消此行的调用，避免在组件加载时自动发送消息
// // postEdit();

// 当组件挂载前，获取 resident 数据
onBeforeMount(() => {
  fetch();
});




const onConfirm = () => {
  // Confirm action logic
  console.log('Confirm action triggered');
};

const onClose = () => {
  // Close dialog logic
  onClose();
  console.log('Close action triggered');
};
</script>

<style>
.custom-input {
  --va-input-line-height: 8px;
  --va-input-wrapper-min-height: 20px --va-input-font-stretch: expanded;
  --va-input-letter-spacing: 0.05em;
  --va-input-disabled-opacity: 0.5;

}

.read-only .va-input-wrapper__field {
  --va-form-element-border-width: 0px;
  border-width: 0px;
}

.va-input-wrapper__field {
  padding: 4px 12px
}

.resident-dialog {
  min-width: 400px;
}

.dialog-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>