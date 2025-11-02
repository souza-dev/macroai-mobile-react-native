import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// //English
import account_en from '../locales/en/account.json';
import calories_en from '../locales/en/calories.json';
import chat_en from '../locales/en/chat.json';
import common_en from '../locales/en/common.json';
import delete_en from '../locales/en/delete.json';
import dropdown_en from '../locales/en/dropdown.json';
import fast_en from '../locales/en/fast.json';
import login_en from '../locales/en/login.json';
import macro_en from '../locales/en/macro.json';
import notes_en from '../locales/en/notes.json';
import stats_en from '../locales/en/statistics.json';

// //Spanish
import common_es from '../locales/es/common.json';
import login_es from '../locales/es/login.json';

// //Protuguese
import common_pt from '../locales/pt/common.json';
import login_pt from '../locales/pt/login.json';

const resources = {
    en: {
        common: common_en,
        login: login_en,
        dropdown: dropdown_en,
        account: account_en,
        macro: macro_en,
        chat: chat_en,
        calories: calories_en,
        fast: fast_en,
        statistics: stats_en,
        notes: notes_en,
        delete: delete_en,
    },
    es: {
        common: common_es,
        login: login_es,
    },
    pt: {
        common: common_pt,
        login: login_pt,
    },
};

const initI18n = async () => {
    const supportedLanguages = ['en', 'pt', 'es'];
    const locale = Localization.getLocales()[0]?.languageCode || 'en';
    const languageCode = supportedLanguages.includes(locale) ? locale : 'en';

    // eslint-disable-next-line import/no-named-as-default-member
    i18n.use(initReactI18next).init({
        compatibilityJSON: 'v4',
        resources,
        lng: languageCode,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        pluralSeparator: '_',
    });
};

initI18n();
console.log('[i18n] language set to:', i18n.language);

export default i18n;
