<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../services/utils'

const defaultNewCubicle = {
  name: '',
  remark: '',
}

const newCubicle = ref<any>({ ...defaultNewCubicle })

const form = useForm('add-user-form')

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', newCubicle.value)
    newCubicle.value = { ...defaultNewCubicle }
  }
}

</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-user-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newCubicle.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaTextarea v-model="newCubicle.remark" label="Remark" class="w-full" :rules="[validators.required]"
          name="remark" />
      </div>

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Add</VaButton>
      </div>
    </div>
  </VaForm>
</template>
