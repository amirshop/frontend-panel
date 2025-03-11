<template>
  <div>
    <Table
      :columns="columns"
      :data-source="amirTable.tableData.value"
      :loading="amirTable.isLoading.value"
      :pagination="amirTable.paginationConfig.value"
      @change="amirTable.handleTableChange"
      bordered
      size="middle"
    />
  </div>
</template>

<script setup lang="ts">
import type { TableColumnType } from 'ant-design-vue'
import { Table } from 'ant-design-vue'
import { useTable } from '@/composables/useTable.composable'
import { onMounted } from 'vue'

// Types
interface Order {
  id: number
  title: string
  price: number
  isActive: boolean
  createdAt: string
}

const amirTable = useTable<Order>()

const columns: TableColumnType<Order>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    key: 'isActive',
    ellipsis: true,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    ellipsis: true,
  },
]

onMounted(async () => await amirTable.fetchData())
</script>
