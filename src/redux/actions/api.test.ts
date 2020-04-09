import {
  EXPORTING_IRAP_DATA,
  EXPORT_IRAP_DATA_FAILURE,
  EXPORT_IRAP_DATA_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';
import {
  exportingIrapData,
  exportingIrapDataFailure,
  exportingIrapDataSuccess,
  logout,
} from './api';

describe('logout', () => {
  it('should return a properly formatted action', () => {
    const expected = {
      type: LOGOUT,
    };
    expect(logout()).toEqual(expected);
  });
});

describe('exportingIrapData', () => {
  it('should return a properly formatted action', () => {
    const expected = {
      type: EXPORTING_IRAP_DATA,
    };
    expect(exportingIrapData()).toEqual(expected);
  });
});

describe('exportingIrapDataFailure', () => {
  it('should return a properly formatted action', () => {
    const message = 'message';
    const expected = {
      type: EXPORT_IRAP_DATA_FAILURE,
      payload: message,
    };
    expect(exportingIrapDataFailure(message)).toEqual(expected);
  });
});

describe('exportingIrapDataSuccess', () => {
  it('should return a properly formatted action', () => {
    const data = { some: 'data' };
    const expected = {
      type: EXPORT_IRAP_DATA_SUCCESS,
      payload: data,
    };
    expect(exportingIrapDataSuccess(data)).toEqual(expected);
  });
});
