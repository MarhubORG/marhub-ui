import apiReducer from './api';
import { EXPORTING_IRAP_DATA } from '../constants/actionTypes';

const initialState = {
  loading: false,
  irapState: {},
  error: '',
};

describe('apiReducer', () => {
  it('handles EXPORTING_IRAP_DATA action type', () => {
    const state = apiReducer(initialState, {
      type: EXPORTING_IRAP_DATA,
    });
    const expected = {
      loading: true,
      irapState: {},
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
});
