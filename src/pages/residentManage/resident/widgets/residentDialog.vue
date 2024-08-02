<template>
  <VaCard>
    <div class="w-full h-full flex flex-col gap-4 ml-3">
      <!-- top section -->
      <div class="flex flex-row justify-between">
        <div class="grid grid-cols-[1fr_3fr] " :class="{ 'gap-y-[2.2px]': !editable }" >

          <VaListLabel class="flex justify-start">ID</VaListLabel>
          <VaInput v-if="resident " v-model="resident.id" placeholder="ID" class="custom-input" :class="{ 'read-only': !editable }" />
         


          <VaListLabel class="flex justify-start">Name</VaListLabel>
          <VaInput v-if="resident " v-model="resident.name" placeholder="Name" class="custom-input" :class="{ 'read-only': !editable }" />
          


          <VaListLabel class="flex justify-start">Email</VaListLabel>
          <VaInput v-if="resident " v-model="resident.email" placeholder="Email"  class="custom-input" :class="{ 'read-only': !editable }" />
         

        </div>
        <div class="flex flex-row justify-end h-[30px] w-[72px] mt-[3px] mr-4">
          <VaButton color="primary" @click="editable = !editable" class="h-[30px] w-[72px]">Edit</VaButton>
        </div>
      </div>



      <!-- Chart Section -->
      <!-- Dialog Footer -->
      <div class="dialog-footer">
        <VaButton @click="onClose">Cancel</VaButton>
        <VaButton color="primary" @click="onConfirm">Confirm</VaButton>
      </div>
    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { resident_user_type } from '@/data/resident_user';
import { useRoute } from 'vue-router';
import { fetchResident } from '../../../../apis/resident';

const resident = ref<resident_user_type | null>(null);
const route = useRoute();
const residentId = ref(route.query.id);
const editable = ref(false);

const fetch = async () => {
  if (residentId.value) {
    try {
      const res = await fetchResident({ id: residentId.value });
      resident.value = res.data.data;
      console.log(resident.value)

    } catch (error) {
      console.error('Error fetching resident:', error);
      resident.value = null;

    }
  }
};

onBeforeMount(() => {
  fetch();
});


const onConfirm = () => {
  // Confirm action logic
  console.log('Confirm action triggered');
};

const onClose = () => {
  // Close dialog logic
  console.log('Close action triggered');
};
</script>

<style >
.custom-input {
  --va-input-line-height: 8px;
  --va-input-wrapper-min-height:20px
  --va-input-font-stretch: expanded;
  --va-input-letter-spacing: 0.05em;
  --va-input-disabled-opacity: 0.5;
 
}
.read-only .va-input-wrapper__field{
  --va-form-element-border-width: 0px;
  border-width:0px;
}
.va-input-wrapper__field{
    padding:4px 12px
}

.resident-dialog {
  min-width: 400px;
}

.dialog-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>