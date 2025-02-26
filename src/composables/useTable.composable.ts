import type { ColumnsType, TablePaginationConfig } from 'ant-design-vue/es/table'
import { ref } from 'vue'
import { useRequest } from 'vue-request'
import axios from 'axios'

type DataList = any[]

// تابعی برای فراخوانی داده‌ها از API
const fetchData = async (pagination: TablePaginationConfig, apiUrl: string) => {
  const response = await axios.get(apiUrl, {
    params: {
      _page: pagination.current,
      _limit: pagination.pageSize,
    },
  })

  return {
    data: response.data, // داده‌های بازگشتی از API
    pagination: {
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: parseInt(response.headers['x-total-count'] || '0', 10), // تعداد کل صفحات
    },
  }
}

export const useTable = () => {
  const apiUrl = ref('') // آدرس API را از بیرون دریافت می‌کنیم
  const title = ref<string>('')
  const columnList = ref<ColumnsType>([])
  const dataList = ref<DataList>([])
  const pagination = ref<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  })

  // استفاده از useRequest برای مدیریت درخواست
  const { runAsync, loading } = useRequest(
    (pagination: TablePaginationConfig) => fetchData(pagination, apiUrl.value),
    { manual: true },
  )

  const resetTable = async () => {
    loading.value = true
    const { data, pagination: newPagination } = await runAsync(pagination.value)
    dataList.value = data
    pagination.value = newPagination
    loading.value = false
  }

  const onChange = async (newPagination: TablePaginationConfig) => {
    pagination.value = newPagination
    await resetTable()
  }

  return {
    dataList,
    columnList,
    resetTable,
    pagination,
    title,
    loading,
    onChange,
    apiUrl,
    runAsync,
  }
}
