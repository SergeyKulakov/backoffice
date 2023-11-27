export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  dataResearcher: Type | null;
  dataSupervisor: Type | null;
  errorMessage: any | null;
}

export interface Type {
  sellside: number;
  buyside: number;
}
