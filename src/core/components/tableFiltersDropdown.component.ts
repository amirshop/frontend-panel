import { h, ref } from 'vue'
import {
  TableFilterDataTypeEnum,
  TableFilterOperatorBooleanEnum,
  TableFilterOperatorNumberEnum,
  TableFilterOperatorStringEnum,
} from '../enums'
import {
  Button,
  Card,
  DatePicker,
  Form,
  FormItem,
  Input,
  InputNumber,
  RadioGroup,
  Select,
  type RadioChangeEvent,
} from 'ant-design-vue/es'
import { booleanFIlters, dateFIlters, numberFIlters, stringFIlters } from '../constant'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import AzButton from '../components/AzButton.vue'
import type { FilterDropdownProps } from 'ant-design-vue/es/table/interface'
import type { OrderTest } from '@/types/order/order.model'
import type { SelectValue } from 'ant-design-vue/es/select'
import type { ChangeEvent, MouseEventHandler } from 'ant-design-vue/es/_util/EventInterface'

export const useTableFiltersDropdown = () => {
  const { t } = useI18n()

  const StringFilterDropdown = ({
    title,
    props,
  }: {
    title: string
    props: FilterDropdownProps<OrderTest>
  }) => {
    const filter = ref({
      felid: props.column.key,
      operator: stringFIlters[0].value,
      criteria: '',
    })
    return h(Card, { title, size: 'small' }, () => [
      h(Form, { layout: 'vertical', size: 'small' }, () => [
        h(FormItem, { label: t('filterType'), size: 'small' }, () =>
          h(Select, {
            class: 'w-full',
            size: 'small',
            onChange: (e) => {
              filter.value.operator = e as TableFilterOperatorStringEnum
            },
            value: filter.value.operator,
            options: stringFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ),
        h(
          FormItem,
          {
            label: t('filterValue'),
            size: 'small',
          },
          () =>
            h(Input, {
              size: 'small',
              onInput: (e: ChangeEvent) => {
                filter.value.criteria = e.target.value ?? ''
              },
            }),
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            AzButton,
            {
              type: 'primary',
              block: true,
              size: 'small',
              icon: 'tabler:search',
              onClick: () => {
                // props.setSelectedKeys([''])
                props.filters = {
                  text: filter.value.operator,
                  value: filter.value.criteria,
                }
                console.log(props)

                props.confirm()
              },
            },
            () => t('filter'),
          ),
          h(
            AzButton,
            {
              type: 'default',
              block: true,
              onClick: () => {
                console.log('clear')
                filter.value = {
                  felid: props.column.key,
                  operator: stringFIlters[0].value,
                  criteria: '',
                }
                props.clearFilters?.()
              },
            },
            () => t('clear'),
          ),
        ]),
      ]),
    ])
  }

  const NumberFilterDropdown = ({
    title,
    props,
  }: {
    title: string
    props: FilterDropdownProps<OrderTest>
  }) => {
    const filter = ref({
      felid: props.column.key,
      operator: numberFIlters[4].value,
      criteria: 0,
    })
    return h(Card, { title, size: 'small' }, () => [
      h(Form, { layout: 'vertical', size: 'small' }, () => [
        h(FormItem, { label: t('filterType'), size: 'small' }, () =>
          h(Select, {
            class: 'w-full',
            size: 'small',
            onChange: (e) => {
              filter.value.operator = e as TableFilterOperatorNumberEnum
            },
            value: filter.value.operator,
            options: numberFIlters.map(({ label, value }) => ({
              label: t(label),
              value,
            })),
          }),
        ),
        h(FormItem, { size: 'small', label: t('filterValue') }, () =>
          h(InputNumber, {
            class: 'w-full',
            size: 'small',
            value: filter.value.criteria,
            onInput: (text: string) => {
              filter.value.criteria = Number(text)
            },
          }),
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            AzButton,
            {
              type: 'primary',
              block: true,
              size: 'small',
              icon: 'tabler:search',
              onClick: () => {
                props.confirm()
              },
            },
            () => t('filter'),
          ),
          h(AzButton, { type: 'default', block: true }, () => t('clear')),
        ]),
      ]),
    ])
  }
  const BooleanFilterDropdown = ({
    title,
    props,
  }: {
    title: string
    props: FilterDropdownProps<OrderTest>
  }) => {
    const filter = ref({
      felid: props.column.key,
      operator: TableFilterOperatorBooleanEnum.IS_FALSE,
    })
    return h(Card, { title, size: 'small' }, () =>
      h(Form, { layout: 'vertical', size: 'small' }, [
        h(FormItem, { label: t('filterType'), size: 'small' }, () =>
          h(RadioGroup, {
            value: filter.value.operator,
            onChange: (e: RadioChangeEvent) => {
              filter.value.operator = e.target.value
            },
            options: booleanFIlters.map(({ label, value }) => ({ label: t(label), value })),
            size: 'small',
          }),
        ),

        h('div', { class: 'flex gap-x-4' }, () => [
          h(
            AzButton,
            {
              type: 'primary',
              block: true,
              size: 'small',
              icon: 'tabler:search',
              onClick: () => {
                props.confirm()
              },
            },
            () => t('filter'),
          ),
          h(AzButton, { type: 'default', block: true }, () => t('clear')),
        ]),
      ]),
    )
  }

  const SelectFilterDropdown = ({
    title,
    props,
    list,
  }: {
    title: string
    props: FilterDropdownProps<OrderTest>
    list: Array<{ label: string; value: string | number }>
  }) => {
    const { confirm, clearFilters } = props

    const filter = ref({
      felid: props.column.key,
      criteria: [],
    })

    return h(Card, { title, size: 'small' }, () =>
      h(Form, { layout: 'vertical', size: 'small' }, () => [
        h(FormItem, { label: t('filterList'), size: 'small' }, () =>
          h(Select, {
            value: filter.value.criteria,
            onChange: (value: SelectValue) => {
              console.log('🚀 ~ Selected Filter:', value)
              console.log('🚀 ~ useTableFiltersDropdown ~ filter.value:', filter.value)
              filter.value.criteria = value
              console.log('🚀 ~ useTableFiltersDropdown ~ filter.value:', filter.value)
            },
            class: 'w-full',
            size: 'small',
            mode: 'tags',
            options: list.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ),

        h('div', { class: 'flex gap-x-4' }, [
          h(
            AzButton,
            {
              type: 'primary',
              block: true,
              size: 'small',
              icon: 'tabler:search',
              onClick: () => confirm(),
            },
            () => t('filter'),
          ),
          h(
            AzButton,
            {
              type: 'default',
              block: true,
              onClick: () => {
                filter.value.criteria = null
                clearFilters?.()
                confirm()
              },
            },
            () => t('clear'),
          ),
        ]),
      ]),
    )
  }

  const DateFilterDropdown = ({
    title,
    props,
  }: {
    title: string
    props: FilterDropdownProps<OrderTest>
  }) => {
    return h(Card, { title, size: 'small' }, [
      h(Form, { layout: 'vertical', size: 'small' }, [
        h(FormItem, { label: t('filterType'), size: 'small' }, [
          h(Select, {
            class: 'w-full',
            size: 'small',
            options: dateFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ]),
        h(
          FormItem,
          {
            label: t('filterValue'),
            size: 'small',
          },
          [h(DatePicker, { size: 'small' })],
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(AzButton, { type: 'primary', block: true, size: 'small', icon: 'tabler:search' }, [
            t('filter'),
          ]),
          h(AzButton, { type: 'default', block: true }, [t('clear')]),
        ]),
      ]),
    ])
  }
  return {
    StringFilterDropdown,
    NumberFilterDropdown,
    DateFilterDropdown,
    BooleanFilterDropdown,
    SelectFilterDropdown,
  }
}
