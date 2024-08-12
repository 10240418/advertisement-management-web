<template>
    <VaForm v-slot="{ isValid }" ref="edit-control-task-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
      <div class="self-stretch grid grid-cols-[1fr_1fr] justify-start items-start gap-1 ">
  
        <div class="flex gap-4 flex-col w-full">
          <VaInput v-model="newControlTask.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
        </div>
        <div class="flex gap-4 flex-col w-full">
          <VaSelect v-model="selectTagValue" label="Tag" class="w-full" :options="tagOptions" />
        </div>
        <div class="flex gap-4 flex-col w-full">
          <VaSelect v-model="selectOperationValue" label="Operation" class="w-full" :options="operationOptions" />
        </div>
        <div class="flex gap-4 flex-col w-full">
          <VaInput v-model="newControlTask.interval" label="Interval" class="w-full" type="number" :rules="[validators.required]" name="interval" />
        </div>
        <div class="flex gap-4 flex-col w-full">
          <VaInput v-model="newControlTask.startAt" label="Start Time" class="w-full" type="datetime-local" :rules="[validators.required]" name="startAt" />
        </div>
        <div class="flex gap-4 flex-col w-full">
          <VaSelect v-model="selectGatewayValue" label="Gateway ID" class="w-full" :options="gatewayOptions" />
        </div>
        <div class="flex gap-4 flex-col w-full">
          <VaSelect v-model="selectMeterValue" label="Meter ID" class="w-full" :options="meterOptions" />
        </div>
        <div class="flex gap-4 flex-col justify-center  w-full mt-[18px]">
          <VaSwitch v-model="newControlTask.editable" label="Editable" />
        </div>
        <div></div>
        <div class="flex gap-2 flex-row-reverse items-stretch justify-start w-full">
          <VaButton preset="secondary" color="secondary" @click="onCancel">Cancel</VaButton>
          <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
        </div>
      </div>
    </VaForm>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, PropType, defineProps, defineEmits, onBeforeMount } from 'vue'
  import { useForm, useToast } from 'vuestic-ui'
  import { validators } from '../../../../services/utils'
  import { task_type } from '../../../../data/task'
  import { fetchGateways } from '../../../../apis/gateway'
  import { fetchMeters } from '../../../../apis/meter' 
  import { gateway_type } from '../../../../data/gateway'
  import { meter_type } from '../../../../data/meter'
 
  
  const defaultNewControlTask = {
    id: null,
    name: '',
    tag: '',
    operation: '',
    interval: null,
    startAt: '',
    gatewayId: null,
    meterId: null,
    editable: false,
    remark: '',
  }
  
  const props = defineProps({
    modelValue: {
      type: Object as PropType<task_type | null>,
      required: true,
    },
  })
  
  const emit = defineEmits(['update:modelValue', 'close', 'save'])
  const newControlTask = ref<any>({ ...defaultNewControlTask })
  const toast = useToast();
  const error = ref<string | null>(null);
  
  // Options for selects
  const tagOptions = ref<string[]>(['sys', 'user']);
  const operationOptions = ref<string[]>(['read', 'write']);
  const gatewayOptions = ref<string[]>([]);
  const meterOptions = ref<string[]>([]);
  
  const selectTagValue = ref('');
  const selectOperationValue = ref('');
  const selectGatewayValue = ref('');
  const selectMeterValue = ref('');
  const pagination = ref({
    pageNum: 1,
    pageSize: 30,
    
  });
  
  // Fetch gateway and meter lists
  const fetchGatewaysList = async () => {
    try {
      const res = await fetchGateways(pagination.value);
      gatewayOptions.value = res.data.data.map((gateway: gateway_type) => `${gateway.id} Name: ${gateway.name} IP: ${gateway.ipAddr}`);
      selectGatewayValue.value = gatewayOptions.value.length > 0 ? gatewayOptions.value[0] : '';
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to fetch gateways') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
  };
  
  const fetchMetersList = async () => {
    try {
      const res = await fetchMeters(pagination.value);
      meterOptions.value = res.data.data.map((meter: meter_type) => `${meter.id} Name: ${meter.name}`);
      selectMeterValue.value = meterOptions.value.length > 0 ? meterOptions.value[0] : '';
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to fetch meters') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
  };
  
  onBeforeMount(() => {
    fetchGatewaysList();
    fetchMetersList();
  });
  
  watch(
    () => props.modelValue,
    (controlTaskToEdit) => {
      if (controlTaskToEdit) {
        newControlTask.value = { ...controlTaskToEdit }
        selectTagValue.value = controlTaskToEdit.tag;
        selectOperationValue.value = controlTaskToEdit.operation;
        selectGatewayValue.value = `${controlTaskToEdit.gatewayId}`;
        selectMeterValue.value = `${controlTaskToEdit.meterId}`;
      } else {
        newControlTask.value = { ...defaultNewControlTask }
        selectTagValue.value = '';
        selectOperationValue.value = '';
        selectGatewayValue.value = '';
        selectMeterValue.value = '';
      }
    },
    { immediate: true }
  )
  
  const form = useForm('edit-control-task-form')
  
  const onSave = () => {
    if (form.validate()) {
      emit('update:modelValue', newControlTask.value)
      emit('save', {
        id: newControlTask.value.id,
        name: newControlTask.value.name,
        tag: selectTagValue.value,
        operation: selectOperationValue.value,
        interval: Number(newControlTask.value.interval),
        //"2024-07-30T15:00:00.000+08:00", 时间格式
        startAt: new Date(newControlTask.value.startAt).toISOString(),
        gatewayId: Number(selectGatewayValue.value.split(' ')[0]),
        meterId: Number(selectMeterValue.value.split(' ')[0]),
        editable: newControlTask.value.editable,
      })
    }
    emit('close')
  }
  
  const onCancel = () => {
    emit('close')
  }
  </script>
  