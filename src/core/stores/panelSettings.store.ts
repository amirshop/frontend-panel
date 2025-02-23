import { defineStore } from 'pinia'
import { useCssVar, useLocalStorage } from '@vueuse/core'
import { ComponentsSizesEnum, DirectionsEnum, LanguagesEnum, LocaleMapping } from '@/core/enums'
import 'dayjs/locale/fa'
import dayjs from 'dayjs'
import jalali from '@zoomit/dayjs-jalali-plugin'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFullscreen } from '@vueuse/core'
import type { Settings } from '../types'

export const usePanelSettingsStore = defineStore('Panel settings', () => {
  const settingList = useLocalStorage<Settings>('panelSettings', {
    primaryColor: '#2b7fff',
    fontFamily: 'Vazirmatn',
    language: LanguagesEnum.ENGLISH,
    direction: DirectionsEnum.LTR,
    componentsSize: ComponentsSizesEnum.MIDDLE,
    isCompact: false,
    isDark: false,
  } as Settings)

  const locale = ref(LocaleMapping[settingList.value.language])

  const appRef = ref()
  const fullscreen = useFullscreen(appRef.value)

  dayjs.extend(jalali)

  const i18n = useI18n()

  onMounted(() => {
    if (settingList.value.language === LanguagesEnum.ENGLISH) {
      dayjs.calendar('gregory')
      locale.value = LocaleMapping[settingList.value.language]
    }

    if (settingList.value.language === LanguagesEnum.FARSI) {
      dayjs.calendar('jalali')
      locale.value = LocaleMapping[settingList.value.language]
    }
  })

  watch(
    () => settingList.value.language,
    () => {
      i18n.locale.value = settingList.value.language

      if (settingList.value.language === LanguagesEnum.ENGLISH) {
        dayjs.calendar('gregory')
        locale.value = LocaleMapping[settingList.value.language]
      }

      if (settingList.value.language === LanguagesEnum.FARSI) {
        dayjs.calendar('jalali')
        locale.value = LocaleMapping[settingList.value.language]
      }
    },
  )

  return {
    locale,
    fullscreen: { ...fullscreen, appRef },
    settingList,
  }
})
