<template>
  <div>
    <STable :columns="columns" :scroll="{ y: 400 }" :pagination="true" :data-source="data" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { STable } from '@surely-vue/table'
import z from '@surely-vue/table/dist/index.esm'

console.log(z)
const columns = ref([
  {
    title: 'Full Name',
    dataIndex: 'name',
    width: 150,
    resizable: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 100,
    resizable: true,
  },
  {
    title: 'Column 1（minWidth： 100， maxWidth： 500）',
    dataIndex: 'address',
    key: 'address1',
    minWidth: 100,
    maxWidth: 500,
    resizable: true,
  },
  {
    title: 'Column 2',
    key: 'address2',
    dataIndex: 'address',
  },
  {
    title: 'Column 3',
    key: 'address3',
    dataIndex: 'address',
  },
  {
    title: 'Column 4',
    key: 'address4',
    dataIndex: 'address',
  },
  { title: 'Column 5', dataIndex: 'address', key: 'address5' },
  {
    title: 'Action',
    key: 'operation',
    width: 100,
    resizable: true,
  },
])
interface DataItem {
  key: number
  name: string
  age: number
  address: string
}
const data = ref<DataItem[]>([])
for (let i = 0; i < 1000; i++) {
  data.value.push({
    key: i,
    name: `Edrward ${i}`,
    age: i + 1,
    address: `London Park no. ${i}`,
  })
}
</script>
