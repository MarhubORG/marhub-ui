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

export interface OrganizationFields {
  name: string;
  visible_fields: string[];
}

export interface Organization {
  organisation: OrganizationFields;
}

export interface FetchOrganizationsSuccessAction {
  type: typeof FETCH_ORGANIZATIONS_SUCCESS;
  payload: Organization[];
}

export function fetchOrganizationsSuccess(
  organizations: Organization[]
): FetchOrganizationsSuccessAction {
  return { type: FETCH_ORGANIZATIONS_SUCCESS, payload: organizations };
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
