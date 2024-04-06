import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import vn from "./vn.json";
import en from "./en.json";

const resources = {
    vn: {
        translation: vn,
    },
    en: {
        translation: en,
    },
};

i18next.use(initReactI18next).init({
    debug: false,
    lng: 'vn',
    compatibilityJSON: 'v3',
    fallbackLng: 'vn',
    resources,
})

export default i18next;