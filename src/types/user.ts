export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  role: number;
}

export interface UserAuth {
  id: string;
  avatar?: string;
  email?: string;
  name?: string;

  [key: string]: any;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: number;
  status: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  role: number;
  isActive: boolean;
}

export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  userInfo: UserInfo | null;
  errorMessage: unknown;
  user: User[] | null;
  searchInfo: any;
}
