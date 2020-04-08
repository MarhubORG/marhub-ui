import { all } from 'redux-saga/effects';
import { actionWatcher, loginWatcher, logoutWatcher } from './registration';
import { exportingIrapDataWatcher } from './api';
import {
  fetchOrganizationsWatcher,
  updateOrganizationWatcher,
} from './dashboard';

export default function* rootSaga() {
  yield all([
    actionWatcher(),
    loginWatcher(),
    exportingIrapDataWatcher(),
    logoutWatcher(),
    fetchOrganizationsWatcher(),
    updateOrganizationWatcher(),
  ]);
}
