<template>
  <VaForm v-slot="{ isValid }" ref="edit-building-form" class="edit-building-form">
    <div class="flex flex-col gap-4">
      <VaSelect
        v-model="selectValue"
        label="Bind New building"
        :options="buildingOptions"
        :value-by="(buildingOption: any) => buildingOption.ID"
        placeholder="Select a building"
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
import { Advertisement_type } from '@/data/advertisement/advertisement_type'
import { building_type } from '@/data/advertisement/building_type'
import { getBuildings } from '@/apis/advertisement/ad_building'
import { addBuildingsToAd } from '@/apis/advertisement/ad_advertisement'
const toast = useToast()
const error = ref<string | null>(null)

const props = defineProps({
  advertisement: { type: Object as PropType<Advertisement_type | null>, required: true },
})

const pagination = ref({
  pageNum: 1,
  pageSize: 50,
  desc: false,
})

//building
const buildings = ref<building_type[]>([])
const buildingOptions = ref<string[]>([]) // 修改为字符串数组
const selectValue = ref<string[]>([]) // 修改为字符串数组
const buildingNeedRemove = ref<string[]>([])

const fetchbuildings = async () => {
  try {
    const res = await getBuildings(pagination.value)
    console.log(res)
    buildings.value = res.data.data
    console.log(buildings.value)

    buildingOptions.value = buildings.value.map(
      (building) => `${building.ID} title: ${building.name} address: ${building.address}`,
    )

    buildingNeedRemove.value =
      props.advertisement?.advertisements_buildings?.map(
        (adToBuilding: any) =>
          `${adToBuilding.Advertisement.ID} title: ${adToBuilding.Advertisement.title} status: ${adToBuilding.Advertisement.status}`,
      ) ?? []

    buildingOptions.value = buildingOptions.value.filter((option) => !buildingNeedRemove.value.includes(option))
    selectValue.value = buildingOptions.value.length > 0 ? [buildingOptions.value[0]] : []
  } catch (error: any) {
    toast.init({ message: `Error: ${error.message}`, color: 'danger' })
    console.error(error)
  }
}
onBeforeMount(() => {
  fetchbuildings()
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
    // 直接传递数组，无需 split
    const selectedNumbers = extractLeadingNumbers(selectValue.value)
    console.log(props.advertisement)

    // 示例：调用 API 传递这些数字
    addBuildingsToAd(Number(props.advertisement?.ID), selectedNumbers)
      .then(() => {
        toast.init({ message: 'Successfully bind building', color: 'success' })
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
.edit-building-form {
  display: flex;
  flex-direction: column;
}

.text-red-500 {
  color: #f56565;
}
</style>
