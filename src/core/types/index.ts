import type { ComponentsSizesEnum, CurrenciesEnum, DirectionsEnum, FontFamilyEnum, LanguagesEnum } from '@/core/enums'
import type { Dayjs } from 'dayjs'

export interface Settings {
  isDark: boolean
  isCompact: boolean
  componentsSize: ComponentsSizesEnum
  direction: DirectionsEnum
  fontFamily: FontFamilyEnum
  language: LanguagesEnum
  primaryColor: string
}
