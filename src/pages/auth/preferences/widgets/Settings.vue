<template>
  <div class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">ReadingInterval</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ preferences?.readingInterval }}
      </div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" @click=""> Edit </VaButton>
  </div>

  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">Mobile</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ preferences?.mobile }}
      </div>
    </div>
  </div>
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">Location</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ preferences?.location }}
      </div>
    </div>
  </div>
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">Language</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ preferences?.language }}
      </div>
    </div>
  </div>
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">TimeZone</p>
    <div class="max-w-[748px]">
      {{ preferences?.timezone }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { buttonStyles } from '../styles'
import { fetchPreferences } from '@/apis/auth'
import { ref, onBeforeMount } from 'vue'
type preferences_type = {
  readingInterval: number
  mobile: string
  location: string
  language: string
  timezone: string
}

const preferences = ref<preferences_type>()
const fetch = async () => {
  fetchPreferences().then((res) => {
    preferences.value = res.data.data
  })
}
onBeforeMount(() => {
  fetch()
})
</script>
