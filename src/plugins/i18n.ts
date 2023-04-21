import { createI18n } from 'vue-i18n'
import { getStorage } from '../utils/storage'
import en from '@/plugins/langs/en.json'
import ru from '@/plugins/langs/ru.json'
// import messages from '@intlify/unplugin-vue-i18n/messages'
export const i18n = createI18n({
  legacy: false,
  mode: 'composition',
  globalInjection: true,
  locale: getStorage('lang') || 'en',
  fallbackLocale: 'en',
  availableLocales: ['en', 'ru'],
  runtimeOnly: true,
  messages: {
    en,
    ru
  }
})
