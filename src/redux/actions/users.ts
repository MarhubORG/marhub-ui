import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

export interface FetchUsersAction {
  type: typeof FETCH_USERS;
}

export interface UserProfileFields {
  name: string;
  organisation: string;
  role?: string;
}

export interface User {
  id: number;
  email: string;
  isDisabled: boolean;
  profile: UserProfileFields;
}

export function fetchUsers(): FetchUsersAction {
  return {
    type: FETCH_USERS,
  };
}

export interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
}

export function fetchUsersFailure(): FetchUsersFailureAction {
  return {
    type: FETCH_USERS_FAILURE,
  };
}

export interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: User[];
}

export function fetchUsersSuccess(payload: User[]): FetchUsersSuccessAction {
  return {
    type: FETCH_USERS_SUCCESS,
    payload,
  };
}

export interface CreateUserPayload {
  email: string;
  name: string;
  selectedOrganization: string;
  role: string;
  password: string;
}

export interface CreateUserAction {
  type: typeof CREATE_USER;
  payload: CreateUserPayload;
}

export function createUser(data: CreateUserPayload): CreateUserAction {
  return {
    type: CREATE_USER,
    payload: {
      email: data.email,
      name: data.name,
      selectedOrganization: data.selectedOrganization,
      role: data.role,
      password: data.password,
    },
  };
}

export interface CreateUserFailureAction {
  type: typeof CREATE_USER_FAILURE;
}

export function createUserFailure(): CreateUserFailureAction {
  return {
    type: CREATE_USER_FAILURE,
  };
}

export interface CreateUserSuccessAction {
  type: typeof CREATE_USER_SUCCESS;
  payload: User;
}

export function createUserSuccess(payload: User): CreateUserSuccessAction {
  return {
    type: CREATE_USER_SUCCESS,
    payload,
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes =
  | FetchUsersAction
  | FetchUsersFailureAction
  | FetchUsersSuccessAction
  | CreateUserAction
  | CreateUserFailureAction
  | CreateUserSuccessAction
  | LogoutAction;