import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  LOGOUT,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
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
  id: number;
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

export interface UpdateOrganizationPayload {
  id: number;
  organization: Organization;
}

export interface UpdateOrganizationAction {
  type: typeof UPDATE_ORGANIZATION;
  payload: UpdateOrganizationPayload;
}

export function updateOrganization(
  organization: UpdateOrganizationPayload
): UpdateOrganizationAction {
  return {
    type: UPDATE_ORGANIZATION,
    payload: organization,
  };
}

export interface UpdateOrganizationSuccessPayload {
  id: number;
  organization: Organization;
}

export interface UpdateOrganizationSuccessAction {
  type: typeof UPDATE_ORGANIZATION_SUCCESS;
  payload: UpdateOrganizationSuccessPayload;
}

export function updateOrganizationSuccess(
  organization: UpdateOrganizationSuccessPayload
): UpdateOrganizationSuccessAction {
  return {
    type: UPDATE_ORGANIZATION_SUCCESS,
    payload: organization,
  };
}

export interface UpdateOrganizationFailureAction {
  type: typeof UPDATE_ORGANIZATION_FAILURE;
  payload: string;
}

export function updateOrganizationFailure(
  message: string
): UpdateOrganizationFailureAction {
  return {
    type: UPDATE_ORGANIZATION_FAILURE,
    payload: message,
  };
}

export type DashboardActionTypes =
  | LogoutAction
  | FetchOrganizationsAction
  | FetchOrganizationsSuccessAction
  | FetchOrganizationsFailureAction
  | UpdateOrganizationAction
  | UpdateOrganizationSuccessAction
  | UpdateOrganizationFailureAction;
