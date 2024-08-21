<template>
  <VaForm v-slot="{ isValid }" ref="edit-resident-form" class="edit-resident-form">
    <div class="flex flex-col gap-4">
      <VaSelect v-model="selectValue" label="Add Unit" :options="unitOptions" placeholder="Select a unit" />
      <VaSelect v-model="selectTypeValue" label="Select Type" :options="typeOptions" placeholder="Select a type" />
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div class="flex gap-2 justify-end mt-4">
        <VaButton preset="secondary" color="secondary" @click="onClose">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="submit">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onBeforeMount, watch, PropType } from 'vue'
import { useToast } from 'vuestic-ui'
import { resident_user_type } from '@/data/resident_user'
import { unit_type } from '@/data/unit'
import { fetchUnitList, bindUnitResident } from '@/apis/unit'

const toast = useToast()
const error = ref<string | null>(null)

const props = defineProps({
  resident: { type: Object as PropType<resident_user_type | null>, required: true },
})

const pagination = ref({
  pageNum: 1,
  pageSize: 50,
  desc: false,
})
//type
const typeOptions = ref(['owner', 'tenant'])
const selectTypeValue = ref<any>()

//unit
const units = ref<unit_type[]>([])
const unitOptions = ref<string[]>([]) // 修改为字符串数组
const selectValue = ref<string>('') // 修改为字符串
const unitNeedRemove = ref<any>([])

const fetchUnits = async () => {
  try {
    const res = await fetchUnitList(pagination.value)
    units.value = res.data.units
    unitOptions.value = units.value.map((unit) => `${unit.id} Floor: ${unit.floor} Unit: ${unit.unit}`)
    //去掉 resident.units
    unitNeedRemove.value = props.resident?.units.map(
      (unit: any) => `${unit.id} Floor: ${unit.floor} Unit: ${unit.unit}`,
    )
    // 过滤掉已绑定的单位
    unitOptions.value = unitOptions.value.filter((option) => !unitNeedRemove.value.includes(option))
    selectValue.value = unitOptions.value.length > 0 ? unitOptions.value[0] : ''
  } catch (error: any) {
    toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
    console.error(error)
  }
}
onBeforeMount(() => {
  fetchUnits()
})

const emit = defineEmits(['close', 'fetch'])

const submit = () => {
  if (selectValue.value) {
    const unitId = Number(selectValue.value.split(' ')[0])
    bindUnitResident({ residentUserId: props.resident?.id, unitId: unitId, type: selectTypeValue.value })
      .then(() => {
        toast.init({ message: 'Successfully bind unit', color: 'success' })
        emit('fetch')
        onClose()
      })
      .catch((error: any) => {
        toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
        console.error(error)
        onClose()
      })
  }
}

watch(selectValue, (newValue) => {
  console.log('Selected value changed:', newValue)
})

// eslint-disable-next-line vue/no-dupe-keys
const onClose = () => {
  emit('close')
}
</script>

<style scoped>
.edit-resident-form {
  display: flex;
  flex-direction: column;
}

.text-red-500 {
  color: #f56565;
}
</style>
