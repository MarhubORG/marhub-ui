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
  const formattedStartDate = formatDate(action.payload.startDate);
  const formattedEndDate = formatDate(action.payload.endDate);

  try {
    const token = cookie.load('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        formattedStartDate,
        formattedEndDate,
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

export function* exportingIrapDataWatcher(): object {
  yield takeLatest(EXPORTING_IRAP_DATA, exportIrapData);
}

export function formatDate(date: string): string {
  let monthString = '';
  let dayString = '';
  const d = new Date(date);
  const month = d.getMonth() + 1;
  if (month < 10) {
    monthString = `0${month}`;
  } else {
    monthString = `${month}`;
  }
  const day = d.getDate();
  if (day < 10) {
    dayString = `0${day}`;
  } else {
    dayString = `${day}`;
  }
  const year = d.getFullYear();
  return `${monthString}/${dayString}/${year}`;
}
