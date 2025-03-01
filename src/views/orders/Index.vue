<template>
  <WTable
    :column-list="table.columnList"
    :data-list="table.dataList.value"
    :pagination="table.pagination.value"
    :title="table.title"
    :loading="table.loading.value"
    @changeTable="table.onChange"
    @restTable="table.fetchTable"
    @fetchTable="table.fetchTable"
    :filter-list="filterList"
  />
</template>

<script setup lang="ts">
import WTable from '@/components/WTable.vue'
import { useTable } from '@/composables/useTable.composable'
import { TableFilterDataTypeEnum, TableFilterOperatorBooleanEnum } from '@/core/enums'
import type { Filter } from '@/core/types/table.interface'
import { onMounted, ref } from 'vue'

const table = useTable({
  apiUrl: 'https://fakestoreapi.com/products',
  title: 'orders',
  columnList: [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
    },
  ],
})

const filterList = ref([
  {
    key: 'title',
    dateType: TableFilterDataTypeEnum.STRING,
  },
  {
    key: 'description',
    dateType: TableFilterDataTypeEnum.STRING,
  },
  {
    key: 'price',
    dateType: TableFilterDataTypeEnum.NUMBER,
  },
  {
    key: 'category',
    dateType: TableFilterDataTypeEnum.SELECT,
    list:[]
  },
  {
    key: 'category',
    dateType: TableFilterDataTypeEnum.DATE,
  },
  {
    key: 'category',
    dateType: TableFilterDataTypeEnum.BOOLEAN,
  },
])
// const filterList: Filter[] = [
//   {
//     field: '',
//     dataType: TableFilterDataTypeEnum.BOOLEAN,
//     operator: TableFilterOperatorBooleanEnum.IS_FALSE,
//     criteria: true,
//   },
// ]
onMounted(async () => await table.fetchTable())
</script>
