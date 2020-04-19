import { Organization } from '../redux/actions/dashboard';
import { User } from '../redux/actions/users';

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
  userReducer: UserState;
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
  redirectToVisibleFields: string;
}

export interface UserState {
  loading: boolean;
  users: User[];
  message: string;
}
