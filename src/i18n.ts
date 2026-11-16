import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Importa todos los idiomas
import translationES from './locales/es/translation.json'
import translationEN from './locales/en/translation.json' // 👈 NUEVO
import translationPT from './locales/pt/translation.json' // 👈 NUEVO
import translationFR from './locales/fr/translation.json' // 👈 NUEVO

const resources = {
  es: { translation: translationES },
  en: { translation: translationEN }, // 👈 AGREGADO
  pt: { translation: translationPT }, // 👈 AGREGADO
  fr: { translation: translationFR }, // 👈 AGREGADO
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: { escapeValue: false }
  })

export default i18n