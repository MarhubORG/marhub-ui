import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

import { SIGNUP, LOGIN } from '../constants/actionTypes';
import {
  signupSuccess,
  signupError,
  loginError,
  loginSuccess,
  SignupAction,
  LoginAction,
} from '../actions/index';

function* signup(action: SignupAction) {
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

export function* actionWatcher() {
  yield takeLatest(SIGNUP, signup);
}

function* login(action: LoginAction) {
  try {
    const url = 'http://localhost:8080/api/v1/login';
    console.log({ url });
    const json = yield axios.post(url, {
      email: action.payload.email,
      password: action.payload.password,
    });
    console.log({ json });
    cookie.save('token', json.data.user.sessionToken, {
      path: '/',
      // domain: 'http://localhost:8080',
      // secure: true,
      // httpOnly: true,
    });
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginError(error.response.data.message));
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}
