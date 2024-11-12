<script setup lang="ts">
import { ref } from 'vue'
import { admin_user_type } from '../../data/admin_user'
import AdminUsersTable from './widgets/adminUsersTable.vue'
import EditAdminUserForm from './widgets/editAdminUserForm.vue'

const doShowEditUserModal = ref(false)
const doShowAddUserModal = ref(false)

const userToEdit = ref<admin_user_type | null>(null)

const showEditUserModal = (user: admin_user_type) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const showAddUserModal = () => {
  doShowAddUserModal.value = true
  userToEdit.value = null
}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start"></div>
        <VaButton @click="showAddUserModal">Add User</VaButton>
      </div>

      <AdminUsersTable @editUser="showEditUserModal" />
    </VaCardContent>
  </VaCard>

  <VaModal v-model="doShowAddUserModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Add AdminUser</h1>
    <EditAdminUserForm v-model="userToEdit" @close="doShowAddUserModal = false" />
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
