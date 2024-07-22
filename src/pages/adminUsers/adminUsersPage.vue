<script setup lang="ts">
import { ref, reactive, toRaw, watch } from 'vue'
import { useAdminUsers } from './composables/adminUsers'
import { useModal, useToast } from 'vuestic-ui'
import { sleep } from '../../services/utils';
import { admin_user_type } from '../../data/admin_user'
import _ from 'lodash'
import adminUsersTable from './widgets/adminUsersTable.vue'

const doShowEditUserModal = ref(false)

const { isLoading, adminusers, filters, sorting, pagination, ...userApi } = useAdminUsers()



const adminUsersShowInTable = ref<admin_user_type[]>([])
const userToEdit = ref<admin_user_type | null>(null)


const showEditUserModal = (user: admin_user_type) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const showAddUserModal = () => {
  doShowEditUserModal.value = true
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
  userApi.add(user)
  doShowEditUserModal.value = false
}

// 根据名字过滤
const filterData = (search: any) => {
  // 重新获取深拷贝，确保筛选前的数据是最新的
  const rawUsers = toRaw(adminusers.value)
  const filteredUsers = rawUsers.filter((item: admin_user_type) => item.name.includes(search))
  adminUsersShowInTable.value = _.cloneDeep(filteredUsers)
  // console.log(adminUsersShowInTable.value)
  // console.log(filters.value.search)
  // console.log(users.value) 
}

watch(
  () => filters.value.search,
  (newSearch) => {
    return filterData(newSearch)
  }
)

// 初始时填充数据
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
          <!-- <VaButtonToggle
            v-model="filters.isActive"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: 'Active', value: true },
              { label: 'Inactive', value: false },
            ]"
          /> -->
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
      @deleteUser="onUserDelete" />
    </VaCardContent>
  </VaCard>

  <VaModal v-slot="{ cancel, ok }" v-model="doShowEditUserModal" size="small" mobile-fullscreen close-button
    hide-default-actions>
    <h1 class="va-h5">Add user</h1>
    <editAdminUserForm @close="cancel" @save="onSave" />
  </VaModal>
</template>
./composables/adminUsers./composables/AdminUsers