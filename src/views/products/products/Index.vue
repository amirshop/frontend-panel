<template>
  <div>
    <MyTable title="amir" :column-list="columnList" :data-list="dataList" />
  </div>
</template>

<script setup lang="ts">
import MyTable from '@/temp/MyTable.vue'
import { useHttp } from '@/temp/http.composable.ts'
import { useFetch } from '@vueuse/core'
import type { ColumnsType } from 'ant-design-vue/es/table'
import axios from 'axios'
import { onMounted, h, ref } from 'vue'
import { Input, Button, InputSearch, Card, Form, FormItem, Select } from 'ant-design-vue'

const searchText = ref<string>('')
const searchedColumn = ref<string>('')

const getColumnSearchProps = (dataIndex: string) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) =>
    h('div', { style: 'padding: 8px' }, [
      h(Input, {
        value: selectedKeys[0],
        onChange: (e: Event) =>
          setSelectedKeys(
            (e.target as HTMLInputElement).value ? [(e.target as HTMLInputElement).value] : [],
          ),
        onPressEnter: () => confirm(),
        placeholder: 'جستجو...',
        style: 'margin-bottom: 8px; display: block',
      }),
      h(
        Button,
        {
          type: 'primary',
          size: 'small',
          style: 'width: 100%',
          onClick: () => confirm(),
        },
        () => 'جستجو',
      ),
      h(
        Button,
        {
          size: 'small',
          style: 'width: 100%; margin-top: 8px',
          onClick: () => {
            clearFilters?.()
            searchText.value = ''
          },
        },
        () => 'پاک کردن',
      ),
    ]),
  onFilter: (value: string, record: any) =>
    record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
  filterIcon: () => h('span', {}, '🔍'),
})

// ifs for data types
const res = ref()
if (typeof res.value === 'boolean') {
  h(Select, {
    items: [
      { label: 'true', value: true },
      { label: 'false', value: false },
    ],
    onChange: (value) => {
      res.value = value
    },
  })
}

const columnList = ref<ColumnsType>([
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
    filters: [
      { text: 'New York', value: 'New York' },
      { text: 'London', value: 'London' },
      { text: 'Sidney', value: 'Sidney' },
    ],
    filterSearch: true,
    sorter: (a, b) => a.description.length - b.description.length,
    onFilter: (value, record) => {
      return record.description.indexOf(value) === 0
    },
  },
  {
    title: 'category',
    key: 'category',
    dataIndex: 'category',
    filterIcon: () => h('span', {}, '🔍'),
    filterDropdown: () => {
      return h(Card, {}, [
        h(Form, { layout: 'vertical' }, [
          h(FormItem, { label: 'category' }, [
            h(Input, {
              value: searchText.value,

              onChange: (e: Event) => {
                searchText.value = (e.target as HTMLInputElement).value
              },
            }),
          ]),
          h(
            Button,
            {
              type: 'primary',
              onClick: () => {
                console.log(dataList.value)
                if (searchText.value === '') return dataList.value
                dataList.value = dataList.value.filter((item) => item.category === searchText.value)
              },
            },
            'Search',
          ),
        ]),
      ])
    },
  },
  {
    title: 'id',
    key: 'id',
    dataIndex: 'id',
    filterDropdown: () => {
      // find current column
      const column = columnList.value.find((column) => column.dataIndex === 'id')
      // const

      return h(Card, {}, ['sdfsdf'])
    },
  },
  {
    title: 'image',
    key: 'image',
    dataIndex: 'image',
  },
  {
    title: 'rating.count',
    key: 'rating.count',
    dataIndex: ['rating', 'count'],
  },
  {
    title: 'rating.rate',
    key: 'rating.rate',
    dataIndex: ['rating', 'rate'],
    filterSearch: true,
    sorter: (a, b) => a.description.length - b.description.length,
    onFilter: (value, record) => {
      return record.description.indexOf(value) === 0
    },
  },
])
const dataList = ref()
const getData = async () => {
  try {
    const { data } = await useFetch('https://fakestoreapi.com/products', { method: 'GET' }).json()
    dataList.value = data.value
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  await getData()
})
</script>
