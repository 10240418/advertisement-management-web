<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../services/utils'
import { water_meter_type } from '../../../data/water_meter'

const defaultNewWaterMeter = {
  id: 0,
  name: '',
  gateway_id: 0,
  remark: '',
  unit_id: 0,
  modbus_address: '',
  created_at: '',
  updated_at: '',
}

const newWaterMeter = ref<any>({ ...defaultNewWaterMeter })
const props = defineProps({
  WaterMeter: {
    type: Object as PropType<water_meter_type | null>,
    required: true,
  },
})

watch(
  () => props.WaterMeter,
  (meterToEdit) => {
    if (meterToEdit) {
      newWaterMeter.value = { ...meterToEdit }
    } else {
      newWaterMeter.value = { ...defaultNewWaterMeter }
    }
  },
  { immediate: true },
)

const form = useForm('edit-water-meter-form')
const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', newWaterMeter.value)
  }
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="edit-water-meter-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newWaterMeter.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newWaterMeter.gateway_id" label="Gateway ID" class="w-full" :rules="[validators.required]" name="gateway_id" type="number" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newWaterMeter.remark" label="Remark" class="w-full" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newWaterMeter.unit_id" label="Unit ID" class="w-full" :rules="[validators.required]" name="unit_id" type="number" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newWaterMeter.modbus_address" label="Modbus Address" class="w-full" :rules="[validators.required]" name="modbus_address" />
      </div>
      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>
