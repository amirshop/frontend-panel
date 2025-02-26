<template>
  <AGTable />
  <!-- <WTable
    :column-list="table.columnList.value"
    :data-list="table.dataList.value"
    :pagination="table.pagination.value"
    :title="table.title.value"
    @change="table.onChange"
  /> -->
</template>

<script setup lang="ts">
import AGTable from '@/components/AGTable.vue'
import WTable from '@/components/WTable.vue'
import { useTable } from '@/composables/useTable.composable'
import { onMounted } from 'vue'

const table = useTable()

// مقداردهی به عنوان و لیست ستون‌ها
table.title.value = 'salasm'
table.columnList.value.push(
  ...[
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ],
)

// مقداردهی به apiUrl
table.apiUrl.value = 'https://fakestoreapi.com/products'

onMounted(async () => await table.runAsync)
</script>
