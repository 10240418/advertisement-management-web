<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../services/utils'
import { eletric_energy_meter_type } from '../../../data/electric_energy_meter'

const defaultNewElectricMeter = {
  id: 0,
  name: '',
  gateway_id: '',
  remark: '',
  unit_id: 0,
  modbus_address: '',
  created_at: '',
  updated_at: '',
}

const newElectricMeter = ref<any>({ ...defaultNewElectricMeter })
const props = defineProps({
  ElectricMeter: {
    type: Object as PropType<eletric_energy_meter_type | null>,
    required: true,
  },
})

watch(
  () => props.ElectricMeter,
  (meterToEdit) => {
    if (meterToEdit) {
      newElectricMeter.value = { ...meterToEdit }
    } else {
      newElectricMeter.value = { ...defaultNewElectricMeter }
    }
  },
  { immediate: true },
)

const form = useForm('edit-electric-meter-form')
const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', newElectricMeter.value)
  }
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="edit-electric-meter-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newElectricMeter.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newElectricMeter.gateway_id" label="Gateway ID" class="w-full" :rules="[validators.required]" name="gateway_id" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newElectricMeter.remark" label="Remark" class="w-full" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newElectricMeter.unit_id" label="Unit ID" class="w-full" :rules="[validators.required]" name="unit_id" type="number" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newElectricMeter.modbus_address" label="Modbus Address" class="w-full" :rules="[validators.required]" name="modbus_address" />
      </div>

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>
