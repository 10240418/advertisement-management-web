<script setup lang="ts">
import { ref } from 'vue'
import VaTimelineItem from '../../../components/va-timeline-item.vue'

const notifications = ref([
  {
    toilet: {
      id: 1,
      name: 'Toilet 1',
    },
    device: {
      id: 1,
      name: 'Device 1',
    },
  },
  {
    toilet: {
      id: 2,
      name: 'Toilet 1',
    },
    device: {
      id: 2,
      name: 'Device 2',
    },
  },
  {
    toilet: {
      id: 3,
      name: 'Toilet 1',
    },
    device: {
      id: 3,
      name: 'Device 3',
    },
  },
  {
    toilet: {
      id: 4,
      name: 'Toilet 4',
    },
    device: {
      id: 4,
      name: 'Device 4',
    },
  },
  {
    toilet: {
      id: 5,
      name: 'Toilet 5',
    },
    device: {
      id: 5,
      name: 'Device 5',
    },
  },
  {
    toilet: {
      id: 6,
      name: 'Toilet 6',
    },
    device: {
      id: 6,
      name: 'Device 6',
    },
  },
  {
    toilet: {
      id: 7,
      name: 'Toilet 7',
    },
    device: {
      id: 7,
      name: 'Device 7',
    },
  },
])
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">Notifications</h1>
    </VaCardTitle>
    <VaCardContent>
      <table class="mt-4">
        <tbody>
          <VaTimelineItem date="25m ago" v-for="notification in notifications">
            Toilet
            <RouterLink
              class="va-link font-semibold"
              :to="{ name: 'toiletDetail', params: { id: notification.toilet.id } }"
              >{{ notification.toilet.name }}</RouterLink
            >
            's device
            <RouterLink class="va-link font-semibold" to="/device/{{ notification.device.id }}">{{
              notification.device.name
            }}</RouterLink>
            updated
          </VaTimelineItem>
        </tbody>
      </table>
    </VaCardContent>
  </VaCard>
</template>
