import type { TablePaginationConfig, TableProps } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { usePagination } from 'vue-request'
import axios from 'axios'
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'ant-design-vue/es/table/interface'

export const useTable = <T, D>() => {
  const columns = ref<ColumnsType<T>>([])
  const dataSource = ref<Array<unknown>>([])
  const pagination = ref<TablePaginationConfig>({})
  const loading = ref<boolean>(false)
  const sticky = ref<boolean>(false)
  const sort = ref()

  const fetchData = (params?: T) => {
    return axios.get<T>('https://randomuser.me/api?noinfo', { params })
  }

  const handleTableChange: TableProps['onChange'] = async (
    newPagination: TablePaginationConfig,
    newFilters: Record<string, FilterValue | null>,
    newSorter: SorterResult<T> | SorterResult<T>[],
    newExtra: TableCurrentDataSource<T>,
  ) => {
    await fetchData()
  }

  return {
    columns,
    sticky,
    dataSource,
    pagination,
    loading,
    handleTableChange,
  }
}
