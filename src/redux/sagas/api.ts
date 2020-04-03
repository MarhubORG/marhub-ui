import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';
import FileDownload from 'js-file-download';
import * as Excel from 'exceljs';
import { EXPORTING_IRAP_DATA } from '../constants/actionTypes';
import {
  exportingIrapDataSuccess,
  exportingIrapDataFailure,
  ExportingIrapDataAction,
} from '../actions/api';

function* exportIrapData(action: ExportingIrapDataAction) {
  try {
    const token = cookie.load('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = 'http://localhost:8080/api/v1/irap_download';
    console.log('calling', url);

    const json = yield axios.get(url, axiosConfig);
    console.log('data', json.data[0]);
    const headers = getHeaders(json.data[0]);
    console.log({ headers });

    createNewExcelFile(json.data[0], headers);
    yield put(exportingIrapDataSuccess(json.data));
  } catch (error) {
    console.log('error', error);
    const errorMessage = `${error.request.status} Error: ${error.response.data.error}`;
    yield put(exportingIrapDataFailure(errorMessage));
  }
}

export function* exportingIrapDataWatcher() {
  yield takeLatest(EXPORTING_IRAP_DATA, exportIrapData);
}

function getHeaders(arr: object[]): string[] {
  let headerAccumulator: string[] = [];
  arr.forEach(el => {
    const rowHeaders = Object.keys(el);
    headerAccumulator = [...new Set([...rowHeaders, ...headerAccumulator])];
  });
  return headerAccumulator.sort();
}

function createNewExcelFile(data: object[], headers: string[]): void {
  // A new Excel Work Book
  const workbook = new Excel.Workbook();

  // Some information about the Excel Work Book.
  workbook.creator = 'Marhub Dashboard';
  workbook.lastModifiedBy = '';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  // Create a sheet
  const sheet = workbook.addWorksheet('Data');
  // A table header
  const cols = headers.map(el => {
    return {
      header: el,
      key: el,
    };
  });
  sheet.columns = cols;
  console.log('1');

  // Add rows in the above header
  sheet.addRows(data);
  // sheet.addRow({
  //   url: 'https://vlemonn.com/tutorial/html', // NOTE order doesn't matter
  //   id: 1,
  //   course: 'HTML',
  // });
  // sheet.addRow({
  //   id: 2,
  //   course: 'Java Script',
  //   url: 'https://vlemonn.com/tutorial/java-script',
  // });
  // sheet.addRow({
  //   id: 3,
  //   course: 'Electron JS',
  //   url: 'https://vlemonn.com/tutorial/electron-js',
  // });
  // sheet.addRow({
  //   id: 4,
  //   course: 'Node JS',
  //   url: 'https://vlemonn.com/tutorial/node-js',
  // });
  console.log('2');

  const buffer = workbook.xlsx.writeBuffer();
  buffer.then(res => {
    console.log({ res });
    FileDownload(res, 'data.xlsx');
  });
  console.log(3, buffer);
  // FileSaver

  // FileSaver.saveAs(buffer, 'hello world.txt');
  console.log(4);
}
