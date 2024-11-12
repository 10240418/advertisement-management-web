<script setup lang="ts">
import { ref } from 'vue'
import { notice_type } from '../../data/advertisement/notice_type'
import NoticesTable from './widgets/noticesTable.vue'
import EditNoticeForm from './widgets/noticeForm.vue'

const doShowEditNoticeModal = ref(false)
const doShowAddNoticeModal = ref(false)

const noticeToEdit = ref<notice_type | null>(null)

const showEditNoticeModal = (notice: notice_type) => {
  noticeToEdit.value = notice
  doShowEditNoticeModal.value = true
}

const showAddNoticeModal = () => {
  doShowAddNoticeModal.value = true
  noticeToEdit.value = null
}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start"></div>
        <VaButton @click="showAddNoticeModal">添加公告</VaButton>
      </div>

      <NoticesTable @editNotice="showEditNoticeModal" />
    </VaCardContent>
  </VaCard>

  <VaModal v-model="doShowAddNoticeModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">添加公告</h1>
    <EditNoticeForm v-model="noticeToEdit" @close="doShowAddNoticeModal = false" />
  </VaModal>

  <VaModal v-model="doShowEditNoticeModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">编辑公告</h1>
    <EditNoticeForm v-model="noticeToEdit" @close="doShowEditNoticeModal = false" />
  </VaModal>
</template>
<style scoped>
.span-filter {
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
</style>
