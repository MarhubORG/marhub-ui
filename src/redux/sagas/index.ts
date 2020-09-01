import { all } from 'redux-saga/effects';
import { actionWatcher, loginWatcher, logoutWatcher } from './registration';
import { exportingIrapDataWatcher, exportingBotpressDataWatcher } from './api';
import {
  fetchOrganizationsWatcher,
  updateOrganizationWatcher,
  createOrganizationWatcher,
  createTemplateWatcher,
  updateTemplateWatcher,
  deleteTemplateWatcher,
  deleteOrganizationWatcher,
} from './dashboard';

import {
  fetchUsersWatcher,
  createUserWatcher,
  editUserWatcher,
  deleteUserWatcher,
} from './user';

export default function* rootSaga() {
  yield all([
    actionWatcher(),
    loginWatcher(),
    exportingIrapDataWatcher(),
    exportingBotpressDataWatcher(),
    logoutWatcher(),
    fetchOrganizationsWatcher(),
    updateOrganizationWatcher(),
    fetchUsersWatcher(),
    createUserWatcher(),
    editUserWatcher(),
    createOrganizationWatcher(),
    createTemplateWatcher(),
    updateTemplateWatcher(),
    deleteTemplateWatcher(),
    deleteUserWatcher(),
    deleteOrganizationWatcher(),
  ]);
}
