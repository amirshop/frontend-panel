<template>
  <Card>
    <Table :dataSource="filteredData" :columns="props.columnList" prefix-cls="az-table">
      <template #title>
        <div class="text-base font-medium">{{ props.title }}</div>
        <div class="flex items-center">
          <Divider type="vertical" />
          <ExportData :data="filteredData" />
          <Divider type="vertical" />
          <Tooltip :title="t('resetTable')">
            <AzButton type="link" size="small" @click="resetFilters" icon="tabler:refresh" />
          </Tooltip>
        </div>
      </template>
    </Table>
  </Card>
</template>

<script setup lang="ts">
import type { DefaultRecordType } from 'ant-design-vue/es/vc-table/interface'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { Table, Card, Divider, Tooltip } from 'ant-design-vue/es'
import { useI18n } from 'vue-i18n'
import { useTable } from '@/core/composable'
import { AzButton } from '@/core/components'
import ExportData from '@/temp/ExportData.vue'
import { computed, ref } from 'vue'
import { isUndefined } from 'lodash'

interface Props {
  columnList: ColumnsType
  dataList: DefaultRecordType[]
  title: string
}
const props = withDefaults(defineProps<Props>(), {})
const { t } = useI18n()
const userTable = useTable()

const filters = ref<{ [key: string]: string | null }>({})

const filteredData = computed(() => {
  if (isUndefined(props.dataList)) return
  return props.dataList.filter((item) =>
    Object.keys(filters.value).every((key) =>
      filters.value[key]
        ? String(item[key]).toLowerCase().includes(filters.value[key]!.toLowerCase())
        : true,
    ),
  )
})

// ریست کردن فیلترها
const resetFilters = () => {
  filters.value = {}
}
</script>
<style lang="less">
.az-table {
  .az-table-title {
    @apply flex items-center justify-between;
  }
}
</style>
