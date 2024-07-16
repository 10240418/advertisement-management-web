<script setup lang="ts">
import { ref } from 'vue'
import UsersTable from './widgets/UsersTable.vue'
import EditUserForm from './widgets/EditUserForm.vue'
import { useUsers } from './composables/useUsers'
import { useModal, useToast } from 'vuestic-ui'

const doShowEditUserModal = ref(false)

const { isLoading, users, ...userApi } = useUsers()


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

const onActivate = (user: any) => {
  userApi.activate(user.id)
}

const onDeactivate = (user: any) => {
  console.log(user)
  userApi.deactivate(user.id)
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

      <UsersTable :users="users" :loading="isLoading" @deleteUser="onUserDelete" @activate-user="onActivate"
        @deactivate-user="onDeactivate" />
    </VaCardContent>
  </VaCard>

  <VaModal v-slot="{ cancel, ok }" v-model="doShowEditUserModal" size="small" mobile-fullscreen close-button
    hide-default-actions>
    <h1 class="va-h5">Add user</h1>
    <EditUserForm @close="cancel" @save="onSave" />
  </VaModal>
</template>
