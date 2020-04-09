import { DashboardState } from '../../types/interfaces';
import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';
import { DashboardActionTypes } from '../actions/dashboard';

export const standardFetchOrganizationErrorMessage =
  'Could not fetch organizations. Please try again later or contact the administrator.';
export const initialState = {
  loading: false,
  organizations: [],
  errorMessage: '',
};

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
      return { ...state, loading: false, errorMessage: '' };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
