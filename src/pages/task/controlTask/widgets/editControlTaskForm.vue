<template>
  <VaForm v-slot="{ isValid }" ref="edit-control-task-form"
    class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex flex-col ">

      <div class="flex gap-4 flex-col w-full">
        <VaInput :disabled="newControlTask.id"   v-model="newControlTask.name" label="Name" class="w-full" :rules="[validators.required]" name="name" />
      </div>

      <div class="flex flex-row gap-2 w-full">
        <VaSelect v-model="selectTaskType" label="Type" class="w-full" :options="taskTypeOptions" />

        <VaSelect v-if="selectTaskType === 'Gateway Task'" v-model="selectGatewayValue" label="Gateway ID"
          class="w-full  truncate" :options="gatewayOptions" />
        <VaSelect v-else v-model="selectMeterValue" label="Meter ID" class="w-full  truncate" :options="meterOptions" />
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaSelect v-model="selectOperationValue" label="Operation" class="w-full" :options="operationOptions" />
      </div>
      <div class="flex gap-4 flex-row justify-center items-center w-full">
        <VaInput v-model="newControlTask.interval" label="Interval" class="w-full" type="number"
          :rules="[validators.required]" name="interval" :disabled="!isRepeatable" />
          <VaSwitch class="mt-[18px]" v-model="isRepeatable" label="Repeatable" />
          
      </div>
      <div class="flex gap-4 flex-col w-full">
        <VaInput v-model="newControlTask.startAt" label="Start Time" class="w-full" type="datetime-local"
          :rules="[validators.required]" name="startAt" />
      </div>

      <div class="flex gap-4 flex-col w-full mt-[18px]">
        <VaSwitch v-model="newControlTask.active" label="Active" />
      </div>
      <div class="flex gap-2 flex-row items-stretch justify-end w-full">
        <VaButton preset="secondary" color="secondary" @click="onCancel">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Save</VaButton>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <VaModal v-model="showConfirmModal" mobile-fullscreen close-button hide-default-actions>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">Confirm Action</h3>
        <p class="text-red-500 text-[18px]">Your interval is less than 30 seconds, do you want to continue?</p>
        <div class="flex justify-end mt-4">
          <VaButton preset="secondary" color="secondary" @click="onCancelConfirm">Cancel</VaButton>
          <VaButton color="primary" @click="onConfirm">Continue</VaButton>
        </div>
      </div>
    </VaModal>
  </VaForm>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onBeforeMount, PropType, isReactive } from 'vue'
import { useForm, useToast, VaModal } from 'vuestic-ui'
import { validators } from '../../../../services/utils'
import { task_type } from '../../../../data/task'
import { fetchGateways } from '../../../../apis/gateway'
import { fetchMeters } from '../../../../apis/meter'
import { gateway_type } from '../../../../data/gateway'
import { meter_type } from '../../../../data/meter'
import { TaskOperation } from '../../../../data/api_field_type/api_field_type'

const defaultNewControlTask = {
  id: null,
  name: '',
  tag: '',
  operation: '',
  interval: null,
  startAt: '',
  gatewayId: null,
  meterId: null,
  remark: '',
  active: true,
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<task_type | null>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'save'])
const newControlTask = ref<any>({ })
const toast = useToast();
const error = ref<string | null>(null);

const gatewayOptions = ref<any[]>([]);
const meterOptions = ref<any[]>([]);
const selectTagValue = ref('user');
const selectOperationValue = ref('');
const selectGatewayValue = ref('');
const selectMeterValue = ref('');
const selectTaskType = ref('');
const showConfirmModal = ref(false);
const form = useForm('edit-control-task-form');

const isRepeatable = ref(true);
watch(()=>isRepeatable.value,()=>{
  if(isRepeatable.value===false){
    newControlTask.value.interval=0;
  }
})

const pagination = ref({
  pageNum: 1,
  pageSize: 30,
});

const tagOptions = ref<string[]>(['sys', 'user']);
const operationOptions = ref<string[]>([]);
const taskTypeOptions = ref<string[]>(['Meter Task', 'Gateway Task']);

