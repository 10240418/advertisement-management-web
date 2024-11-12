<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { computed, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import { advertisement_type } from '../../../data/advertisement/advertisement_type'
import moment from 'moment'
import { useAdvertisements } from '../composable/advertisements'

const columns = defineVaDataTableColumns([
  { label: 'ID', key: 'id', sortable: true, width: '10%' },
  { label: 'Title', key: 'title', sortable: true, width: '25%' },
  { label: 'Content', key: 'content', sortable: false, width: '35%' },
  { label: 'URL', key: 'url', sortable: false, width: '20%' },
  { label: 'Created At', key: 'createdAt', sortable: true, width: '10%' },
  { label: 'Actions', key: 'actions', sortable: false, width: '10%' },
])

const { sorting, pagination, advertisements, isLoading, fetch, remove } = useAdvertisements()
const ads = computed(() => {
  return advertisements.value
})
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
const onAdvertisementDelete = async (ad: any) => {
  const agreed = await confirm({
    title: 'Delete Advertisement',
    message: `Are you sure you want to delete "${ad.title}"?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    remove([ad.id])
  }
}
const currentPageData = computed(() => {
  const adsArray: any = Array.isArray(ads.value) ? ads.value : ads.value ? [ads.value] : []
  const startIndex = (pagination.value.pageNum - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize

  return adsArray.slice(startIndex, endIndex)
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

const showContentAd = ref<advertisement_type | null>(null)
const showContent = (rowData: any) => {
  showContentAd.value = rowData
}
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const dropdowns = document.querySelectorAll('.dropdown-content')
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(target)) {
      showContentAd.value = null
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

    <template #cell(content)="{ rowData }">
      <div class="ellipsis max-w-[300px]">
        {{ rowData.content }}
      </div>
    </template>

    <template #cell(url)="{ rowData }">
      <a :href="rowData.url" target="_blank" class="text-blue-500 underline ellipsis max-w-[200px]">
        {{ rowData.url }}
      </a>
    </template>

    <!-- eslint-disable-next-line vue/no-useless-template-attributes -->
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
              v-show="showContentAd?.id === rowData.id"
              class="tooltip-content flex flex-col justify-center z-999 items-center relative border border-solid border-gray-300 p-2 rounded-md shadow-lg"
            >
              <VaButton
                preset="secondary"
                size="small"
                icon="va-edit"
                aria-label="Edit advertisement"
                class="w-full justify-between"
                @click="$emit('editAdvertisement', rowData)"
              >
                <span>Edit</span>
              </VaButton>
              <VaButton
                preset="secondary"
                size="small"
                icon="va-delete"
                color="danger"
                aria-label="Delete advertisement"
                class="w-full"
                @click="onAdvertisementDelete(rowData)"
              >
                <span>Delete</span>
              </VaButton>
            </div>
          </Transition>
        </template>
      </VaPopover>
    </template>
  </VaDataTable>

  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>Total: {{ pagination.total }} </b>
      Page:
      <VaSelect v-model="pagination.pageNum" class="!w-16" selected-top-shown :options="pagesOptions" />
      Page Size:
      <VaSelect v-model="pagination.pageSize" class="!w-20" selected-top-shown :options="[5, 10, 20, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="pagination.pageNum === 1"
        @click="pagination.pageNum--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
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
