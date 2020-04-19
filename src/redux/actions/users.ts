import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
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

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes =
  | FetchUsersAction
  | FetchUsersFailureAction
  | FetchUsersSuccessAction
  | LogoutAction;
