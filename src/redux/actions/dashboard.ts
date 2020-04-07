import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

export interface FetchOrganizationsAction {
  type: typeof FETCH_ORGANIZATIONS;
}

export function fetchOrganizations(): FetchOrganizationsAction {
  return { type: FETCH_ORGANIZATIONS };
}

export interface FetchOrganizationsSuccessAction {
  type: typeof FETCH_ORGANIZATIONS_SUCCESS;
}

export function fetchOrganizationsSuccess(): FetchOrganizationsSuccessAction {
  return { type: FETCH_ORGANIZATIONS_SUCCESS };
}

export interface FetchOrganizationsFailureAction {
  type: typeof FETCH_ORGANIZATIONS_FAILURE;
}

export function fetchOrganizationsFailure(): FetchOrganizationsFailureAction {
  return { type: FETCH_ORGANIZATIONS_FAILURE };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export function logout(): LogoutAction {
  return { type: LOGOUT };
}

export type DashboardActionTypes =
  | LogoutAction
  | FetchOrganizationsAction
  | FetchOrganizationsSuccessAction
  | FetchOrganizationsFailureAction;
