<template>
  <div class="table-container">
    <Table
      :columns="columns"
      :data-source="tableData"
      :loading="isLoading"
      :pagination="pagination"
      @change="handleTableChange"
      bordered
      size="middle"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'isActive'">
          <Badge
            :status="record.isActive ? 'success' : 'error'"
            :text="record.isActive ? 'فعال' : 'غیرفعال'"
          />
        </template>
        <template v-if="column.key === 'price'">
          {{ formatPrice(record.price) }}
        </template>
        <template v-if="column.key === 'createdAt'">
          {{ formatDate(record.createdAt) }}
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDebounceFn } from '@vueuse/core'
import axios from 'axios'
import _ from 'lodash'
import type { TableColumnType, TablePaginationConfig } from 'ant-design-vue'
import { Table, Badge, Input, Button, InputNumber, Select } from 'ant-design-vue'
import DatePicker from 'ant-design-vue/es/date-picker'
import {
  TableFilterOperatorBooleanEnum,
  TableFilterOperatorDateEnum,
  TableFilterOperatorNumberEnum,
  TableFilterOperatorStringEnum,
} from '@/core/enums'

// Types
interface Order {
  id: number
  title: string
  price: number
  isActive: boolean
  createdAt: string
}

interface FilterParam<T> {
  field: TableColumnType<T>['key']
  operator:
    | TableFilterOperatorBooleanEnum
    | TableFilterOperatorDateEnum
    | TableFilterOperatorNumberEnum
    | TableFilterOperatorStringEnum
  criteria: boolean | string | number | Date
}

// State
const { t } = useI18n()
const tableData = ref<Order[]>([])
const isLoading = ref(false)
const pagination = ref<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
})
const filters = ref<FilterParam<Order>[]>([])

// Filter options for dropdowns
const stringOperators = [
  { label: 'شامل', value: TableFilterOperatorStringEnum.CONTAINS },
  { label: 'شامل نشود', value: TableFilterOperatorStringEnum.NOT_CONTAINS },
  { label: 'شروع با', value: TableFilterOperatorStringEnum.STARTS_WITH },
  { label: 'پایان با', value: TableFilterOperatorStringEnum.ENDS_WITH },
  { label: 'برابر', value: TableFilterOperatorStringEnum.EQUALS_TEXT },
  { label: 'نابرابر', value: TableFilterOperatorStringEnum.NOT_EQUALS_TEXT },
]

const numberOperators = [
  { label: 'کمتر از', value: TableFilterOperatorNumberEnum.LESS_THAN },
  { label: 'کمتر یا برابر', value: TableFilterOperatorNumberEnum.LESS_THAN_OR_EQUAL },
  { label: 'بیشتر از', value: TableFilterOperatorNumberEnum.GREATER_THAN },
  { label: 'بیشتر یا برابر', value: TableFilterOperatorNumberEnum.GREATER_THAN_OR_EQUAL },
  { label: 'برابر', value: TableFilterOperatorNumberEnum.EQUALS },
  { label: 'نابرابر', value: TableFilterOperatorNumberEnum.NOT_EQUALS },
]

const booleanOperators = [
  { label: 'درست', value: TableFilterOperatorBooleanEnum.IS_TRUE },
  { label: 'نادرست', value: TableFilterOperatorBooleanEnum.IS_FALSE },
]

const dateOperators = [
  { label: 'قبل از', value: TableFilterOperatorDateEnum.DATE_BEFORE },
  { label: 'بعد از', value: TableFilterOperatorDateEnum.DATE_AFTER },
  { label: 'برابر', value: TableFilterOperatorDateEnum.DATE_EQUALS },
]

