import { h, ref } from 'vue'
import { TableFilterDataTypeEnum } from '../enums'
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
} from 'ant-design-vue/es'
import { booleanFIlters, dateFIlters, stringFIlters } from '../constant'
import { useI18n } from 'vue-i18n'

export const useTableFiltersDropdown = () => {
  const { t } = useI18n()

  const StringFilterDropdown = (title: string) => {
    return h(Card, { title }, [
      h(Form, { layout: 'vertical' }, [
        h(FormItem, { label: t('filterType') }, [
          h(Select, {
            class: 'w-full',
            options: stringFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ]),
        h(
          FormItem,
          {
            label: t('filterValue'),
          },
          [h(Input)],
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(Button, { type: 'primary', block: true }, [t('filter')]),
          h(Button, { type: 'default', block: true }, [t('clear')]),
        ]),
      ]),
    ])
  }

  const NumberFilterDropdown = (title: string) => {
    return h(Card, { title }, [
      h(Form, { layout: 'vertical' }, [
        h(FormItem, { label: t('filterType') }, [
          h(Select, {
            class: 'w-full',
            options: stringFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ]),
        h(
          FormItem,
          {
            label: t('filterValue'),
          },
          [h(InputNumber, { class: 'w-full' })],
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(Button, { type: 'primary', block: true }, [t('filter')]),
          h(Button, { type: 'default', block: true }, [t('clear')]),
        ]),
      ]),
    ])
  }
  const DateFilterDropdown = (title: string) => {
    return h(Card, { title }, [
      h(Form, { layout: 'vertical' }, [
        h(FormItem, { label: t('filterType') }, [
          h(Select, {
            class: 'w-full',
            options: dateFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ]),
        h(
          FormItem,
          {
            label: t('filterValue'),
          },
          [h(DatePicker)],
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(Button, { type: 'primary', block: true }, [t('filter')]),
          h(Button, { type: 'default', block: true }, [t('clear')]),
        ]),
      ]),
    ])
  }
  const BooleanFilterDropdown = (title: string) => {
    return h(Card, { title }, [
      h(Form, { layout: 'vertical' }, [
        h(FormItem, { label: t('filterType') }, [
          h(RadioGroup, {
            options: booleanFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ]),

        h('div', { class: 'flex gap-x-4' }, [
          h(Button, { type: 'primary', block: true }, [t('filter')]),
          h(Button, { type: 'default', block: true }, [t('clear')]),
        ]),
      ]),
    ])
  }
  const SelectFilterDropdown = (title:string) => {
    return h(Card, [
      h(Form, { layout: 'vertical' }, [
        h(FormItem, { label: t('filterType') }, [
          h(Select, {
            class: 'w-full',
            options: stringFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ]),
        h(
          FormItem,
          {
            label: t('filterValue'),
          },
          [h(Input)],
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(Button, { type: 'primary', block: true }, [t('filter')]),
          h(Button, { type: 'default', block: true }, [t('clear')]),
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
