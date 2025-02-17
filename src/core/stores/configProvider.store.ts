import { defineStore } from 'pinia'
import { useColorMode, useLocalStorage, type BasicColorMode } from '@vueuse/core'
import {
  ComponentsSizesEnum,
  DirectionsEnum,
  LanguagesEnum,
  LocaleMapping,
  ColorModeEnum,
  ColorsEnum,
} from '@/core/enums'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import 'dayjs/locale/fa'
import dayjs from 'dayjs'
import jalali from '@zoomit/dayjs-jalali-plugin'
import { computed, ref, watch } from 'vue'
import type { AliasToken } from 'ant-design-vue/es/theme/internal'
import { useI18n } from 'vue-i18n'
import { useFullscreen } from '@vueuse/core'

export const useConfigProviderStore = defineStore('Config provider', () => {
  const direction = useLocalStorage<DirectionsEnum>('direction', DirectionsEnum.LTR)
  const size = useLocalStorage<ComponentsSizesEnum>('size', ComponentsSizesEnum.LARGE)
  const language = useLocalStorage<LanguagesEnum>('language', LanguagesEnum.ENGLISH)
  const locale = useLocalStorage('locale', LocaleMapping[language.value])
  const fontFamily = computed(() => {
    return language.value === LanguagesEnum.ENGLISH ? 'Poppins' : 'FD Vazirmatn'
  })
  console.log(fontFamily.value)
  console.log(fontFamily.value)
  console.log(fontFamily.value)
  console.log(fontFamily.value)
  console.log(fontFamily.value)
  
  const token = useLocalStorage<Partial<AliasToken>>('token', {
    colorPrimary: ColorsEnum.PRIMARY,
    fontFamily: fontFamily.value,
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
