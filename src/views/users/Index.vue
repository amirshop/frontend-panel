<template>
  <div class="">
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
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    customFilterDropdown: true,
  },

  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
  },
])
</script>
