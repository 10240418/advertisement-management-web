<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import logsCard from './widgets/logsCard.vue'
import meterTable from './widgets/meterTable.vue'
import { useModal, useToast } from 'vuestic-ui'
import { useGlobalStore } from '@/stores/global-store'
import totalPage from './widgets/totalCard.vue'



</script>

<template>


  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2">
        <header class="w-40% h-[120px] border border-solid shadow-lg">
          <totalPage></totalPage>
        </header>
        <section></section>
        
      
      </div>

      
    </VaCardContent>

   
  </VaCard>
</template>
./composables/home