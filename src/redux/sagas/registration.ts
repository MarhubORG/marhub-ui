import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';
import { SIGNUP_SUCCESS, SIGNUP } from '../constants/actionTypes';

function* signup(action: SignupAction) {
  try {
    const url = 'http://localhost:8080/api/v1/register';
    const json = yield axios.post(url, {
      name: action.payload.name,
      organisation: action.payload.organization,
      email: action.payload.email,
      password: action.payload.password,
    });
    yield put({ type: SIGNUP_SUCCESS, payload: { json } });
  } catch (error) {
    // hand error and put() into redux
    // console.log(error.response.data);
  }
}

function* actionWatcher() {
  yield takeLatest(SIGNUP, signup);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}

interface SignupPayload {
  name: string;
  organization: string;
  email: string;
  password: string;
}

interface SignupAction {
  type: string;
  payload: SignupPayload;
}
