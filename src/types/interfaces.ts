export interface RegistrationState {
  loading: boolean;
  isLoggedIn: boolean;
  error: string;
  redirect: boolean;
  loginRedirect: boolean;
}

export interface RootState {
  registration: RegistrationState;
}

export interface ApiState {
  irapState: object;
  loading: boolean;
  error: string;
}
