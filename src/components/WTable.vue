<template>
  <Card>
    <Table
      :columns="props.columnList"
      :data-source="props.dataList"
      :pagination="props.pagination"
      @change="(e) => emits('change', e)"
    >
    </Table>
  </Card>
</template>
<script setup lang="ts">
import { Table, Card } from 'ant-design-vue/es'
import type { ColumnsType, TablePaginationConfig } from 'ant-design-vue/es/table'
type DataList = any[]

interface Props {
  columnList: ColumnsType
  dataList: DataList
  pagination: false | TablePaginationConfig
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['change'])
</script>
