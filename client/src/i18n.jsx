import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './assets/locale/en.json';
import faTranslations from './assets/locale/fa.json';

const resources = {
  en: {
    translation: enTranslations
  },
  fa: {
    translation: faTranslations
  }
};

const defaultLanguage = 'en'; // Default language
const defaultDirection = 'ltr'; // Default text direction

const savedLanguage = localStorage.getItem('appLanguage');
const savedDirection = localStorage.getItem('appDirection');

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage || defaultLanguage, // Set language from localStorage or default to 'en'
    fallbackLng: defaultLanguage, // Fallback language
    interpolation: {
      escapeValue: false
    }
  });

// Set initial text direction based on saved or default value
document.documentElement.dir = savedDirection || defaultDirection;

export default i18n;
