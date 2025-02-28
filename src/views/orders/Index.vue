<template>
 <div class="">
   <Card>
    
  </Card>
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
 </div>
</template>

<script setup lang="ts">
import WTable from '@/components/WTable.vue'
import { useTable } from '@/composables/useTable.composable'
import { TableFilterDataTypeEnum, TableFilterOperatorBooleanEnum } from '@/core/enums'
import type { Filter } from '@/core/types/table.interface'
import { onMounted } from 'vue'

const table = useTable({
  apiUrl: 'https://fakestoreapi.com/products',
  title: 'salam',
  columnList: [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      filterMode: 'menu',
      filtered: true,
      filters: [],
      filterSearch: true
      // dateType: TableFilterDataTypeEnum.STRING
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      dateType: TableFilterDataTypeEnum.STRING
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      dateType: TableFilterDataTypeEnum.SELECT
    },
  ],
})
const filterList: Filter[] = [
  {
    field: '',
    dataType: TableFilterDataTypeEnum.BOOLEAN,
    operator: TableFilterOperatorBooleanEnum.IS_FALSE,
    criteria: true,
  },
]
onMounted(async () => await table.fetchTable())
</script>
