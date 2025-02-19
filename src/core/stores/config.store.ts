import { defineStore } from 'pinia'
import { useColorMode, useCssVar, useLocalStorage } from '@vueuse/core'
import { ComponentsSizesEnum, DirectionsEnum, LanguagesEnum, LocaleMapping } from '@/core/enums'
import 'dayjs/locale/fa'
import dayjs from 'dayjs'
import jalali from '@zoomit/dayjs-jalali-plugin'
import { computed, onMounted, ref, watch } from 'vue'
import type { AliasToken } from 'ant-design-vue/es/theme/internal'
import { useI18n } from 'vue-i18n'
import { useFullscreen } from '@vueuse/core'
import { useCssVariables } from '../composable/cssVariables.composable'
import type { Settings } from '../types'

export const useConfigStore = defineStore('Config provider', () => {
  const settings = ref<Settings>({
    header: 'Your Website Header',
    footer: 'Your Website Footer',
    logo: 'path_to_logo.png',
    websiteName: 'My Awesome Website',
    slug: 'my-awesome-website',
    description: 'This is an awesome website built with TypeORM and NestJS.',
    favicon: 'path_to_favicon.ico',
    currency: 'TOMAN',
    primaryColor: '#1677ff',
    fontFamily: 'Vazirmatn',
    language: 'fa',
    componentsSize: 'small',
    isCompact: true,
    isDark: false,
    isRtl: false,
    id: 'c733e683-29ae-46df-b35b-c6ffced80726',
    createdAt: '2025-02-19T13:31:08.966Z',
    updatedAt: '2025-02-19T13:31:08.966Z',
  } as unknown as Settings)

  const direction = useLocalStorage<DirectionsEnum>('direction', DirectionsEnum.RTL)
  const size = useLocalStorage<ComponentsSizesEnum>('size', ComponentsSizesEnum.LARGE)
  const language = useLocalStorage<LanguagesEnum>('language', LanguagesEnum.FARSI)
  const locale = useLocalStorage('locale', LocaleMapping[language.value])

  const color = useColorMode()
  const colorMode = useLocalStorage('colorMode', color.value)

  const appRef = ref()
  const fullscreen = useFullscreen(appRef.value)

  dayjs.extend(jalali)

  const i18n = useI18n()

  onMounted(() => {
    if (language.value === LanguagesEnum.ENGLISH) {
      dayjs.calendar('gregory')
      locale.value = LocaleMapping[language.value]
    }

    if (language.value === LanguagesEnum.FARSI) {
      dayjs.calendar('jalali')
      locale.value = LocaleMapping[language.value]
    }
  })

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
    language,
    direction,
    size,
    locale,
    colorMode,
    fullscreen: { ...fullscreen, appRef },
    settings,
  }
})
