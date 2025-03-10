<template>
  <div class="table-container">
    <Table
      :columns="columns"
      :data-source="amirTable.dataSource.value"
      :loading="amirTable.loading.value"
      :pagination="amirTable.pagination.value"
      @change="amirTable.handleTableChange"
      bordered
      size="middle"
    >
    </Table>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type { TableColumnType } from 'ant-design-vue'

import { Table, Badge } from 'ant-design-vue'
import { useAmirTable } from '@/composables/useAmirTable'
import { onMounted } from 'vue'
import { useAmirFilter } from '@/composables/useAmirFilter'

// Types
interface Order {
  id: number
  title: string
  price: number
  isActive: boolean
  createdAt: string
}
const amirTable = useAmirTable<Order>()
const amirFilter = useAmirFilter()
// Table Columns
const columns: TableColumnType<Order>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    width: 100,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    filterDropdown: (props) =>
      amirFilter.stringFilter<Order>({
        title: 'title',
        props: props,
        onFilter: async () => {
          amirTable.filters.value = amirFilter.filter.value
          await amirTable.fetchData()
        },
      }),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    filterDropdown: (props) =>
      amirFilter.stringFilter<Order>({
        title: 'title',
        props: props,
        onFilter: async () => {
          amirTable.filters.value = amirFilter.filter.value
          await amirTable.fetchData()
        },
      }),
  },
]

onMounted(async () => await amirTable.fetchData())
</script>
