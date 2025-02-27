import type { TableFilterDataTypeEnum, TableFilterOperatorEnum } from '../enums'

export interface Filter {
  field: string
  dataType: TableFilterDataTypeEnum
  operator: TableFilterOperatorEnum
  criteria: any // اینجا هر نوع داده‌ای می‌تواند باشد
}
