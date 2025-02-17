import { ref, reactive, computed } from 'vue'
import * as XLSX from 'xlsx'
import { useAsyncState, useDebounceFn, useFullscreen } from '@vueuse/core'
import _ from 'lodash'
import type { TablePaginationConfig, TableProps } from 'ant-design-vue/es/table'
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'ant-design-vue/lib/table/interface'
import html2canvas from 'html2canvas'

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

export function useTable<T>(defaultParams: Partial<FetchParams> = {}) {
  const tableRef = ref<HTMLElement | null>(null)
  const fetchData = ref<((params: FetchParams) => Promise<FetchResult<T>>) | null>(null)

  const fullscreen = useFullscreen(tableRef)

  const pagination = reactive<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
  })
  const filters = reactive<Record<string, FilterValue>>(defaultParams.filters || {})
  const sorter = reactive<{ field: string | null; order: string | null }>({
    field: defaultParams.sortField || null,
    order: defaultParams.sortOrder || null,
  })
  const searchQuery = ref(defaultParams.search || '')

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

  const handleTableChange: TableProps<T>['onChange'] = (
    newPagination: TablePaginationConfig,
    newFilters: Record<string, FilterValue | null>,
    newSorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>,
  ) => {
    pagination.current = newPagination.current ?? 1
    pagination.pageSize = newPagination.pageSize ?? 10
    Object.assign(filters, _.cloneDeep(newFilters))

    const singleSorter = Array.isArray(newSorter) ? newSorter[0] : newSorter
    sorter.field = singleSorter?.order ? (singleSorter.field as string) : null
    sorter.order = singleSorter?.order || null

    reload()
  }

  const handleSearch = useDebounceFn(() => reload(), 500)

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData.value)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'export.xlsx')
  }

  const exportJson = () => {
    const json = JSON.stringify(tableData.value, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'export.json'
    link.click()
  }

  const exportXml = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n'
    tableData.value.forEach((row) => {
      xml += '  <row>\n'
      Object.entries(row).forEach(([key, value]) => {
        xml += `    <${key}>${value}</${key}>\n`
      })
      xml += '  </row>\n'
    })
    xml += '</rows>'

    const blob = new Blob([xml], { type: 'application/xml' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'export.xml'
    link.click()
  }

  const exportImage = async () => {
    if (tableRef.value) {
      const azTable = document.getElementById('az-table')
      if (!azTable) return
      const canvas = await html2canvas(azTable)
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'export.png'
      link.click()
    }
  }

  return {
    tableRef,
    tableData,
    loading,
    pagination,
    filters,
    sorter,
    searchQuery,
    reload,
    handleTableChange,
    handleSearch,
    exportExcel,
    exportJson,
    exportXml,
    exportImage,
    fullscreen,
    fetchData,
  }
}
