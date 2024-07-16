<script lang="ts" setup>
import CardListItem from './CubicleListItem.vue'
import CubicleForm from './CubicleForm.vue'
import { computed, ref } from 'vue'
import { useModal, useToast } from 'vuestic-ui'
import { useColors } from 'vuestic-ui'
import { fetchToilet, fetchCubicles, addCubicle, deleteCubicle } from '../../../apis/toilet'

const props = defineProps<{
  toiletId: number
}>()

const { confirm } = useModal()
const loading = ref(false)
const toast = useToast()

const showCreate = ref<boolean>(false)

const remove = async (cubicle: any) => {
  confirm({
    message: 'Are you really sure you want to delete this address?',
    size: 'small',
    maxWidth: '380px',
  }).then((ok) => {
    if (!ok) return
    deleteCubicle(cubicle.id).then(() => {
      loadToilet()
      toast.init({ message: 'Cubicle has been deleted', color: 'success' })
    }).catch(() => {
      toast.init({ message: 'Failed to delete cubicle', color: 'error' })
    })
  })
}

const { getColor, colorToRgba } = useColors()

// Cubicle
const toilet = ref<any>({})
const loadToilet = () => {
  fetchToilet(props.toiletId).then((res) => {
    toilet.value = res.data.data
  })
}
loadToilet()

// Add cubicle
const onSave = (cubicle: any) => {
  cubicle.toiletId = props.toiletId
  addCubicle(cubicle).then(() => {
    showCreate.value = false
    toast.init({ message: 'Cubicle has been added', color: 'success' })
    loadToilet()
  }).catch(() => {
    toast.init({ message: 'Failed to add cubicle', color: 'error' })
  })
}
</script>

<template>
  <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
    <template v-if="loading">
      <div v-for="i in 4" :key="i"
        class="min-h-[114px] p-4 rounded-lg border border-dashed border-backgroundBorder flex flex-row items-center gap-6">
        <div class="flex flex-col gap-2 flex-grow">
          <VaSkeleton class height="1.5rem" variant="text" width="10rem" />
          <div class="flex gap-4">
            <VaSkeleton height="3rem" variant="rounded" width="5rem" />
            <VaSkeleton :lines="2" variant="text" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <CardListItem v-for="cubicle in toilet.cubicles" :key="cubicle.id" :cubicle="cubicle" @remove="remove(cubicle)" />
      <div
        class="sm:min-h-[114px] p-4 rounded-lg border border-dashed border-primary flex flex-col sm:flex-row items-start sm:items-center gap-4"
        :style="{ backgroundColor: colorToRgba(getColor('primary'), 0.07) }">
        <div class="flex flex-col gap-2 flex-grow">
          <div class="text-lg font-bold leading-relaxed">Add cubicle</div>
          <div class="text-secondary text-sm leading-tight">
            Add a new cubicle to your account to manage your billing addresses.
          </div>
        </div>
        <VaButton class="flex-none w-full sm:w-auto" @click="showCreate = true">Add cubicle</VaButton>
      </div>
    </template>
  </div>

  <VaModal v-slot="{ cancel, ok }" v-model="showCreate" size="small" mobile-fullscreen close-button
    hide-default-actions>
    <h1 class="va-h5">Add cubicle</h1>
    <CubicleForm @save="onSave" />
  </VaModal>
</template>
