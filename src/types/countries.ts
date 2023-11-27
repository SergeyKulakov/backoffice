export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  name: Country[] | null;
  cities: [] | null;
  names: Country | null;
  countryUnverified: CountryUnverified | null;
  cityUnverified: CityUnverified | null;
  errorMessage: any | null;
}

export interface Country {
  _id: string;
  names: string[];
  name: string;
  languages: Array<{ _id: string; name: string }>;
  cities: Array<{ alias_names: string[]; name: string; _id: string }>;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface CountriesDataPost {
  _id?: string;
  names?: string[] | null;
  name?: string | null;
  languages?: Array<{ _id: string; name: string }>;
  cities?: Array<{ name: string }>;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

export interface CountryUnverified {
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

export interface CityUnverified {
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
