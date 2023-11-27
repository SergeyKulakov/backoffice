export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  language: Language[] | null;
  languageItem?: Language | null;
  languagesUnverified: LanguagesUnverified | null;
  errorMessage: any | null;
}

export interface Language {
  _id: string;
  names: string[];
  name: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface LanguageDataPost {
  _id?: string;
  names?: string[] | null;
  name?: string | null;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

export interface LanguagesUnverified {
  data: [
    {
      id: string;
      value: string;
    }
  ];
  meta: {
    count: number;
  };
}
