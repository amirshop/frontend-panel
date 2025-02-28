import { TableColumn } from 'ant-design-vue'
import {
  TableFilterDataTypeEnum,
  TableFilterOperatorBooleanEnum,
  TableFilterOperatorDateEnum,
  TableFilterOperatorMultiSelectEnum,
  TableFilterOperatorNumberEnum,
  TableFilterOperatorStringEnum,
} from '../enums'
import type { ColumnType } from 'ant-design-vue/es/table'

export interface Filter {
  field: ColumnType['key']
  dataType: TableFilterDataTypeEnum
  operator:
    | TableFilterOperatorDateEnum
    | TableFilterOperatorBooleanEnum
    | TableFilterOperatorStringEnum
    | TableFilterOperatorNumberEnum
    | TableFilterOperatorMultiSelectEnum
  criteria: any // اینجا هر نوع داده‌ای می‌تواند باشد
}
