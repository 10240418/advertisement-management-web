<script setup lang="ts">
import { ref, watch, PropType, defineProps, defineEmits, onBeforeMount } from 'vue'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../../../services/utils'
import { meter_type } from '../../../../data/meter'
import { fetchUnitList } from '@/apis/unit'
import { unit_type } from '@/data/unit'
import { fetchGateways } from '@/apis/gateway'
import { MeterType, MeterModel } from '@/data/api_field_type/api_field_type'
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
const toast = useToast()
//unitId GateId 选择框实现
const units = ref<unit_type[]>([])
const unitOptions = ref<string[]>([])
const selectUnitValue = ref<any>()
const selectUnit2Value = ref<any>()

const gatewayOptions = ref<string[]>([])
const gateways = ref<any[]>([])
const selectGatewayValue = ref<any>()
const selectGateway2Value = ref<any>()

const typeOptions = ref(['WaterMeter', 'ElectricMeter'])
const selectTypeValue = ref('')

const MeterModelOptions = ref(['MeterModelWaterHDSB', 'MeterModelWaterHDSW', 'ElectricMeterModelTEST'])
const selectModelValue = ref('')

const pagination = ref({
  pageNum: 1,
  pageSize: 50,
  desc: false,
})
const unitsOptions = ref<any>()
const gatewaysOptions = ref<any>()
const fetchUnits = () => {
  fetchUnitList(pagination.value)
    .then((res) => {
      units.value = res.data.units
      unitOptions.value = units.value.map((unit) => {
        if (newMeter.value.unitId == unit.id) {
          selectUnitValue.value = `${unit.id} Floor: ${unit.floor} Unit: ${unit.unit}`
        }
        return `${unit.id} Floor: ${unit.floor} Unit: ${unit.unit}`
      })
      unitsOptions.value = units.value.map((unit) => {
        if (newMeter.value.unitId == unit.id) {
          selectUnit2Value.value = { value: unit.id, label: ` Floor:${unit.floor}  Unit: ${unit.unit}` }
        }
        return { value: unit.id, label: ` Floor:${unit.floor}  Unit: ${unit.unit}` }
      })
    })
    .catch((error: any) => {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    })
}

const fetchGateway = () => {
  fetchGateways(pagination.value)
    .then((res) => {
      gateways.value = res.data.data
      gatewayOptions.value = gateways.value.map((gateway) => {
        if (newMeter.value.gatewayId == gateway.id) {
          selectGatewayValue.value = `${gateway.id} Name: ${gateway.name} IP: ${gateway.ipAddr}`
        }
        return `${gateway.id} Name: ${gateway.name} IP: ${gateway.ipAddr}`
      })

      gatewaysOptions.value = gateways.value.map((gateway) => {
        if (newMeter.value.gatewayId == gateway.id) {
          selectGateway2Value.value = { value: gateway.id, label: `${gateway.name}(${gateway.ipAddr})` }
        }
        return { value: gateway.id, label: ` ${gateway.name}(${gateway.ipAddr})` }
      })
    })
    .catch((error: any) => {
      toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
      console.error(error)
    })
}

onBeforeMount(() => {
  fetchUnits()
  fetchGateway()
})
//watch 自动显示name 先選擇好Unit、Meter Type，然後自動填充NameX格式為:UnitName-MeterTypeName 如:G03-WaterMeter
watch([selectUnit2Value, selectTypeValue], () => {
  if (selectUnit2Value.value && selectTypeValue.value) {
    const unitLabel = units.value.find((unit) => unit.id === selectUnit2Value.value.value)?.floor
    newMeter.value.name = `${unitLabel}-${selectTypeValue.value}`
  }
})
//监听selectTypeValue的变化
watch(selectTypeValue, () => {
  if (selectTypeValue.value === 'Water Meter') {
    MeterModelOptions.value = ['MeterModelWaterHDSB', 'MeterModelWaterHDSW']
    if (!MeterModelOptions.value.includes(selectModelValue.value)) {
      selectModelValue.value = MeterModelOptions.value[0]
    }
  } else {
    MeterModelOptions.value = ['ElectricMeterModelTEST']
    if (!MeterModelOptions.value.includes(selectModelValue.value)) {
      selectModelValue.value = MeterModelOptions.value[0]
    }
  }
})
//如果传递的值不是null
watch(
  () => props.modelValue,
  (meterToEdit) => {
    if (meterToEdit) {
      if (meterToEdit.type === MeterType.Electric) selectTypeValue.value = 'ElectricMeter'
      else selectTypeValue.value = 'WaterMeter'
      if (meterToEdit.model === MeterModel.MeterModelWaterHDSB && meterToEdit.type === 0)
        selectModelValue.value = 'MeterModelWaterHDSB'
      else if (meterToEdit.model === MeterModel.MeterModelWaterHDSW) selectModelValue.value = 'MeterModelWaterHDSW'
      else selectModelValue.value = 'ElectricMeterModelTEST'
      newMeter.value = { ...meterToEdit }
    } else {
      newMeter.value = { ...defaultNewMeter }
    }
  },
  { immediate: true },
)

const form = useForm('add-meter-form')

const onSave = () => {
  if (form.validate()) {
    emit('update:modelValue', newMeter.value)
    emit('save', {
      id: newMeter.value.id,
      name: newMeter.value.name,
      type: Number(selectTypeValue.value === 'WaterMeter' ? MeterType.Water : MeterType.Electric),
      model: Number(
        selectModelValue.value === 'MeterModelWaterHDSB'
          ? MeterModel.MeterModelWaterHDSB
          : selectModelValue.value === 'MeterModelWaterHDSW'
            ? MeterModel.MeterModelWaterHDSW
            : MeterModel.ElectricMeterModelTEST,
      ),
      modbusAddr: Number(newMeter.value.modbusAddr),
      remark: newMeter.value.remark,
      unitId: Number(selectUnit2Value.value.value),
      gatewayId: Number(selectGateway2Value.value.value),
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
        <VaSelect
          v-model="selectUnit2Value"
          track-by="value"
          text-by="label"
          label="Unit"
          class="w-full"
          :options="unitsOptions"
        />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaSelect v-model="selectTypeValue" label="Meter Type" class="w-full" :options="typeOptions" name="type" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaSelect v-model="selectModelValue" label="Model" class="w-full" :options="MeterModelOptions" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newMeter.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput
          v-model="newMeter.modbusAddr"
          label="Modbus Address"
          class="w-full"
          :rules="[validators.required, validators.numberBetween0And60]"
          name="modbusAddr"
        />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaSelect
          v-model="selectGateway2Value"
          track-by="value"
          text-by="label"
          label="Gateway"
          class="w-full"
          :options="gatewaysOptions"
        />
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
