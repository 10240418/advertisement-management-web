<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Login</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'
import { login } from '../../apis/auth'
import { useUserStore } from '@/stores/user-store'

const { validate } = useForm('form')
const router = useRouter()
const toast = useToast()
const useUsers = useUserStore()

const formData = reactive({
  email: '',
  password: '',
})

const submit = () => {
  if (validate()) {
    login({ ...formData })
      .then((res) => {
        localStorage.setItem('AdminToken', res.data.token)
        //保存賬號和密碼在localStorage
        localStorage.setItem('AdminEmail', formData.email)
        localStorage.setItem('AdminPassword', formData.password)
        useUsers.changeEmail(formData.email)
        useUsers.changePassWord(formData.password)
        console.log(useUsers.getEmail)
        console.log(useUsers.getPassWord)

        toast.init({ message: res.data.message, color: 'success' })
        router.push({ name: 'home' })
      })
      .catch((err) => {
        toast.init({ message: err.response.data.error, color: 'danger' })
        console.log(err)
      })
  }
}
</script>
