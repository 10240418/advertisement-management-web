<template>
  <tr class="va-timeline-item">
    <td class="va-timeline-item__icon-cell">
      <div class="va-timeline-item__icon">
        <VaIcon name="schedule" size="22px" color="backgroundBorder" />
      </div>
    </td>
    <td class="va-timeline-item__content-cell">
      <div class="va-timeline-item__content">
        <slot />
      </div>
    </td>
    <td class="va-timeline-item__date-cell">
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
  display: table-row;
  position: relative; /* Ensure the container has relative positioning */

  &__icon-cell {
    vertical-align: top;
    padding-right: 1rem;
    position: relative; /* Ensure cell has relative positioning */
  }

  &__icon {
    position: relative;
    width: 24px;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 100%; /* Ensure it spans the full height of the parent */
      background: var(--va-background-border);
      left: 50%;
      transform: translateX(-50%);
      top: 0; /* Align the top of the line with the parent */
    }
  }

  &__content {
    margin-bottom: 1rem;
  }

  &__content-cell {
    width: 100%;
  }

  &__date-cell {
    vertical-align: top;
    color: var(--va-secondary);
    white-space: nowrap;
    padding-left: 0.5rem;
    text-align: end;
  }

  &:last-child {
    .va-timeline-item__icon::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 100%; /* Ensure it spans the full height of the parent */
      background: var(--va-background-border);
      left: 50%;
      transform: translateX(-50%);
      top: 100%; /* Align the top of the line with the parent */
    }
  }
}

</style>
