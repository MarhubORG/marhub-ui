import { all } from 'redux-saga/effects';
import { actionWatcher, watchLogin } from './registration';
import { exportingIrapDataWatcher } from './api';

export default function* rootSaga() {
  yield all([actionWatcher(), watchLogin(), exportingIrapDataWatcher()]);
}
