<template>
  <Card>
    <Table :dataSource="props.dataList" :columns="props.columnList" prefix-cls="az-table">
    <template #title>
      <div class="text-base font-medium">{{ props.title }}</div>
      <div class="flex items-center">
        <Divider type="vertical" />
        <Dropdown>
          <Tooltip :title="t('exportData')">
            <AzButton
              type="link"
              size="small"
              class="ant-dropdown-link"
              @click.prevent
              icon="tabler:table-export"
            >
              {{ t('export') }}
            </AzButton>
          </Tooltip>
          <template #overlay>
            <div class="bg-slate-200 dark:bg-dark grid grid-cols-2 gap-2 p-2 shadow rounded">
              <Tooltip :title="t('excel')">
                <Icon
                  @click="exportFile.excel(userTable.tableData.value)"
                  class="bg-white dark:bg-slate-700 rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-excel"
                />
              </Tooltip>
              <Tooltip :title="t('json')">
                <Icon
                  @click="exportFile.json(userTable.tableData.value)"
                  class="bg-white dark:bg-slate-700 rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-json"
                />
              </Tooltip>
              <Tooltip :title="t('image')">
                <Icon
                  @click="exportFile.image('az-table')"
                  class="bg-white dark:bg-slate-700 rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-image"
                />
              </Tooltip>
              <Tooltip :title="t('xml')">
                <Icon
                  @click="exportFile.xml(userTable.tableData.value)"
                  class="bg-white dark:bg-slate-700 rounded p-2 cursor-pointer"
                  icon="vscode-icons:file-type-xml"
                />
              </Tooltip>
            </div>
          </template>
        </Dropdown>
        <Divider type="vertical" />
        <Tooltip :title="t('resetTable')">
          <AzButton type="link" size="small" @click="userTable.reload" icon="tabler:refresh" />
        </Tooltip>
      </div>
    </template>
  </Table>
  </Card>
</template>
<script setup lang="ts">
import {
  Table,
  Card,
  Divider,
  RangePicker,
  Tooltip,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Badge,
  Dropdown,
} from 'ant-design-vue/es'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { useI18n } from 'vue-i18n'
import { useExportFile } from '@/core/composable/exportFile.composable'
import { useTable } from '@/core/composable'
import { AzButton } from '@/core/components'
import { Icon } from '@iconify/vue/dist/iconify.js'

interface Props {
  columnList: ColumnsType
  dataList: unknown[]
  title: string
}
const props = withDefaults(defineProps<Props>(), {})
const { t } = useI18n()
const exportFile = useExportFile()
const userTable = useTable()
</script>
<style lang="less">
.az-table {
  .az-table-title {
    @apply flex items-center justify-between;
  }
}
</style>
