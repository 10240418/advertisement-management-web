<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { PropType, computed, toRef, watch } from 'vue'
import { admin_user_type } from '../../../data/admin_user'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true },
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Email', key: 'email', sortable: true },
  { label: 'create_at', key: 'createdAt', sortable: true },
  { label: 'updated_at', key: 'updatedAt', sortable: true },
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
//计算属性 计算当前页的数据 计算的是users的属性
const currentPageData = computed(() => {
  const startIndex = (props.pagination.pageNum - 1) * props.pagination.pageSize
  const endIndex = startIndex + props.pagination.pageSize
  
  if(users.value.length ==props.pagination.pageSize)
  return users.value;
  else 
  return users.value.slice(startIndex, endIndex)
})
console.log(currentPageData)
console.log(users.value)

//watch pageNum 和pageSize 的变化
watch(
  () => [props.pagination.pageNum, props.pagination.pageSize],
  () => {
    console.log(props.pagination.pageNum)
    if(props.pagination.total < props.pagination.pageSize * props.pagination.pageNum){
    props.pagination.pageNum = 1;
  }
    emit('fectch-user',{pageNum:props.pagination.pageNum,pageSize:props.pagination.pageSize})
    

  }
)

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

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="Edit user"
          @click="$emit('edit-user', rowData as any)"
        />
        <VaButton
          preset="primary"
          size="small"
          icon="mso-delete"
          color="danger"
          aria-label="Delete user"
          @click="onUserDelete(rowData)"
        />
      </div>
    </template>
  </VaDataTable>

  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>total:{{ $props.pagination.total }} </b>
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
</style>
