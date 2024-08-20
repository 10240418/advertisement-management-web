<template>
  <div>
    <!-- Reading Interval Section -->
    <div
      class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
    >
      <p class="font-bold w-[200px]">Reading Interval</p>
      <div class="flex-1">
        <div class="max-w-[748px]">
          {{ preferences?.readingInterval }}
        </div>
      </div>
      <VaButton
        class="w-fit h-fit"
        preset="primary"
        @click="showModal = true"
      > Edit </VaButton>
    </div>

    <!-- Mobile Section -->
    <div
      class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
    >
      <p class="font-bold w-[200px]">Mobile</p>
      <div class="flex-1">
        <div class="max-w-[748px]">
          {{ preferences?.mobile }}
        </div>
      </div>
    </div>

    <!-- Location Section -->
    <div
      class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
    >
      <p class="font-bold w-[200px]">Location</p>
      <div class="flex-1">
        <div class="max-w-[748px]">
          {{ preferences?.location }}
        </div>
      </div>
    </div>

    <!-- Language Section -->
    <div
      class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
    >
      <p class="font-bold w-[200px]">Language</p>
      <div class="flex-1">
        <div class="max-w-[748px]">
          {{ preferences?.language }}
        </div>
      </div>
    </div>

    <!-- Time Zone Section -->
    <div
      class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
    >
      <p class="font-bold w-[200px]">Time Zone</p>
      <div class="flex-1">
        <div class="max-w-[748px]">
          {{ preferences?.timezone }}
        </div>
      </div>
    </div>

    <!-- Modal -->
    <VaModal
      v-model="showModal"
      width="500px"
      mobile-fullscreen
      close-button
      hide-default-actions
    >
      <h1 class="va-h5">Edit Perference</h1>
      <div class="flex flex-col space-y-4">
        <!-- Reading Interval Input -->
        <div class="flex flex-col">
          <VaListLabel class="flex justify-start">Reading Interval</VaListLabel>
          <VaInput
            v-model="formData.readingInterval"
            type="number"
            placeholder="Enter reading interval"
          />
        </div>

        <!-- Mobile Input -->
        <div class="flex flex-col">
          <VaListLabel class="flex justify-start">Mobile</VaListLabel>
          <VaInput
            v-model="formData.mobile"
            type="text"
            placeholder="Enter mobile number"
          />
        </div>

        <!-- Location Input -->
        <div class="flex flex-col">
          <VaListLabel class="flex justify-start">Location</VaListLabel>
          <VaInput
            v-model="formData.location"
            type="text"
            placeholder="Enter location"
          />
        </div>

        <!-- Language Select -->
        <div class="flex flex-col flex-start">
          <VaListLabel class="flex justify-start">Language</VaListLabel>
          <VaSelect
            v-model="selectLanguage"
            :options="languageOptions"
            track-by="value"
            text-by="label"
          />
        </div>

        <!-- Time Zone Select -->
        <div class="flex flex-col">
          <VaListLabel class="flex justify-start">Time Zone</VaListLabel>
          <VaSelect
            v-model="selectTimeZone"
            :options="timeZoneOptions"
            track-by="value"
            text-by="label"
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-2">
          <VaButton
            preset="secondary"
            color="secondary"
            @click="showModal = false"
          >Cancel</VaButton>
          <VaButton @click="savePreferences">Save</VaButton>
        </div>
      </div>
    </VaModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { fetchPreferences, updatePreferences } from '@/apis/auth'
import { VaButton, VaInput, VaSelect, VaModal } from 'vuestic-ui'
import { useToast } from 'vuestic-ui'

type PreferencesType = {
  readingInterval: number
  mobile: string
  location: string
  language: string
  timezone: string
}

const languageOptions = [
  { label: '繁體中文（香港）', value: 'zh-HK' },
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-UK' },
]

const timeZoneOptions = [
  { label: 'Asia/Hong_Kong', value: 'Asia/Hong_Kong' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'Asia/Taipei', value: 'Asia/Taipei' },
  { label: 'Asia/Singapore', value: 'Asia/Singapore' },
  { label: 'America/New_York', value: 'America/New_York' },
  { label: 'Australia/Sydney', value: 'Australia/Sydney' },
]

const preferences = ref<PreferencesType | null>(null)
const showModal = ref(false)
const selectLanguage = ref()
const selectTimeZone = ref()
const toast = useToast()

const formData = ref<any>({
  readingInterval: 0,
  mobile: '',
  location: '',
  language: '',
  timezone: '',
})

const fetch = async () => {
  try {
    const res = await fetchPreferences()
    preferences.value = res.data.data
    formData.value = { ...preferences.value }
    languageOptions.map((item) => {
      if (item.value === preferences.value?.language) {
        selectLanguage.value = item
      }
    })
    timeZoneOptions.map((item) => {
      if (item.value === preferences.value?.timezone) {
        selectTimeZone.value = item
      }
    })
  } catch (error) {
    console.error('Error fetching preferences:', error)
  }
}

const savePreferences = async () => {
  try {
    await updatePreferences({
      readingInterval: Number(formData.value.readingInterval),
      mobile: formData.value.mobile,
      location: formData.value.location,
      language: selectLanguage.value.value,
      timezone: selectTimeZone.value.value,
    })
    await fetch()
    showModal.value = false
    toast.init({ message: 'Preferences saved successfully', color: 'success' })
  } catch (error) {
    toast.init({ message: `${error}`, color: 'danger' })
    console.error('Error saving preferences:', error)
  }
}

onBeforeMount(() => {
  fetch()
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
