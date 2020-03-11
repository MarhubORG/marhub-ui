import { SIGNUP } from '../constants/actionTypes';
import { Action } from '../../types/interfaces';

export function signup(
  name: string,
  organization: string,
  email: string,
  password: string
): Action {
  return { type: SIGNUP, payload: { name, organization, email, password } };
}
