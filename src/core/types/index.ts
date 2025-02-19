import type { ComponentsSizesEnum, CurrenciesEnum, FontFamilyEnum, LanguagesEnum } from '@/enum'
import type { Dayjs } from 'dayjs'

export interface Settings {
  isDark: boolean
  isCompact: boolean
  componentsSize: ComponentsSizesEnum
  createdAt: Dayjs
  currency: CurrenciesEnum
  description: string
  isRtl: boolean
  favicon: string
  fontFamily: FontFamilyEnum
  footer: string
  header: string
  id: string
  language: LanguagesEnum
  logo: string
  primaryColor: string
  slug: string
  updatedAt: Dayjs
  websiteName: string
}
