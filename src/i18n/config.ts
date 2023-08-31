import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en: {
            names: require('./locales/en/names.json'),
            descriptions: require('./locales/en/descriptions.json')
        },
        ru: {
            names: require('./locales/ru/names.json'),
            descriptions: require('./locales/ru/descriptions.json')
        }
    },
    ns: ['names', 'descriptions'],
    defaultNS: 'names'
});

i18n.languages = ['en', 'ru'];

export default i18n;
