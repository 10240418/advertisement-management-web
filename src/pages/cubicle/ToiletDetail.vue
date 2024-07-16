<script lang="ts" setup>
import { useRoute } from 'vue-router';
import CubicleList from './widgets/CubicleList.vue'
import { ref } from 'vue';
import { fetchToilet } from '../../apis/toilet';

const route = useRoute()

const toilet = ref<any>({})
const loadToilet = () => {
  fetchToilet(parseInt(route.params.id.toString(), 10)).then((res) => {
    toilet.value = res.data.data
  })
}
loadToilet()
</script>

<template>
  <h1 class="page-title">{{ toilet.name }}</h1>


  <VaCard class="mb-6">
    <VaCardContent>
      <div class="text-2xl font-bold leading-5 mb-6">Cubicles</div>
      <CubicleList :toilet-id="parseInt(route.params.id.toString(), 10)" />
    </VaCardContent>
  </VaCard>
</template>
