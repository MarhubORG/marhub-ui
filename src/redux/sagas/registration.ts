import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';
import { SIGNUP } from '../constants/actionTypes';
import { signupSuccess, signupError, SignupAction } from '../actions/index';

const url = 'http://localhost:8080/api/v1/register';

function* signup(action: SignupAction) {
  try {
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

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
