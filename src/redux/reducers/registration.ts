import { RegistrationState } from '../../types/interfaces';
import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_REDIRECTING,
} from '../constants/actionTypes';
import { RegistrationActionTypes } from '../actions/index';

export function registrationReducer(
  state = initialState,
  action: RegistrationActionTypes
): RegistrationState {
  switch (action.type) {
    case SIGNUP:
      return { ...state, loading: true };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, redirect: true };
    case SIGNUP_REDIRECTING:
      return { ...state, redirect: false };
    case SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
}

export default registrationReducer;

const initialState: RegistrationState = {
  loading: false,
  isLoggedIn: false,
  redirect: false,
  error: '',
};
