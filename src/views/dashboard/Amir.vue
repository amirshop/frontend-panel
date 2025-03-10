<template>
  <Table
    :dataSource="dataSource"
    :columns="columns"
    :loading="isLoading"
    :pagination="pagination"
    @change="handleTableChange"
  >
  </Table>
</template>

<script setup lang="ts">
import { Card, Table, Form, FormItem, Input, Select, Button } from 'ant-design-vue/es'
import type { TableColumnType, TablePaginationConfig, TableProps } from 'ant-design-vue/es'
import type {
  FilterDropdownProps,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'ant-design-vue/es/table/interface'
import type { DefaultRecordType } from 'ant-design-vue/es/vc-table/interface'
import axios from 'axios'
import { h, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { stringFIlters } from '@/core/constant'
import type { TableFilterOperatorStringEnum } from '@/core/enums'

interface Order {
  id: number
  title: string
  price: number
  isActive: boolean
  createdAt: string
}

interface FilterState {
  field: string
  operator: TableFilterOperatorStringEnum
  criteria: string
}

const { t } = useI18n()
const dataSource = ref<Order[]>([])
const isLoading = ref(false)
const pagination = ref<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
})

const fetchData = async () => {
  isLoading.value = true
  try {
    const response = await axios.post('http://localhost:5000/api/orders/table', {
      page: pagination.value.current,
      size: pagination.value.pageSize,
      filters: Object.values(filters.value), // ارسال فیلترها به API
    })
    dataSource.value = response.data.data
    pagination.value.total = response.data.total
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

// شیء مرکزی برای ذخیره فیلترها با کلید ستون
const filters = ref<Record<string, FilterState>>({
  title: { field: 'title', operator: stringFIlters[0].value, criteria: '' },
  price: { field: 'price', operator: stringFIlters[0].value, criteria: '' },
})

const useStringFilter = (key: string) => {
  // اگه کلید توی filters وجود نداشت، یه مقدار پیش‌فرض بساز
  if (!filters.value[key]) {
    filters.value[key] = {
      field: key,
      operator: stringFIlters[0].value,
      criteria: '',
    }
  }

  const StringFilterDropdown = <T,>({ props }: { props: FilterDropdownProps<T> }) => {
    return h(
      Card,
      h(Form, { layout: 'vertical' }, () => [
        h(
          FormItem,
          h(Select, {
            value: filters.value[key].operator,
            onChange: (selectValue) => {
              filters.value[key].operator = selectValue as TableFilterOperatorStringEnum
            },
            options: stringFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ),
        h(
          FormItem,
          h(Input, {
            value: filters.value[key].criteria,
            onInput: (e) => {
              filters.value[key].criteria = e.target.value ?? ''
            },
          }),
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            Button,
            {
              type: 'primary',
              onClick: () => {
                console.log(filters.value[key])
                props.confirm()
              },
            },
            'filter',
          ),
          h(
            Button,
            {
              onClick: () => {
                filters.value[key].criteria = ''
                filters.value[key].operator = stringFIlters[0].value
                props.clearFilters?.()
                props.confirm()
              },
            },
            'clear',
          ),
        ]),
      ]),
    )
  }

  return { StringFilterDropdown }
}

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
    filteredValue: [],
    filtered: false,
    filterSearch: true,
    filterResetToDefaultFilteredValue: false,
    filterDropdown: (props: FilterDropdownProps<Order>) =>
      useStringFilter('title').StringFilterDropdown({ props }),
  },
  {
    title: t('price'),
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    filterDropdown: (props: FilterDropdownProps<Order>) =>
      useStringFilter('price').StringFilterDropdown({ props }),
  },
]

const handleTableChange: TableProps<Order>['onChange'] = async (
  newPagination: TablePaginationConfig,
  newFilters: Record<string, FilterValue | null>,
  newSorter: SorterResult<DefaultRecordType> | SorterResult<DefaultRecordType>[],
  newExtra: TableCurrentDataSource<DefaultRecordType>,
) => {
  pagination.value = { ...pagination.value, ...newPagination }
  console.log('Current filters:', filters.value)
  await fetchData()
}

onMounted(async () => await fetchData())
</script>