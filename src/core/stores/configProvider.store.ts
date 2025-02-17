import { defineStore } from 'pinia'
import { useColorMode, useLocalStorage, type BasicColorMode } from '@vueuse/core'
import {
  ComponentsSizesEnum,
  DirectionsEnum,
  LanguagesEnum,
  LocaleMapping,
  ColorModeEnum,
} from '@/core/enums'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import 'dayjs/locale/fa'
import dayjs from 'dayjs'
import jalali from '@zoomit/dayjs-jalali-plugin'
import { ref, watch } from 'vue'
import type { AliasToken } from 'ant-design-vue/es/theme/internal'
import { useI18n } from 'vue-i18n'
import { useFullscreen } from '@vueuse/core'

export const useConfigProviderStore = defineStore('Config provider', () => {
  const direction = useLocalStorage<DirectionsEnum>('direction', DirectionsEnum.LTR)
  const size = useLocalStorage<ComponentsSizesEnum>('size', ComponentsSizesEnum.LARGE)
  const language = useLocalStorage<LanguagesEnum>('language', LanguagesEnum.ENGLISH)
  const locale = useLocalStorage('locale', LocaleMapping[language.value])
  const token = useLocalStorage<Partial<AliasToken>>('token', {
    colorPrimary: '#3b82f6',
    fontFamily: language.value == LanguagesEnum.ENGLISH ? 'fangsong' : 'Vazirmatn FD',
  })
  const color = useColorMode()
  const colorMode = useLocalStorage('colorMode', color.value)

  const appRef = ref()
  const fullscreen = useFullscreen(appRef.value)

  dayjs.extend(jalali)

  const i18n = useI18n()

  watch(language, () => {
    i18n.locale.value = language.value

    if (language.value === LanguagesEnum.ENGLISH) {
      dayjs.calendar('gregory')
      locale.value = LocaleMapping[language.value]
    }

    if (language.value === LanguagesEnum.FARSI) {
      dayjs.calendar('jalali')
      locale.value = LocaleMapping[language.value]
    }
  })

  return {
    token,
    language,
    direction,
    size,
    locale,
    colorMode,
    fullscreen: { ...fullscreen, appRef },
  }
})
