<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../services/utils'
import { resident_user_type } from '../../../data/resident_user'


const defaultNewResidentUser = {
  id: 0,
  name: '',
  email: '',
  password: '',
  created_at: '',
  updated_at: '',
  unity_id: 0,
  active: true,
}

const newResidentUser = ref<any>({ ...defaultNewResidentUser })
const props = defineProps({
  ResidentUsers: {
    type: Object as PropType<resident_user_type | null>,
    required: true,
  },
})

watch(
  () => props.ResidentUsers,
  (userToEdit) => {
    if (userToEdit) {
      newResidentUser.value = { ...userToEdit }
    } else {
      newResidentUser.value = { ...defaultNewResidentUser }
    }
  },
  { immediate: true },
)

const form = useForm('edit-resident-user-form')
const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', newResidentUser.value)
  }
}
</script>

<template>
  <!-- TODO:编写关于住户管理的弹窗 -->
  <VaForm v-slot="{ isValid }" ref="edit-resident-user-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newResidentUser.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newResidentUser.email" label="Email" class="w-full" :rules="[validators.required, validators.email]" name="email" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newResidentUser.password" label="Password" class="w-full" :rules="[validators.required]" name="password" type="password" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newResidentUser.unity_id" label="Unity ID" class="w-full" :rules="[validators.required]" name="unity_id" type="number" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newResidentUser.unity_id" label="Floor" class="w-full" :rules="[validators.required]" name="Floor" type="number" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaSwitch v-model="newResidentUser.active" label="Active" class="w-full" />
      </div>

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>
