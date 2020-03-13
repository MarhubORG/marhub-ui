import { ApiState } from '../../types/interfaces';
import {
  EXPORTING_IRAP_DATA,
  EXPORT_IRAP_DATA_FAILURE,
  EXPORT_IRAP_DATA_SUCCESS,
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
    case EXPORT_IRAP_DATA_SUCCESS:
      return { ...state, loading: false, irapState: action.payload };
    case EXPORT_IRAP_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
