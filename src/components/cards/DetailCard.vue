<template>
    <VaCard>
        <div>
            <VaCardTitle>{{labels[0]}}</VaCardTitle>
            <VaCardContent>
                <!-- no object in dataObjects -->
                <div class="flex flex-row gap-2">
                    <div class="flex flex-col">
                        <div v-for="(label,index) in labels">
                            <VaListLabel class="flex flex-start">{{label}}</VaListLabel>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div v-for="(data,index) in datas">
                            <VaListLabel class="flex flex-start">{{data}}</VaListLabel>
                        </div>
                    </div>
                </div>

                <div v-if="dataObjectsShowInCard.length > 0" class="flex flex-row gap-2">
                    <div class="flex flex-col">
                        <div v-for="(label,index) in labelsObjectShowInCard">
                            <VaListLabel class="flex flex-start">{{label}}</VaListLabel>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div v-for="(data,index) in dataObjectsShowInCard">
                            <VaListLabel class="flex flex-start">{{data.name}}</VaListLabel>
                            <VaPopover color="backgroundSecondary" trigger="click"
                            :style="{ '--va-popover-content-background-color': '#ffffff', }">
                            <VaIcon :name="arrowDirection(isShowProperties[index])" size="20px"
                                @click="isShowProperties[index] = !isShowProperties[index]" />
                            <template #body>
<!--  -->
                            </template>
                        </VaPopover>
                        </div>
                    </div>
                    
                </div>
            </VaCardContent>
        </div>
    </VaCard>
</template> 
<script lang="ts" setup>
import { defineProps ,PropType,watch,ref} from 'vue'
import { useForm, useToast } from 'vuestic-ui';

const props = defineProps({
    labels:{
        type:Array as PropType<string[]>,
        required:true
    },
    datas:{
        type:Array as PropType<any[]>,
        required:true
    },
    labelsObject:{
        type:Array as PropType<string[]>,
        required:true
    },
    dataObjects:{
        type:Array as PropType<any[]>,
        required:true
    }
})
const toast = useToast()
const labelsShowInCard = ref<any>([])
const labelsObjectShowInCard = ref<any>([])
const datasShowInCard = ref<any>([])
const dataObjectsShowInCard = ref<any>([])
const isShowProperties = ref<boolean[]>([])
const arrowDirection = (state: boolean) => (state ? 'va-arrow-up' : 'va-arrow-down');
watch([props.datas,props.labels,props.dataObjects],()=>{
    labelsShowInCard.value = props.labels
    datasShowInCard.value = props.datas
    dataObjectsShowInCard.value = props.dataObjects
    labelsObjectShowInCard.value = props.labelsObject
    isShowProperties.value = props.dataObjects.map((dataObject:any)=>{
        return false;
    })
})

</script>
