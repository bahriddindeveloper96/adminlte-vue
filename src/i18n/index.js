import { createI18n } from 'vue-i18n'

// Import language files
import en from './locales/en.json'
import ru from './locales/ru.json'
import uz from './locales/uz.json'

const messages = {
  en,
  ru,
  uz
}

// Get saved language from localStorage or use default
const savedLanguage = localStorage.getItem('language') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: 'en',
  messages,
  globalInjection: true
})

export default i18n
