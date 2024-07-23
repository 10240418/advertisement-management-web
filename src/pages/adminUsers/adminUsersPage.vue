<script setup lang="ts">
import { ref, reactive, toRaw, watch } from 'vue'
import { useAdminUsers } from './composables/adminUsers'
import { useModal, useToast } from 'vuestic-ui'
import { admin_user_type } from '../../data/admin_user'
import _ from 'lodash'
import adminUsersTable from './widgets/adminUsersTable.vue'
import EditAdminUserForm from './widgets/EditAdminUserForm.vue'
import draggableDialog  from  '../../../src/components/reusableModal/draggableDialog.vue'

const doShowEditUserModal = ref(false)
const doShowAddUserModal = ref(false)

const { isLoading, adminusers, filters, sorting, pagination, ...userApi } = useAdminUsers()

const adminUsersShowInTable = ref<admin_user_type[]>([])
const userToEdit = ref<admin_user_type | null>(null)

const showEditUserModal = (user: admin_user_type) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const showAddUserModal = () => {
  doShowAddUserModal.value = true
  userToEdit.value = null
}

const { init: notify } = useToast()

const onUserDelete = async (user: any) => {
  await userApi.remove(user.id)
  notify({
    message: `${user.username} has been deleted`,
    color: 'success',
  })
}

const onSave = (user: any) => {
  console.log(user)
  if (user.id) {
    userApi.update(user)
  } else {
    userApi.add(user)
  }
  doShowEditUserModal.value = false
  doShowAddUserModal.value = false
}

const filterData = (search: any) => {
  const rawUsers = toRaw(adminusers.value)
  const filteredUsers = rawUsers.filter((item: admin_user_type) => item.name.includes(search))
  adminUsersShowInTable.value = _.cloneDeep(filteredUsers)
}

watch(
  () => filters.value.search,
  (newSearch) => {
    return filterData(newSearch)
  }
)

watch(
  adminusers,
  () => {
    adminUsersShowInTable.value = _.cloneDeep(toRaw(adminusers.value))
  },
  { deep: true }
)
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <span>根据名字筛选</span>
          <VaInput v-model="filters.search" placeholder="Search">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="xl" />
            </template>
          </VaInput>
        </div>
        <VaButton @click="showAddUserModal">Add User</VaButton>
      </div>

      <adminUsersTable 
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        :pagination="pagination"
        :users="adminUsersShowInTable" 
        :loading="isLoading" 
        @edit-user="showEditUserModal"
        @delete-user="onUserDelete" 
      />
    </VaCardContent>
  </VaCard>

  <VaModal v-model="doShowAddUserModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Add AdminUser</h1>
    <editAdminUserForm v-model="userToEdit" @close="doShowAddUserModal = false" @save="onSave" />
  </VaModal>
  <VaModal v-model="doShowEditUserModal" size="small" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Edit AdminUser</h1>
    <editAdminUserForm v-model="userToEdit" @close="doShowEditUserModal = false" @save="onSave" />
  </VaModal>
  <draggableDialog></draggableDialog>
</template>
