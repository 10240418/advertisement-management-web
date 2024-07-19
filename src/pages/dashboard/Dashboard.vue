<script lang="ts" setup>
// import RevenueByLocationMap from './cards/RevenueByLocationMap.vue'
import DataSection from './DataSection.vue'
import RegionRevenue from './cards/RegionRevenue.vue'
import Timeline from './cards/Timeline.vue'
</script>

<template>
  <h1 class="page-title font-bold">Dashboard</h1>
  <section class="flex flex-col gap-4">
    <DataSection />
    <div class="flex flex-col md:flex-row gap-4">
      <!-- <RevenueByLocationMap class="w-full md:w-4/6" /> -->
      <RegionRevenue class="w-full md:w-2/6" />
    </div>
    <div class="flex flex-col md:flex-row gap-4">
      <Timeline class="w-full" />
    </div>
  </section>
</template>
