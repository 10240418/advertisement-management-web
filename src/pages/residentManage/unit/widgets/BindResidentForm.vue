<template>
  <VaForm
    v-slot="{ isValid }"
    ref="edit-resident-form"
    class="edit-resident-form"
  >
    <div class="flex flex-col gap-4">
      <VaSelect
        v-model="selectValue"
        label="Bind Resident"
        :options="residentOptions"
        placeholder="Select a resident"
        text-by="name"
        track-by="id"
      />
      <VaSelect
        v-model="selectTypeValue"
        label="Select Type"
        :options="typeOptions"
        placeholder="Select a type"
      />
      <div
        v-if="error"
        class="text-red-500"
      >{{ error }}</div>
      <div class="flex gap-2 justify-end mt-4">
        <VaButton
          preset="secondary"
          color="secondary"
          @click="onClose"
        >Cancel</VaButton>
        <VaButton
          :disabled="!isValid"
          @click="submit"
        >Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onBeforeMount, watch, PropType } from 'vue'
import { useToast } from 'vuestic-ui'
import { unit_type, unit_detail_type } from '@/data/unit'
import { bindUnitResident } from '@/apis/unit'
import { fetchResidents } from '@/apis/resident'

const toast = useToast()
const error = ref<string | null>(null)
//  warning  Prop 'onClose' requires default value to be set
const props = defineProps({
  resident: { type: Object as PropType<unit_detail_type | null>, required: true },
  onClose: { type: Function as PropType<() => void>, required: true },
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
const residents = ref<unit_type[]>([])
const residentOptions = ref<any[]>([]) // 就是对象数组
const selectValue = ref<any>() // 修改为字符串

const fetchresidents = async () => {
  try {
    const res = await fetchResidents(pagination.value)
    residents.value = res.data.data
    console.log(residents.value)
    console.log(props.resident)
    //去掉props.resident.residents
    residentOptions.value = residents.value.filter(
      (resident: any) => !props.resident?.residents.some((residentBinded: any) => residentBinded.id === resident.id),
    )
    residentOptions.value = residentOptions.value.map((resident: any) => {
      return {
        id: resident.id,
        name: `${resident.name}(${resident.email})`,
      }
    })
    console.log(residentOptions.value)
    selectValue.value = residentOptions.value[0]
  } catch (error: any) {
    toast.init({ message: `Error: ${error.response.data.error}`, color: 'danger' })
    console.error(error)
  }
}

onBeforeMount(() => {
  fetchresidents()
})

const emit = defineEmits(['close', 'fetch'])

const submit = () => {
  if (selectValue.value) {
    console.log(selectValue.value)
    bindUnitResident({ residentUserId: selectValue.value.id, unitId: props.resident?.id, type: selectTypeValue.value })
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
