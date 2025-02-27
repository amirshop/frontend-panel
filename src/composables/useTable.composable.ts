import type { ColumnsType, TablePaginationConfig } from 'ant-design-vue/es/table'
import { ref } from 'vue'
import { useRequest } from 'vue-request'
import axios from 'axios'

type DataList = unknown[]

interface UseTable {
  apiUrl: string
  title: string
  columnList: ColumnsType
}
export const useTable = ({ apiUrl, title, columnList }: UseTable) => {
  const dataList = ref<DataList>([])
  const total = ref<number>(1000)
  const pagination = ref<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  })

  const fetchData = async (apiUrl: string, pagination: TablePaginationConfig) => {
    return await axios.get(apiUrl, { body: pagination })
  }
  const { runAsync, loading, data } = useRequest((pagination: TablePaginationConfig) =>
    fetchData(apiUrl, pagination),
  )

  const fetchTable = async () => {
    loading.value = true
    const { data, pagination: newPagination } = await runAsync(pagination.value)
    dataList.value = data
    pagination.value = newPagination
    loading.value = false
  }

  const onChange = async (newPagination: TablePaginationConfig) => {
    pagination.value = newPagination
    await fetchTable()
  }

  return {
    dataList,
    columnList,
    fetchTable,
    pagination,
    title,
    loading,
    onChange,
    apiUrl,
    runAsync,
  }
}
const xx = useTable({
  title: 'dd',
  columnList: [],
})
