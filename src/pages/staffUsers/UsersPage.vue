<script setup lang="ts">
import { ref } from 'vue'
import UsersTable from './widgets/UsersTable.vue'
import EditUserForm from './widgets/EditUserForm.vue'
import { User } from './types'
import { useUsers } from './composables/useUsers'
import { useModal, useToast } from 'vuestic-ui'

const doShowEditUserModal = ref(false)

const { isLoading, users, ...userApi } = useUsers()

const userToEdit = ref<User | null>(null)

const showEditUserModal = (user: User) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const showAddUserModal = () => {
  userToEdit.value = null
  doShowEditUserModal.value = true
}

const { init: notify } = useToast()

const onUserDelete = async (user: User) => {
  await userApi.remove()
  notify({
    message: `${user.username} has been deleted`,
    color: 'success',
  })
}

const editFormRef = ref()

const { confirm } = useModal()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Form has unsaved changes. Are you sure you want to close it?',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <!-- <VaButtonToggle
            v-model="filters.isActive"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: 'Active', value: true },
              { label: 'Inactive', value: false },
            ]"
          /> -->
          <!-- <VaInput v-model="filters.search" placeholder="Search">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="small" />
            </template>
          </VaInput> -->
        </div>
        <VaButton @click="showAddUserModal">Add User</VaButton>
      </div>

      <UsersTable :users="users" :loading="isLoading" @editUser="showEditUserModal" @deleteUser="onUserDelete" />
    </VaCardContent>
  </VaCard>

  <VaModal
    v-slot="{ cancel, ok }"
    v-model="doShowEditUserModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
    :before-cancel="beforeEditFormModalClose"
  >
    <h1 class="va-h5">{{ userToEdit ? 'Edit user' : 'Add user' }}</h1>
    <EditUserForm
      ref="editFormRef"
      :user="userToEdit"
      :save-button-label="userToEdit ? 'Save' : 'Add'"
      @close="cancel"
    />
  </VaModal>
</template>
