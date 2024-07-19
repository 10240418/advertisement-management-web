<script setup lang="ts">
import { ref, reactive, toRaw, watch } from 'vue'
import UsersTable from './widgets/UsersTable.vue'
import EditUserForm from './widgets/EditUserForm.vue'
import { useAdminUsers } from './composables/useUsers'
import { useModal, useToast } from 'vuestic-ui'
import type { adminUserType } from './type'
import { sleep } from '../../services/utils';
import _ from 'lodash'

const doShowEditUserModal = ref(false)

const { isLoading, users, filters, sorting, pagination, ...userApi } = useAdminUsers()



const adminUsersShowInTable = ref<adminUserType[]>([])
const userToEdit = ref<adminUserType | null>(null)

console.log(pagination.value)


const showEditUserModal = (user: adminUserType) => {
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
const filterData = (search: string) => {
  // 重新获取深拷贝，确保筛选前的数据是最新的
  const rawUsers = toRaw(users.value)
  const filteredUsers = rawUsers.filter((item: adminUserType) => item.name.includes(search))
  adminUsersShowInTable.value = _.cloneDeep(filteredUsers)
  // console.log(adminUsersShowInTable.value)
  // console.log(filters.value.search)
  // console.log(users.value) 
}

watch(
  () => filters.value.search,
  (newSearch) => {
    filterData(newSearch)
  }
)

// 初始时填充数据
watch(
  users,
  () => {
    adminUsersShowInTable.value = _.cloneDeep(toRaw(users.value))
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
          <VaInput v-model="filters.search" placeholder="Search">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="xl" />
            </template>
          </VaInput>
        </div>
        <VaButton @click="showAddUserModal">Add User</VaButton>
      </div>

      <UsersTable 
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
    <EditUserForm @close="cancel" @save="onSave" />
  </VaModal>
</template>
