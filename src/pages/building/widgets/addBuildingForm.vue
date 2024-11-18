<template>
  <VaForm v-slot="{ isValid }" ref="edit-advertisement-form" class="edit-advertisement-form">
    <div class="flex flex-col gap-4">
      <VaSelect
        v-model="selectValue"
        label="Bind New Advertisement"
        :options="advertisementOptions"
        :value-by="(advertisementOption: any) => advertisementOption.ID"
        placeholder="Select a advertisement"
        multiple
      />

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
import { building_type } from '@/data/advertisement/building_type'
import { advertisement_type } from '@/data/advertisement/advertisement_type'
import { addAdsToBuilding } from '@/apis/advertisement/ad_building'
import { getAds } from '@/apis/advertisement/ad_advertisement'
const toast = useToast()
const error = ref<string | null>(null)

const props = defineProps({
  building: { type: Object as PropType<building_type | null>, required: true },
})

const pagination = ref({
  pageNum: 1,
  pageSize: 50,
  desc: false,
})

//advertisement
const advertisements = ref<advertisement_type[]>([])
const advertisementOptions = ref<string[]>([]) // 修改为字符串数组
const selectValue = ref<string[]>([]) // 修改为字符串数组
const advertisementNeedRemove = ref<any>([])

const fetchadvertisements = async () => {
  try {
    // const res = await getAdvertisementsByBuilding(props.building?.ID, pagination.value)
    const res = await getAds(pagination.value)
    advertisements.value = res.data.data
    console.log(advertisements.value)
    advertisementOptions.value = advertisements.value.map(
      (advertisement) => `${advertisement.ID} Floor: ${advertisement.title} advertisement: ${advertisement.status}`,
    )
    //去掉 advertisement.advertisements
    advertisementNeedRemove.value = props.building?.advertisements_buildings?.map(
      (adToBuilding: any) =>
        `${adToBuilding.Advertisement.ID} Floor: ${adToBuilding.Advertisement.title} advertisement: ${adToBuilding.Advertisement.status}`,
    )
    // 过滤掉已绑定的单位
    advertisementOptions.value = advertisementOptions.value.filter(
      (option) => !advertisementNeedRemove.value.includes(option),
    )
    selectValue.value = advertisementOptions.value.length > 0 ? [advertisementOptions.value[0]] : []
  } catch (error: any) {
    toast.init({ message: `Error: ${error.message}`, color: 'danger' })
    console.error(error)
  }
}
onBeforeMount(() => {
  fetchadvertisements()
})

const emit = defineEmits(['close', 'fetch'])

/**
 * 提取字符串数组中每个字符串开头的数字，并返回数字数组
 */
const extractLeadingNumbers = (options: string[]): number[] => {
  return options
    .map((option) => {
      const match = option.match(/^(\d+)/)
      return match ? Number(match[1]) : NaN
    })
    .filter((num) => !isNaN(num)) // 过滤掉无法转换为数字的值
}

const submit = () => {
  if (selectValue.value.length > 0) {
    console.log(selectValue.value)

    // 直接传递数组，无需 split
    const selectedNumbers = extractLeadingNumbers(selectValue.value)
    console.log(selectedNumbers) // 根据你的需求进一步处理这些数字

    // 示例：调用 API 传递这些数字
    addAdsToBuilding(Number(props.building?.ID), selectedNumbers)
      .then(() => {
        toast.init({ message: 'Successfully bind advertisement', color: 'success' })
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
.edit-advertisement-form {
  display: flex;
  flex-direction: column;
}

.text-red-500 {
  color: #f56565;
}
</style>
