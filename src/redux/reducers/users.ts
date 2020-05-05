import { UserState } from '../../types/interfaces';
import { UserActionTypes, User } from '../actions/users';
import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

export const failureMessage =
  'Loading Users failed. Please contact your administrator.';
export const createUserFailureMessage =
  'Creating user failed. Please contact your administrator.';
export const editUserFailureMessage =
  'Editing user failed. Please contact your administrator.';
export const editUserSuccessMessage =
  'Edit user success! All changes have been saved to the database.';

export const initialState = {
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
      return { ...state, loading: true, message: '' };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, message: failureMessage };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, message: '', users: action.payload };
    case CREATE_USER:
      return { ...state, loading: true, message: '' };
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, message: createUserFailureMessage };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'CREATE_USER_SUCCESS',
        users: [...state.users, action.payload],
      };
    case EDIT_USER:
      return {
        ...state,
        loading: true,
        message: '',
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        message: editUserFailureMessage,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: editUserSuccessMessage,
        users: replaceWithUpdatedUser(action.payload, state),
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function replaceWithUpdatedUser(user: User, state: UserState): User[] {
  return state.users.map(el => {
    if (el.id === user.id) return user;
    return el;
  });
}
