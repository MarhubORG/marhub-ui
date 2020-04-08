import { DashboardState } from '../../types/interfaces';
import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';
import { DashboardActionTypes } from '../actions/dashboard';

export const initialState = {
  loading: false,
  organizations: [],
};

export default function dashboardReducer(
  state = initialState,
  action: DashboardActionTypes
): DashboardState {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      return { ...state, loading: true };
    case FETCH_ORGANIZATIONS_SUCCESS:
      return { ...state, loading: false, organizations: [...action.payload] };
    case FETCH_ORGANIZATIONS_FAILURE:
      return { ...state, loading: false };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
