import { registrationReducer } from './registration';
import {
  SIGNUP,
  SIGNUP_ERROR,
  SIGNUP_REDIRECTING,
  SIGNUP_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  isLoggedIn: false,
  redirect: false,
  error: '',
};

describe('registrationReducer', () => {
  it('handles the SIGNUP action type', () => {
    const state = registrationReducer(initialState, { type: SIGNUP });
    const expected = {
      loading: true,
      isLoggedIn: false,
      redirect: false,
      error: '',
    };
    expect(state).toEqual(expected);
  });
  it('accepts the SIGNUP_ERROR action type', () => {
    const errorMessage = 'some error';
    const state = registrationReducer(initialState, {
      type: SIGNUP_ERROR,
      payload: errorMessage,
    });
    const expected = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      error: errorMessage,
    };
    expect(state).toEqual(expected);
  });
  it("returns the initial state if the payload isn't a string", () => {
    const errorMessage = undefined;
    const state = registrationReducer(initialState, {
      type: SIGNUP_ERROR,
      payload: errorMessage,
    });
    expect(state).toEqual(initialState);
  });
  it('accepts the SIGNUP_REDIRECTING action type', () => {
    const state = registrationReducer(initialState, {
      type: SIGNUP_REDIRECTING,
    });
    const expected = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      error: '',
    };
    expect(state).toEqual(expected);
  });
  it('accepts the SIGNUP_SUCCESS action type', () => {
    const state = registrationReducer(initialState, {
      type: SIGNUP_SUCCESS,
    });
    const expected = {
      loading: false,
      isLoggedIn: false,
      redirect: true,
      error: '',
    };
    expect(state).toEqual(expected);
  });
  it("returns the initial state if there isn't a matching action type", () => {
    const state = registrationReducer(initialState, {
      type: 'SOME_OTHER_TYPE',
    });
    const expected = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      error: '',
    };
    expect(state).toEqual(expected);
  });
});
