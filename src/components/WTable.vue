<template>
  <BadgeRibbon
    :text="t(props.title)"
    placement="start"
    class="leading-8 md:leading-10 md:px-4 font-medium"
  >
    <Card>
      <template #extra>
        <FilterTable :filterList="props.filterList" />
        <Divider type="vertical" />
        <ExportData :data="props.dataList" />
        <Divider type="vertical" />
        <Tooltip :title="t('resetTable')">
          <AzButton
            type="link"
            size="small"
            @click="() => emits('restTable')"
            icon="tabler:refresh"
          >
            <div class="hidden md:block">{{ t('resetTable') }}</div>
          </AzButton>
        </Tooltip>
      </template>

      <Table
        id="az-table"
        :columns="props.columnList"
        :data-source="props.dataList"
        :pagination="props.pagination"
        :loading="props.loading"
        @change="(e) => emits('changeTable', e)"
      >
      </Table>
    </Card>
  </BadgeRibbon>
</template>
<script setup lang="ts">
import AzButton from '@/core/components/AzButton.vue'
import ExportData from '@/core/components/ExportData.vue'
import FilterTable from '@/core/components/FilterTable.vue'
import { Table, Card, Tooltip, Divider, BadgeRibbon } from 'ant-design-vue/es'
import type { ColumnsType, TablePaginationConfig } from 'ant-design-vue/es/table'
import { useI18n } from 'vue-i18n'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
type DataList = unknown[]
interface Props {
  columnList: ColumnsType
  dataList: DataList
  filterList: Array<object>
  loading: boolean
  pagination: false | TablePaginationConfig
  title: string
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['changeTable', 'restTable'])
const panelSettingsStore = usePanelSettingsStore()
const { t } = useI18n()
</script>
<style lang="less">
.ant-card-extra {
  display: flex;
  gap: 0.4rem;
}
</style>
