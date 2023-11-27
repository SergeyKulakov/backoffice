export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  company: Company[] | null;
  companyItem?: Company | null;
  companyUnverified: CompanyUnverified | null;
  errorMessage: any | null;
}

export interface Company {
  _id: string;
  name: string | null;
  company_type: [];
  company_subtype: [_id: string, name: string];
  logo: string;
  website_url: string | null;
  linkedin_url: string | null;
  names: string[] | null;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface CompanyDataPost {
  _id?: string;
  name?: string | null;
  logo?: string;
  company_type?: string | null;
  website_url?: string;
  linkedin_url?: string;
  names?: string[] | null;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}
export interface CompanyUnverified {
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
