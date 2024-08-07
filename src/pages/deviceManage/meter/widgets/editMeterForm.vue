<script setup lang="ts">
import { ref, watch, PropType, defineProps, defineEmits } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../../services/utils'
import { meter_type } from '../../../../data/meter'

const defaultNewMeter = {
  id: null,
  name: '',
  type: null,
  modbusAddr: 0,
  remark: '',
  unitId: null,
  gatewayId: null,
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

// 确保会是number类型
watch(newMeter, (value) => {
  if (value) {
    value.type = Number(value.type)
    value.modbusAddr = Number(value.modbusAddr)
    value.unitId = Number(value.unitId)
    value.gatewayId = Number(value.gatewayId)
  }
}, { deep: true })

const form = useForm('add-meter-form')

const onSave = () => {
  if (form.validate()) {
    emit('update:modelValue', newMeter.value)
    emit('save', {
      name: newMeter.value.name,
      type: newMeter.value.type,
      modbusAddr: newMeter.value.modbusAddr,
      remark: newMeter.value.remark,
      unitId: newMeter.value.unitId,
      gatewayId: newMeter.value.gatewayId,
    })
  }
}

const onCancel = () => {
  emit('close')
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-meter-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-2 flex">

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <div class="flex gap-4 flex-col w-full">
          <VaInput v-model="newMeter.gatewayId" label="Gateway ID" class="w-full" :rules="[validators.required]"
            name="gateway_id" type="number" />
        </div>
        <VaSelect v-model="newMeter.type" label="Type" class="w-full" :options="[0, 1]" name="type" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.modbusAddr" label="Modbus Address" class="w-full" :rules="[validators.required]"
          name="modbusAddr" type="number" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.unitId" label="Unit ID" class="w-full" :rules="[validators.required]" name="unitId" type="number" />
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
