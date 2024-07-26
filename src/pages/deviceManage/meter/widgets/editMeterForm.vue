<!-- editMeterForm.vue -->
<script setup lang="ts">
import { ref, watch, PropType, defineProps, defineEmits } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../../services/utils'
import { meter_type } from '../../../../data/meter'

const defaultNewMeter = {
  name: '',
  gateway_id: '',
  modbus_address: '',
  type: '',
  remark: '',
  created_at: '',
  updated_at: '',
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<meter_type | null>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'save'])

const newMeter = ref<any>({ ...defaultNewMeter })

watch(
  () => props.modelValue,
  (meterToEdit) => {
    if (meterToEdit) {
      newMeter.value = { ...meterToEdit }
    } else {
      newMeter.value = { ...defaultNewMeter }
    }
  },
  { immediate: true }
)

const form = useForm('add-meter-form')

const onSave = () => {
  if (form.validate()) {
    emit('update:modelValue', newMeter.value)
    emit('save', newMeter.value)
  }
}

const onCancel = () => {
  emit('close')
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-meter-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.gateway_id" label="Gateway ID" class="w-full" :rules="[validators.required]" name="gateway_id" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.modbus_address" label="Modbus Address" class="w-full" :rules="[validators.required]" name="modbus_address" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.type" label="Type" class="w-full" :rules="[validators.required]" name="type" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.remark" label="Remark" class="w-full" name="remark" />
      </div>

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="onCancel">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>
