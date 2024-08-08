<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { SelectOption } from 'vuestic-ui'

const props = defineProps<{
  toilet: any
  saveButtonLabel: string
}>()

defineEmits<{
  (event: 'save', toilet: any): void
  (event: 'close'): void
}>()

const defaultNewProject = {
  name: '',
  location: '',
  remark: '',
}

const newToilet = ref({ ...defaultNewProject })

watch(
  () => props.toilet,
  () => {
    if (!props.toilet) {
      return
    }

    newToilet.value = {
      ...props.toilet,
    }
  },
  { immediate: true },
)

const required = (v: string | SelectOption) => !!v || 'This field is required'
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput v-model="newToilet.name" label="Toilet" :rules="[required]" />
    <VaInput v-model="newToilet.location" label="Location" :rules="[required]" />
    <VaTextarea v-model="newToilet.remark" label="Remark" :rules="[required]" />

    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
      <VaButton @click="validate() && $emit('save', newToilet)">{{ saveButtonLabel }}</VaButton>
    </div>
  </VaForm>
</template>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}

.va-input-wrapper__text {
  gap: 0.2rem;
}
</style>
