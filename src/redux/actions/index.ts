import {
  SIGNUP,
  SIGNUP_REDIRECTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../constants/actionTypes';

export interface SignupPayload {
  name: string;
  organization: string;
  email: string;
  password: string;
}

export interface SignupAction {
  type: typeof SIGNUP;
  payload: SignupPayload;
}

export function signup(
  name: string,
  organization: string,
  email: string,
  password: string
): SignupAction {
  return { type: SIGNUP, payload: { name, organization, email, password } };
}

export interface SignupRedirectingAction {
  type: typeof SIGNUP_REDIRECTING;
}

export function signupRedirecting(): SignupRedirectingAction {
  return { type: SIGNUP_REDIRECTING };
}

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS;
}

export function signupSuccess(): SignupSuccessAction {
  return { type: SIGNUP_SUCCESS };
}

interface SignupErrorPayload {
  message: string;
}

export interface SignupErrorAction {
  type: typeof SIGNUP_ERROR;
  payload: SignupErrorPayload;
}

export function signupError(message: string): SignupErrorAction {
  return { type: SIGNUP_ERROR, payload: { message } };
}

export type RegistrationActionTypes =
  | SignupAction
  | SignupRedirectingAction
  | SignupSuccessAction
  | SignupErrorAction;
