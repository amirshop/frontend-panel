export const enum TableFilterDataTypeEnum {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  SELECT = 'select',
}

export const enum TableFilterOperatorSelectEnum {
  EQUALS_TEXT = '=', // SQL: x = 'value'
  NOT_EQUALS_TEXT = '!=', // SQL: x != 'value'
}
export const enum TableFilterOperatorBooleanEnum {
  // فیلتر منطقی (BOOLEAN)
  IS_TRUE = 'IS TRUE', // SQL: IS TRUE
  IS_FALSE = 'IS FALSE', // SQL: IS FALSE
}
export const enum TableFilterOperatorNumberEnum {
  // فیلتر عددی (NUMBER)
  LESS_THAN = '<', // SQL: x < value
  LESS_THAN_OR_EQUAL = '<=', // SQL: x <= value
  GREATER_THAN = '>', // SQL: x > value
  GREATER_THAN_OR_EQUAL = '>=', // SQL: x >= value
  EQUALS = '=', // SQL: x = value
  NOT_EQUALS = '!=', // SQL: x != value
  BETWEEN_INCLUSIVE = 'BETWEEN', // SQL: x BETWEEN value1 AND value2
  BETWEEN_EXCLUSIVE = 'NOT BETWEEN', // SQL: x NOT BETWEEN value1 AND value2
  IS_BLANK = 'IS NULL', // SQL: x IS NULL
  IS_NOT_BLANK = 'IS NOT NULL', // SQL: x IS NOT NULL
}
export const enum TableFilterOperatorStringEnum {
  // فیلتر متنی (STRING)
  CONTAINS = 'LIKE', // SQL: x LIKE '%value%'
  NOT_CONTAINS = 'NOT LIKE', // SQL: x NOT LIKE '%value%'
  STARTS_WITH = 'LIKE_START', // SQL: x LIKE 'value%'
  ENDS_WITH = 'LIKE_END', // SQL: x LIKE '%value'
  EQUALS_TEXT = '=', // SQL: x = 'value'
  NOT_EQUALS_TEXT = '!=', // SQL: x != 'value'
  IS_BLANK = 'IS NULL', // SQL: x IS NULL
  IS_NOT_BLANK = 'IS NOT NULL', // SQL: x IS NOT NULL
}

export const enum TableFilterOperatorDateEnum {
  // فیلتر تاریخی (DATE)
  DATE_BEFORE = '<', // SQL: x < 'date'
  DATE_AFTER = '>', // SQL: x > 'date'
  DATE_EQUALS = '=', // SQL: x = 'date'
  DATE_BETWEEN = 'BETWEEN', // SQL: x = 'date'
  IS_BLANK = 'IS NULL', // SQL: x IS NULL
  IS_NOT_BLANK = 'IS NOT NULL', // SQL: x IS NOT NULL
}
// export const enum TableFilterOperatorEnum {
//   // فیلتر ترکیبی (AND / OR)
//   AND = 'AND', // SQL: AND
//   OR = 'OR', // SQL: OR
// }

export const enum TableSortDirEnum {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}
