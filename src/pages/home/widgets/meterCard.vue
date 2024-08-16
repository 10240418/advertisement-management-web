<template>
  <VaCard>
    <VaCardContent class="hover:cursor-pointer hover:opacity-50">
      <section>
        <header class="flex items-center justify-between">
          <div class="text-lg font-semibold truncate">{{ name }}</div>
          <div
            class="p-1 rounded"
            :style="{
              backgroundColor: iconBackground,
              color: iconColor,
            }"
          >
            <slot name="icon"></slot>
          </div>
        </header>
        <div>
          <!-- <p v-if="remark" class="mb-2 truncate h-[20px]">{{ remark }}</p>
          <p v-else class="mb-2 truncate h-[20px] text"> </p> -->
          <div class="flex flex-row">
            <span>Switch:</span>
            <span v-if="props.switch" class="text-green-500">Open</span>
            <span v-else class="text-slate-500">Closed</span>
          </div>
          <div class="flex flex-row">
            <span v-if="type === 0">Valve:</span>
            <span v-if="type === 1">powerEnergy: </span>
            <span class="text-blue-500">{{ amountShowInCard }}</span>
          </div>
          <p class="text-xs text-secondary flex flex-row">
            since last
            <span v-if="undatedAtShowInCard === ''">:{{ undatedAtShowInCard }}</span>
            <span v-else>:</span>
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
  type: number

  amount: number
  switch: boolean
  updatedAt: string
}>()

const formattedDate = (isoDate: string): string => {
  const date = new Date(isoDate)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${year}/${month}/${day} ${hour}:${minute}`
}
//amount 保留两位小数
const amountShowInCard = computed(() => {
  const num = props.amount
  const numStr = num?.toFixed(2)
  return numStr
})

const undatedAtShowInCard = formattedDate(props.updatedAt)
</script>

<style lang="scss" scoped></style>
