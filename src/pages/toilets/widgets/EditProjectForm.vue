<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EmptyToilet, Toilet } from '../types'
import { SelectOption } from 'vuestic-ui'

const props = defineProps<{
  project: Toilet | null
  saveButtonLabel: string
}>()

defineEmits<{
  (event: 'save', project: Toilet): void
  (event: 'close'): void
}>()

const defaultNewProject: EmptyToilet = {
  name: '',
  location: '',
  status: undefined,
}

const newToilet = ref({ ...defaultNewProject })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newToilet.value).some((key) => {
    if (key === 'team') {
      return false
    }

    return (
      newToilet.value[key as keyof EmptyToilet] !== (props.project ?? defaultNewProject)?.[key as keyof EmptyToilet]
    )
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.project,
  () => {
    if (!props.project) {
      return
    }

    newToilet.value = {
      ...props.project,
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
    <VaSelect
      v-model="newToilet.status"
      label="Status"
      :rules="[required]"
      track-by="value"
      value-by="value"
      :options="[
        { text: 'In use', value: 'in use' },
        { text: 'Deploying', value: 'deploying' },
        { text: 'Suspended', value: 'suspended' },
      ]"
    >
      <template #content="{ value }">
        <ProjectStatusBadge v-if="value" :status="value.value" />
      </template>
    </VaSelect>
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
      <VaButton @click="validate() && $emit('save', newToilet as Toilet)">{{ saveButtonLabel }}</VaButton>
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
