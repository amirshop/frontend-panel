import {
  ColorsEnum,
  ComponentsSizesEnum,
  DirectionsEnum,
  LanguagesEnum,
} from '@/enums/setting.enum'

export interface SettingModel {
  id: string
  name: string
  logo: string
  slug: string
  description: string
  favicon: string
  primaryColor: ColorsEnum
  primaryFontFamily: ColorsEnum
  direction: DirectionsEnum
  // currency: string;
  language: LanguagesEnum
  componentsSize: ComponentsSizesEnum
  createdAt: Date
  updatedAt: Date
}
