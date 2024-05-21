<template>
  <h1 class="page-title">xxx Toilet</h1>


  <VaCard class="mb-6">
    <VaCardContent>
      <div class="text-2xl font-bold leading-5 mb-6">Billing address</div>
      <BillingAddressList />
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import BillingAddressList from './widgets/billing-address/BillingAddressList.vue'
</script>
