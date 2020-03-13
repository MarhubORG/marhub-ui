import { ApiState } from '../../types/interfaces';
import {
  EXPORTING_IRAP_DATA,
  EXPORT_IRAP_FAILURE,
  EXPORT_IRAP_SUCCESS,
} from '../constants/actionTypes';
import { ApiActionTypes } from '../actions/api';

const initialState = {
  loading: false,
  irapState: {},
  error: '',
};

export default function apiReducer(
  state = initialState,
  action: ApiActionTypes
): ApiState {
  switch (action.type) {
    case EXPORTING_IRAP_DATA:
      return { ...state, loading: true };
    default:
      return state;
  }
}
