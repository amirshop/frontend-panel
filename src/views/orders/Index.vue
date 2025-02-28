<template>
 <div class="">
   <Card>
    
  </Card>
  <WTable
    :column-list="table.columnList"
    :data-list="table.dataList.value"
    :pagination="table.pagination.value"
    :title="table.title"
    :loading="table.loading.value"
    @changeTable="table.onChange"
    @restTable="table.fetchTable"
    @fetchTable="table.fetchTable"
    :filter-list="filterList"
  />
 </div>
</template>

<script setup lang="ts">
import WTable from '@/components/WTable.vue'
import { useTable } from '@/composables/useTable.composable'
import { TableFilterDataTypeEnum, TableFilterOperatorBooleanEnum } from '@/core/enums'
import type { Filter } from '@/core/types/table.interface'
import { onMounted } from 'vue'

const table = useTable({
  apiUrl: 'https://fakestoreapi.com/products',
  title: 'salam',
  columnList: [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      filterMode: 'menu',
      filtered: true,
      filters: [],
      filterSearch: true
      // dateType: TableFilterDataTypeEnum.STRING
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      dateType: TableFilterDataTypeEnum.STRING
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      dateType: TableFilterDataTypeEnum.SELECT
    },
  ],
})
const filterList: Filter[] = [
  {
    field: '',
    dataType: TableFilterDataTypeEnum.BOOLEAN,
    operator: TableFilterOperatorBooleanEnum.IS_FALSE,
    criteria: true,
  },
]
onMounted(async () => await table.fetchTable())
export const enum TableFilterDataType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  MULTI_SELECT = 'MultiSelect'
}

export const enum TableFilterOperatorBoolean {
  // فیلتر منطقی (BOOLEAN)
  IS_TRUE = "IS TRUE", // SQL: IS TRUE
  IS_FALSE = "IS FALSE", // SQL: IS FALSE
}
export const enum TableFilterOperatorNumber {
  // فیلتر عددی (NUMBER)
  LESS_THAN = "<", // SQL: x < value
  LESS_THAN_OR_EQUAL = "<=", // SQL: x <= value
  GREATER_THAN = ">", // SQL: x > value
  GREATER_THAN_OR_EQUAL = ">=", // SQL: x >= value
  EQUALS = "=", // SQL: x = value
  NOT_EQUALS = "!=", // SQL: x != value
  BETWEEN_INCLUSIVE = "BETWEEN", // SQL: x BETWEEN value1 AND value2
  BETWEEN_EXCLUSIVE = "NOT BETWEEN", // SQL: x NOT BETWEEN value1 AND value2
  IS_BLANK = "IS NULL", // SQL: x IS NULL
  IS_NOT_BLANK = "IS NOT NULL", // SQL: x IS NOT NULL
}
export const enum TableFilterOperatorString {
  // فیلتر متنی (STRING)
  CONTAINS = "LIKE", // SQL: x LIKE '%value%'
  NOT_CONTAINS = "NOT LIKE", // SQL: x NOT LIKE '%value%'
  STARTS_WITH = "LIKE", // SQL: x LIKE 'value%'
  ENDS_WITH = "LIKE", // SQL: x LIKE '%value'
  EQUALS_TEXT = "=", // SQL: x = 'value'
  NOT_EQUALS_TEXT = "!=", // SQL: x != 'value'
  IS_BLANK = "IS NULL", // SQL: x IS NULL
  IS_NOT_BLANK = "IS NOT NULL", // SQL: x IS NOT NULL
}
export const enum TableFilterOperatorDate {
  // فیلتر تاریخی (DATE)
  DATE_BEFORE = "<", // SQL: x < 'date'
  DATE_AFTER = ">", // SQL: x > 'date'
  DATE_EQUALS = "=", // SQL: x = 'date'
  IS_BLANK = "IS NULL", // SQL: x IS NULL
  IS_NOT_BLANK = "IS NOT NULL", // SQL: x IS NOT NULL
}
// export const enum TableFilterOperator {
//   // فیلتر ترکیبی (AND / OR)
//   AND = "AND", // SQL: AND
//   OR = "OR", // SQL: OR
// }
export const enum MULTI_SELECT{

}
export interface Filter {
  field: string;
  dataType: TableFilterDataType;
  operator: TableFilterOperator;
  criteria: any; // اینجا هر نوع داده‌ای می‌تواند باشد
}

