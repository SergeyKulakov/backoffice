export interface AuthState {
  find: any;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  companyType: CompanyType[] | null;
  companyTypeItem?: CompanyType | null;
  errorMessage: any | null;
}

export interface CompanyType {
  _id: string;
  subtypes: [_id: string, name: string];
  name: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface CompanyTypePost {
  _id?: string;
  subtypes?: string[] | null;
  name?: string | null;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}
