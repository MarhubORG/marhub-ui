import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

import { FETCH_USERS, CREATE_USER } from '../constants/actionTypes';

import {
  fetchUsersFailure,
  fetchUsersSuccess,
  createUserSuccess,
  createUserFailure,
  CreateUserAction,
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
    console.log({ action });
    const {
      name,
      email,
      password,
      role,
      selectedOrganization,
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
    });
    yield put(createUserSuccess(json.data.user));
  } catch (error) {
    yield put(createUserFailure());
  }
}

export function* createUserWatcher(): object {
  yield takeLatest(CREATE_USER, createUser);
}
