<template>
  <Card>
    <template #extra>
      <ExportData :data="props.dataList" />
      <Divider type="vertical" />
      <Tooltip :title="t('resetTable')">
        <AzButton
          type="link"
          size="small"
          @click="() => emits('restTable')"
          icon="tabler:refresh"
        />
      </Tooltip>
    </template>

    <Table
      :columns="props.columnList"
      :data-source="props.dataList"
      :pagination="props.pagination"
      :loading="props.loading"
      @change="(e) => emits('changeTable', e)"
    >
    </Table>
  </Card>
</template>
<script setup lang="ts">
import AzButton from '@/core/components/AzButton.vue'
import ExportData from '@/core/components/ExportData.vue'
import { Table, Card, Tooltip, Divider } from 'ant-design-vue/es'
import type { ColumnsType, TablePaginationConfig } from 'ant-design-vue/es/table'
import { useI18n } from 'vue-i18n'

type DataList = unknown[]
interface Props {
  columnList: ColumnsType
  dataList: DataList
  loading: boolean
  pagination: false | TablePaginationConfig
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['changeTable', 'restTable'])

const { t } = useI18n()
</script>
<style lang="less">
.ant-card-extra {
  display: flex;
  gap: 0.4rem;
}
</style>
