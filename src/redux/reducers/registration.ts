import { Action, RegistrationState } from '../../types/interfaces';
import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR } from '../constants/actionTypes';

function registrationReducer(
  state = initialState,
  action: Action
): RegistrationState {
  switch (action.type) {
    case SIGNUP:
      return { ...state, loading: true, isLoggedIn: false };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, isLoggedIn: false };
    case SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default registrationReducer;

const initialState: RegistrationState = {
  loading: false,
  isLoggedIn: false,
  error: {},
};
