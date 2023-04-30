import React from 'react';
import { I18n } from '../types/types';

const lngs = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Русский' },
};
export default function LanguageSwitcher(props: I18n) {
  return (
    <div>
      <button
        key={'en'}
        style={{ fontWeight: props.i18n.resolvedLanguage === 'en' ? 'bold' : 'normal' }}
        type="submit"
        onClick={() => props.i18n.changeLanguage('en')}
      >
        {lngs.en.nativeName}
      </button>
      <button
        key={'ru'}
        style={{ fontWeight: props.i18n.resolvedLanguage === 'ru' ? 'bold' : 'normal' }}
        type="submit"
        onClick={() => props.i18n.changeLanguage('ru')}
      >
        {lngs.ru.nativeName}
      </button>
    </div>
  );
}
