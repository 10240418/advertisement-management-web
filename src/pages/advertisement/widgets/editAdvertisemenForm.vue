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

      <!-- video_duration -->
      <VaInput
        v-model.number="form.video_duration"
        label="Video Duration"
        placeholder="Enter video duration"
        type="number"
        name="video_duration"
      />
      <!-- 新增部分开始 -->
      <div class="flex gap-2 flex-col w-full">
        <!-- image url -->
        <img v-if="form.image_url" :src="form.image_url" alt="" />
        <img v-if="coverImg" ref="coverImg" class="mt10" fit="cover" :src="coverImg.src" style="width: 100%" />
        <input ref="coverInput" type="file" accept="image/*" hidden @change="onAvatarUpload" />
        <VaButton color="primary" preset="filled" @click="coverInput.click()"> updateCover </VaButton>
      </div>
      <div class="flex gap-2 flex-col w-full">
        <!-- video url -->
        <video v-if="form.video_url" :src="form.video_url" controls width="300"></video>
        <video v-if="video" ref="video" :src="video.src" controls width="300"></video>
        <input ref="videoInput" type="file" hidden accept="video/*" @change="uploadVideo" />
        <VaButton color="primary" preset="filled" @click="videoInput.click()"> 上传视频 </VaButton>
      </div>

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
import { getUploadPolicy } from '@/apis/advertisement/ad_upload'
import axios from 'axios'
const props = defineProps({
  Advertisement: { type: Object as PropType<Advertisement_type | null>, required: true },
})
const videoInput = ref<any>(null)
const videoFile = ref<any>(null)
const video = ref<any>(null)

const coverInput = ref<any>(null)
const coverImg = ref<any>(null)
const coverFile = ref<any>(null)

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
const submit = async () => {
  // 上传封面
  if (coverFile.value) {
    await getUploadPolicy({
      upload_dir: 'advertisement/img',
      callback_url: 'http://localhost:8080/api/v1/advertisement/upload_callback',
    }).then(async (res) => {
      console.log(res)
      const policy = res.data
      const formData = new FormData()
      formData.append('key', policy.dir + coverFile.value.name)
      formData.append('policy', policy.policy)
      formData.append('OSSAccessKeyId', policy.accessid)
      formData.append('success_action_status', '200')
      formData.append('signature', policy.signature)
      formData.append('file', coverFile.value)
      await axios.post(policy.host, formData).then((res) => {
        if (res.status === 200) {
          form.value.image_url = policy.host + '/' + policy.dir + coverFile.value.name
        }
      })
    })
    // form.value.image_url = coverFile.value.name
  }
  // 上传视频
  if (videoFile.value) {
    await getUploadPolicy({
      upload_dir: 'advertisement/video',
      callback_url: 'http://localhost:8080/api/v1/advertisement/upload_callback',
    }).then(async (res) => {
      const policy = res.data
      const formData = new FormData()
      formData.append('key', policy.dir + videoFile.value.name)
      formData.append('policy', policy.policy)
      formData.append('OSSAccessKeyId', policy.accessid)
      formData.append('success_action_status', '200')
      formData.append('signature', policy.signature)
      formData.append('file', videoFile.value)
      await axios.post(policy.host, formData).then((res) => {
        if (res.status === 200) {
          form.value.video_url = policy.host + '/' + policy.dir + videoFile.value.name
        }
      })
    })
  }

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
    window.location.reload()
    emit('close')
  }
}
const onCloseWindow = () => {
  emit('close')
}

const uploadVideo = () => {
  if (videoInput.value == null || videoInput.value.files.length === 0) {
    return
  }
  videoFile.value = videoInput.value.files[0]

  const reader = new FileReader()
  reader.readAsDataURL(videoFile.value)
  reader.onload = () => {
    video.value.src = reader.result
  }
}

// 图片上传
const onAvatarUpload = () => {
  if (coverInput.value == null || coverInput.value.files.length === 0) {
    return
  }
  coverFile.value = coverInput.value.files[0]

  const reader = new FileReader()
  reader.readAsDataURL(coverFile.value)
  reader.onload = () => {
    coverImg.value.src = reader.result
  }
}
</script>

<style scoped>
.edit-advertisement-form {
  display: flex;
  flex-direction: column;
}
</style>
