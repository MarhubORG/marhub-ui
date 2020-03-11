import { SIGNUP, SIGNUP_REDIRECTING } from '../constants/actionTypes';
import { Action } from '../../types/interfaces';

export function signup(
  name: string,
  organization: string,
  email: string,
  password: string
): Action {
  return { type: SIGNUP, payload: { name, organization, email, password } };
}

export function signupRedirecting(): Action {
  return { type: SIGNUP_REDIRECTING };
}