watch(
  () => props.modelValue,
  (controlTaskToEdit) => {
    if (controlTaskToEdit) {
      let date = new Date(controlTaskToEdit.startAt);
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
      let day = String(date.getDate()).padStart(2, '0');
      let hours = String(date.getHours()).padStart(2, '0');
      let minutes = String(date.getMinutes()).padStart(2, '0');
      newControlTask.value.startAt = `${year}-${month}-${day}T${hours}:${minutes}`;

      newControlTask.value.active = controlTaskToEdit.active;
      newControlTask.value.interval = controlTaskToEdit.interval;
      selectTagValue.value = controlTaskToEdit.tag;
      selectOperationValue.value = controlTaskToEdit.operation;
      newControlTask.value.name = controlTaskToEdit.name;
      //初始化name和id
      if (controlTaskToEdit.id) {
        newControlTask.value.id = controlTaskToEdit.id;
        if (controlTaskToEdit.meterId) {
          newControlTask.value.meterId = controlTaskToEdit.meterId;
          selectTaskType.value = 'Meter Task';
        }
        else {
          newControlTask.value.gatewayId = controlTaskToEdit.gatewayId;
          selectTaskType.value = 'Gateway Task';  
        }
      }else{
        selectTaskType.value = 'Meter Task';
      }

    } else {
      newControlTask.value = { ...defaultNewControlTask }
      selectTagValue.value = 'user';
      selectOperationValue.value = '';
      selectGatewayValue.value = '';
      selectMeterValue.value = '';
    }
  },
  { immediate: true }
)
// Operation Options
watch(selectTaskType, () => {
  if (selectTaskType.value === 'Meter Task') {
    operationOptions.value = ['Read Data', 'Turn On', 'Turn Off'];
  } else if (selectTaskType.value === 'Gateway Task') {
    operationOptions.value = ['Read Data'];
  }
});
//name 
watch([selectGatewayValue, selectMeterValue], () => {
  //注意就是需要我的id有才执行
  if (newControlTask.value.id) {

  }
  else {
    if (selectTaskType.value === 'Gateway Task') {
      const selectedGateway = selectGatewayValue.value.split(' ')[2];
      newControlTask.value.name = `${selectedGateway}_test`;
    }
    if (selectTaskType.value === 'Meter Task') {
      const selectedMeter = selectMeterValue.value.split(' ')[2];
      newControlTask.value.name = `${selectedMeter}_test`;
      newControlTask.value.meterId = null;
    }

    //初始化网关或者表的选择的内容
    selectGatewayValue.value = gatewayOptions.value.length > 0 ? gatewayOptions.value[0] : '';
    selectMeterValue.value = meterOptions.value.length > 0 ? meterOptions.value[0] : '';
  }
})

const fetchGatewaysList = () => {
  fetchGateways(pagination.value)
    .then((res) => {
      gatewayOptions.value = res.data.data.map((gateway: gateway_type) => {
        if(newControlTask.value.gatewayId==gateway.id){
          selectGatewayValue.value = `${gateway.id} Name: ${gateway.name} IP: ${gateway.ipAddr}`;
        }
        return `${gateway.id} Name: ${gateway.name} IP: ${gateway.ipAddr}`;
      }

      );
    })
    .catch((err) => {
      console.error(err);
      error.value = (err.message || 'Failed to fetch gateways') as string;
      toast.init({ message: error.value, color: 'danger' });
    });
};

const fetchMetersList = () => {
  fetchMeters(pagination.value)
    .then((res) => {
      meterOptions.value = res.data.data.map((meter: meter_type) =>
      {
        if(newControlTask.value.meterId==meter.id){
          selectMeterValue.value = `${meter.id} Name: ${meter.name}`;
        }
        return `${meter.id} Name: ${meter.name}`;
      } 
      );
    })
    .catch((err) => {
      console.error(err);
      error.value = (err.message || 'Failed to fetch meters') as string;
      toast.init({ message: error.value, color: 'danger' });
    });
};


onBeforeMount(() => {
  fetchGatewaysList();
  fetchMetersList();
});



const onSave = () => {
  if (newControlTask.value.interval < 30) {
    showConfirmModal.value = true;
  } else {
    saveTask();
  }
}

const saveTask = () => {
  if (form.validate()) {
    emit('update:modelValue', newControlTask.value)
    const data = {
      id: newControlTask.value.id,
      name: newControlTask.value.name,
      tag: selectTagValue.value,
      operation: selectOperationValue.value === 'Read Data' ? TaskOperation.Read : selectOperationValue.value === 'Turn On' ? TaskOperation.SwitchOn : TaskOperation.SwitchOff,
      interval: Number(newControlTask.value.interval),
      startAt: new Date(newControlTask.value.startAt).toISOString(),
    }
    if (selectTaskType.value === 'Meter Task') {
      emit('save', { ...data, meterId: Number(selectMeterValue.value.split(' ')[0]) });
    }
    else {
      emit('save', { ...data, gatewayId: Number(selectGatewayValue.value.split(' ')[0]) });
    }
    console.log(newControlTask.value.id)
    emit('close');
  }
}

const onConfirm = () => {
  showConfirmModal.value = false;
  saveTask();
}

const onCancelConfirm = () => {
  showConfirmModal.value = false;
}

const onCancel = () => {
  emit('close')
}
</script>
