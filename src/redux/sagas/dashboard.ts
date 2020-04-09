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
  updateOrganizationSuccess,
  updateOrganizationFailure,
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

export function* fetchOrganizationsWatcher(): object {
  yield takeLatest(FETCH_ORGANIZATIONS, fetchOrgs);
}

function* updateOrganization(action: UpdateOrganizationAction): object {
  try {
    const token = cookie.load('token');
    const url = 'http://localhost:8080/api/v1/exportation_fields';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const json = yield axios.post(url, {
      id: action.payload.id,
      organization: action.payload.organization,
    });
    yield put(updateOrganizationSuccess(json.data));
  } catch (error) {
    yield put(
      updateOrganizationFailure(
        'Update organization failed. Please try again or contact your administrator.'
      )
    );
  }
}

export function* updateOrganizationWatcher(): object {
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganization);
}
