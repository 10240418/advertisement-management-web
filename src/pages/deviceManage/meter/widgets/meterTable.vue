<template>
  <VaDataTable :columns="columns" :items="currentPageData" :loading="props.loading"
    v-model:sort-by="props.sorting.sortBy" v-model:sorting-order="props.sorting.sortingOrder">
    <!-- <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">{{ rowData.name }}</div>
    </template>

<template #cell(ipAddr)="{ rowData }">
      <div class="ellipsis max-w-[230px]">{{ rowData.ipAddr }}</div>
    </template> -->

    <template #cell(actions)="{ rowData }" class="overflow-y-scroll">
      <VaPopover placement="bottom" trigger="click" color="backgroundSecondary">
        <div class="flex  items-center relative hover:bg-slate-400 rounded-[4px]"
          @click.stop="showContent(rowData)">
          <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" />
        </div>
        <template #body>
          <transition name="fade">
            <div v-show="showContentMeter?.id === rowData.id"
              class="tooltip-content flex flex-col justify-center z-999 items-center relative border border-solid p-2 rounded-md shadow-lg">
              <VaButton preset="secondary" size="small" icon="mso-edit" aria-label="Edit meter"
                @click="$emit('edit-meter', rowData as any)" class="w-full justify-start">
                <span>Edit</span>
              </VaButton>
              <VaButton preset="secondary" size="small" icon="mso-delete" color="danger" aria-label="Delete meter"
                @click="onMeterDelete(rowData)" class="w-full">
                <span>Delete</span>
              </VaButton>
            </div>
          </transition>
        </template>
      </VaPopover>
    </template>
  </VaDataTable>
  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>Total: {{ props.pagination.total }} </b>
      Page Number:
      <VaInput v-model="props.pagination.pageNum" class="!w-16" />
      Page Size:
      <VaSelect v-model="props.pagination.pageSize" class="!w-20" :options="[5, 10, 20, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton preset="secondary" icon="va-arrow-left" aria-label="Previous page"
        :disabled="props.pagination.pageNum === 1" @click="props.pagination.pageNum--" />
      <VaButton class="mr-2" preset="secondary" icon="va-arrow-right" aria-label="Next page"
        :disabled="props.pagination.pageNum === totalPages" @click="props.pagination.pageNum++" />
      <VaPagination v-model="props.pagination.pageNum" buttons-preset="secondary" :pages="totalPages" :visible-pages="5"
        :boundary-links="false" :direction-links="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, toRef, watch, ref, PropType } from 'vue';
import { defineVaDataTableColumns, useModal } from 'vuestic-ui';
import { meter_type } from '../../../../data/meter';

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Remark', key: 'remark', sortable: false },
  { label: 'Type', key: 'type', sortable: true },
  { label: 'ModbusAddr', key: 'modbusAddr', sortable: true },
  { label: 'UnitId', key: 'unitId', sortable: true },
  { label: 'GatewayId', key: 'gatewayId', sortable: true },
  { label: 'Actions', key: 'actions', sortable: false },
]);

const props = defineProps({
  meters: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<any>, required: true },
  sorting: { type: Object as PropType<any>, required: true },
});

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize));

const emit = defineEmits(['edit-meter', 'delete-meter', 'fetch-meter']);

const onMeterDelete = (meter: any) => {
  emit('delete-meter', meter);
};

watch(
  ()=>[props.pagination.pageNum, props.pagination.pageSize, props.sorting.sortBy, props.sorting.sortingOrder],
  ()=>{
    if(props.pagination.total < props.pagination.pageSize * (props.pagination.pageNum - 1)){
      props.pagination.pageNum = 1;
    }
    console.log(props.sorting.sortingOrder)
    console.log(props.sorting.sortBy)
    emit('fetch-meter',{pageNum:props.pagination.pageNum,pageSize:props.pagination.pageSize});
  }
);
const currentPageData = computed(() => {
  let metersArray: any = []

  //检查是否为数组，如果不是，则包裹在数组中
  if (Array.isArray(props.meters)) {
    metersArray = props.meters;
  } else {
    metersArray = [props.meters];
  }
  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize;
  const endIndex = startIndex + props.pagination.pageSize;

  if(metersArray.length <= props.pagination.pageSize) return metersArray;
  else return metersArray.slice(startIndex, endIndex);
});

const showContentMeter = ref<meter_type | null>(null);
const showContent = (meter: any) => {
  showContentMeter.value = showContentMeter.value?.id === meter.id ? null : meter;
};
</script>

<style scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
