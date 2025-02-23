<template>
  <div>
    <AzTable :columnList="columnList"> </AzTable>
  </div>
</template>
<script setup lang="ts">
import { AzTable } from '@/core/components'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { reactive } from 'vue'

type TableDataType = {
  key: string
  gender: string
  email: string
  address: string
}

const columnList = reactive<ColumnsType>([
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    filterSearch: true,
    filters: [
      {
        text: 'female',
        value: 'female',
      },
      {
        text: 'male',
        value: 'male',
      },
    ],
    onFilter: (value, record) => record.gender === value,
    sorter: (a: TableDataType, b: TableDataType) => {
      console.log(a.gender, b)

      return a.gender.length - b.gender.length
    },
    sortDirections: ['ascend'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    customFilterDropdown: true,

    onFilter: (value, record) => record.email.includes(value),
  },

  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
  },
])
</script>
