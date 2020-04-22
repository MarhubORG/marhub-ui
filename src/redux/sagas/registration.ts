import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

import { SIGNUP, LOGIN, LOGOUT } from '../constants/actionTypes';
import {
  signupSuccess,
  signupError,
  loginError,
  loginSuccess,
  SignupAction,
  LoginAction,
  logoutSuccess,
  logoutError,
} from '../actions/index';

function* signup(action: SignupAction): object {
  try {
    const url = 'http://localhost:8080/api/v1/register';
    yield axios.post(url, {
      name: action.payload.name,
      organisation: action.payload.organization,
      email: action.payload.email,
      password: action.payload.password,
    });
    yield put(signupSuccess());
  } catch (error) {
    yield put(signupError(error.response.data.message));
  }
}

export function* actionWatcher(): object {
  yield takeLatest(SIGNUP, signup);
}

function* login(action: LoginAction): object {
  try {
    const url = 'http://localhost:8080/api/v1/login';
    const json = yield axios.post(url, {
      email: action.payload.email,
      password: action.payload.password,
    });
    cookie.save('token', json.data.user.sessionToken, {
      path: '/',
      // domain: 'http://localhost:8080',
      // secure: true,
      // httpOnly: true,
    });
    let role = '';
    let organization = '';
    try {
      role = json.data.user.profile.role;
      organization = json.data.user.profile.organisation;
    } catch (error) {
      yield put(
        loginError(
          'There was a problem with your log in. Please contact the administrator.'
        )
      );
    }
    yield put(loginSuccess(role, organization));
  } catch (error) {
    try {
      yield put(loginError(error.response.data.message));
    } catch (e) {
      yield put(loginError("Sorry! We can't reach the server."));
    }
  }
}

export function* loginWatcher(): object {
  yield takeLatest(LOGIN, login);
}

function* logout(action: LoginAction): object {
  try {
    const token = cookie.load('token');
    const url = `http://localhost:8080/api/v1/logout?sessionToken=${token}`;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    yield axios.post(url, {
      sessionToken: token,
    });
    yield put(logoutSuccess());
  } catch (e) {
    yield put(logoutError('Error on logout.'));
  }
}

export function* logoutWatcher(): object {
  yield takeLatest(LOGOUT, logout);
}
