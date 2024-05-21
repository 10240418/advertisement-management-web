<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useProjects } from './composables/useProjects'
import ToiletCards from './widgets/ToiletCards.vue'
import ToiletTable from './widgets/ToiletTable.vue'
import EditProjectForm from './widgets/EditProjectForm.vue'
import { Toilet } from './types'
import { useModal, useToast } from 'vuestic-ui'

const doShowAsCards = useLocalStorage('toilets-view', true)

const { isLoading, toilets, fetch, update, add, remove } = useProjects()

const projectToEdit = ref<Toilet | null>(null)
const doShowProjectFormModal = ref(false)

const editProject = (project: Toilet) => {
  projectToEdit.value = project
  doShowProjectFormModal.value = true
}

const createNewProject = () => {
  projectToEdit.value = null
  doShowProjectFormModal.value = true
}

const { init: notify } = useToast()

const onProjectSaved = async (project: Toilet) => {
  doShowProjectFormModal.value = false
  if ('id' in project) {
    await update(project as Toilet)
    notify({
      message: 'Toilet updated',
      color: 'success',
    })
  } else {
    await add(project as Toilet)
    notify({
      message: 'Toilet created',
      color: 'success',
    })
  }
}

const { confirm } = useModal()

const onProjectDeleted = async (project: Toilet) => {
  const response = await confirm({
    title: 'Delete project',
    message: `Are you sure you want to delete project "${project.name}"?`,
    okText: 'Delete',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  await remove(project)
  notify({
    message: 'Toilet deleted',
    color: 'success',
  })
}

const editFormRef = ref()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Form has unsaved changes. Are you sure you want to close it?',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}
</script>

<template>
  <h1 class="page-title">Toilets</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
            v-model="doShowAsCards"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: 'Cards', value: true },
              { label: 'Table', value: false },
            ]"
          />
        </div>
        <VaButton icon="add" @click="createNewProject">Toilet</VaButton>
      </div>

      <ToiletCards
        v-if="doShowAsCards"
        :toilets="toilets"
        :loading="isLoading"
        @edit="editProject"
        @delete="onProjectDeleted"
      />
      <ToiletTable v-else :toilets="toilets" :loading="isLoading" @edit="editProject" @delete="onProjectDeleted" />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowProjectFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="projectToEdit === null" class="va-h5 mb-4">Add toilet</h1>
      <h1 v-else class="va-h5 mb-4">Edit project</h1>
      <EditProjectForm
        ref="editFormRef"
        :project="projectToEdit"
        :save-button-label="projectToEdit === null ? 'Add' : 'Save'"
        @close="cancel"
        @save="
          (project) => {
            onProjectSaved(project)
            ok()
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
