import { useAsyncState, useDebounceFn } from '@vueuse/core'
import type { TableProps } from 'ant-design-vue'
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
  TablePaginationConfig,
} from 'ant-design-vue/es/table/interface'
import _ from 'lodash'
import { computed, reactive, ref } from 'vue'

// تعریف FetchParams و FetchResult
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

export const useTable = <T>() => {
  const fetchData = ref<((params: FetchParams) => Promise<FetchResult<T>>) | null>(null)
  const defaultParams: Partial<FetchParams> = {}

  const pagination = reactive<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
  })
  const filters = reactive<Record<string, FilterValue>>({ ...(defaultParams.filters || {}) })
  const sorter = reactive<{ field: string | null; order: string | null }>({
    field: defaultParams.sortField || null,
    order: defaultParams.sortOrder || null,
  })
  const searchQuery = ref(defaultParams.search || '')

  const size = ref<'default' | 'middle' | 'small'>('default')
  const bordered = ref(false)
  const scroll = ref<{ y?: number; x?: number }>({})

  const params = computed<FetchParams>(() => ({
    page: pagination.current || 1,
    pageSize: pagination.pageSize || 10,
    filters,
    sortField: sorter.field,
    sortOrder: sorter.order,
    search: searchQuery.value,
  }))

  const {
    state: tableData,
    isLoading: loading,
    execute: reload,
  } = useAsyncState(
    async () => {
      if (!fetchData.value) return []
      const res = await fetchData.value(params.value)
      pagination.total = res.total
      return res.data
    },
    [],
    { immediate: true },
  )

  const handleTableChange: TableProps['onChange'] = (
    newPagination: TablePaginationConfig,
    newFilters: Record<string, FilterValue | null>,
    newSorter: SorterResult<unknown> | SorterResult<unknown>[],
    newExtra: TableCurrentDataSource<unknown>,
  ) => {
    pagination.current = newPagination.current ?? 1
    pagination.pageSize = newPagination.pageSize ?? 10
    _.assign(filters, _.cloneDeep(newFilters))

    const singleSorter = Array.isArray(newSorter) ? newSorter[0] : newSorter
    sorter.field = singleSorter?.order ? (singleSorter.field as string) : null
    sorter.order = singleSorter?.order || null

    reload()
  }

  const handleSearch = useDebounceFn(() => reload(), 500)

  // تابع برای اعمال فیلترهای جدید
  const setFilters = (newFilters: Record<string, FilterValue>) => {
    // ابتدا کل فیلترهای قبلی را حذف می‌کنیم
    for (const key in filters) {
      delete filters[key]
    }
    // سپس مقادیر جدید را اضافه می‌کنیم
    Object.assign(filters, newFilters)
    pagination.current = 1 // بازنشانی صفحه به 1
    reload()
  }

  // تابع برای بازنشانی فیلترها
  const resetFilters = () => {
    for (const key in filters) {
      delete filters[key]
    }
    pagination.current = 1
    reload()
  }

  return {
    tableData,
    loading,
    pagination,
    filters,
    sorter,
    searchQuery,
    size,
    bordered,
    scroll,
    reload,
    handleTableChange,
    handleSearch,
    fetchData,
    setFilters,
    resetFilters,
  }
}
