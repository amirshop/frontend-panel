import type { ComponentSizeEnum, DirectionEnum, FontFamilyEnum, LanguageEnum } from '@/core/enums'
import type { LocaleMapping } from '@/core/constant'

export interface Settings {
  isDark: boolean
  isCompact: boolean
  componentsSize: ComponentSizeEnum
  direction: DirectionEnum
  fontFamily: FontFamilyEnum
  language: LanguageEnum
  primaryColor: string
}

export type LocaleType = keyof typeof LocaleMapping
