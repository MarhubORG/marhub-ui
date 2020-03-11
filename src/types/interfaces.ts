export interface Action {
  type: string;
  payload?: object;
}

export interface RegistrationState {
  loading: boolean;
  isLoggedIn: boolean;
  error: object | undefined;
}

export interface RootState {
  registration: RegistrationState;
}
