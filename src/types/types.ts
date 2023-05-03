export type I18n = {
  i18n: { resolvedLanguage: string; changeLanguage: (arg0: string) => void };
};

export type i18nState = {
  i18n: {
    translations: {
      [x: string]: {
        title: 'string';
        welcomeDescr: 'string';
        welcomeFirstChar: 'string';
        welcomeSecondChar: 'string';
        welcomeThirdChar: 'string';
      };
    };
    lang: string | number;
  };
};

export interface IDeveloper {
  image: string;
  name: string;
  descr: string;
  altText: string;
  link: string;
}

export type SignUpInput = {
  login: string;
  email: string;
  password: string;
  repeatedPassword: string;
};

export type SignInInput = {
  login: string;
  password: string;
};
