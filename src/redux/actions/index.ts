import { IS_SIGNING_UP } from '../constants/actionTypes';

interface Action {
  type: string;
  payload?: object;
}
export function isSigningUp(): Action {
  return { type: IS_SIGNING_UP };
}
