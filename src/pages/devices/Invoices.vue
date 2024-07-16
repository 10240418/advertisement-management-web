<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useToast } from 'vuestic-ui'
import { getLogs } from '../../apis/device'

const toast = useToast()

const minNumberOfInvoices = 7
const maxNumberOfInvoices = 20

const numberOfInvoicesInVIew = ref(minNumberOfInvoices)

const increaseNumberOfInvoices = (step = 10) => {
  numberOfInvoicesInVIew.value = Math.min(numberOfInvoicesInVIew.value + step, maxNumberOfInvoices)
}

// Logs
const logs = ref([])
const loadLogs = () => {
  getLogs()
    .then((response) => {
      logs.value = response.data.data
    })
    .catch((error) => {
      toast.init({
        message: error.response.data.message,
        color: 'danger',
      })
    })
}
loadLogs()


</script>

<template>
  <VaCard class="mb-6">
    <VaCardContent>
      <template v-for="(item, index) in logs" :key="item.id">
        <div class="flex items-center justify-start">
          <div class="flex items-center w-48">
            {{ item[0] }}
          </div>
          <div class="w-40">
            {{ item[1] }}
          </div>
          <div>
            {{ item[2] }}
          </div>
        </div>

        <VaDivider v-if="index !== logs.length - 1" />
      </template>
    </VaCardContent>
    <VaCardActions vertical class="flex flex-wrap content-center mt-4">
      <VaButton v-if="numberOfInvoicesInVIew < maxNumberOfInvoices" preset="primary"
        @click="increaseNumberOfInvoices()">
        Show more
      </VaButton>
      <VaButton v-else preset="primary" @click="numberOfInvoicesInVIew = minNumberOfInvoices">Show less </VaButton>
    </VaCardActions>
  </VaCard>
</template>
