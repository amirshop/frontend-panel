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
} from 'ant-design-vue'
import { useTable } from '@/composables/useTable.composable'
import { h, onMounted, ref } from 'vue'
import { AzButton } from '@/core/components'
import { useI18n } from 'vue-i18n'
import ExportData from '@/core/components/ExportData.vue'
import FilterTable from '@/core/components/FilterTable.vue'
import { TableFilterDataTypeEnum } from '@/core/enums'
import { Icon } from '@iconify/vue'
const { t } = useI18n()

type Product = {
  id: number
  title: string
  price: number
  isActive: boolean
  createdAt: Date
}
const columns: TableColumnType<Product>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    filterDropdown: () => {
      return h(Card, {}, [
        h(Form, { layout: 'vertical' }, [
          h(FormItem, { label: 'id' }, [h(Input, { allowClear: true })]),
          h(Button, { type: 'primary', block: true }, 'فیلتر'),
        ]),
      ])
    },
  },
  {
    title: 'عنوان',
    dataIndex: 'title',
    key: 'title',
    filterDropdown: () => {
      return h(Card, {}, [
        h(Form, { layout: 'vertical' }, [
          h(FormItem, { label: 'id' }, [h(Input, { allowClear: true })]),
          h(Button, { type: 'primary', block: true }, 'فیلتر'),
        ]),
      ])
    },
  },
  {
    title: 'قیمت',
    dataIndex: 'price',
    key: 'price',
    filterDropdown: () => {
      return h(Card, {}, [
        h(Form, { layout: 'vertical' }, [
          h(FormItem, { label: 'id' }, [h(InputNumber, { allowClear: true })]),
          h(Button, { type: 'primary', block: true }, 'فیلتر'),
        ]),
      ])
    },
  },
  {
    title: 'دسته‌بندی',
    dataIndex: 'category',
    key: 'category',
    filterDropdown: () => {
      return h(Card, {}, [
        h(Form, { layout: 'vertical' }, [
          h(FormItem, { label: 'id' }, [h(InputNumber, { allowClear: true })]),
          h(Button, { type: 'primary', block: true }, 'فیلتر'),
        ]),
      ])
    },
  },
  {
    title: 'توضیحات',
    dataIndex: 'description',
    key: 'description',
    filterDropdown: () => {
      return h(Card, {}, [
        h(Form, { layout: 'vertical' }, [
          h(FormItem, { label: 'id' }, [h(InputNumber, { allowClear: true })]),
          h(Button, { type: 'primary', block: true }, 'فیلتر'),
        ]),
      ])
    },
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
  gap: 0.4rem;
}
</style>
