import { ref, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { Card, Form, FormItem, Select, Input, Button } from 'ant-design-vue'
import type { FilterDropdownProps } from 'ant-design-vue/es/table/interface'
import type { TableFilterOperatorStringEnum } from '@/core/enums'
import { stringFIlters } from '@/core/constant'
import { Icon } from '@iconify/vue'
import type { ChangeEvent, ChangeEventHandler } from 'ant-design-vue/es/_util/EventInterface'

interface Filter {
  field: string
  operator?: TableFilterOperatorStringEnum
  criteria?: string
}
const filter = ref<Filter>({} as Filter)

export const useAmirFilter = () => {
  const { t } = useI18n()

  const stringFilter = <T>({
    title,
    props,
    onFilter,
  }: {
    title: string
    props: FilterDropdownProps<T>
    onFilter?: (filterData: Filter[]) => void
  }) => {
    const handleFilter = () => {
      if (onFilter) {
        onFilter([{ ...filter.value }])
      }
      props.confirm()
    }

    const handleReset = () => {
      filter.value.criteria = undefined
      filter.value.operator = undefined
      props.clearFilters?.()
      props.confirm()
      handleFilter()
    }

    return h(Card, { title }, () => [
      h(Form, { layout: 'vertical' }, () => [
        h(FormItem, {}, () =>
          h(Select, {
            class: 'w-full',
            value: filter.value.operator,
            onChange: (e) => (filter.value.operator = e as TableFilterOperatorStringEnum),
            options: stringFIlters.map(({ label, value }) => ({ label: t(label), value })),
          }),
        ),
        h(FormItem, {}, () =>
          h(Input, {
            value: filter.value.criteria,
            onInput: (e: ChangeEvent) => (filter.value.criteria = e.target.value),
          }),
        ),
        h('div', { class: 'flex gap-x-4' }, [
          h(
            Button,
            {
              type: 'primary',
              block: true,
              class: 'flex items-center justify-center gap-x-2',
              icon: h(Icon, { icon: 'tabler:filter' }),
              onClick: handleFilter,
            },
            () => t('filter'),
          ),
          h(
            Button,
            {
              type: 'default',
              block: true,
              onClick: handleReset,
            },
            () => t('clear'),
          ),
        ]),
      ]),
    ])
  }

  return {
    filter,
    stringFilter,
  }
}
