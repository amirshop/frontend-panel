import { createI18n } from 'vue-i18n'
import messages from './messages'
<<<<<<< Updated upstream
import { LanguagesEnum } from '@/enums'
export default createI18n({
=======
import { LanguageEnum } from '@/core/enums'

export const initI18n = createI18n({
>>>>>>> Stashed changes
  legacy: false,
  globalInjection: true,
  locale: LanguageEnum.ENGLISH,
  fallbackLocale: [LanguageEnum.ENGLISH, LanguageEnum.FARSI],
  messages,
})
export function setLocaleFromStore(language: 'en' | 'fa') {
  initI18n.global.locale.value = language
}
