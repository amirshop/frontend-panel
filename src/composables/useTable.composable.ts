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
  const order = ref({})
  const filters = ref<Record<string, any>>({})

  const fetchData = async () => {
    const { data } = await axios.post(apiUrl, {
      page: pagination.value.current ?? 1,
      size: pagination.value.pageSize ?? 10,
      order: order.value,
      filters: filters.value,
    })
    pagination.value.total = data.total ?? 0
    return data.res ?? []
  }

  const { data: dataSource, loading, runAsync } = usePagination<T[]>(fetchData, { manual: true })

  const onChange: TableProps<T>['onChange'] = async (
    newPagination: TablePaginationConfig,
    newFilters: Record<string, FilterValue | null>,
    newSorter: SorterResult<DefaultRecordType> | SorterResult<DefaultRecordType>[],
    newExtra: TableCurrentDataSource<DefaultRecordType>,
  ) => {
    console.log('Table change params:', { newPagination, newFilters, newSorter, newExtra })
    pagination.value = { ...pagination.value, ...newPagination }

    const key = newSorter.field
    const value = newSorter.order == 'ascend' ? 'ASC' : 'DESC'
    if (newSorter.field) {
      order.value = {
        [key]: value,
      }
    }
    filters.value = Object.fromEntries(
      Object.entries(newFilters).map(([key, val]) => [key, val ? val[0] : null]),
    )

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
