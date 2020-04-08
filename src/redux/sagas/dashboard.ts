import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

import { FETCH_ORGANIZATIONS } from '../constants/actionTypes';
import {
  fetchOrganizationsSuccess,
  fetchOrganizationsFailure,
  FetchOrganizationsAction,
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
