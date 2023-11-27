export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  education: Education[] | null;
  educationItem?: Education | null;
  educationUnverified?: EducationUnverified | null;
  errorMessage: any | null;
}
export interface Education {
  country: { name: string; _id: string };
  _id: string;
  names: string[];
  name: string;
  created_at: string;
  logo: string;
  country_id?: string;
  updated_at: string;
  __v: number;
}
export interface EducationUnverified {
  data: [
    {
      _id: string;
      value: string;
    }
  ];
  meta: {
    count: number;
  };
}

export interface EducationDataPost {
  _id?: string;
  names?: string[] | null;
  name?: string | null;
  created_at?: string;
  logo?: string;
  country_id?: string;
  updated_at?: string;
  __v?: number;
  country?: {
    _id?: string;
  };
}
