export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  diversity: Diversity[] | null;
  diversityItem?: Diversity | null;
  errorMessage: any | null;
}

export interface Diversity {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface DiversityDataPost {
  _id?: string;
  name?: string | null;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}
