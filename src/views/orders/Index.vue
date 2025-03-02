<template>
  <BadgeRibbon
    :text="t('title')"
    placement="start"
    class="leading-8 md:leading-10 md:px-4 font-medium"
  >
    <Card>
      <template #extra>
        <FilterTable :filterList="filterList" />
        <Divider type="vertical" />
        <ExportData :data="orderTable.dataSource.value" />
        <Divider type="vertical" />
        <Tooltip :title="t('resetTable')">
          <AzButton type="link" size="small" @click="orderTable.onChange" icon="tabler:refresh">
            <div class="hidden md:block">{{ t('resetTable') }}</div>
          </AzButton>
        </Tooltip>
      </template>

      <Table
        :scroll="{ y: 600 }"
        :pagination="orderTable.pagination.value"
        :columns="orderTable.columns"
        :dataSource="orderTable.dataSource.value"
        :loading="orderTable.loading.value"
        @change="orderTable.onChange"
      />
    </Card>
  </BadgeRibbon>
</template>

<script setup lang="ts">
import type { TableColumnType } from 'ant-design-vue'
import {
  Card,
  Table,
  BadgeRibbon,
  Tooltip,
  Divider,
  Form,
  FormItem,
  Input,
  Button,
  InputNumber,
  Select,
} from 'ant-design-vue'
import { useTable } from '@/composables/useTable.composable'
import { h, onMounted, ref } from 'vue'
import { AzButton } from '@/core/components'
import { useI18n } from 'vue-i18n'
import ExportData from '@/core/components/ExportData.vue'
import FilterTable from '@/core/components/FilterTable.vue'
import { TableFilterDataTypeEnum } from '@/core/enums'
import { stringFIlters } from '@/core/constant'
import type { SelectValue } from 'ant-design-vue/es/select'
import { useTableFiltersDropdown } from '@/core/composable/tableFiltersDropdown.composable'
const { t } = useI18n()
type Product = {
  id: number
  title: string
  price: number
  isActive: boolean
  createdAt: Date
}

const tableFiltersDropdown = useTableFiltersDropdown()
const columns: TableColumnType<Product>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: t('عنوان'),
    dataIndex: 'title',
    key: 'title',
    filterDropdown: tableFiltersDropdown.StringFilterDropdown('عنوان'),
  },
  {
    title: 'قیمت',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    filterDropdown: tableFiltersDropdown.NumberFilterDropdown('قیمت'),
  },
  {
    title: 'فعال',
    dataIndex: 'isActive',
    key: 'isActive',
    filterDropdown: tableFiltersDropdown.BooleanFilterDropdown('فعال'),
  },
  {
    title: 'تاریخ',
    dataIndex: 'date',
    key: 'date',
    filterDropdown: tableFiltersDropdown.DateFilterDropdown('تاریخ'),

  },
]
const filterList = ref([
  {
    key: 'title',
    dateType: TableFilterDataTypeEnum.STRING,
  },

  {
    key: 'price',
    dateType: TableFilterDataTypeEnum.NUMBER,
    value: '',
  },
  {
    key: 'category',
    dateType: TableFilterDataTypeEnum.SELECT,
    list: [],
    value: '',
  },
  {
    key: 'category',
    dateType: TableFilterDataTypeEnum.DATE,
    value: '',
  },
  {
    key: 'category',
    dateType: TableFilterDataTypeEnum.BOOLEAN,
    value: '',
  },
])
const orderTable = useTable<Product>({
  apiUrl: 'http://localhost:5000/api/orders/table',
  columns,
})
onMounted(async () => {
  await orderTable.runAsync()
})
</script>
<style lang="less">
.ant-card-extra {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
</style>
