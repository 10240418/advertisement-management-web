<template>
  <VaCard>
    <div>
      <VaCardContent>
        <div class="flex flex-col">
          <div
            v-for="(label, index) in labels"
            :key="index"
            class="flex flex-row gap-2 items-start"
          >
            <div class="flex justify-start items-start">
              <VaListLabel class="flex flex-start">{{ label }}</VaListLabel>
            </div>
            <div class="flex absolute ml-[95px]">
              <!-- Adjusted margin for better alignment -->
              <span
                :class="[indexWeight > index ? fontWeight : '', 'flex flex-start text-[16px] truncate']"
              >
                {{ datas[index] }}
              </span>
            </div>
          </div>
        </div>
        <slot />
      </VaCardContent>
    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  labels: { type: Array as PropType<string[]>, default: () => [] },
  datas: { type: Array as PropType<any[]>, default: () => [] },
  fontWeight: { type: String, default: 'font-bold' },
  indexWeight: { type: Number, default: 0 },
})
</script>
