import { createI18n } from 'vue-i18n'
import messages from './messages'
import { LanguagesEnum } from '@/enums'
export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('language') as LanguagesEnum,
  fallbackLocale: ['en', 'fa'],
  messages,
})
