import { RegistrationState } from '../../types/interfaces';
import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_REDIRECTING,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_REDIRECTING,
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
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload.message,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginRedirect: true,
        isLoggedIn: true,
        role: action.payload.role,
      };
    case LOGIN_REDIRECTING:
      return { ...state, loginRedirect: false };
    default:
      return state;
  }
}

export default registrationReducer;

export const initialState: RegistrationState = {
  loading: false,
  isLoggedIn: false,
  redirect: false,
  loginRedirect: false,
  error: '',
  role: '',
};
