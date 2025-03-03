import { h, ref, computed } from 'vue'
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
import AzButton from '../components/AzButton.vue'

export const useTableFiltersDropdown = () => {
  const { t } = useI18n()

  const createFilterDropdown = (
    title: string,
    type: 'string' | 'number' | 'date' | 'boolean',
    { setSelectedKeys, selectedKeys, confirm, clearFilters }: any,
  ) => {
    const filterValue = ref(selectedKeys[0] || '')
    const filterType = ref(selectedKeys[1] || '')

    const options = computed(() => {
      switch (type) {
        case 'string':
        case 'number':
          return stringFIlters
        case 'date':
          return dateFIlters
        case 'boolean':
          return booleanFIlters
        default:
          return []
      }
    })

    const handleConfirm = () => {
      setSelectedKeys([filterValue.value, filterType.value])
      confirm()
    }

    const handleClear = () => {
      filterValue.value = ''
      filterType.value = ''
      setSelectedKeys([])
      clearFilters?.()
      confirm()
    }

    return h(Card, { title, size: 'small' }, [
      h(Form, { layout: 'vertical', size: 'small' }, [
        type !== 'boolean' &&
          h(FormItem, { label: t('filterType'), size: 'small' }, [
            h(Select, {
              class: 'w-full',
              size: 'small',
              value: filterType.value,
              onChange: (val) => {
                filterType.value = val
              },
              options: options.value.map(({ label, value }) => ({ label: t(label), value })),
            }),
          ]),
        h(FormItem, { label: t('filterValue'), size: 'small' }, [
          type === 'string'
            ? h(Input, {
                size: 'small',
                allowClear: true,
                value: filterValue.value,
                onInput: (e) => (filterValue.value = e.target.value),
                onPressEnter: handleConfirm,
              })
            : type === 'number'
              ? h(InputNumber, {
                  class: 'w-full',
                  size: 'small',
                  value: filterValue.value,
                  onChange: (val) => (filterValue.value = val),
                })
              : type === 'date'
                ? h(DatePicker, {
                    size: 'small',
                    value: filterValue.value,
                    onChange: (date) => (filterValue.value = date),
                  })
                : h(RadioGroup, {
                    options: options.value.map(({ label, value }) => ({ label: t(label), value })),
                    size: 'small',
                    value: filterValue.value,
                    onChange: (val) => (filterValue.value = val),
                  }),
        ]),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            AzButton,
            {
              type: 'primary',
              block: true,
              size: 'small',
              icon: 'tabler:search',
              onClick: handleConfirm,
            },
            () => t('filter'),
          ),
          h(
            AzButton,
            {
              type: 'default',
              block: true,
              onClick: () => {
                filterValue.value = ''
                setSelectedKeys([])
                clearFilters?.()
                confirm()
              },
            },
            () => t('clear'),
          ),
        ]),
      ]),
    ])
  }

  return {
    StringFilterDropdown: (title: string, props: any) =>
      createFilterDropdown(title, 'string', props),
    NumberFilterDropdown: (title: string, props: any) =>
      createFilterDropdown(title, 'number', props),
    DateFilterDropdown: (title: string, props: any) => createFilterDropdown(title, 'date', props),
    BooleanFilterDropdown: (title: string, props: any) =>
      createFilterDropdown(title, 'boolean', props),
  }
}
