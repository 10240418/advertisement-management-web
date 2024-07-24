<script setup lang="ts">
import { ref, watch, PropType,defineProps, defineEmits } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../services/utils'
import { admin_user_type } from '../../../data/admin_user'

const defaultNewAdminUser = {
  name: '',
  email: '',
  password: '',
  created_at: '',
  updated_at: '',
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<admin_user_type | null>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'save'])

const newAdminUser = ref<any>({ ...defaultNewAdminUser })

watch(
  () => props.modelValue,
  (userToEdit) => {
    if (userToEdit) {
      newAdminUser.value = { ...userToEdit }
    } else {
      newAdminUser.value = { ...defaultNewAdminUser }
    }
  },
  { immediate: true }
)

const form = useForm('add-user-form')

const onSave = () => {
  if (form.validate()) {
    emit('update:modelValue', newAdminUser.value)
    emit('save', newAdminUser.value)
  }
}

const onCancel = () => {
  emit('close')
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-user-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newAdminUser.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newAdminUser.email" label="Email" class="w-full" :rules="[validators.required, validators.email]" name="email" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newAdminUser.password" label="Password" class="w-full" :rules="[validators.required]" name="password" />
      </div>
      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="onCancel">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>
