<template>
  <div class="flex flex-col space-y-6 md:space-y-4">
    <h1 class="page-title">Settings</h1>
    <div class="flex flex-col p-4 space-y-4 bg-backgroundSecondary rounded-lg">
      <h3 class="h3">General preferences</h3>
      <preferences />

    </div>
    <div class="flex flex-col p-4 space-y-4 bg-backgroundSecondary rounded-lg">
      <h3 class="h3">Theme</h3>
      <ThemeSwitcher />
    </div>
  </div>
 
</template>
<script lang="ts" setup>
import LanguageSwitcher from './widgets/languageSwitcher.vue'
import ThemeSwitcher from './widgets/themeSwitcher.vue'
import preferences from './widgets/preferences.vue'
import { ref } from 'vue'
const showModal = ref(false)
</script>

