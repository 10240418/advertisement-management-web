<script setup lang="ts">
import { PropType } from 'vue'
import { Toilet } from '../types'
import ToiletStatusBadge from '../components/ToiletStatusBadge.vue'
import router from '../../../router'

defineProps({
  toilets: {
    type: Array as PropType<Toilet[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

defineEmits<{
  (event: 'edit', toilet: Toilet): void
  (event: 'delete', toilet: Toilet): void
}>()

const onToiletClick = () => {
  router.push({ name: 'cubicle' })
}
</script>

<template>
  <VaInnerLoading
    v-if="toilets.length > 0 || loading"
    :loading="loading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[4rem]"
  >
    <VaCard
      v-for="toilet in toilets"
      :key="toilet.name"
      :style="{ '--va-card-outlined-border': '1px solid var(--va-background-element)' }"
      outlined
    >
      <VaCardContent class="flex flex-col h-full">
        <div class="flex flex-col items-center gap-4 grow" @click="onToiletClick">
          <h4 class="va-h4 text-center self-stretch overflow-hidden line-clamp-2 text-ellipsis">
            {{ toilet.name }}
          </h4>
          <p>
            <span class="text-[var(--va-secondary)]">Location: </span>
            <span>{{ toilet.location }}</span>
          </p>
          <ToiletStatusBadge :status="toilet.status" />
        </div>
        <VaDivider class="my-3" />
        <div class="flex justify-between">
          <VaButton preset="secondary" icon="mso-edit" color="secondary" @click="$emit('edit', toilet)" />
          <VaButton preset="secondary" icon="mso-delete" color="danger" @click="$emit('delete', toilet)" />
        </div>
      </VaCardContent>
    </VaCard>
  </VaInnerLoading>
  <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">No toilets</div>
</template>
