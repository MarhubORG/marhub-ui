import { UserState } from '../../types/interfaces';
import { UserActionTypes } from '../actions/users';
import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

const failureMessage =
  'Loading Users failed. Please contact your administrator.';
const initialState = {
  users: [],
  message: '',
  loading: false,
};
export default function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, loading: true };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, message: failureMessage };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, message: '', users: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