// Table Columns
const columns: TableColumnType<Order>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    width: 100,
  },
  {
    title: t('title'),
    dataIndex: 'title',
    key: 'title',
    sorter: true,
    responsive: ['md'],
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const operator = ref(TableFilterOperatorStringEnum.CONTAINS)
      const criteria = ref('')

      return h('div', { style: { padding: '8px' } }, [
        h(Select, {
          value: operator.value,
          options: stringOperators,
          onChange: (value: TableFilterOperatorStringEnum) => (operator.value = value),
          style: { width: '188px', marginBottom: '8px', display: 'block' },
        }),
        h(Input, {
          placeholder: t('search_title'),
          value: criteria.value,
          onChange: (e: Event) => (criteria.value = (e.target as HTMLInputElement).value),
          style: { width: '188px', marginBottom: '8px', display: 'block' },
        }),
        h('div', [
          h(
            Button,
            {
              type: 'primary',
              size: 'small',
              onClick: () => {
                setSelectedKeys([{ field: 'title', operator: operator.value, criteria: criteria.value }])
                confirm()
              },
              style: { width: '90px', marginRight: '8px' },
            },
            () => t('search'),
          ),
          h(
            Button,
            {
              size: 'small',
              onClick: () => {
                clearFilters && clearFilters()
                operator.value = TableFilterOperatorStringEnum.CONTAINS
                criteria.value = ''
              },
              style: { width: '90px' },
            },
            () => t('reset'),
          ),
        ]),
      ])
    },
    onFilter: (value: FilterParam<Order>, record) => {
      const criteria = value.criteria as string
      switch (value.operator) {
        case TableFilterOperatorStringEnum.CONTAINS:
          return record.title.toLowerCase().includes(criteria.toLowerCase())
        case TableFilterOperatorStringEnum.NOT_CONTAINS:
          return !record.title.toLowerCase().includes(criteria.toLowerCase())
        case TableFilterOperatorStringEnum.STARTS_WITH:
          return record.title.toLowerCase().startsWith(criteria.toLowerCase())
        case TableFilterOperatorStringEnum.ENDS_WITH:
          return record.title.toLowerCase().endsWith(criteria.toLowerCase())
        case TableFilterOperatorStringEnum.EQUALS_TEXT:
          return record.title.toLowerCase() === criteria.toLowerCase()
        case TableFilterOperatorStringEnum.NOT_EQUALS_TEXT:
          return record.title.toLowerCase() !== criteria.toLowerCase()
        default:
          return true
      }
    },
  },
  {
    title: t('price'),
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const operator = ref(TableFilterOperatorNumberEnum.EQUALS)
      const criteria = ref<number | null>(null)

      return h('div', { style: { padding: '8px' } }, [
        h(Select, {
          value: operator.value,
          options: numberOperators,
          onChange: (value: TableFilterOperatorNumberEnum) => (operator.value = value),
          style: { width: '188px', marginBottom: '8px', display: 'block' },
        }),
        h(InputNumber, {
          placeholder: t('search_price'),
          value: criteria.value,
          onChange: (value: number | null) => (criteria.value = value),
          style: { width: '188px', marginBottom: '8px', display: 'block' },
          min: 0,
        }),
        h('div', [
          h(
            Button,
            {
              type: 'primary',
              size: 'small',
              onClick: () => {
                if (criteria.value !== null) {
                  setSelectedKeys([{ field: 'price', operator: operator.value, criteria: criteria.value }])
                  confirm()
                }
              },
              style: { width: '90px', marginRight: '8px' },
            },
            () => t('search'),
          ),
          h(
            Button,
            {
              size: 'small',
              onClick: () => {
                clearFilters && clearFilters()
                operator.value = TableFilterOperatorNumberEnum.EQUALS
                criteria.value = null
              },
              style: { width: '90px' },
            },
            () => t('reset'),
          ),
        ]),
      ])
    },
    onFilter: (value: FilterParam<Order>, record) => {
      const criteria = value.criteria as number
      switch (value.operator) {
        case TableFilterOperatorNumberEnum.LESS_THAN:
          return record.price < criteria
        case TableFilterOperatorNumberEnum.LESS_THAN_OR_EQUAL:
          return record.price <= criteria
        case TableFilterOperatorNumberEnum.GREATER_THAN:
          return record.price > criteria
        case TableFilterOperatorNumberEnum.GREATER_THAN_OR_EQUAL:
          return record.price >= criteria
        case TableFilterOperatorNumberEnum.EQUALS:
          return record.price === criteria
        case TableFilterOperatorNumberEnum.NOT_EQUALS:
          return record.price !== criteria
        default:
          return true
      }
    },
  },
  {
    title: t('isActive'),
    dataIndex: 'isActive',
    key: 'isActive',
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const operator = ref(TableFilterOperatorBooleanEnum.IS_TRUE)

      return h('div', { style: { padding: '8px' } }, [
        h(Select, {
          value: operator.value,
          options: booleanOperators,
          onChange: (value: TableFilterOperatorBooleanEnum) => (operator.value = value),
          style: { width: '188px', marginBottom: '8px', display: 'block' },
        }),
        h('div', [
          h(
            Button,
            {
              type: 'primary',
              size: 'small',
              onClick: () => {
                setSelectedKeys([
                  { field: 'isActive', operator: operator.value, criteria: operator.value === TableFilterOperatorBooleanEnum.IS_TRUE },
                ])
                confirm()
              },
              style: { width: '90px', marginRight: '8px' },
            },
            () => t('search'),
          ),
          h(
            Button,
            {
              size: 'small',
              onClick: () => {
                clearFilters && clearFilters()
                operator.value = TableFilterOperatorBooleanEnum.IS_TRUE
              },
              style: { width: '90px' },
            },
            () => t('reset'),
          ),
        ]),
      ])
    },
    onFilter: (value: FilterParam<Order>, record) => {
      return value.operator === TableFilterOperatorBooleanEnum.IS_TRUE ? record.isActive : !record.isActive
    },
  },
  {
    title: t('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const operator = ref(TableFilterOperatorDateEnum.DATE_EQUALS)
      const criteria = ref<string>('')

      return h('div', { style: { padding: '8px' } }, [
        h(Select, {
          value: operator.value,
          options: dateOperators,
          onChange: (value: TableFilterOperatorDateEnum) => (operator.value = value),
          style: { width: '188px', marginBottom: '8px', display: 'block' },
        }),
        h(DatePicker, {
          value: criteria.value,
          onChange: (date: any, dateString: string) => (criteria.value = dateString),
          style: { width: '188px', marginBottom: '8px', display: 'block' },
        }),
        h('div', [
          h(
            Button,
            {
              type: 'primary',
              size: 'small',
              onClick: () => {
                if (criteria.value) {
                  setSelectedKeys([{ field: 'createdAt', operator: operator.value, criteria: criteria.value }])
                  confirm()
                }
              },
              style: { width: '90px', marginRight: '8px' },
            },
            () => t('search'),
          ),
          h(
            Button,
            {
              size: 'small',
              onClick: () => {
                clearFilters && clearFilters()
                operator.value = TableFilterOperatorDateEnum.DATE_EQUALS
                criteria.value = ''
              },
              style: { width: '90px' },
            },
            () => t('reset'),
          ),
        ]),
      ])
    },
    onFilter: (value: FilterParam<Order>, record) => {
      const recordDate = new Date(record.createdAt)
      const criteriaDate = new Date(value.criteria as string)
      switch (value.operator) {
        case TableFilterOperatorDateEnum.DATE_BEFORE:
          return recordDate < criteriaDate
        case TableFilterOperatorDateEnum.DATE_AFTER:
          return recordDate > criteriaDate
        case TableFilterOperatorDateEnum.DATE_EQUALS:
          return recordDate.toDateString() === criteriaDate.toDateString()
        default:
          return true
      }
    },
  },
]

