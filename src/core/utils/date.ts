import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
import dayjs from 'dayjs'
import { isDate } from 'lodash'

export const formatDate = (_input: any, format?: string) => {
  const panelSettingsStore = usePanelSettingsStore()
  const dateObject = new Date(_input)

  if (isDate(dateObject) && _input) {
    if (panelSettingsStore.locale.locale === 'en') {
      return dayjs(_input).format(format ?? 'YYYY/MM/DD - HH:mm')
    } else if (panelSettingsStore.locale.locale === 'fa') {
      dayjs.calendar('jalali')
      return dayjs(_input).format(format ?? 'HH:mm - YYYY/MM/DD')
    }
  } else {
    return '-'
  }
}
