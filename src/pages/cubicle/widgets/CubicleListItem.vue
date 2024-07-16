<script lang="ts" setup>
import { computed } from 'vue'

const emits = defineEmits(['edit', 'remove'])

const props = defineProps<{
  cubicle: any
}>()

const cubicle = computed(() => props.cubicle)
</script>

<template>
  <div
    class="min-h-[114px] p-4 rounded-lg border border-dashed border-backgroundBorder flex flex-col sm:flex-row items-start sm:items-center gap-6">
    <div class="flex flex-col gap-2 flex-grow">
      <div class="flex items-center">
        <div class="text-lg font-bold">{{ cubicle.name }}</div>
      </div>
      <div class="text-secondary leading-5">
        <div>ID: {{ cubicle.id }}</div>
        <div>{{ cubicle.remark }}</div>
      </div>
    </div>
    <div class="w-full sm:w-auto flex-none flex sm:block">
      <VaButton icon="mso-delete" preset="primary" aria-label="Remove" @click="emits('remove')" />
    </div>
  </div>
</template>
