<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useProjects } from './composables/useProjects'
import ToiletCards from './widgets/ToiletCards.vue'
import ToiletTable from './widgets/ToiletTable.vue'
import EditProjectForm from './widgets/EditProjectForm.vue'
import { useModal, useToast } from 'vuestic-ui'

const doShowAsCards = useLocalStorage('toilets-view', true)

const { isLoading, toilets, ...toiletApi } = useProjects()

const toast = useToast()

const projectToEdit = ref<any>(null)
const doShowProjectFormModal = ref(false)

const editProject = (toilet: any) => {
  projectToEdit.value = toilet
  doShowProjectFormModal.value = true
}

const createNewProject = () => {
  projectToEdit.value = null
  doShowProjectFormModal.value = true
}


const onProjectSaved = async (toilet: any) => {
  doShowProjectFormModal.value = false
  if ('id' in toilet) {
    await toiletApi.update(toilet)
    toast.init({
      message: 'Toilet updated',
      color: 'success',
    })
  } else {
    await toiletApi.add(toilet)
    toast.init({
      message: 'Toilet created',
      color: 'success',
    })
  }
}

const { confirm } = useModal()

// Delete
const onProjectDeleted = async (toilet: any) => {
  const response = await confirm({
    title: 'Delete toilet',
    message: `Are you sure you want to delete toilet "${toilet.name}"?`,
    okText: 'Delete',
    size: 'small',
    maxWidth: '380px',
  })

  toiletApi.remove(toilet.id)

  toast.init({
    message: 'Toilet deleted',
    color: 'success',
  })
}

const editFormRef = ref()

</script>

<template>
  <h1 class="page-title">Toilets</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle v-model="doShowAsCards" color="background-element" border-color="background-element" :options="[
            { label: 'Cards', value: true },
            { label: 'Table', value: false },
          ]" />
        </div>
        <VaButton icon="add" @click="createNewProject">Toilet</VaButton>
      </div>

      <ToiletCards v-if="doShowAsCards" :toilets="toilets" :loading="isLoading" @edit="editProject"
        @delete="onProjectDeleted" />
      <ToiletTable v-else :toilets="toilets" :loading="isLoading" @edit="editProject" @delete="onProjectDeleted" />
    </VaCardContent>

    <VaModal v-slot="{ cancel, ok }" v-model="doShowProjectFormModal" size="small" mobile-fullscreen close-button
      stateful hide-default-actions>
      <h1 v-if="projectToEdit === null" class="va-h5 mb-4">Add toilet</h1>
      <h1 v-else class="va-h5 mb-4">Edit toilet</h1>
      <EditProjectForm ref="editFormRef" :toilet="projectToEdit"
        :save-button-label="projectToEdit === null ? 'Add' : 'Save'" @close="cancel" @save="(toilet) => {
            onProjectSaved(toilet)
            ok()
          }
            " />
    </VaModal>
  </VaCard>
</template>
