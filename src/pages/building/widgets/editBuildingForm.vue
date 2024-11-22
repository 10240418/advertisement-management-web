<template>
  <VaForm v-slot="{ isValid }" ref="edit-building-form" class="edit-building-form">
    <div class="flex flex-col gap-4">
      <VaInput
        v-model="form.name"
        label="building Name"
        placeholder="Enter building name"
        :rules="[validators.required]"
        name="name"
      />

      <VaInput
        v-model="form.address"
        label="Address"
        placeholder="Enter address"
        :rules="[validators.required]"
        name="address"
      />

      <VaInput
        v-model="form.blg_id"
        label="BuildingID"
        placeholder="Enter BuildingID"
        :rules="[validators.required]"
        name="blg_id"
      />

      <div class="flex gap-2 justify-end mt-4">
        <VaButton preset="secondary" color="secondary" @click="onCloseWindow">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="submit">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits, PropType } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '@/services/utils'
import { useBuildings } from '../composables/buildings'
import { building_type } from '@/data/advertisement/building_type'

const props = defineProps({
  building: { type: Object as PropType<building_type | null>, required: true },
})

const emit = defineEmits(['close'])
const { add, update } = useBuildings()
const defaultForm = {
  id: 0,
  name: '',
  address: '',
  blg_id: '',
}
const form = ref<any>({ ...defaultForm })
watch(
  () => props.building,
  (newbuilding) => {
    if (newbuilding) {
      form.value = { ...newbuilding }
    } else {
      form.value = { ...defaultForm }
    }
  },
  { immediate: true },
)

const formInstance = useForm('edit-building-form')

const submit = () => {
  if (formInstance.validate()) {
    if (props.building?.ID) {
      console.log(form.value)
      console.log(form.value)
      update({ ID: form.value.ID, address: form.value.address, name: form.value.name, blg_id: form.value.blg_id })
    } else {
      add({ name: form.value.name, address: form.value.address, blg_id: form.value.blg_id })
      console.log(form.value)
    }
    emit('close')
  }
}
const onCloseWindow = () => {
  emit('close')
}
</script>

<style scoped>
.edit-building-form {
  display: flex;
  flex-direction: column;
}
</style>