// API Calls
const fetchData = async () => {
  isLoading.value = true
  try {
    const response = await axios.post('http://localhost:5000/api/orders/table', {
      page: pagination.value.current,
      size: pagination.value.pageSize,
      filters: filters.value.map((f) => ({
        field: f.field,
        operator: f.operator,
        criteria: f.criteria instanceof Date ? f.criteria.toISOString() : f.criteria,
      })),
    })
    tableData.value = response.data.data
    pagination.value.total = response.data.total
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

// Handlers
const handleTableChange = (
  pag: TablePaginationConfig,
  filter: Record<string, FilterParam<Order>[]>,
  sorter: any,
) => {
  pagination.value = { ...pagination.value, ...pag }
  filters.value = Object.values(filter).flat()

  if (sorter.field) {
    filters.value = filters.value.filter((f) => f.field !== 'sortField' && f.field !== 'sortOrder')
    filters.value.push({
      field: sorter.field,
      operator: sorter.order === 'ascend' ? 'ASC' : 'DESC',
      criteria: '',
    })
  }

  fetchData()
}

// Formatters
const formatPrice = (price: number) => new Intl.NumberFormat('fa-IR').format(price)
const formatDate = (date: string) => new Date(date).toLocaleDateString('fa-IR')

// Debounced fetch
const debouncedFetch = useDebounceFn(fetchData, 300)

// Watch filters
watch(filters, () => {
  pagination.value.current = 1
  debouncedFetch()
}, { deep: true })

// Initial fetch
fetchData()
</script>

<style scoped>
.table-container {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
}
</style>