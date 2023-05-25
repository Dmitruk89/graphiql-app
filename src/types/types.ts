export type I18n = {
  i18n: { resolvedLanguage: string; changeLanguage: (arg0: string) => void };
};

export type i18nState = {
  i18n: {
    translations: { [x: string]: { [x: string]: { [x: string]: 'string' } } };
    lang: string | number;
  };
};

export type SignUpInput = {
  email: string;
  password: string;
  repeatedPassword: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type HeadersStateType = 'empty' | 'parsed' | 'notParsed';

export interface IDeveloper {
  image: string;
  name: string;
  descr: string;
  altText: string;
  link: string;
}

export type ApiError = {
  message: string;
};
