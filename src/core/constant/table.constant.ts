import {
  TableFilterOperatorBooleanEnum,
  TableFilterOperatorDateEnum,
  TableFilterOperatorSelectEnum,
  TableFilterOperatorNumberEnum,
  TableFilterOperatorStringEnum,
} from '../enums'

export const booleanFilters = [
  {
    label: 'IS_TRUE',
    value: TableFilterOperatorBooleanEnum.IS_TRUE,
  },
  {
    label: 'IS_FALSE',
    value: TableFilterOperatorBooleanEnum.IS_FALSE,
  },
]
export const numberFilters = [
  {
    label: 'LESS_THAN',
    value: TableFilterOperatorNumberEnum.LESS_THAN,
  },
  {
    label: 'LESS_THAN_OR_EQUAL',
    value: TableFilterOperatorNumberEnum.LESS_THAN_OR_EQUAL,
  },
  {
    label: 'GREATER_THAN',
    value: TableFilterOperatorNumberEnum.GREATER_THAN,
  },
  {
    label: 'GREATER_THAN_OR_EQUAL',
    value: TableFilterOperatorNumberEnum.GREATER_THAN_OR_EQUAL,
  },
  {
    label: 'EQUALS',
    value: TableFilterOperatorNumberEnum.EQUALS,
  },
  {
    label: 'NOT_EQUALS',
    value: TableFilterOperatorNumberEnum.NOT_EQUALS,
  },
  {
    label: 'BETWEEN_INCLUSIVE',
    value: TableFilterOperatorNumberEnum.BETWEEN_INCLUSIVE,
  },
  {
    label: 'BETWEEN_EXCLUSIVE',
    value: TableFilterOperatorNumberEnum.BETWEEN_EXCLUSIVE,
  },
  {
    label: 'IS_BLANK',
    value: TableFilterOperatorNumberEnum.IS_BLANK,
  },
  {
    label: 'IS_NOT_BLANK',
    value: TableFilterOperatorNumberEnum.IS_NOT_BLANK,
  },
]

export const dateFilters = [
  {
    label: 'DATE_BEFORE',
    value: TableFilterOperatorDateEnum.DATE_BEFORE,
  },
  {
    label: 'DATE_AFTER',
    value: TableFilterOperatorDateEnum.DATE_AFTER,
  },
  {
    label: 'DATE_EQUALS',
    value: TableFilterOperatorDateEnum.DATE_EQUALS,
  },
  {
    label: 'IS_BLANK',
    value: TableFilterOperatorDateEnum.IS_BLANK,
  },
  {
    label: 'IS_NOT_BLANK',
    value: TableFilterOperatorDateEnum.IS_NOT_BLANK,
  },
]

export const stringFilters = [
  {
    label: 'CONTAINS',
    value: TableFilterOperatorStringEnum.CONTAINS,
  },
  {
    label: 'NOT_CONTAINS',
    value: TableFilterOperatorStringEnum.NOT_CONTAINS,
  },
  {
    label: 'STARTS_WITH',
    value: TableFilterOperatorStringEnum.STARTS_WITH,
  },
  {
    label: 'ENDS_WITH',
    value: TableFilterOperatorStringEnum.ENDS_WITH,
  },
  {
    label: 'EQUALS_TEXT',
    value: TableFilterOperatorStringEnum.EQUALS_TEXT,
  },
  {
    label: 'NOT_EQUALS_TEXT',
    value: TableFilterOperatorStringEnum.NOT_EQUALS_TEXT,
  },
  {
    label: 'IS_BLANK',
    value: TableFilterOperatorStringEnum.IS_BLANK,
  },
  {
    label: 'IS_NOT_BLANK',
    value: TableFilterOperatorStringEnum.IS_NOT_BLANK,
  },
]
export const multiSelectFilters = [
  {
    label: 'EQUALS_TEXT',
    value: TableFilterOperatorSelectEnum.EQUALS_TEXT,
  },
  {
    label: 'NOT_EQUALS_TEXT',
    value: TableFilterOperatorSelectEnum.NOT_EQUALS_TEXT,
  },
]