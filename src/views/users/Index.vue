<template>
  <div class="">
    <AzTable :columnList="columnList"> </AzTable>
  </div>
</template>
<script setup lang="ts">
import { AzTable } from '@/core/components'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { reactive } from 'vue'
import { TableFilterDataTypeEnum, TableFilterOperatorBooleanEnum } from "@/core/enums";
import type { Filter } from '@/core/types/table.interface';
type TableDataType = {
  key: string
  gender: string
  email: string
  address: string
}

const columnList = reactive<ColumnsType>([
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    customFilterDropdown: true,
    filters:[]
  },

  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
  },
])


const axiosPostDataToGetTableDataByFiltersByDifferenceTypes = {
  size: 10,
  page: 0,
  filters: [
    // فیلتر عددی
    {
      col: "price",
      filter: "lessThan",
      value: 1000,
    },
    {
      col: "price",
      filter: "lessThan",
      value: 1000,
    },
    {
      col: "price",
      filter: "greaterThan",
      value: 500,
    },
    {
      col: "price",
      filter: "inRange",
      value: [500, 900],
    },

    // فیلتر متنی (string)
    {
      col: "name",
      filter: "contains",
      value: "Samsung",
    },
    {
      col: "description",
      filter: "notContains",
      value: "HDR",
    },
    {
      col: "category",
      filter: "startsWith",
      value: "Electro",
    },
    {
      col: "category",
      filter: "endsWith",
      value: "nics",
    },
    {
      col: "brand",
      filter: "equals",
      value: "Apple",
    },
    {
      col: "brand",
      filter: "notEqual",
      value: "Samsung",
    },

    // فیلتر تاریخی
    {
      col: "createdAt",
      filter: "before",
      value: "2024-01-01",
    },
    {
      col: "createdAt",
      filter: "after",
      value: "2023-12-01",
    },
    {
      col: "createdAt",
      filter: "inRange",
      value: ["2023-12-01", "2024-01-01"],
    },

    // فیلتر مقدار خالی
    {
      col: "address",
      filter: "blank",
    },
    {
      col: "phone",
      filter: "notBlank",
    },
  ],
};

</script>
