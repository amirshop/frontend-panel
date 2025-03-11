<template>
  <div>
    <MyTable title="amir" :column-list="columnList" :data-list="dataList" />
  </div>
</template>

<script setup lang="ts">
import MyTable from '@/temp/MyTable.vue'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { reactive, ref } from 'vue'

const columnList = ref<ColumnsType>([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    filters: [
      { text: 'New York', value: 'New York' },
      { text: 'London', value: 'London' },
      { text: 'Sidney', value: 'Sidney' },
    ],
    filterSearch: true,
    sorter: (a, b) => a.address.length - b.address.length,
    onFilter: (value, record) => {
      return record.address.indexOf(value) === 0
    },
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
])
const dataList = reactive([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
])
</script>
