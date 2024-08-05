<template>
    <VaForm v-slot="{ isValid }" ref="edit-resident-form" class="edit-resident-form">
      <div class="flex flex-col gap-4">
        <!-- <VaSelect
          v-model="value"
          label="Add unit"
          :options="options"
          :track-by="(option:any) => option.id"
        /> -->
        <VaSelect
      v-model="value"
      class="mb-6"
      label="value by (function)"
      :options="options"
      :value-by="(option:any) => option.unit"
    />
        <div class="flex gap-2 justify-end mt-4">
          <VaButton preset="secondary" color="secondary" @click="onClose">Cancel</VaButton>
          <VaButton :disabled="!isValid" @click="submit">Save</VaButton>
        </div>
      </div>
    </VaForm>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, defineEmits, onBeforeMount, computed ,PropType,watch} from 'vue';
  import { useForm, useToast } from 'vuestic-ui';
  import { resident_user_type } from '@/data/resident_user';
  import { unit_type } from '@/data/unit';
  import { fetchUnitList } from '@/apis/unit';
  
  const toast = useToast();
  const error = ref<string | null>(null);
  
  const props = defineProps({
    resident: { type: Object as PropType<resident_user_type | null>, required: true },
    onClose: Function,
  });
  
  const panigation = ref({
    pageNum: 1,
    pageSize: 50,
    desc: false,
  });
  
  // 初始化units和options
  const units = ref<unit_type[]>([]);
  const options = ref<unit_type[]>([]);
  const value = ref<unit_type>()

  
  const fetchUnits = async () => {
    try {
      const res = await fetchUnitList(panigation.value);
      units.value = res.data.units;
      options.value = [...units.value]; // 设置 options 为单位列表
      value.value =options.value[0];
      console.log(options.value);
      console.log(value.value)
    } catch (err: any) {
      console.log(err);
      error.value = (err.message || 'Failed to fetch units') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
  };
  
  onBeforeMount(() => {
    fetchUnits();
  });
  
  const emit = defineEmits(['close']);
  const formInstance = useForm('edit-resident-form');
  
  const submit = () => {
    console.log(value.value)
    
  };
  watch(()=>value.value,()=>{
    console.log(value.value)
})
  
  const onClose = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .edit-resident-form {
    display: flex;
    flex-direction: column;
  }
  </style>
  