<template>
  <VaForm v-slot="{ isValid }" ref="edit-resident-form" class="edit-resident-form">
    <div class="flex flex-col gap-4">
      <VaInput
        v-model="form.name"
        label="Resident Name"
        placeholder="Enter resident name"
        :rules="[validators.required]"
        name="name"
      />
      
      <VaInput
        v-model="form.email"
        label="Email"
        placeholder="Enter email"
        :rules="[validators.required, validators.email]"
        name="email"
      />
      
      <div class="flex gap-2 justify-end mt-4">
        <VaButton preset="secondary" color="secondary" @click="onClose">Cancel</VaButton>
        <VaButton :disabled="!isValid" @click="submit">Save</VaButton>
      </div>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits ,PropType} from 'vue';
import { useForm } from 'vuestic-ui';
import { validators } from '@/services/utils';
import { useResidents } from '../composables/resident';

const props = defineProps({
  resident: Object as PropType<{
    id?: string;
    name: string;
    email: string;
  }>,
  onClose: Function,
});

const emit = defineEmits(['close']);

const { add, update } = useResidents();

const form = ref({
  name: props.resident ? props.resident.name : '',
  email: props.resident ? props.resident.email : '',
});

watch(
  () => props.resident,
  (newResident) => {
    if (newResident) {
      form.value = { ...newResident };
    }
  },
  { immediate: true }
);

const formInstance = useForm('edit-resident-form');

const submit = () => {
  if (formInstance.validate()) {
    if (props.resident?.id) {
      update({ ...form.value, id: props.resident.id });
    } else {
      add(form.value);
    }
    emit('close');
  }
};

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
