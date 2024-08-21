<template>
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">Email</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.email }}
      </div>
    </div>
  </div>
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px]">
    <p class="font-bold w-[200px]">Password</p>
    <div class="flex-1">
      <div class="max-w-[748px]">•••••••••••••</div>
    </div>
    <VaButton class="w-fit h-fit" preset="primary" @click="showChangePasswordModal = true"> Reset Password </VaButton>
  </div>
  <VaModal v-model="showChangePasswordModal" width="500px" mobile-fullscreen close-button hide-default-actions>
    <h1 class="va-h5">Change Password</h1>
    <div class="flex flex-col">
      <VaListLabel class="flex justify-start">Old Password</VaListLabel>
      <VaInput
        v-model="oldPassword"
        :rules="oldPasswordRules"
        placeholder="Old password"
        required-mark
        type="password"
      />
    </div>
    <div class="flex flex-col">
      <VaListLabel class="flex justify-start">New password</VaListLabel>
      <VaInput
        v-model="newPassword"
        :rules="newPasswordRules"
        placeholder="New password"
        required-mark
        type="password"
      />
    </div>
    <div class="flex flex-col">
      <VaListLabel class="flex justify-start">Repeat new password </VaListLabel>
      <VaInput
        v-model="repeatNewPassword"
        :rules="repeatNewPasswordRules"
        placeholder="Repeat new password"
        required-mark
        type="password"
      />
    </div>
    <!-- Buttons -->
    <div class="flex justify-end space-x-2">
      <VaButton preset="secondary" color="secondary" @click="showChangePasswordModal = false">Cancel</VaButton>
      <VaButton @click="onChangePassword">Save</VaButton>
    </div>
  </VaModal>
</template>

<script setup lang="ts">
import { useToast } from 'vuestic-ui'
import { useUserStore } from '@/stores/user-store'
import { changePasswordAdminUser } from '@/apis/adminUser'
import { ref } from 'vue'
import { VaButton, VaInput, VaListLabel, VaModal } from 'vuestic-ui'
const store = useUserStore()
const showChangePasswordModal = ref(false)
const oldPassword = ref<any>()
const newPassword = ref<any>()
const repeatNewPassword = ref<any>()
const toast = useToast()

const onChangePassword = async () => {
  if (newPassword.value !== repeatNewPassword.value) {
    toast.init({
      message: 'New password and repeat new password must be the same',
      color: 'danger',
    })
    return
  }
  changePasswordAdminUser({ newPassword: newPassword.value, oldPassword: oldPassword.value })
    .then(() => {
      toast.init({
        message: 'You have successfully changed your password',
        color: 'success',
      })
      showChangePasswordModal.value = false
    })
    .catch((error: any) => {
      toast.init({
        message: `Error: ${error.response.data.error}`,
        color: 'danger',
      })
    })
}
const oldPasswordRules = [(v: string) => !!v || 'Old password field is required']

const newPasswordRules = [
  (v: string) => !!v || 'New password field is required',
  (v: string) => v?.length >= 8 || 'Must be at least 8 characters long',
  (v: string) => v !== oldPassword.value || 'New password cannot be the same',
]

const repeatNewPasswordRules = [
  (v: string) => !!v || 'Repeat new password field is required',
  (v: string) => v === newPassword.value || 'Confirm password does not match new password',
]
</script>
