export interface RegistrationState {
  loading: boolean;
  isLoggedIn: boolean;
  error: string;
  redirect: boolean;
  loginRedirect: boolean;
  role: string;
}

export interface RootState {
  registration: RegistrationState;
}

export interface ApiState {
  irapState: object;
  loading: boolean;
  error: string;
}
