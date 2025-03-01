import type { TableColumnType, TablePaginationConfig, TableProps } from 'ant-design-vue'
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import { usePagination } from 'vue-request'
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'ant-design-vue/es/table/interface'
import type { DefaultRecordType } from 'ant-design-vue/es/vc-table/interface'

export const useTable = <T>({
  apiUrl,
  columns,
}: {
  apiUrl: string
  columns: TableColumnType<T>[]
}) => {
  const pagination = ref<TablePaginationConfig>({
    pageSize: 10,
    current: 1,
    total: 0,
  })

  const fetchData = async () => {
    const { data } = await axios.post(apiUrl, {
      page: pagination.value.current ?? 1,
      size: pagination.value.pageSize ?? 10,
      
    })
    pagination.value.total = data.total ?? 0
    return data.res ?? []
  }

  const { data: dataSource, loading, runAsync } = usePagination<T[]>(fetchData, { manual: true })

  const onChange: TableProps<T>['onChange'] = async (
    paginationConfig: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DefaultRecordType> | SorterResult<DefaultRecordType>[],
    extra: TableCurrentDataSource<DefaultRecordType>,
  ) => {
    console.log('Table change params:', { paginationConfig, filters, sorter, extra })
    pagination.value = { ...pagination.value, ...paginationConfig }
    await runAsync()
  }

  return {
    columns,
    dataSource,
    pagination: computed(() => pagination.value),
    loading,
    onChange,
    runAsync,
  }
}
