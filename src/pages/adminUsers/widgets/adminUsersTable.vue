<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { PropType, computed, toRef, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import { admin_user_type } from '../../../data/admin_user'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: false },
  { label: 'Name', key: 'name', sortable: false },
  { label: 'Email', key: 'email', sortable: false },
  { label: 'create_at', key: 'createdAt', sortable: false },
  { label: 'updated_at', key: 'updatedAt', sortable: false },
  { label: 'Actions', key: 'actions', sortable: false },
])

const props = defineProps({
  users: {
    type: Array as PropType<admin_user_type[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<any>, required: true },
})

const emit = defineEmits<{
  (event: 'edit-user', user: any): void
  (event: 'delete-user', user: any): void
  (event: 'fectch-user', params: any): void
}>()

const users = toRef(props, 'users')
const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize))

const { confirm } = useModal()

const onUserDelete = async (user: any) => {
  const agreed = await confirm({
    title: 'Delete user',
    message: `Are you sure you want to delete ${user.name}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-user', user)
  }
}

const currentPageData = computed(() => {
  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize
  const endIndex = startIndex + props.pagination.pageSize

  if (users.value.length <= props.pagination.pageSize) return users.value
  else return users.value.slice(startIndex, endIndex)
})

watch(
  () => [props.pagination.pageNum, props.pagination.pageSize],
  () => {
    if (props.pagination.pageNum <= 0 || props.pagination.pageNum == null) {
    } else if (props.pagination.total < props.pagination.pageSize * (props.pagination.pageNum - 1)) {
      props.pagination.pageNum = 1
      emit('fectch-user', { pageNum: props.pagination.pageNum, pageSize: props.pagination.pageSize })
    } else {
      emit('fectch-user', { pageNum: props.pagination.pageNum, pageSize: props.pagination.pageSize })
    }
  }
)

const showContentUser = ref<admin_user_type | null>(null)

const showContent = (rowData: any) => {
  console.log(rowData)
  if (showContentUser.value === rowData) {
    showContentUser.value = null
  } else {
    showContentUser.value = rowData
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const dropdowns = document.querySelectorAll('.dropdown-content')
  dropdowns.forEach(dropdown => {
    if (!dropdown.contains(target)) {
      showContentUser.value = null
    }
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <VaDataTable
    :columns="columns"
    :items="currentPageData"
    :loading="$props.loading"
  >
    <template #cell(name)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.name }}
      </div>
    </template>

    <template #cell(email)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.email }}
      </div>
    </template>

    <template #cell(actions)="{ rowData }" class= "relative overflow-y-scroll">
      <div class="flex justify-center items-center ">
        <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer" @click.stop="showContent(rowData)">
        </VaIcon>
      </div>
      <transition name="fade">
        <div v-show="showContentUser?.id === rowData.id" class="flex  flex-col translate-x-6 dropdown-content justify-center z-999 items-center absolute bg-white border border-solid">
          <VaButton
            preset="secondary"
            size="small"
            icon="mso-edit"
            aria-label="Edit user"
            @click="$emit('edit-user', rowData as any)"
          >
            <span>编辑</span>
          </VaButton>
          <VaButton
            preset="secondary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete user"
            @click="onUserDelete(rowData)"
          >
            <span>删除</span>
          </VaButton>
        </div>
      </transition>
    </template>
  </VaDataTable>

  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>total: {{ $props.pagination.total }} </b>
      pageNum:
      <VaInput v-model="$props.pagination.pageNum" class="!w-16" />
      pageSize:
      <VaSelect v-model="$props.pagination.pageSize" class="!w-20" :options="[5, 10, 20, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="$props.pagination.pageNum === 1"
        @click="$props.pagination.pageNum--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
        :disabled="$props.pagination.pageNum === totalPages"
        @click="$props.pagination.pageNum++"
      />
      <VaPagination
        v-model="$props.pagination.pageNum"
        buttons-preset="secondary"
        :pages="totalPages"
        :visible-pages="5"
        :boundary-links="false"
        :direction-links="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding:0 8px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-content > * {
  margin-bottom: 0%;
 
}

.fade-enter-active, .fade-leave-active {
  transition:  0.3s;
}

// .fade-enter, .fade-leave-to {
//   opacity: 100%;
// }

span {
  font-size: 10px;
  margin-left: 6px;
}
</style>
