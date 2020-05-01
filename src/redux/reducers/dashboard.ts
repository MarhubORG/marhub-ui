import { DashboardState } from '../../types/interfaces';
import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
  LOGOUT,
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
} from '../constants/actionTypes';
import { DashboardActionTypes, Organization } from '../actions/dashboard';

export const standardFetchOrganizationErrorMessage =
  'Could not fetch organizations. Please try again later or contact the administrator.';
export const templateFailureMessage =
  'Creating template failed. Please contact your administrator.';
export const templateSuccessMessage = 'Successfully created new template';

export const initialState = {
  loading: false,
  organizations: [],
  errorMessage: '',
  redirectToVisibleFields: '',
  templateMessage: '',
};
export const successMessage = 'Successfully updated organization permissions.';
export const createOrgFailureMessage =
  'Creating a new organization failed. Please contact your administrator.';
export const createOrgSuccessMessage =
  'Successfully updated organization permissions.';
export default function dashboardReducer(
  state = initialState,
  action: DashboardActionTypes
): DashboardState {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      return { ...state, loading: true, errorMessage: '' };
    case FETCH_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        organizations: [...action.payload],
        errorMessage: '',
      };
    case FETCH_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: standardFetchOrganizationErrorMessage,
      };
    case UPDATE_ORGANIZATION:
      return { ...state, loading: true, errorMessage: '' };
    case UPDATE_ORGANIZATION_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: successMessage,
        organizations: replaceWithUpdatedOrg(action.payload, state),
      };
    case LOGOUT:
      return { ...initialState };
    case CREATE_ORGANIZATION:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case CREATE_ORGANIZATION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: createOrgFailureMessage,
      };
    case CREATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        organizations: [...state.organizations, action.payload],
        loading: false,
        errorMessage: createOrgSuccessMessage,
        redirectToVisibleFields: action.payload.organisation.name,
      };
    case CREATE_ORGANIZATION_REDIRECT:
      return {
        ...state,
        redirectToVisibleFields: '',
      };
    case CREATE_TEMPLATE_FAILURE:
      return {
        ...state,
        templateMessage: templateFailureMessage,
        loading: false,
      };
    case CREATE_TEMPLATE:
      return {
        ...state,
        loading: true,
        templateMessage: '',
      };
    case CREATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        templateMessage: templateSuccessMessage,
        organizations: replaceWithUpdatedOrg(action.payload, state),
      };
    case UPDATE_TEMPLATE:
      return {
        ...state,
        loading: true,
        templateMessage: '',
      };
    case UPDATE_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        templateMessage: action.payload,
      };
    case UPDATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        templateMessage: 'Updated template successfully',
        organizations: replaceWithUpdatedOrg(action.payload, state),
      };
    case DELETE_TEMPLATE:
      return {
        ...state,
        loading: true,
        templateMessage: '',
      };
    case DELETE_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        templateMessage: action.payload,
      };
    case DELETE_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        templateMessage: 'Template Deleted.',
        organizations: replaceWithUpdatedOrg(action.payload, state),
      };
    case DELETE_TEMPLATE_REDIRECT:
      return {
        ...state,
        loading: false,
        templateMessage: '',
      };
    default:
      return state;
  }
}

export function replaceWithUpdatedOrg(
  organization: Organization,
  state: DashboardState
): Organization[] {
  return state.organizations.map(el => {
    if (el.id === organization.id) return organization;
    return el;
  });
}
