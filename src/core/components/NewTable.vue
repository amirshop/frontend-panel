<template>
  <Table
    :columns="props.columns"
    :data-source="data"
    :pagination="paginationProps"
    :bordered="props.bordered"
    :direction="configProviderStore.direction"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { usePagination } from '@/core/composable/pagination.composable' // مسیر فایل usePagination
import { Table } from 'ant-design-vue'
import axios from 'axios'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { useConfigProviderStore } from '@/core/stores/configProvider.store'

interface Props {
  bordered?: boolean
  columns: ColumnsType
}
const props = withDefaults(defineProps<Props>(), {
  bordered: false,
  columns: () => [],
})
const configProviderStore = useConfigProviderStore()
const data = ref([])

// تعداد کل داده‌ها
const total = ref(0)

const { current, size, changePage, changePageSize } = usePagination({
  total: total.value,
  pageSize: 10,
  currentPage: 1,
  onChange: (page, pageSize) => {
    console.log(`Page: ${page}, Page Size: ${pageSize}`)
  },
})

// تنظیمات صفحه‌بندی جدول
const paginationProps = computed(() => ({
  current: current.value,
  pageSize: size.value,
  total: total.value,
  showSizeChanger: true,
  pageSizeOptions: ['5', '10', '20'],
  onChange: changePage,
  onShowSizeChange: (current: number, size: number) => changePageSize(size),
}))

// بارگذاری داده‌ها از API
const loadData = async () => {
  const response = await axios.get('https://randomuser.me/api', {
    params: {
      results: 10,
      page: current.value,
    },
  })
  const users = response.data.results.map((user: any) => ({
    key: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    gender: user.gender,
    email: user.email,
    location: `${user.location.city}, ${user.location.country}`,
  }))
  data.value = users
  total.value = response.data.info.results
}

// بارگذاری داده‌ها هنگام مونت شدن کامپوننت
onMounted(() => {
  loadData()
})
</script>
