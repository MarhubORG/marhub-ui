import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  LOGOUT,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_FAILURE,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_REDIRECT,
  CREATE_TEMPLATE,
  CREATE_TEMPLATE_FAILURE,
  CREATE_TEMPLATE_SUCCESS,
  UPDATE_TEMPLATE,
  UPDATE_TEMPLATE_FAILURE,
  UPDATE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE,
  DELETE_TEMPLATE_FAILURE,
  DELETE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_REDIRECT,
  DELETE_ORGANIZATION,
  DELETE_ORGANIZATION_FAILURE,
  DELETE_ORGANIZATION_SUCCESS,
} from '../constants/actionTypes';

export interface FetchOrganizationsAction {
  type: typeof FETCH_ORGANIZATIONS;
}

export function fetchOrganizations(): FetchOrganizationsAction {
  return { type: FETCH_ORGANIZATIONS };
}

export interface OrganizationFields {
  name: string;
  visibleFields: string[];
  templates?: Template[];
  nonNullFields?: string[];
  // TODO update for templates
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
  organization: {
    visible_fields: string[];
    non_null_fields: string[];
  };
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

export interface UpdateOrganizationSuccessAction {
  type: typeof UPDATE_ORGANIZATION_SUCCESS;
  payload: Organization;
}

export function updateOrganizationSuccess(
  organization: Organization
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

export interface CreateOrganizationAction {
  type: typeof CREATE_ORGANIZATION;
  payload: string;
}

export function createOrganization(payload: string): CreateOrganizationAction {
  return {
    type: CREATE_ORGANIZATION,
    payload,
  };
}

export interface CreateOrganizationFailureAction {
  type: typeof CREATE_ORGANIZATION_FAILURE;
}

export function createOrganizationFailure(): CreateOrganizationFailureAction {
  return {
    type: CREATE_ORGANIZATION_FAILURE,
  };
}

export interface CreateOrganizationSuccessAction {
  type: typeof CREATE_ORGANIZATION_SUCCESS;
  payload: Organization;
}

export function createOrganizationSuccess(
  payload: Organization
): CreateOrganizationSuccessAction {
  return {
    type: CREATE_ORGANIZATION_SUCCESS,
    payload,
  };
}

export interface CreateOrganizationRedirectAction {
  type: typeof CREATE_ORGANIZATION_REDIRECT;
}

export function createOrganizationRedirect(): CreateOrganizationRedirectAction {
  return {
    type: CREATE_ORGANIZATION_REDIRECT,
  };
}

export interface Template {
  name: string;
  fields: string[];
}

export interface CreateTemplateAction {
  type: typeof CREATE_TEMPLATE;
  payload: Template;
}

export function createTemplate(payload: Template): CreateTemplateAction {
  return {
    type: CREATE_TEMPLATE,
    payload,
  };
}

export interface CreateTemplateFailureAction {
  type: typeof CREATE_TEMPLATE_FAILURE;
}

export function createTemplateFailure(): CreateTemplateFailureAction {
  return {
    type: CREATE_TEMPLATE_FAILURE,
  };
}

export interface CreateTemplateSuccessAction {
  type: typeof CREATE_TEMPLATE_SUCCESS;
  payload: Organization;
}

export function createTemplateSuccess(
  payload: Organization
): CreateTemplateSuccessAction {
  return {
    type: CREATE_TEMPLATE_SUCCESS,
    payload,
  };
}

export interface UpdateTemplateAction {
  type: typeof UPDATE_TEMPLATE;
  payload: Template;
}

export function updateTemplate(payload: Template): UpdateTemplateAction {
  return {
    type: UPDATE_TEMPLATE,
    payload,
  };
}

export interface UpdateTemplateSuccessAction {
  type: typeof UPDATE_TEMPLATE_SUCCESS;
  payload: Organization;
}

export function updateTemplateSuccess(
  payload: Organization
): UpdateTemplateSuccessAction {
  return {
    type: UPDATE_TEMPLATE_SUCCESS,
    payload,
  };
}

export interface UpdateTemplateFailureAction {
  type: typeof UPDATE_TEMPLATE_FAILURE;
  payload: string;
}

export function updateTemplateFailure(
  payload: string
): UpdateTemplateFailureAction {
  return {
    type: UPDATE_TEMPLATE_FAILURE,
    payload,
  };
}

export interface DeleteTemplateAction {
  type: typeof DELETE_TEMPLATE;
  payload: string;
}

export function deleteTemplate(payload: string): DeleteTemplateAction {
  return {
    type: DELETE_TEMPLATE,
    payload,
  };
}

export interface DeleteTemplateFailureAction {
  type: typeof DELETE_TEMPLATE_FAILURE;
  payload: string;
}

export function deleteTemplateFailure(
  payload: string
): DeleteTemplateFailureAction {
  return {
    type: DELETE_TEMPLATE_FAILURE,
    payload,
  };
}

export interface DeleteTemplateSuccessAction {
  type: typeof DELETE_TEMPLATE_SUCCESS;
  payload: Organization;
}

export function deleteTemplateSuccess(
  payload: Organization
): DeleteTemplateSuccessAction {
  return {
    type: DELETE_TEMPLATE_SUCCESS,
    payload,
  };
}

export interface DeleteTemplateRedirectAction {
  type: typeof DELETE_TEMPLATE_REDIRECT;
}

export function deleteTemplateRedirect(): DeleteTemplateRedirectAction {
  return {
    type: DELETE_TEMPLATE_REDIRECT,
  };
}

export interface DeleteOrganizationAction {
  type: typeof DELETE_ORGANIZATION;
  payload: number;
}

export function deleteOrganization(payload: number): DeleteOrganizationAction {
  return {
    type: DELETE_ORGANIZATION,
    payload,
  };
}

export interface DeleteOrganizationSuccessAction {
  type: typeof DELETE_ORGANIZATION_SUCCESS;
}

export function deleteOrganizationSuccess(): DeleteOrganizationSuccessAction {
  return {
    type: DELETE_ORGANIZATION_SUCCESS,
  };
}

export interface DeleteOrganizationFailureAction {
  type: typeof DELETE_ORGANIZATION_FAILURE;
}

export function deleteOrganizationFailure(): DeleteOrganizationFailureAction {
  return {
    type: DELETE_ORGANIZATION_FAILURE,
  };
}

export type DashboardActionTypes =
  | LogoutAction
  | FetchOrganizationsAction
  | FetchOrganizationsSuccessAction
  | FetchOrganizationsFailureAction
  | UpdateOrganizationAction
  | UpdateOrganizationSuccessAction
  | UpdateOrganizationFailureAction
  | CreateOrganizationAction
  | CreateOrganizationFailureAction
  | CreateOrganizationSuccessAction
  | CreateOrganizationRedirectAction
  | CreateTemplateAction
  | CreateTemplateFailureAction
  | CreateTemplateSuccessAction
  | UpdateTemplateAction
  | UpdateTemplateSuccessAction
  | UpdateTemplateFailureAction
  | DeleteTemplateAction
  | DeleteTemplateFailureAction
  | DeleteTemplateSuccessAction
  | DeleteTemplateRedirectAction
  | DeleteOrganizationAction
  | DeleteOrganizationFailureAction
  | DeleteOrganizationSuccessAction;
