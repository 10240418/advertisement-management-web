<script setup lang="ts">
import { ref, watch, PropType, defineProps, defineEmits, onBeforeMount } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../../services/utils'
import { unit_type } from '../../../../data/unit'

const defaultNewUnit = {
  id: 0,
  floor: '',
  unit: '',
  created_at: '',
  remark: '',
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<unit_type | null>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'save'])

const newUnit = ref<any>({ ...defaultNewUnit })

watch(
  () => props.modelValue,
  (unitToEdit) => {
    if (unitToEdit) {
      newUnit.value = { ...unitToEdit }
    } else {
      newUnit.value = { ...defaultNewUnit }
    }
  },
  { immediate: true },
)

const form = useForm('edit-unit-form')

const onSave = () => {
  if (form.validate()) {
    emit('update:modelValue', newUnit.value)
    emit('save', newUnit.value)
  }
}

const onCancel = () => {
  emit('close')
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="edit-unit-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex- w-full">
        <VaInput v-model="newUnit.floor" label="Floor" class="w-full" :rules="[validators.required]" name="floor" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newUnit.unit" label="Unit" class="w-full" :rules="[validators.required]" name="unit" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newUnit.remark" label="Remark" class="w-full" name="remark" placeholder="Remark" />
      </div>

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="onCancel">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>
<style lang="scss">
.read-only .va-input-wrapper__field {
  --va-form-element-border-width: 0px;
  border-width: 0px;
}
</style>
