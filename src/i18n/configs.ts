import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 言語jsonファイルのimport
import translation_en from "./en.json";
import translation_ja from "./ja.json";

const languageList = ["ja", "en"] as const;

export const getSupportedLanguage = (browserLanguage: string) => {
  const baseLanguage = browserLanguage.split("-")[0].toLowerCase();
  return languageList.find((language) => language === baseLanguage) ?? "en";
};

const resources = {
  ja: {
    translation: translation_ja,
  },
  en: {
    translation: translation_en,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getSupportedLanguage(window.navigator.language),
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
