<template>
  <div>
    <NewTable :columns="columns"  />
  </div>
</template>
<script setup lang="ts">
import { NewTable } from '@/core/components'
import { reactive } from 'vue'

const columns = reactive([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => text,
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
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render: (text: string) => text,
  },
])
</script>
