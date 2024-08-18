<template>
  <VaForm v-slot="{ isValid }" ref="edit-resident-form" class="edit-resident-form">
    <div class="flex flex-col gap-4">
      <VaInput
        v-model="form.name"
        label="Resident Name"
        placeholder="Enter resident name"
        :rules="[validators.required]"
        name="name"
      />
      <VaInput
        v-model="form.email"
        label="Email"
        placeholder="Enter email"
        :rules="[validators.required, validators.email]"
        name="email"
      />
      <VaInput
        v-model="form.password"
        label="Password"
        placeholder="Enter password"
        :rules="[validators.required, validators.minLength]"
        name="password"
        type="password"
      />
      <div class="flex flex-col gap-1">
        <VaListLabel class="flex justify-start">Active</VaListLabel>
        <VaSwitch v-model="form.active" name="active" />
      </div>

      <div class="flex gap-2 justify-end mt-4">
        <VaButton preset="secondary" color="secondary" @click="onClose">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="submit">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits, PropType } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '@/services/utils'
import { useResidents } from '../composables/resident'
import { resident_user_type } from '@/data/resident_user'

const props = defineProps({
  resident: { type: Object as PropType<resident_user_type | null>, required: true },
  onClose: Function,
})

const emit = defineEmits(['close'])
const { add, updateActive, resetP } = useResidents()
const defaultForm = {
  id: 0,
  name: '',
  email: '',
  password: '',
  active: true,
}
const form = ref<any>({ ...defaultForm })
watch(
  () => props.resident,
  (newResident) => {
    if (newResident) {
      form.value = { ...newResident }
    } else {
      form.value = { ...defaultForm }
    }
  },
  { immediate: true },
)

const formInstance = useForm('edit-resident-form')

const submit = () => {
  if (formInstance.validate()) {
    if (props.resident?.id) {
      updateActive({ id: form.value.id, active: form.value.active, email: form.value.email, name: form.value.name })
      resetP({ id: form.value.id, password: form.value.password })
    } else {
      add({ name: form.value.name, email: form.value.email, password: form.value.password, active: form.value.active })
    }
    emit('close')
  }
}
const onClose = () => {
  emit('close')
}
</script>

<style scoped>
.edit-resident-form {
  display: flex;
  flex-direction: column;
}
</style>
