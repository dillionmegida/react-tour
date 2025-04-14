import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// TODO: require translations on demand, not in bundle
import en from './translations/en/common.json';
import fr from './translations/fr/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: 'en',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
