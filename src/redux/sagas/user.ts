import axios from 'axios';
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

function* fetchUsers(): object {
  try {
    const token = cookie.load('token');
    const url = 'http://localhost:8080/api/v1/users';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const json = yield axios.get(url);
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
    const url = 'http://localhost:8080/api/v1/users';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const json = yield axios.post(url, {
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
    const url = 'http://localhost:8080/api/v1/users/update';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const json = yield axios.post(url, {
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
    const url = 'http://localhost:8080/api/v1/users';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const json = yield axios.delete(url, {
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
