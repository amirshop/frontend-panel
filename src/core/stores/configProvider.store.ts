import { defineStore } from 'pinia'
import { useColorMode, useLocalStorage } from '@vueuse/core'
import { ComponentsSizesEnum, DirectionsEnum, LanguagesEnum, LocaleMapping } from '@/core/enums'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import 'dayjs/locale/fa'
import dayjs from 'dayjs'
import jalali from '@zoomit/dayjs-jalali-plugin'
import { ref, watch } from 'vue'
import type { AliasToken } from 'ant-design-vue/es/theme/internal'

export const useConfigProviderStore = defineStore('Config provider', () => {
  const token = useLocalStorage<Partial<AliasToken>>('token', {
    colorPrimary: '#3b82f6',
    fontFamily: 'Vazirmatn FD',
  })
  const direction = useLocalStorage<DirectionsEnum>('direction', DirectionsEnum.LTR)
  const size = useLocalStorage<ComponentsSizesEnum>('size', ComponentsSizesEnum.Large)
  const language = useLocalStorage<LanguagesEnum>('language', LanguagesEnum.ENGLISH)
  const locale = useLocalStorage('locale', LocaleMapping[language.value])

  dayjs.extend(jalali)
  watch(
    () => locale.value,
    () => {
      if (language.value === LanguagesEnum.ENGLISH) {
        direction.value = DirectionsEnum.LTR
        dayjs.calendar('gregory')
      }

      if (language.value === LanguagesEnum.FARSI) {
        direction.value = DirectionsEnum.RTL
        dayjs.calendar('jalali')
      }
    },
  )

  return { token, language, direction, size, locale }
})
