"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import English from "@/Translation/English.json";
import Portuguese from "@/Translation/Portuguese.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: English,
      },
      pt: {
        translation: Portuguese,
      },
    },
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
