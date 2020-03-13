import { all } from 'redux-saga/effects';
import { actionWatcher, watchLogin } from './registration';

export default function* rootSaga() {
  yield all([actionWatcher(), watchLogin()]);
}
