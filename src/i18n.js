import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import the translation files
import { en } from './locals/en.js';
import { ro } from './locals/ro.js'; // Named import

// Initialize i18next with the translation resources
i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      ro: {
        translation: ro, // Romanian translations
      },
      en: {
        translation: en, // English translations
      },
    },
    lng: 'ro', // Default language (set to Romanian here)
    fallbackLng: 'ro', // Fallback language if translation is not found
    interpolation: {
      escapeValue: false, // React already escapes values to avoid XSS attacks
    },
  });

export default i18n;
