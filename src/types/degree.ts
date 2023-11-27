export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  degree: Degree[] | null;
  degreeItem?: Degree | null;
  degreeUnverified: DegreeUnverified | null;
  errorMessage: any | null;
}

export interface Degree {
  _id: string;
  degree_names: string[];
  degree_name: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface DegreeDataPost {
  _id?: string;
  degree_names?: string[] | null;
  degree_name?: string | null;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

export interface DegreeUnverified {
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
