<template>
  <div class="table-container">
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
import { useAntdAdvancedTable } from '@/composables/useAntdAdvancedTable'
import { onMounted } from 'vue'

// Types
interface Order {
  id: number
  title: string
  price: number
  isActive: boolean
  createdAt: string
}

const amirTable = useAntdAdvancedTable<Order>()

const columns: TableColumnType<Order>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    width: 100,
    filterDropdown: (props) => amirTable.renderNumberFilter({ title: 'ID', props }),
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    filterDropdown: (props) => amirTable.renderStringFilter({ title: 'Title', props }),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    filterDropdown: (props) => amirTable.renderNumberFilter({ title: 'Price', props }),
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    key: 'isActive',
    filterDropdown: (props) => amirTable.renderBooleanFilter({ title: 'Active', props }),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    filterDropdown: (props) => amirTable.renderDateFilter({ title: 'Created At', props }),
  },
]

onMounted(async () => await amirTable.fetchData())
</script>
