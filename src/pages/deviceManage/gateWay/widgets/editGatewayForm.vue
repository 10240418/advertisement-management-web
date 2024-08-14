<!-- editGatewayForm.vue -->
<script setup lang="ts">
import { ref, watch, PropType, defineProps, defineEmits } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../../services/utils'
import { gateway_type } from '../../../../data/gateway'

const defaultNewGateway = {
  name: '',
  ipAddr: '',
  remark: '',
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'save'])

const newGateway = ref<any>({ ...defaultNewGateway })

watch(
  () => props.modelValue,
  (gatewayToEdit) => {
    if (gatewayToEdit) {
      newGateway.value = { ...gatewayToEdit }
    } else {
      newGateway.value = { ...defaultNewGateway }
      console.log('newGateway', newGateway.value)
    }
  },
  { immediate: true }
)

const form = useForm('add-gateway-form')

const onSave = () => {
  if (form.validate()) {
    if(props.modelValue?.id){
      emit('update:modelValue', {id:props.modelValue.id,...newGateway.value})
    }
    else{emit('update:modelValue', newGateway.value)}
    emit('save', newGateway.value)
  }
}

const onCancel = () => {
  emit('close')
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-gateway-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newGateway.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newGateway.ipAddr" label="IP Address" class="w-full" :rules="[validators.required]" name="ip_address" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newGateway.remark" label="Remark" class="w-full" name="remark" />
      </div>

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="onCancel">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>
<!-- editGatewayForm.vue -->
