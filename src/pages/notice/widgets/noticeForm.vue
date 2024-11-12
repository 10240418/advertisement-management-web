<script setup lang="ts">
import { ref, watch, PropType, defineProps, defineEmits } from 'vue'
import { useForm } from 'vuestic-ui'
import { validators } from '../../../services/utils'
import { notice_type } from '../../../data/advertisement/notice_type'
import { useNotices } from '../composable/notice'

const { add, fetch } = useNotices()
const defaultNewNotice = {
  title: '',
  url: '',
  isActive: true,
  createdAt: '',
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<notice_type | null>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'save'])

const newNotice = ref<any>({ ...defaultNewNotice })

watch(
  () => props.modelValue,
  (noticeToEdit) => {
    if (noticeToEdit) {
      newNotice.value = { ...noticeToEdit }
    } else {
      newNotice.value = { ...defaultNewNotice }
    }
  },
  { immediate: true },
)

const form = useForm('add-notice-form')

const onSave = () => {
  if (form.validate()) {
    if (newNotice.value.id) {
      // 如果有ID，表示是编辑操作
      // 这里可以调用修改公告的方法，例如 change(newNotice.value)
    } else {
      add(newNotice.value)
    }
    fetch()
    emit('close')
  }
}

const onCancel = () => {
  emit('close')
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-notice-form" class="flex-col justify-start items-start inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-2 flex">
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newNotice.title" label="标题" class="w-full" :rules="[validators.required]" name="title" />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaInput
          v-model="newNotice.url"
          label="URL"
          class="w-full"
          :rules="[validators.required, validators.url]"
          name="url"
        />
      </div>

      <div class="flex gap-4 flex-col w-full">
        <VaSwitch v-model="newNotice.isActive" label="是否激活" />
      </div>

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="onCancel">取消</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">保存</VaButton>
      </div>
    </div>
  </VaForm>
</template>
