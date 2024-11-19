<template>
  <VaForm v-slot="{ isValid }" ref="edit-advertisement-form" class="edit-advertisement-form">
    <div class="flex flex-col gap-4">
      <!-- title -->
      <VaInput
        v-model="form.title"
        label="*Title"
        placeholder="Enter title"
        :rules="[validators.required]"
        name="title"
      />

      <!-- description -->
      <VaInput v-model="form.description" label="Description" placeholder="Enter description" name="description" />

      <!-- image url -->
      <VaInput v-model="form.image_url" label="Image URL" placeholder="Enter image URL" name="image_url" />

      <!-- video url -->
      <VaInput v-model="form.video_url" label="Video URL" placeholder="Enter video URL" name="video_url" />

      <!-- video_duration -->
      <VaInput
        v-model.number="form.video_duration"
        label="Video Duration"
        placeholder="Enter video duration"
        type="number"
        name="video_duration"
      />

      <!-- status -->
      <!-- 切换状态 -->
      <VaSwitch :model-value="switchStatus" label="Active" name="status" @update:modelValue="onStatusChange" />

      <div class="flex gap-2 justify-end mt-4">
        <VaButton preset="secondary" color="secondary" @click="onCloseWindow">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="submit">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits, PropType, computed } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '@/services/utils'
import { useAdvertisements } from '../composables/advertisement'
import { Advertisement_type } from '@/data/advertisement/advertisement_type'

const props = defineProps({
  Advertisement: { type: Object as PropType<Advertisement_type | null>, required: true },
})

const emit = defineEmits(['close'])
const { add, update } = useAdvertisements()
const defaultForm = {
  title: '',
  description: '',
  image_url: '',
  video_url: '',
  video_duration: 0,
  status: 'active',
}
//如果是form.value.status是active就是true，否则就是false
const switchStatus = computed(() => form.value.status === 'active')
const form = ref<any>()
watch(
  () => props.Advertisement,
  (newAdvertisement) => {
    if (newAdvertisement) {
      form.value = { ...newAdvertisement }
    } else {
      form.value = { ...defaultForm }
    }
  },
  { immediate: true },
)

const onStatusChange = () => {
  console.log(switchStatus.value)
  console.log(form.value.status)
  form.value.status = switchStatus.value ? 'inactive' : 'active'
}

const formInstance = useForm('edit-advertisement-form')

const submit = () => {
  if (formInstance.validate()) {
    if (props.Advertisement?.ID) {
      console.log(form.value)
      update(form.value.ID, {
        title: form.value.title,
        description: form.value.description,
        image_url: form.value.image_url,
        video_url: form.value.video_url,
        video_duration: form.value.video_duration,
        status: form.value.status,
      })
    } else {
      add(form.value)
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
.edit-advertisement-form {
  display: flex;
  flex-direction: column;
}
</style>
