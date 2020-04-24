import { all } from 'redux-saga/effects';
import { actionWatcher, loginWatcher, logoutWatcher } from './registration';
import { exportingIrapDataWatcher } from './api';
import {
  fetchOrganizationsWatcher,
  updateOrganizationWatcher,
  createOrganizationWatcher,
  createTemplateWatcher,
} from './dashboard';

import { fetchUsersWatcher, createUserWatcher, editUserWatcher } from './user';

export default function* rootSaga() {
  yield all([
    actionWatcher(),
    loginWatcher(),
    exportingIrapDataWatcher(),
    logoutWatcher(),
    fetchOrganizationsWatcher(),
    updateOrganizationWatcher(),
    createOrganizationWatcher(),
    fetchUsersWatcher(),
    createUserWatcher(),
    editUserWatcher(),
    createOrganizationWatcher(),
    createTemplateWatcher(),
  ]);
}
