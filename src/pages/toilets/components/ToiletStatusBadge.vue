<script setup lang="ts">
import { PropType } from 'vue'
import { Toilet } from '../types'

defineProps({
  status: {
    type: String as PropType<Toilet['status']>,
    required: true,
  },
})

const badgeColorMap: Record<Toilet['status'], string> = {
  'in use': 'primary',
  deploying: 'secondary',
  suspended: 'success',
}
</script>

<template>
  <VaBadge square :color="badgeColorMap[$props.status]" :text="$props.status.toUpperCase()" />
</template>
