<template>
  <Card>
    <div>
      <div class="text-xl font-medium">title</div>
      <div class="flex items-center justify-end">
        <Divider type="vertical" />
        <Tooltip title="افزودن رکورد">
          <AzButton
            v-if="$slots.addForm"
            type="link"
            size="small"
            @click="emits('addRecord')"
            icon="tabler:plus"
          >
            {{ t('add') }}
          </AzButton>
          <slot name="addForm" />
        </Tooltip>

        <Divider type="vertical" />
        <Tooltip title="فیلتر جدول" size="small">
          <Badge :count="userTable.filters.length">
            <AzButton type="link" size="small" @click="filterMode.toggle" icon="tabler:filter">
              فیلتر
            </AzButton>
          </Badge>
        </Tooltip>

        <Divider type="vertical" />
        <Dropdown>
          <Tooltip title="exportData">
            <AzButton
              type="link"
              size="small"
              class="ant-dropdown-link"
              @click.prevent
              icon="tabler:table-export"
            >
            </AzButton>
          </Tooltip>
          <template #overlay>
            <div class="bg-slate-200 grid grid-cols-2 gap-2 p-2 shadow rounded">
              <Tooltip :title="t('excel')">
                <Icon
                  @click="userTable.exportExcel"
                  class="bg-white rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-excel"
                  :height="48"
                />
              </Tooltip>
              <Tooltip :title="t('json')">
                <Icon
                  @click="userTable.exportJson"
                  class="bg-white rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-json"
                  :height="48"
                />
              </Tooltip>
              <Tooltip :title="t('image')">
                <Icon
                  @click="userTable.exportImage"
                  class="bg-white rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-image"
                  :height="48"
                />
              </Tooltip>
              <Tooltip :title="t('xml')">
                <Icon
                  @click="userTable.exportXml"
                  class="bg-white rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-xml"
                  :height="48"
                />
              </Tooltip>
            </div>
          </template>
        </Dropdown>

        <Divider type="vertical" />
        <Tooltip :title="t('resetTable')">
          <AzButton type="link" size="small" @click="userTable.reload" icon="tabler:refresh" />
        </Tooltip>
        <!-- <Divider type="vertical" />
        <Tooltip title="بزرگنمایی">
          <AzFullScreen @click="userTable.fullscreen.toggle" />
        </Tooltip> -->
      </div>

      <Transition name="slide">
        <Card
          class="py-4 bg-gray-50"
          v-if="filterMode.isOpen.value"
          title="لیست فیلترها"
          size="small"
        >
          <template #extra>
            <AzButton type="text" danger icon="tabler:x" @click="filterMode.toggle" />
          </template>
          <Form layout="vertical">
            <div class="grid grid-cols-4 gap-x-4">
              <FormItem :label="item.title" v-for="(item, index) in filterList" :key="index">
                <div>
                  <Input
                    v-if="item.type === FilterTypeEnum.STRING"
                    v-model:value="item.value"
                    allow-clear
                  />
                  <InputNumber
                    v-if="item.type === FilterTypeEnum.NUMBER"
                    v-model:value="item.value"
                    allow-clear
                  />
                  <Switch
                    v-if="item.type === FilterTypeEnum.BOOLEAN"
                    v-model:checked="item.value"
                    allow-clear
                  />
                  <RangePicker
                    v-if="item.type === FilterTypeEnum.DATE"
                    v-model:value="item.value"
                    :placeholder="[t('startDate'), t('endDate')]"
                  />
                </div>
              </FormItem>
            </div>
          </Form>
          <Divider />
          <div class="flex justify-end gap-x-4">
            <AzButton type="text" @click="resetFilter">بازنشانی</AzButton>
            <AzButton type="primary" @click="applyFilters">جستجو</AzButton>
          </div>
        </Card>
      </Transition>
    </div>
    <Table
      :columns="columns"
      :data-source="userTable.tableData.value"
      :pagination="{
        ...userTable.pagination,
        position: ['topRight', 'bottomRight'],
        locale: { items_per_page: '' },
      }"
      :direction="configProviderStore.direction"
      :loading="userTable.loading.value"
      @change="userTable.handleTableChange"
      id="az-table"
    />
  </Card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { AzButton, AzFullScreen, AzStatus } from '@/core/components'

import {
  Table,
  Card,
  Divider,
  RangePicker,
  Tooltip,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Badge,
  Dropdown,
} from 'ant-design-vue/es'
import axios from 'axios'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { useConfigProviderStore } from '@/core/stores/configProvider.store'
import { useModal, useTable } from '../composable'
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { FilterValue } from 'ant-design-vue/es/table/interface'
import { FilterTypeEnum } from '../enums'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emits = defineEmits(['addRecord'])
const columns = reactive<ColumnsType>([
  {
    title: 'name.last',
    dataIndex: 'name.last',
    key: 'name.last',
  },
  {
    title: 'name.first',
    dataIndex: 'name.first',
    key: 'name.first',
  },
  {
    title: 'name.title',
    dataIndex: 'name.title',
    key: 'name.title',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
  },
])

interface FilterList {
  title: string
  key: string
  type: FilterTypeEnum
  value: unknown
}

const filterList = ref<FilterList[]>([])

type APIParams = {
  results: number
  page?: number
  sortField?: string
  sortOrder?: number
  [key: string]: unknown
}
type APIResult = {
  results: {
    gender: 'female' | 'male'
    name: string
    email: string
  }[]
}

interface FetchParams {
  page: number
  pageSize: number
  sortField?: string | null
  sortOrder?: string | null
  filters?: Record<string, FilterValue>
  search?: string
}

interface FetchResult<T> {
  data: T[]
  total: number
}
const queryData = async (params: FetchParams) => {
  const { data } = await axios.get<APIResult>('https://randomuser.me/api/?page=3&results=1000', {
    params,
  })
  return {
    data: data.results,
    total: 1000,
  }
}
const userTable = useTable()

onMounted(async () => {
  userTable.fetchData.value = queryData
  await userTable.reload()
})

const applyFilters = () => {
  const filters: Record<string, unknown> = {}
  filterList.value.forEach((item) => {
    if (item.value) {
      filters[item.key] = item.value
    }
  })
  userTable.reload()
}

const resetTable = async () => {
  await userTable.reload()
}

const resetFilter = () => {
  filterList.value.forEach((item) => {
    item.value = null
  })
  applyFilters()
}
const filterMode = useModal()

const configProviderStore = useConfigProviderStore()
</script>
