<!-- widgets/editGatewayForm.vue -->
<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { useForm, VaInput, VaButton } from 'vuestic-ui';
import { gateway_type } from '../../../../data/gateway';
import { validators } from '../../../../services/utils'

const defaultNewGateway = {
  id: 0,
  name: '',
  ip_address: '',
  remark: '',
  created_at: '',
  updated_at: '',
};

const newGateway = ref<any>({ ...defaultNewGateway });
const props = defineProps({
  gateway: {
    type: Object as PropType<gateway_type | null>,
    required: true,
  },
});

watch(
  () => props.gateway,
  (gatewayToEdit) => {
    if (gatewayToEdit) {
      newGateway.value = { ...gatewayToEdit };
    } else {
      newGateway.value = { ...defaultNewGateway };
    }
  },
  { immediate: true },
);

const form = useForm('edit-gateway-form');
const emit = defineEmits(['close', 'save']);

const onSave = () => {
  if (form.validate()) {
    emit('save', newGateway.value);
  }
};
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="edit-gateway-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newGateway.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newGateway.ip_address" label="IP Address" class="w-full" :rules="[validators.required]" name="ip_address" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newGateway.remark" label="Remark" class="w-full" />
      </div>

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>
