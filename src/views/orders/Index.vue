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
  />
</template>

<script setup lang="ts">
import WTable from '@/components/WTable.vue'
import { useTable } from '@/composables/useTable.composable'
import { onMounted } from 'vue'

const table = useTable({
  apiUrl: 'https://fakestoreapi.com/products',
  title: 'salam',
  columnList: [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
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

onMounted(async () => await table.fetchTable())
</script>
