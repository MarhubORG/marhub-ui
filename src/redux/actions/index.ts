import { SIGNUP } from '../constants/actionTypes';
import { Action } from '../../types/interfaces';

export function signup(): Action {
  return { type: SIGNUP };
}
