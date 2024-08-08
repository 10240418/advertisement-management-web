<script setup lang="ts">
import { ref, watch, PropType, defineProps, defineEmits, onBeforeMount } from 'vue'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../../../services/utils'
import { meter_type } from '../../../../data/meter'
import { fetchUnitList, bindUnitResident } from '@/apis/unit'
import { unit_type } from '@/data/unit'
import { fetchGateways } from '@/apis/gateway'
import { MeterType, MeterModel, MeterOperationType, ResidentType, TaskOperation } from '@/data/api_field_type/api_field_type';


const defaultNewMeter = {
  id: null,
  name: '',
  type: null,
  modbusAddr: null,
  remark: '',
  unitId: null,
  gatewayId: null,
  unit: '',
  gateway: '',
  createAt: '',
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<meter_type | null>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'save'])
const newMeter = ref<any>({ ...defaultNewMeter })
const toast = useToast();
const error = ref<string | null>(null);
//unitId GateId 选择框实现
const units = ref<unit_type[]>([]);
const unitOptions = ref<string[]>([])
const selectUnitValue = ref('');

const gatewayOptions = ref<string[]>([])
const gateways = ref<any[]>([]);
const selectGatewayValue = ref('');

const typeOptions = ref(['Water Meter', 'Electric Meter'])
const selectTypeValue = ref('');

const MeterModelOptions = ref(['MeterModelWaterHDSB', 'MeterModelWaterHDSW', 'ElectricMeterModelTEST'])
const selectModelValue = ref('');

const pagination = ref({
  pageNum: 1,
  pageSize: 50,
  desc: false,
});
const fetchUnits = async () => {
  try {
    const res = await fetchUnitList(pagination.value);
    units.value = res.data.units;
    unitOptions.value = units.value.map(unit => `${unit.id} Floor: ${unit.floor} Unit: ${unit.unit}`);
    selectUnitValue.value = unitOptions.value.length > 0 ? unitOptions.value[0] : '';
  } catch (err: any) {
    console.error(err);
    error.value = (err.message || 'Failed to fetch units') as string;
    toast.init({ message: error.value, color: 'danger' });
  }
};
const fetchGateway = async () => {
  try {
    const res = await fetchGateways(pagination.value);
    gateways.value = res.data.data;
    gatewayOptions.value = gateways.value.map(gateway => `${gateway.id} Name: ${gateway.name} IP: ${gateway.ipAddr}`)
    selectGatewayValue.value = gatewayOptions.value.length > 0 ? gatewayOptions.value[0] : '';
    selectTypeValue.value = typeOptions.value[0]
    selectModelValue.value = MeterModelOptions.value[0]
  } catch (err: any) {
    console.error(err);
    error.value = (err.message || 'Failed to fetch gateways') as string;
    toast.init({ message: error.value, color: 'danger' });
  }
};
onBeforeMount(() => {
  fetchUnits();
  fetchGateway();
});

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
      type: Number(selectTypeValue.value === 'Water Meter' ? MeterType.Water : MeterType.Electric),
      model: Number(selectModelValue.value==='MeterModelWaterHDSB'?MeterModel.MeterModelWaterHDSB:selectModelValue.value==='MeterModelWaterHDSW'?MeterModel.MeterModelWaterHDSW:MeterModel.ElectricMeterModelTEST),
      modbusAddr:newMeter.value.modbusAddr ,
      remark: newMeter.value.remark,
      unitId: Number(selectUnitValue.value.split(' ')[0]),
      gatewayId: Number(selectGatewayValue.value.split(' ')[0]),
    })
  }
  emit('close')
}

const onCancel = () => {
  emit('close')
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-meter-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-1 flex">

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaSelect v-model="selectGatewayValue" label="Gateway ID" class="w-full" :options="gatewayOptions" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaSelect v-model="selectTypeValue" label="Type" class="w-full" :options="typeOptions" name="type" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaSelect v-model="selectModelValue" label="Unit ID" class="w-full" :options="MeterModelOptions" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.modbusAddr" label="Modbus Address" class="w-full" :rules="[validators.required]"
          name="modbusAddr"  />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaSelect v-model="selectUnitValue" label="Unit" class="w-full" :options="unitOptions"/>
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
