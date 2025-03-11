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
  Badge,
} from 'ant-design-vue'
import { useTable } from '@/temp/useTable.composable'
import { h, onMounted, ref } from 'vue'
import { AzButton } from '@/core/components'
import { useI18n } from 'vue-i18n'
import ExportData from '@/temp/ExportData.vue'
import FilterTable from '@/temp/FilterTable.vue'
import { TableFilterDataTypeEnum } from '@/core/enums'
import { stringFIlters } from '@/core/constant'
import type { SelectValue } from 'ant-design-vue/es/select'
import { useTableFiltersDropdown } from '@/temp/tableFiltersDropdown.component'
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { OrderTest } from '@/types/order/order.interface'
const { t } = useI18n()

const tableFiltersDropdown = useTableFiltersDropdown()
const columns: TableColumnType<OrderTest>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: t('title'),
    dataIndex: 'title',
    key: 'title',
    responsive: ['md'],
    filterDropdown: (props) =>
      tableFiltersDropdown.StringFilterDropdown({
        title: t('title'),
        props,
      }),
  },
  {
    title: 'قیمت',
    dataIndex: 'price',
    key: 'price',
    filterDropdown: (props) =>
      tableFiltersDropdown.NumberFilterDropdown({
        title: t('price'),
        props,
      }),
  },
  {
    title: 'فعال',
    dataIndex: 'isActive',
    key: 'isActive',
    filterDropdown: (props) =>
      tableFiltersDropdown.BooleanFilterDropdown({
        title: t('isActive'),
        props,
      }),
  },
  {
    title: 'تاریخ',
    dataIndex: 'createdAt',
    key: 'createdAt',
    filterDropdown: (props) =>
      tableFiltersDropdown.SelectFilterDropdown({
        title: t('createdAt'),
        props,
        list: [
          { label: 'show', value: 1 },
          { label: 'Book', value: 2 },
          { label: 'Home', value: 3 },
          { label: 'Car', value: 4 },
          { label: 'Bike', value: 5 },
        ],
      }),
  },
  {
    title: 'تاریخ',
    dataIndex: 'createdAt',
    key: 'createdAt',
    filterDropdown: (props) =>
      tableFiltersDropdown.DateFilterDropdown({
        title: t('isActive'),
        props,
      }),
  },
]
const filterList = ref([
  {
    key: 'title',
    // dateType: TableFilterDataTypeEnum.STRING,
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
