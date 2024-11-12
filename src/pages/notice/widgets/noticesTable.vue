<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { computed, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import { notice_type } from '../../../data/advertisement/notice_type'
import moment from 'moment'
import { useNotices } from '../composable/notice'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true, width: '5%' },
  { label: '标题', key: 'title', sortable: true, width: '20%' },
  { label: 'URL', key: 'url', sortable: false, width: '25%' },
  { label: '创建时间', key: 'createdAt', sortable: true, width: '25%' },
  { label: '状态', key: 'isActive', sortable: false, width: '10%' },
  { label: '操作', key: 'actions', sortable: false, width: '15%' },
])

const { sorting, pagination, notices, isLoading, fetch, remove } = useNotices()
const Loading = computed(() => isLoading.value)
const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.pageSize))
const pagesOptions = computed(() => {
  const options = []
  for (let i = 1; i <= totalPages.value; i++) {
    options.push(i)
  }
  return options
})

const { confirm } = useModal()
const onNoticeDelete = async (notice: any) => {
  const agreed = await confirm({
    title: '删除公告',
    message: `确定要删除标题为 "${notice.title}" 的公告吗？`,
    okText: '删除',
    cancelText: '取消',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    remove([notice.id])
  }
}

const currentPageData = computed(() => {
  const noticesArray: any = Array.isArray(notices.value) ? notices.value : notices.value ? [notices.value] : []
  const startIndex = (pagination.value.pageNum - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize

  return noticesArray.slice(startIndex, endIndex)
})

// 气泡提示框
const showContentNotice = ref<notice_type | null>(null)
const showContent = (rowData: any) => {
  showContentNotice.value = rowData
}
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const dropdowns = document.querySelectorAll('.dropdown-content')
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(target)) {
      showContentNotice.value = null
    }
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  fetch()
  document.removeEventListener('click', handleClickOutside)
})

watch(
  () => [
    Loading.value,
    pagination.value.pageNum,
    pagination.value.pageSize,
    sorting.value.sortingOrder,
    sorting.value.sortBy,
  ],
  () => {
    if (pagination.value.total < pagination.value.pageSize * (pagination.value.pageNum - 1)) {
      pagination.value.pageNum = 1
    }
    fetch()
  },
)
</script>

<template>
  <VaDataTable
    v-model:sort-by="sorting.sortBy"
    v-model:sorting-order="sorting.sortingOrder"
    :columns="columns"
    :items="currentPageData"
    :loading="Loading"
  >
    <template #cell(createdAt)="{ rowData }">
      <div>
        {{ moment(rowData.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
      </div>
    </template>
    <template #cell(title)="{ rowData }">
      <div class="max-w-[200px] ellipsis">
        {{ rowData.title }}
      </div>
    </template>

    <template #cell(url)="{ rowData }">
      <a :href="rowData.url" target="_blank" class="text-blue-500 underline ellipsis max-w-[200px]">
        {{ rowData.url }}
      </a>
    </template>

    <template #cell(isActive)="{ rowData }">
      <VaBadge :color="rowData.isActive ? 'success' : 'danger'">
        {{ rowData.isActive ? '激活' : '未激活' }}
      </VaBadge>
    </template>

    <!-- 操作列 -->
    <template #cell(actions)="{ rowData }">
      <VaPopover placement="bottom" trigger="click" color="backgroundSecondary" class="max-h[40px]">
        <div
          class="flex items-center justify-center relative hover:bg-slate-100 rounded-[4px]"
          @click.stop="showContent(rowData)"
        >
          <VaIcon name="more_horiz" size="20px" class="mr-2 cursor-pointer"> </VaIcon>
        </div>
        <template #body>
          <Transition name="fade">
            <div
              v-show="showContentNotice?.id === rowData.id"
              class="tooltip-content flex flex-col justify-center z-999 items-center relative border border-solid border-gray-300 p-2 rounded-md shadow-lg"
            >
              <VaButton
                preset="secondary"
                size="small"
                icon="va-edit"
                aria-label="编辑公告"
                class="w-full justify-between"
                @click="$emit('editNotice', rowData)"
              >
                <span>编辑</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="va-delete"
                color="danger"
                aria-label="删除公告"
                class="w-full"
                @click="onNoticeDelete(rowData)"
              >
                <span>删除</span>
              </VaButton>
            </div>
          </Transition>
        </template>
      </VaPopover>
    </template>
  </VaDataTable>

  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>总数: {{ pagination.total }} </b>
      页码:
      <VaSelect v-model="pagination.pageNum" class="!w-16" selected-top-shown :options="pagesOptions" />
      每页:
      <VaSelect v-model="pagination.pageSize" class="!w-20" selected-top-shown :options="[5, 10, 20, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="上一页"
        :disabled="pagination.pageNum === 1"
        @click="pagination.pageNum--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="下一页"
        :disabled="pagination.pageNum === totalPages"
        @click="pagination.pageNum++"
      />
      <VaPagination
        v-model="pagination.pageNum"
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
  padding: 0 8px;
}

.dropdown-content > * {
  margin-bottom: 0%;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0s;
}

.tooltip-content {
  position: relative;
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
  border-color: transparent transparent white transparent;
}
</style>
