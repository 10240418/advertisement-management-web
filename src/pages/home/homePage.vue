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
      <div class="flex flex-col  gap-2 mb-2">
        <header class="flex  flex-row gap-4 w-full ">
          <totalPage></totalPage>
          <logsCard></logsCard>
        </header>

        <section>
          <meterTable></meterTable>
        </section>
        
      
      </div>

      
    </VaCardContent>

   
  </VaCard>
</template>
./composables/home