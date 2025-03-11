import { h, ref } from 'vue'
import {
  Form,
  FormItem,
  Select,
  Input,
  InputNumber,
  DatePicker,
  RadioGroup,
  Button,
  type RadioChangeEvent,
  Card,
} from 'ant-design-vue/es'
import type { FilterDropdownProps } from 'ant-design-vue/es/table/interface'
import { stringFIlters, numberFIlters, dateFIlters, booleanFIlters } from '../core/constant' // فرض می‌کنم این ثابت‌ها رو دارید
import {
  TableFilterOperatorStringEnum,
  TableFilterOperatorNumberEnum,
  TableFilterOperatorBooleanEnum,
} from '../core/enums'
import { useI18n } from 'vue-i18n'
import type { SelectValue } from 'ant-design-vue/es/select'

// تعریف نوع برای فیلترها
interface FilterState {
  field: string
  operator:
    | TableFilterOperatorStringEnum
    | TableFilterOperatorNumberEnum
    | TableFilterOperatorBooleanEnum
    | string
  criteria: string | number | boolean | SelectValue | null
}

// شیء مرکزی برای ذخیره فیلترها با کلید ستون
const filters = ref<Record<string, FilterState>>({})

export const useFilter = () => {
  const { t } = useI18n()

  // تابع کمکی برای مقداردهی اولیه فیلتر
  const initializeFilter = (key: string, defaultOperator: string) => {
    if (!filters.value[key]) {
      filters.value[key] = {
        field: key,
        operator: defaultOperator,
        criteria: '',
      }
    }
  }

  // فیلتر رشته‌ای
  const StringFilterDropdown = <T>({ props }: { props: FilterDropdownProps<T> }) => {
    const key = props.column.key as string
    initializeFilter(key, stringFIlters[0].value)

    return h(Card, [
      h(Form, { layout: 'vertical' }, () => [
        h(
          FormItem,
          h(Select, {
            value: filters.value[key].operator,
            onChange: (value) => {
              filters.value[key].operator = value as TableFilterOperatorStringEnum
            },
            options: stringFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ),
        h(
          FormItem,
          h(Input, {
            value: filters.value[key].criteria,
            onInput: (e) => {
              filters.value[key].criteria = e.target.value ?? ''
            },
          }),
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            Button,
            {
              type: 'primary',
              onClick: () => {
                console.log('String Filter:', filters.value[key])
                props.confirm()
              },
            },
            () => t('filter'),
          ),
          h(
            Button,
            {
              onClick: () => {
                filters.value[key] = {
                  field: key,
                  operator: stringFIlters[0].value,
                  criteria: '',
                }
                props.clearFilters?.()
                props.confirm()
              },
            },
            () => t('clear'),
          ),
        ]),
      ]),
    ])
  }

  // فیلتر عددی
  const NumberFilterDropdown = <T>({ props }: { props: FilterDropdownProps<T> }) => {
    const key = props.column.key as string
    initializeFilter(key, numberFIlters[0].value)

    return h('div', [
      h(Form, { layout: 'vertical' }, () => [
        h(
          FormItem,
          h(Select, {
            value: filters.value[key].operator,
            onChange: (value) => {
              filters.value[key].operator = value as TableFilterOperatorNumberEnum
            },
            options: numberFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ),
        h(
          FormItem,
          h(InputNumber, {
            value: filters.value[key].criteria,
            onInput: (value: number) => {
              filters.value[key].criteria = value
            },
          }),
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            Button,
            {
              type: 'primary',
              onClick: () => {
                console.log('Number Filter:', filters.value[key])
                props.confirm()
              },
            },
            () => t('filter'),
          ),
          h(
            Button,
            {
              onClick: () => {
                filters.value[key] = {
                  field: key,
                  operator: numberFIlters[0].value,
                  criteria: 0,
                }
                props.clearFilters?.()
                props.confirm()
              },
            },
            () => t('clear'),
          ),
        ]),
      ]),
    ])
  }

  // فیلتر تاریخ
  const DateFilterDropdown = <T>({ props }: { props: FilterDropdownProps<T> }) => {
    const key = props.column.key as string
    initializeFilter(key, dateFIlters[0].value)

    return h('div', [
      h(Form, { layout: 'vertical' }, () => [
        h(
          FormItem,
          h(Select, {
            value: filters.value[key].operator,
            onChange: (value) => {
              filters.value[key].operator = value as string
            },
            options: dateFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ),
        h(
          FormItem,
          h(DatePicker, {
            value: filters.value[key].criteria,
            onChange: (date: any) => {
              filters.value[key].criteria = date
            },
          }),
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            Button,
            {
              type: 'primary',
              onClick: () => {
                console.log('Date Filter:', filters.value[key])
                props.confirm()
              },
            },
            () => t('filter'),
          ),
          h(
            Button,
            {
              onClick: () => {
                filters.value[key] = {
                  field: key,
                  operator: dateFIlters[0].value,
                  criteria: null,
                }
                props.clearFilters?.()
                props.confirm()
              },
            },
            () => t('clear'),
          ),
        ]),
      ]),
    ])
  }

  // فیلتر بولین
  const BooleanFilterDropdown = <T>({ props }: { props: FilterDropdownProps<T> }) => {
    const key = props.column.key as string
    initializeFilter(key, booleanFIlters[0].value)

    return h('div', [
      h(Form, { layout: 'vertical' }, () => [
        h(
          FormItem,
          h(RadioGroup, {
            value: filters.value[key].operator,
            onChange: (e: RadioChangeEvent) => {
              filters.value[key].operator = e.target.value as TableFilterOperatorBooleanEnum
              filters.value[key].criteria = e.target.value === booleanFIlters[0].value // IS_TRUE = true, IS_FALSE = false
            },
            options: booleanFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            Button,
            {
              type: 'primary',
              onClick: () => {
                console.log('Boolean Filter:', filters.value[key])
                props.confirm()
              },
            },
            () => t('filter'),
          ),
          h(
            Button,
            {
              onClick: () => {
                filters.value[key] = {
                  field: key,
                  operator: booleanFIlters[0].value,
                  criteria: false,
                }
                props.clearFilters?.()
                props.confirm()
              },
            },
            () => t('clear'),
          ),
        ]),
      ]),
    ])
  }

  // فیلتر انتخابی (Select)
  const SelectFilterDropdown = <T>({
    props,
    options,
  }: {
    props: FilterDropdownProps<T>
    options: Array<{ label: string; value: string | number }>
  }) => {
    const key = props.column.key as string
    initializeFilter(key, 'IN')
    if (!Array.isArray(filters.value[key].criteria)) {
      filters.value[key].criteria = []
    }

    return h('div', [
      h(Form, { layout: 'vertical' }, () => [
        h(
          FormItem,
          h(Select, {
            value: filters.value[key].criteria,
            onChange: (value: SelectValue) => {
              filters.value[key].criteria = value
            },
            mode: 'multiple',
            options: options.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            Button,
            {
              type: 'primary',
              onClick: () => {
                console.log('Select Filter:', filters.value[key])
                props.confirm()
              },
            },
            () => t('filter'),
          ),
          h(
            Button,
            {
              onClick: () => {
                filters.value[key] = {
                  field: key,
                  operator: 'IN',
                  criteria: [],
                }
                props.clearFilters?.()
                props.confirm()
              },
            },
            () => t('clear'),
          ),
        ]),
      ]),
    ])
  }

  return {
    filters,
    StringFilterDropdown,
    NumberFilterDropdown,
    DateFilterDropdown,
    BooleanFilterDropdown,
    SelectFilterDropdown,
  }
}
