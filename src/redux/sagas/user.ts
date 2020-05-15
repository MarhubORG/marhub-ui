import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

import {
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
} from '../constants/actionTypes';

import {
  fetchUsersFailure,
  fetchUsersSuccess,
  createUserSuccess,
  createUserFailure,
  CreateUserAction,
  EditUserAction,
  editUserFailure,
  editUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  DeleteUserAction,
} from '../actions/users';
import { marhubApi } from '../../apis/apis';

function* fetchUsers(): object {
  try {
    const token = cookie.load('token');
    const url = '/api/v1/users';
    marhubApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    const json = yield marhubApi.get(url);
    yield put(fetchUsersSuccess(json.data[0]));
  } catch (error) {
    yield put(fetchUsersFailure());
  }
}

export function* fetchUsersWatcher(): object {
  yield takeLatest(FETCH_USERS, fetchUsers);
}

function* createUser(action: CreateUserAction): object {
  try {
    const {
      name,
      email,
      password,
      role,
      selectedOrganization,
      isDisabled,
    } = action.payload;
    const token = cookie.load('token');
    const url = '/api/v1/users';
    marhubApi.defaults.headers.common.Authorization = `Bearer ${token}`;

    const json = yield marhubApi.post(url, {
      name,
      email,
      password,
      role,
      organisation: selectedOrganization,
      isDisabled,
    });
    yield put(createUserSuccess(json.data.user));
  } catch (error) {
    yield put(createUserFailure());
  }
}

export function* createUserWatcher(): object {
  yield takeLatest(CREATE_USER, createUser);
}

function* editUser(action: EditUserAction): object {
  try {
    const {
      name,
      email,
      password,
      role,
      selectedOrganization,
      id,
      isDisabled,
    } = action.payload;
    const token = cookie.load('token');
    const url = '/api/v1/users/update';
    marhubApi.defaults.headers.common.Authorization = `Bearer ${token}`;

    yield marhubApi.post(url, {
      name,
      email,
      password,
      role,
      organisation: selectedOrganization,
      id,
      isDisabled,
    });
    yield put(
      editUserSuccess({
        id,
        isDisabled: false,
        email,
        profile: {
          name,
          organisation: selectedOrganization,
          role,
        },
      })
    );
  } catch (error) {
    yield put(editUserFailure());
  }
}

export function* editUserWatcher(): object {
  yield takeLatest(EDIT_USER, editUser);
}

function* deleteUser(action: DeleteUserAction): object {
  try {
    const token = cookie.load('token');
    const url = '/api/v1/users';
    marhubApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    yield marhubApi.delete(url, {
      data: {
        id: action.payload,
      },
    });
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(deleteUserFailure());
  }
}

export function* deleteUserWatcher(): object {
  yield takeLatest(DELETE_USER, deleteUser);
}
