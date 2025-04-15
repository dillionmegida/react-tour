import { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { PropsWithChildren } from 'react';

export default function I18nSetup({ children }: PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);
  const [i18nInstance, setI18nInstance] = useState(i18n);

  useEffect(() => {
    const initI18n = async () => {
      const [en, fr] = await Promise.all([
        import('../../translations/en/common.json'),
        import('../../translations/fr/common.json'),
      ]);

      await i18n.use(initReactI18next).init({
        resources: {
          en: { translation: en },
          fr: { translation: fr },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      });

      setInitialized(true);
      setI18nInstance(i18n);
    };

    initI18n();
  }, []);

  if (!initialized) return <div>Loading...</div>;

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
