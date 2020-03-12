import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';
import { SIGNUP, LOGIN } from '../constants/actionTypes';
import {
  signupSuccess,
  signupError,
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

function* actionWatcher() {
  yield takeLatest(SIGNUP, signup);
}

function* login(action: LoginAction) {
  try {
    console.log('here saga');
    const url = 'http://localhost:8080/api/v1/login';
    const json = yield axios.post(url, {
      email: action.payload.email,
      password: action.payload.password,
    });
    console.log({ json });
    // yield put(signupSuccess());
  } catch (error) {
    console.log('error', error.response.data.message);
    yield put(signupError(error.response.data.message));
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

export default function* rootSaga() {
  yield all([actionWatcher(), watchLogin()]);
}
