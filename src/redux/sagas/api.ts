import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

import { EXPORTING_IRAP_DATA } from '../constants/actionTypes';
import {
  exportingIrapDataSuccess,
  exportingIrapDataFailure,
  ExportingIrapDataAction,
} from '../actions/api';
import { getHeaders, createNewExcelFile } from '../../utils/excel';

function* exportIrapData(action: ExportingIrapDataAction): object {
  try {
    const token = cookie.load('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = 'http://localhost:8080/api/v1/irap_download';

    const json = yield axios.get(url, axiosConfig);
    const headers = getHeaders(json.data[0]);
    createNewExcelFile(json.data[0], headers);

    yield put(exportingIrapDataSuccess(json.data));
  } catch (error) {
    const errorMessage = `${error.request.status} Error: ${error.response.data.error}`;
    yield put(exportingIrapDataFailure(errorMessage));
  }
}

export function* exportingIrapDataWatcher() {
  yield takeLatest(EXPORTING_IRAP_DATA, exportIrapData);
}
