import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
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
  isDisabled: boolean;
}

export interface EditUserPayload {
  email: string;
  name: string;
  selectedOrganization: string;
  role: string;
  password: string;
  isDisabled: boolean;
  id: number;
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
      isDisabled: data.isDisabled,
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

export interface EditUserAction {
  type: typeof EDIT_USER;
  payload: EditUserPayload;
}

export function editUser(payload: EditUserPayload): EditUserAction {
  return {
    type: EDIT_USER,
    payload,
  };
}

export interface EditUserSuccessAction {
  type: typeof EDIT_USER_SUCCESS;
  payload: User;
}

export function editUserSuccess(payload: User): EditUserSuccessAction {
  return {
    type: EDIT_USER_SUCCESS,
    payload,
  };
}

export interface EditUserFailureAction {
  type: typeof EDIT_USER_FAILURE;
}

export function editUserFailure(): EditUserFailureAction {
  return {
    type: EDIT_USER_FAILURE,
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  };
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
  payload: number;
}

export function deleteUser(payload: number): DeleteUserAction {
  return {
    type: DELETE_USER,
    payload,
  };
}

export interface DeleteUserFailureAction {
  type: typeof DELETE_USER_FAILURE;
}

export function deleteUserFailure(): DeleteUserFailureAction {
  return {
    type: DELETE_USER_FAILURE,
  };
}

export interface DeleteUserSuccessAction {
  type: typeof DELETE_USER_SUCCESS;
}

export function deleteUserSuccess(): DeleteUserSuccessAction {
  return {
    type: DELETE_USER_SUCCESS,
  };
}

export type UserActionTypes =
  | FetchUsersAction
  | FetchUsersFailureAction
  | FetchUsersSuccessAction
  | CreateUserAction
  | CreateUserFailureAction
  | CreateUserSuccessAction
  | EditUserAction
  | EditUserSuccessAction
  | EditUserFailureAction
  | DeleteUserAction
  | DeleteUserFailureAction
  | DeleteUserSuccessAction
  | LogoutAction;
