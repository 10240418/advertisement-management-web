<template>
  <tr class="flex flex-row justify-between gap-1 ">
    <div class="flex flex-row gap-2">
      <td class="flex flex-col justify-center items-center">
        <div>
          <VaIcon name="schedule" size="22px" color="backgroundBorder" />
        </div>
        <div class="flex w-[2px] bg-slate-200 h-full"></div>
      </td>

      <td class="va-timeline-item__content-cell  justify-center items-center">
        <div class="flex flex-row justify-center items-center gap-2">
          <slot />
        </div>
      </td>
    </div>

    <td class="va-timeline-item__date-cell  ">
      <slot name="date">
        {{ $props.date }}
      </slot>
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps({
  date: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.va-timeline-item {
  &__date-cell {
    vertical-align: top;
    color: var(--va-secondary);
    white-space: nowrap;
    padding-left: 0.5rem;
    text-align: end;
  }

}
</style>
