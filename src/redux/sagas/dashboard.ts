import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

import {
  FETCH_ORGANIZATIONS,
  UPDATE_ORGANIZATION,
} from '../constants/actionTypes';
import {
  fetchOrganizationsSuccess,
  fetchOrganizationsFailure,
  FetchOrganizationsAction,
  UpdateOrganizationAction,
} from '../actions/dashboard';

function* fetchOrgs(action: FetchOrganizationsAction): object {
  try {
    const token = cookie.load('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = 'http://localhost:8080/api/v1/organisations';

    const json = yield axios.get(url, axiosConfig);
    yield put(fetchOrganizationsSuccess(json.data[0]));
  } catch (error) {
    // const errorMessage = `${error.request.status} Error: ${error.response.data.error}`;
    yield put(fetchOrganizationsFailure());
  }
}

export function* fetchOrganizationsWatcher() {
  yield takeLatest(FETCH_ORGANIZATIONS, fetchOrgs);
}

function* updateOrganization(action: UpdateOrganizationAction) {
  try {
    const token = cookie.load('token');
    const url = 'http://localhost:8080/api/v1/exportation_fields';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log({ action });
    const json = yield axios.post(url, {
      id: action.payload.id,
      organization: action.payload.organization,
    });
    // yield put(fetchOrganizationsSuccess(json.data[0]));
    console.log({ json });
  } catch (error) {
    console.log('error', error);
    // const errorMessage = `${error.request.status} Error: ${error.response.data.error}`;
    // yield put(fetchOrganizationsFailure());
  }
}

export function* updateOrganizationWatcher() {
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganization);
}
