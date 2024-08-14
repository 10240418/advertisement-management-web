<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { PropType, computed, toRef, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import { admin_user_type } from '../../../data/admin_user'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true ,width:'5%' },
  { label: 'Name', key: 'name', sortable: true,width:'20%'},
  { label: 'Email', key: 'email', sortable: false ,width:'25%'},
  { label: 'create_at', key: 'createdAt', sortable: false ,width:'25%'},
  { label: 'Actions', key: 'actions', sortable: false ,width:'5%'},
])

const props = defineProps({
  users: {
    type: Array as PropType<admin_user_type[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<any>, required: true },
  sorting: { type: Object as PropType<any>, required: true },
})

const emit = defineEmits<{
  (event: 'edit-user', user: any): void
  (event: 'delete-user', user: any): void
  (event: 'fectch-user', params: any): void
}>()

const users = toRef(props, 'users')
const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize))
const pagesOptions = computed(() => {
  const options = []
  for (let i = 1; i <= totalPages.value; i++) {
    options.push(i)
  }
  return options
})

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

  let usersArray: any = [];
  if (Array.isArray(users.value)) {
    usersArray = users.value;
  }else if (users.value && typeof users.value === 'object'){
    usersArray = [users.value];
  }
  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize
  const endIndex = startIndex + props.pagination.pageSize

  if (usersArray.length <= props.pagination.pageSize) return users.value
  else return usersArray.value.slice(startIndex, endIndex)
})

watch(
  () => [props.pagination.pageNum, props.pagination.pageSize,props.sorting.sortingOrder,props.sorting.sortBy],
  () => {
    console.log(props.sorting.sortingOrder)
    console.log(props.sorting.sortBy)
    if(props.pagination.total < props.pagination.pageSize * (props.pagination.pageNum - 1)){
      props.pagination.pageNum = 1;
    }
      emit('fectch-user', { pageNum: props.pagination.pageNum, pageSize: props.pagination.pageSize,desc: props.sorting.sortOrder==="desc"? true:false})
    

  }
)

console.log(props.sorting.sortingOrder)
//气泡提示框
const showContentUser = ref<admin_user_type | null>(null)
const showContent = (rowData: any) => {
  
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
  <VaDataTable :columns="columns" :items="currentPageData" :loading="$props.loading"
  v-model:sort-by="props.sorting.sortBy" v-model:sorting-order="props.sorting.sortingOrder">
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

    <template #cell(actions)="{ rowData }" class=" overflow-y-scroll max-h[40px]">
      <VaPopover placement="bottom" trigger="click" color=" backgroundSecondary">
        <div class="flex  items-center justify-center  relative  hover:bg-slate-100  rounded-[4px]"
          @click.stop="showContent(rowData)">
          <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer">
          </VaIcon>
        </div>
        <template #body>
          <transition name="fade">
        <div v-show="showContentUser?.id === rowData.id"
          class="tooltip-content flex flex-col  justify-center z-999 items-center relative  border border-solid border-gray-300 p-2 rounded-md shadow-lg">
          <VaButton preset="secondary" size="small" icon="mso-edit" aria-label="Edit user"
            @click="$emit('edit-user', rowData as any)" class="w-full justify-between">
            <span>Edit</span>
          </VaButton>
          <VaButton preset="secondary" size="small" icon="mso-delete" color="danger" aria-label="Delete user"
            @click="onUserDelete(rowData)" class="w-full">
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
      <b>total: {{ $props.pagination.total }} </b>
      pageNum:
      <VaSelect v-model="$props.pagination.pageNum" class="!w-16" selected-top-shown :options="pagesOptions" />
      pageSize:
      <VaSelect v-model="$props.pagination.pageSize" class="!w-20" selected-top-shown :options="[5, 10, 20, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton preset="secondary" icon="va-arrow-left" aria-label="Previous page"
        :disabled="$props.pagination.pageNum === 1" @click="$props.pagination.pageNum--" />
      <VaButton class="mr-2" preset="secondary" icon="va-arrow-right" aria-label="Next page"
        :disabled="$props.pagination.pageNum === totalPages" @click="$props.pagination.pageNum++" />
      <VaPagination v-model="$props.pagination.pageNum" buttons-preset="secondary" :pages="totalPages"
        :visible-pages="5" :boundary-links="false" :direction-links="false" />
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
  padding: 0 8px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-content>* {
  margin-bottom: 0%;

}

.fade-enter-active,
.fade-leave-active {
  transition: 0s;
}



.tooltip-content {
  position: relative;
  // background-color: white;
  border: 1px solid #d1d5db;
  padding: 6px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tooltip-content::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent #d1d5db transparent;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 7px;
  border-style: solid;
  border-color: transparent transparent white transparent; // 
}
</style>
