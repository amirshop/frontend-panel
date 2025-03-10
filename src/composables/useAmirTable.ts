import type { AzButton } from '@/core/components'
import { booleanFIlters, dateFIlters, numberFIlters, stringFIlters } from '@/core/constant'
import type {
  TableFilterOperatorBooleanEnum,
  TableFilterOperatorNumberEnum,
  TableFilterOperatorStringEnum,
} from '@/core/enums'
import type { OrderTest } from '@/types/order/order.model'
import {
  Card,
  Form,
  FormItem,
  Select,
  Input,
  InputNumber,
  RadioGroup,
  type RadioChangeEvent,
  DatePicker,
  Button,
} from 'ant-design-vue'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
import type { SelectValue } from 'ant-design-vue/es/select'
import type { ColumnsType, TablePaginationConfig, TableProps } from 'ant-design-vue/es/table'
import type {
  ColumnTitle,
  FilterDropdownProps,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'ant-design-vue/es/table/interface'
import type { ValueType } from 'ant-design-vue/es/vc-cascader/Cascader'
import type { ColumnType, DefaultRecordType } from 'ant-design-vue/es/vc-table/interface'
import axios from 'axios'
import type { Dayjs } from 'dayjs'
import { h, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Sort {
  feild: Sort
}
export const useAmirTable = <T>() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSource = ref<any[]>()
  const loading = ref()
  const columns = ref<ColumnType<DefaultRecordType>>()
  const pagination = ref<TablePaginationConfig>({})
  const filters = ref()
  const sort = ref<Sort>()
  const fetchData = async () => {
    loading.value = true
    try {
      const response = await axios.post('http://localhost:5000/api/orders/table', {
        page: pagination.value.current,
        size: pagination.value.pageSize,
        filters: filters.value,
        sort: sort.value
      })
      dataSource.value = response.data.data
      pagination.value.total = response.data.total
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }
  }
  const handleTableChange: TableProps<T>['onChange'] = (
    newPagination: TablePaginationConfig,
    newFilters: Record<string, FilterValue | null>,
    newSorter: SorterResult<DefaultRecordType> | SorterResult<DefaultRecordType>[],
    newExtra: TableCurrentDataSource<DefaultRecordType>,
  ) => {
    console.log('🚀 ~ newExtra:', newExtra)
    console.log('🚀 ~ newSorter:', newSorter)
    console.log('🚀 ~ newFilters:', newFilters)
    pagination.value = { ...pagination.value, ...newPagination }

    fetchData()
  }

  return {
    loading,
    columns,
    pagination,
    dataSource,
    handleTableChange,
    fetchData,
    filters,
    sort
  }
}
