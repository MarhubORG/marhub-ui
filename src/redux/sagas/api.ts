import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';
import { EXPORTING_IRAP_DATA } from '../constants/actionTypes';
import {
  exportingIrapDataSuccess,
  exportingIrapDataFailure,
  ExportingIrapDataAction,
} from '../actions/api';

function* exportIrapData(action: ExportingIrapDataAction) {
  try {
    const token = '';
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = 'http://localhost:8080/api/v1/exportation_fields';
    const json = yield axios.get(url, axiosConfig);
    yield put(exportingIrapDataSuccess(json.data));
  } catch (error) {
    const errorMessage = `${error.request.status} Error: ${error.response.data.error}`;
    yield put(exportingIrapDataFailure(errorMessage));
  }
}

export function* exportingIrapDataWatcher() {
  yield takeLatest(EXPORTING_IRAP_DATA, exportIrapData);
}
