export type I18n = {
  i18n: { resolvedLanguage: string; changeLanguage: (arg0: string) => void };
};

export type i18nState = {
  i18n: { translations: { [x: string]: { [x: string]: 'string' } }; lang: string | number };
};
