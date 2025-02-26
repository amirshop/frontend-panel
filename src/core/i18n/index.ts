import { createI18n } from 'vue-i18n'
import { LanguageEnum } from '@/core/enums'
import fa from '@/messages/fa'
import en from '@/messages/en'
export const initI18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: LanguageEnum.ENGLISH,
  fallbackLocale: [LanguageEnum.ENGLISH, LanguageEnum.FARSI],
  messages: {
    fa: { ...fa },
    en: { ...en },
  },
})
export function setLocaleFromStore(language: 'en' | 'fa') {
  initI18n.global.locale.value = language
}
