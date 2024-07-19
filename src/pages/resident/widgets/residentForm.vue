<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../services/utils'

const defaultNewUser = {
  name: '',
  email: '',
  password: '',
  active: true,
}

const newUser = ref<any>({ ...defaultNewUser })

const form = useForm('add-user-form')

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', newUser.value)
  }
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-user-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newUser.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newUser.email" label="Email" class="w-full" :rules="[validators.required, validators.email]"
          name="email" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newUser.password" label="Password" class="w-full" :rules="[validators.required]"
          name="password" />
      </div>

      <div class="flex gap-4 w-full">
        <div class="flex items-center w-1/2 mt-4">
          <VaCheckbox v-model="newUser.active" label="Active" class="w-full" name="active" />
        </div>
      </div>

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Add</VaButton>
      </div>
    </div>
  </VaForm>
</template>
../../toilets/composables/useProjects