export const axiosPostDataToGetTableDataByFiltersByDifferenceTypes = {
  size: 10,
  page: 0,
  filters: [
    // فیلتر عددی
    {
      field: "price",
      dataType: TableFilterDataType.NUMBER,
      operator: TableFilterOperator.NUMBER_LESS_THAN,
      criteria: 1000,
    },
    {
      field: "price",
      dataType: TableFilterDataType.NUMBER,
      operator: TableFilterOperator.NUMBER_LESS_THAN_OR_EQUAL,
      criteria: 900,
    },
    {
      field: "price",
      dataType: TableFilterDataType.NUMBER,
      operator: TableFilterOperator.NUMBER_GREATER_THAN,
      criteria: 600,
    },
    {
      field: "price",
      dataType: TableFilterDataType.NUMBER,
      operator: TableFilterOperator.NUMBER_GREATER_THAN_OR_EQUAL,
      criteria: 700,
    },
    {
      field: "price",
      dataType: TableFilterDataType.NUMBER,
      operator: TableFilterOperator.NUMBER_EQUALS,
      criteria: 500,
    },
    {
      field: "price",
      dataType: TableFilterDataType.NUMBER,
      operator: TableFilterOperator.NUMBER_NOT_EQUALS,
      criteria: 750,
    },
    {
      field: "price",
      dataType: TableFilterDataType.NUMBER,
      operator: TableFilterOperator.NUMBER_BETWEEN_INCLUSIVE,
      criteria: [500, 900],
    },
    {
      field: "price",
      dataType: TableFilterDataType.NUMBER,
      operator: TableFilterOperator.NUMBER_BETWEEN_EXCLUSIVE,
      criteria: [500, 900],
    },

    // فیلتر متنی
    {
      field: "name",
      dataType: TableFilterDataType.STRING,
      operator: TableFilterOperator.STRING_CONTAINS,
      criteria: "Samsung",
    },
    {
      field: "description",
      dataType: TableFilterDataType.STRING,
      operator: TableFilterOperator.STRING_NOT_CONTAINS,
      criteria: "HDR",
    },
    {
      field: "category",
      dataType: TableFilterDataType.STRING,
      operator: TableFilterOperator.STRING_STARTS_WITH,
      criteria: "Electro",
    },
    {
      field: "category",
      dataType: TableFilterDataType.STRING,
      operator: TableFilterOperator.STRING_ENDS_WITH,
      criteria: "nics",
    },
    {
      field: "brand",
      dataType: TableFilterDataType.STRING,
      operator: TableFilterOperator.STRING_EQUALS_TEXT,
      criteria: "Apple",
    },
    {
      field: "brand",
      dataType: TableFilterDataType.STRING,
      operator: TableFilterOperator.STRING_NOT_EQUALS_TEXT,
      criteria: "Samsung",
    },

    // فیلتر تاریخی
    {
      field: "createdAt",
      dataType: TableFilterDataType.DATE,
      operator: TableFilterOperator.DATE_BEFORE,
      criteria: "2024-01-01",
    },
    {
      field: "createdAt",
      dataType: TableFilterDataType.DATE,
      operator: TableFilterOperator.DATE_AFTER,
      criteria: "2023-12-01",
    },

    // فیلتر مقدار خالی
    {
      field: "address",
      dataType: TableFilterDataType.STRING,
      operator: TableFilterOperator.IS_BLANK,
    },
    {
      field: "phone",
      dataType: TableFilterDataType.STRING,
      operator: TableFilterOperator.IS_NOT_BLANK,
    },

    // فیلتر مقدار منطقی (Boolean)
    {
      field: "isAvailable",
      dataType: TableFilterDataType.BOOLEAN,
      operator: TableFilterOperator.BOOLEAN_IS_TRUE,
    },
    {
      field: "isDeleted",
      dataType: TableFilterDataType.BOOLEAN,
      operator: TableFilterOperator.BOOLEAN_IS_FALSE,
    },


    // tags
    {
      filed: 'tags',
      dataType: TableFilterDataType.MULTI_SELECT,
      criteria: ['salam', 'ali', 'amir'],
      
    }

    // فیلتر ترکیبی (AND / OR)
    // {
    //   field: "price",
    //   dataType: TableFilterDataType.NUMBER,
    //   operator: TableFilterOperator.AND,
    //   subConditions: [
    //     { operator: TableFilterOperator.NUMBER_GREATER_THAN, criteria: 500 },
    //     { operator: TableFilterOperator.NUMBER_LESS_THAN, criteria: 900 },
    //   ],
    // },
    // {
    //   field: "category",
    //   dataType: TableFilterDataType.STRING,
    //   operator: TableFilterOperator.OR,
    //   subConditions: [
    //     {
    //       operator: TableFilterOperator.STRING_EQUALS_TEXT,
    //       criteria: "Electronics",
    //     },
    //     {
    //       operator: TableFilterOperator.STRING_EQUALS_TEXT,
    //       criteria: "Home Appliances",
    //     },
    //   ],
    // },
  ],
};
export const booleanFIlters = [
  {
    label: t("IS_TRUE"),
    value: TableFilterOperatorBoolean.IS_TRUE,
  },
  {
    label: t("IS_FALSE"),
    value: TableFilterOperatorBoolean.IS_FALSE,
  },
];
export const numberFIlters = [
  {
    label: t("IS_TRUE"),
    value: TableFilterOperatorNumber.BETWEEN_EXCLUSIVE,
  },
];
export const dateFIlters = []
export const stringFIlters = [];




{
  total: 1000,
    curentPage: 1,
    perPage: 11
  data:[]
}
</script>
