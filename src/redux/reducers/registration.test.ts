import { registrationReducer, initialState } from './registration';
import {
  SIGNUP,
  SIGNUP_ERROR,
  SIGNUP_REDIRECTING,
  SIGNUP_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_REDIRECTING,
} from '../constants/actionTypes';

describe('registrationReducer', () => {
  it('handles the SIGNUP action type', () => {
    const name = 'name';
    const organization = 'org';
    const email = 'email';
    const password = 'password';
    const state = registrationReducer(initialState, {
      type: SIGNUP,
      payload: { name, organization, email, password },
    });
    const expected = {
      loading: true,
      isLoggedIn: false,
      redirect: false,
      loginRedirect: false,
      error: '',
    };
    expect(state).toEqual(expected);
  });
  it('accepts the SIGNUP_ERROR action type', () => {
    const errorMessage = 'some error';
    const state = registrationReducer(initialState, {
      type: SIGNUP_ERROR,
      payload: { message: errorMessage },
    });
    const expected = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      loginRedirect: false,
      error: errorMessage,
    };
    expect(state).toEqual(expected);
  });
  it('accepts the SIGNUP_REDIRECTING action type', () => {
    const state = registrationReducer(initialState, {
      type: SIGNUP_REDIRECTING,
    });
    const expected = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      loginRedirect: false,
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
      loginRedirect: false,
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
      loginRedirect: false,
      error: '',
    };
    expect(state).toEqual(expected);
  });
  it('accepts the LOGIN action type', () => {
    const state = registrationReducer(initialState, {
      type: LOGIN,
      payload: {
        email: 'email',
        password: 'password',
      },
    });
    const expected = {
      loading: true,
      isLoggedIn: false,
      redirect: false,
      loginRedirect: false,
      error: '',
    };
    expect(state).toEqual(expected);
  });
  it('accepts the LOGIN_ERROR action type', () => {
    const state = registrationReducer(initialState, {
      type: LOGIN_ERROR,
      payload: {
        message: 'message',
      },
    });
    const expected = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      loginRedirect: false,
      error: 'message',
    };
    expect(state).toEqual(expected);
  });
  it('accepts the LOGIN_SUCCESS action type', () => {
    const state = registrationReducer(initialState, {
      type: LOGIN_SUCCESS,
    });
    const expected = {
      loading: false,
      isLoggedIn: true,
      redirect: false,
      loginRedirect: true,
      error: '',
    };
    expect(state).toEqual(expected);
  });
  it('accepts the LOGIN_REDIRECTING action type ', () => {
    const initial = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      loginRedirect: true,
      error: '',
    };
    const state = registrationReducer(initial, {
      type: LOGIN_REDIRECTING,
    });
    const expected = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      loginRedirect: false,
      error: '',
    };
    expect(state).toEqual(expected);
  });
});
