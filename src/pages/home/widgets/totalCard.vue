<template>
    <div class="flex flex-col gap-2 justify-end items-start border border-solid shadow-lg">
        <div class="flex flex-row gap-4 justify-center items-center">
            <VaListLabel>用户</VaListLabel>
             <span>{{globalStore.residentsTotal}}</span>
        </div>

        

    </div>
</template>
<script lang="ts" setup>
import { useModal, useToast } from 'vuestic-ui'
import { ref } from 'vue'
import { useGlobalStore } from '@/stores/global-store'
 

const globalStore = useGlobalStore();

 </script>