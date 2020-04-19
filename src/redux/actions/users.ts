import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_USERS_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

export interface FetchUsersAction {
  type: typeof FETCH_USERS;
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
  payload: object[];
}

export function fetchUsersSuccess(payload: object[]): FetchUsersSuccessAction {
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
