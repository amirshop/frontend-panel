import faIR from 'ant-design-vue/es/locale/fa_IR'
import enUS from 'ant-design-vue/es/locale/en_US'
import azAZ from 'ant-design-vue/es/locale/az_AZ'

export const enum ColorsEnum {
  PRIMARY = 'var(--primary-color)',
}
export const enum FontFamilyEnum {
  PRIMARY = 'var(--primary-font-family)',
}

export const enum DirectionsEnum {
  RTL = 'rtl',
  LTR = 'ltr',
}
export const enum LanguagesEnum {
  FARSI = 'fa',
  ENGLISH = 'en',
  AZERBAIJANI = 'az',
}

export const enum SortDirEnum {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}
export const enum FilterTypeEnum {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
}
export const enum ComponentsSizesEnum {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
}
export const enum ColorModeEnum {
  DARK = 'dark',
  LIGHT = 'light',
  AUTO = 'auto',
}
export type LocaleType = keyof typeof LocaleMapping
export const LocaleMapping = {
  en: enUS,
  fa: faIR,
  az: azAZ,
}

export const enum FontFamilyEnum {
  FARSI = 'Poppins',
  ENGLISH = 'Vazirmatn',
}
export const enum CurrenciesEnum {
  DOLLAR = 'dollar',
  RIAL = 'dolSlar',
  TOMAN = 'dollarS',
}
