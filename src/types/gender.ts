export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  gender: Gender[] | null;
  genderItem?: Gender | null;
  errorMessage: any | null;
}

export interface Gender {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface GenderDataPost {
  _id?: string;
  name?: string | null;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}
