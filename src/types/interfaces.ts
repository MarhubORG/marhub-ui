import { Organization } from '../redux/actions/dashboard';

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
  apiReducer: ApiState;
  dashboardReducer: DashboardState;
}

export interface ApiState {
  irapState: object[];
  loading: boolean;
  error: string;
}

export interface DashboardState {
  loading: boolean;
  organizations: Organization[];
  errorMessage: string;
}
