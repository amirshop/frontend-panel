<template>
  <div>
    <!-- <AzTable class="mb-10" :columns="columns" :filterList="[]" :fetch="() => {}" /> -->

    <NewTable />
  </div>
</template>
<script setup lang="ts">
import { NewTable } from '@/core/components'
import AzTable from '@/core/components/AzTable.vue'
import { useTable } from '@/core/composable'
import type { ColumnsType } from 'ant-design-vue/es/table'
import axios from 'axios'
import { reactive } from 'vue'

const columns = reactive<ColumnsType>([
  {
    title: 'name.last',
    dataIndex: 'name.last',
    key: 'name.last',
  },
  {
    title: 'name.first',
    dataIndex: 'name.first',
    key: 'name.first',
  },
  {
    title: 'name.title',
    dataIndex: 'name.title',
    key: 'name.title',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
  },
])
</script>
