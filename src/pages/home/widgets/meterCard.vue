<template>
  <VaCard >
    
    <VaCardContent class=" hover:cursor-pointer hover:opacity-50">
      <section>
        <header class="flex items-center justify-between ">
          <div class="text-lg font-semibold  truncate">{{ name }}</div>
          <div class="p-1 rounded" :style="{
            backgroundColor: iconBackground,
            color: iconColor,
          }">
            <slot name="icon"></slot>
          </div>
        </header>
        <div>
          <p class="mb-2 truncate">{{ remark }}</p>
          <p class="text-xs text-secondary">
            <span :class="changeClass">
              <template v-if="up">↑</template>
              <template v-else>↓</template>
              {{ changeText }}
            </span>
            since last month
          </p>
        </div>
      </section>
    </VaCardContent>
    <VaCardTitle class="flex justify-end">{{ id }}</VaCardTitle>

  </VaCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { VaCard, VaCardContent } from 'vuestic-ui'

const props = defineProps<{
  id: number
  name: string
  remark: string
  changeDirection: 'up' | 'down'
  iconBackground: string
  iconColor: string
}>()

const changeClass = computed(() => ({
  'text-success': props.changeDirection === 'up',
  'text-red-600': props.changeDirection === 'down',
}))

const up = computed(() => props.changeDirection === 'up')
const changeText = computed(() => (props.changeDirection === 'up' ? '+5%' : '-3%')) // Example change text
</script>

<style lang="scss" scoped>

</style>