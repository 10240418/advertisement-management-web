<script setup lang="ts">
import { ref, watch, PropType, defineProps, defineEmits } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../services/utils'
import { advertisement_type } from '../../../data/advertisement/advertisement_type'
import { useAdvertisements } from '../composable/advertisements'

const { add, fetch } = useAdvertisements()
const defaultNewAdvertisement = {
  title: '',
  content: '',
  url: '',
  createdAt: '',
  updatedAt: '',
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<advertisement_type | null>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'save'])

const newAdvertisement = ref<any>({ ...defaultNewAdvertisement })

watch(
  () => props.modelValue,
  (advertisementToEdit) => {
    if (advertisementToEdit) {
      newAdvertisement.value = { ...advertisementToEdit }
      console.log(newAdvertisement.value.id)
    } else {
      newAdvertisement.value = { ...defaultNewAdvertisement }
    }
  },
  { immediate: true },
)

const form = useForm('add-advertisement-form')

const onSave = () => {
  if (form.validate()) {
    add(newAdvertisement.value)
    fetch()
    emit('close')
  }
}

const onCancel = () => {
  emit('close')
}
</script>

<template>
  <VaForm
    v-slot="{ isValid }"
    ref="add-advertisement-form"
    class="flex-col justify-start items-start inline-flex w-full"
  >
    <div class="self-stretch flex-col justify-start items-start gap-2 flex">
      <div v-if="!newAdvertisement.id" class="flex gap-4 flex-col w-full">
        <VaInput
          v-model="newAdvertisement.title"
          label="Title"
          class="w-full"
          :rules="[validators.required]"
          name="title"
        />
      </div>

      <div v-if="!newAdvertisement.id" class="flex gap-4 flex-col w-full">
        <VaTextarea
          v-model="newAdvertisement.content"
          label="Content"
          class="w-full"
          :rules="[validators.required]"
          name="content"
        />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput
          v-model="newAdvertisement.url"
          label="URL"
          class="w-full"
          :rules="[validators.required, validators.url]"
          name="url"
        />
      </div>
      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="onCancel">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>
