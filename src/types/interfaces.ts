export interface RegistrationState {
  loading: boolean;
  isLoggedIn: boolean;
  error: string;
  redirect: boolean;
}

export interface RootState {
  registration: RegistrationState;
}
