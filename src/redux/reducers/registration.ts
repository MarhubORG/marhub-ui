import { Action } from '../../types/interfaces';
import { SIGNUP, SIGNUP_SUCCESS } from '../constants/actionTypes';

function registrationReducer(
  state = initialState,
  action: Action
): RegistrationReducer {
  switch (action.type) {
    case SIGNUP:
      return { ...state, loading: true, isLoggedIn: false };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, isLoggedIn: true };
    default:
      return state;
  }
}

export default registrationReducer;

interface RegistrationReducer {
  loading: boolean;
  isLoggedIn: boolean;
}

const initialState: RegistrationReducer = {
  loading: false,
  isLoggedIn: true,
};
