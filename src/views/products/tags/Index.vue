<template>
  <div>
    <MyTable title="amir" :columnList="columnList" :dataList="dataList" />
  </div>
</template>

<script setup lang="ts">
import MyTable from '@/temp/MyTable.vue'
import { useTable } from '@/core/composable'
import { useHttp } from '@/temp/http.composable.ts'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { onMounted, reactive, ref } from 'vue'

const columnList = ref<ColumnsType>([
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'price',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: 'rating.count',
    key: 'rating.count',
    dataIndex: ['rating', 'count'],
  },
  {
    title: 'rating.rate',
    key: 'rating.rate',
    dataIndex: ['rating', 'rate'],
  },
])
interface Amir {
  data: any[]
}
const { request } = useHttp()
const { runAsync, data } = request<Amir>({
  method: 'get',
  url: '/products',
})
const table = useTable()
const dataList = ref([])
onMounted(async () => {
  await runAsync()
})
</script>
