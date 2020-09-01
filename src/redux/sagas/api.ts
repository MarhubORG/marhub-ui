import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

import {
  EXPORTING_IRAP_DATA,
  EXPORTING_BOTPRESS_DATA,
} from '../constants/actionTypes';
import {
  exportingIrapDataSuccess,
  exportingIrapDataFailure,
  ExportingIrapDataAction,
  exportingBotpressDataSuccess,
  exportingBotpressDataFailure,
  ExportingBotpressDataAction,
} from '../actions/api';
import { formatDate } from '../../utils/excel';
import { marhubApi } from '../../apis/apis';

function* exportIrapData(action: ExportingIrapDataAction): object {
  const formattedStartDate = formatDate(action.payload.startDate);
  const formattedEndDate = formatDate(action.payload.endDate);
  const { selectedTemplate, emailText, irapUuidSearchText } = action.payload;

  try {
    const token = cookie.load('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        formattedStartDate,
        formattedEndDate,
        selectedTemplate,
        emailText,
        irapUuidSearchText,
      },
    };
    const url = '/api/v1/irap_download';

    const json = yield marhubApi.get(url, axiosConfig);
    yield put(exportingIrapDataSuccess(json.data[0]));
  } catch (error) {
    const errorMessage = `${error.request.status} Error: ${error.response.data.error}`;
    yield put(exportingIrapDataFailure(errorMessage));
  }
}

export function* exportingIrapDataWatcher(): object {
  yield takeLatest(EXPORTING_IRAP_DATA, exportIrapData);
}

function* exportBotpressData(action: ExportingBotpressDataAction): object {
  const formattedStartDate = formatDate(action.payload.startDate);
  const formattedEndDate = formatDate(action.payload.endDate);
  const { selectedTemplate, emailText, irapUuidSearchText } = action.payload;

  try {
    const token = cookie.load('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        formattedStartDate,
        formattedEndDate,
        selectedTemplate,
        emailText,
        irapUuidSearchText,
      },
    };
    const url = '/api/v1/botpress_download';

    const json = yield marhubApi.get(url, axiosConfig);
    yield put(exportingBotpressDataSuccess(json.data));
  } catch (error) {
    const errorMessage = `${error.request.status} Error: ${error.response.data.error}`;
    yield put(exportingBotpressDataFailure(errorMessage));
  }
}

export function* exportingBotpressDataWatcher(): object {
  yield takeLatest(EXPORTING_BOTPRESS_DATA, exportBotpressData);
}
