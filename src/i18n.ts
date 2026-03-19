import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Only load English eagerly (fallback). Other locales loaded on demand.
import en from '../locales/en/translation.json';

const loadLocale = async (lang: string) => {
  switch (lang) {
    case 'pt':
      return (await import('../locales/pt/translation.json')).default;
    case 'es':
      return (await import('../locales/es/translation.json')).default;
    default:
      return en;
  }
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    });

  // After init, lazy-load the detected language if not English
  const detected = i18n.language;
  if (detected && !detected.startsWith('en')) {
    loadLocale(detected).then((bundle) => {
      i18n.addResourceBundle(detected, 'translation', bundle, true, true);
    });
  }

  // Lazy-load bundles on language change
  i18n.on('languageChanged', (lng) => {
    if (!i18n.hasResourceBundle(lng, 'translation')) {
      loadLocale(lng).then((bundle) => {
        i18n.addResourceBundle(lng, 'translation', bundle, true, true);
        i18n.changeLanguage(lng); // re-trigger render with loaded bundle
      });
    }
  });
}

export default i18n;
