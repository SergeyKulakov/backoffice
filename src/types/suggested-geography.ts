export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: Suggested[] | null;
  dataItem?: Suggested | null;
  errorMessage: any | null;
}

export interface Suggested {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface SuggestedDataPost {
  _id?: string;
  name?: string | null;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}
