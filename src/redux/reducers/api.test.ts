import apiReducer, { initialState } from './api';
import {
  EXPORTING_IRAP_DATA,
  EXPORT_IRAP_DATA_FAILURE,
  EXPORT_IRAP_DATA_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

describe('apiReducer', () => {
  it('handles LOGOUT action type', () => {
    const state = apiReducer(initialState, {
      type: LOGOUT,
    });
    expect(state).toEqual(initialState);
  });
  it('handles EXPORTING_IRAP_DATA action type', () => {
    const state = apiReducer(initialState, {
      type: EXPORTING_IRAP_DATA,
      payload: {
        startDate: '03/01/2020',
        endDate: '04/01/2020',
      },
    });
    const expected = {
      loading: true,
      irapState: [],
      error: '',
    };
    expect(state).toEqual(expected);
  });
  it("returns the initial state if there isn't a matching action type", () => {
    const state = apiReducer(initialState, {
      type: 'SOME_OTHER_TYPE',
    });
    expect(state).toEqual(initialState);
  });
  it('handles EXPORT_IRAP_DATA_FAILURE action type', () => {
    const message = 'failure message';
    const state = apiReducer(initialState, {
      type: EXPORT_IRAP_DATA_FAILURE,
      payload: message,
    });
    const expected = {
      loading: false,
      irapState: [],
      error: message,
    };
    expect(state).toEqual(expected);
  });
  it('handles EXPORT_IRAP_DATA_SUCCESS action type', () => {
    const data = [{ some: 'data' }];
    const state = apiReducer(initialState, {
      type: EXPORT_IRAP_DATA_SUCCESS,
      payload: data,
    });
    const expected = {
      loading: false,
      irapState: data,
      error: '',
    };
    expect(state).toEqual(expected);
  });
});
