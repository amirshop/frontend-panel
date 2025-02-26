import faIR from 'ant-design-vue/es/locale/fa_IR'
import enUS from 'ant-design-vue/es/locale/en_US'
import azAZ from 'ant-design-vue/es/locale/az_AZ'
import { ComponentSizeEnum, DirectionEnum, LanguageEnum } from '@/core/enums'

export const LocaleMapping = {
  en: enUS,
  fa: faIR,
  az: azAZ,
}
export const languageList = [
  {
    label: 'farsi',
    value: LanguageEnum.FARSI,
  },
  {
    label: 'english',
    value: LanguageEnum.ENGLISH,
  },
]
export const directionList = [
  {
    label: 'RTl',
    value: DirectionEnum.RTL,
  },
  {
    label: 'LTR',
    value: DirectionEnum.LTR,
  },
]
export const componentSizeList = [
  {
    label: 'LARGE',
    value: ComponentSizeEnum.LARGE,
  },
  {
    label: 'MIDDLE',
    value: ComponentSizeEnum.MIDDLE,
  },
  {
    label: 'SMALL',
    value: ComponentSizeEnum.SMALL,
  }
]