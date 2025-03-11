<template>
  <Card>
    <div class="mb-4">
      <div class="text-xl font-medium">Title</div>
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

        <!-- <Divider type="vertical" />
        <Tooltip :title="t('tableFilter')" size="small">
          <Badge :count="activeFiltersCount">
            <AzButton type="link" size="small" @click="filterMode.toggle" icon="tabler:filter">
              {{ t('filter') }}
            </AzButton>
          </Badge>
        </Tooltip> -->

        <Divider type="vertical" />
        <Dropdown>
          <Tooltip :title="t('exportData')">
            <AzButton
              type="link"
              size="small"
              class="ant-dropdown-link"
              @click.prevent
              icon="tabler:table-export"
            >
              {{ t('export') }}
            </AzButton>
          </Tooltip>
          <template #overlay>
            <div class="bg-slate-200 grid grid-cols-2 gap-2 p-2 shadow rounded">
              <Tooltip :title="t('excel')">
                <Icon
                  @click="exportFile.excel(userTable.tableData.value)"
                  class="bg-white rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-excel"
                  :height="48"
                />
              </Tooltip>
              <Tooltip :title="t('json')">
                <Icon
                  @click="exportFile.json(userTable.tableData.value)"
                  class="bg-white rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-json"
                  :height="48"
                />
              </Tooltip>
              <Tooltip :title="t('image')">
                <Icon
                  @click="exportFile.image('az-table')"
                  class="bg-white rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-image"
                  :height="48"
                />
              </Tooltip>
              <Tooltip :title="t('xml')">
                <Icon
                  @click="exportFile.xml(userTable.tableData.value)"
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
      </div>

      <!-- <Transition name="slide">
        <Card
          class="py-4 bg-gray-50 my-4"
          v-if="filterMode.isOpen.value"
          :title="t('filterList')"
          size="small"
        >
          <template #extra>
            <AzButton type="text" danger icon="tabler:x" @click="filterMode.toggle" />
          </template>
          <Form layout="vertical">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-4">
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
      </Transition> -->
    </div>
    <Table
      :columns="props.columnList"
      :data-source="userTable.dataList.value"
      :pagination="{
        ...userTable.pagination,
        position: [
          panelSettingsStore.settings.direction === DirectionEnum.RTL
            ? 'bottomLeft'
            : 'bottomRight',
        ],
        locale: { items_per_page: '' },
      }"
      :direction="panelSettingsStore.settings.direction"
      :loading="userTable.loading.value"
      @change="userTable.handleTableChange"
      id="az-table"
    >
      <template #customFilterDropdown>
        <slot name="amir" />
      </template>
    </Table>
  </Card>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { AzButton } from '@/core/components'
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
} from 'ant-design-vue'
import axios from 'axios'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
import { useModal, useTable } from '../core/composable'
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { FilterValue } from 'ant-design-vue/es/table/interface'
import { FilterTypeEnum, DirectionEnum } from '../core/enums'
import { useI18n } from 'vue-i18n'
import { useExportFile } from '@/core/composable/exportFile.composable'
import _, { isArray, isNumber, isString } from 'lodash'
// import { type Dayjs } from 'dayjs'

const { t } = useI18n()
// const filterMode = useModal()
const panelSettingsStore = usePanelSettingsStore()
const exportFile = useExportFile()
const userTable = useTable()

const emits = defineEmits(['addRecord'])

interface Props {
  columnList: ColumnsType
}

const props = withDefaults(defineProps<Props>(), {})

// const filterList = reactive([
//   { title: 'phone', type: FilterTypeEnum.STRING, value: undefined as string | undefined },
//   { title: 'Age', type: FilterTypeEnum.NUMBER, value: undefined as number | undefined },
//   { title: 'IsActive', type: FilterTypeEnum.BOOLEAN, value: undefined as boolean | undefined },
//   {
//     title: 'DateRange',
//     type: FilterTypeEnum.DATE,
//     value: undefined as [Dayjs, Dayjs] | [string, string] | undefined,
//   },
// ])

// const activeFiltersCount = computed(() => {
//   return filterList.filter((item) => {
//     if (
//       item.type === FilterTypeEnum.STRING &&
//       isString(item.value) &&
//       item.value.trim() !== undefined
//     ) {
//       return true
//     }
//     if (item.type === FilterTypeEnum.NUMBER && isNumber(item.value) && item.value !== undefined) {
//       return true
//     }
//     if (item.type === FilterTypeEnum.BOOLEAN && item.value !== undefined) {
//       return true
//     }
//     if (item.type === FilterTypeEnum.DATE && isArray(item.value)) {
//       return true
//     }
//     return false
//   }).length
// })

type APIResult = {
  results: {
    gender: 'female' | 'male'
    name: {
      first: string
      last: string
      title: string
    }
    email: string
    phone: string
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

const queryData = async (params: FetchParams) => {
  const { data } = await axios.get<APIResult>('https://randomuser.me/api/', {
    params: { ...params, results: 1000, page: params.page },
  })
  return {
    data: data.results,
    total: 1000,
  }
}

// توابع فیلترها

// const resetFilter = () => {
//   filterList.forEach((item) => {
//     if (item.type === FilterTypeEnum.STRING) {
//       item.value = undefined
//     } else if (item.type === FilterTypeEnum.NUMBER) {
//       item.value = undefined
//     } else if (item.type === FilterTypeEnum.BOOLEAN) {
//       item.value = undefined
//     } else if (item.type === FilterTypeEnum.DATE) {
//       item.value = undefined
//     }
//   })
//   userTable.resetFilters?.()
// }

// const applyFilters = () => {
//   const newFilters: Record<string, FilterValue> = {}
//   filterList.forEach((item) => {
//     if (
//       item.value !== '' &&
//       item.value !== null &&
//       item.value !== undefined &&
//       !(Array.isArray(item.value) && item.value.length === 0)
//     ) {
//       if (item.type === FilterTypeEnum.DATE && Array.isArray(item.value)) {
//         newFilters[item.title.toLowerCase()] = item.value.join(',') as unknown as FilterValue
//       } else {
//         newFilters[item.title.toLowerCase()] = item.value as unknown as FilterValue
//       }
//     }
//   })
//   userTable.setFilters?.(newFilters)
// }

onMounted(async () => {
  userTable.fetchData.value = await queryData
  await userTable.reload()
})
</script>
