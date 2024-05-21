<template>
  <h1 class="h1">Billing information</h1>

  <VaSkeletonGroup v-if="cardStore.loading">
    <VaSkeleton height="360px" variant="squared" />
  </VaSkeletonGroup>

  <template v-else>
    <Invoices />
  </template>
</template>

<script lang="ts" setup>
import { usePaymentCardsStore } from '../../stores/payment-cards'
import Invoices from './Invoices.vue'

const cardStore = usePaymentCardsStore()
cardStore.load()
</script>
