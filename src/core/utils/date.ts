import { useConfigProviderStore } from '@/core/stores/configProvider.store'
import dayjs from 'dayjs'
import { isDate } from 'lodash'

export const formatDate = (_input: any, format?: string) => {
  const configProviderStore = useConfigProviderStore()
  const dateObject = new Date(_input)

  if (isDate(dateObject) && _input) {
    if (configProviderStore.locale.locale === 'en') {
      return dayjs(_input).format(format ?? 'YYYY/MM/DD - HH:mm')
    } else if (configProviderStore.locale.locale === 'fa') {
      dayjs.calendar('jalali')
      return dayjs(_input).format(format ?? 'HH:mm - YYYY/MM/DD')
    }
  } else {
    return '-'
  }
}
