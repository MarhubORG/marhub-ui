import {
  signup,
  signupRedirecting,
  signupSuccess,
  signupError,
  login,
  loginError,
  loginSuccess,
  loginRedirecting,
  logout,
  logoutError,
  logoutSuccess,
} from './index';
import {
  SIGNUP,
  SIGNUP_REDIRECTING,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_REDIRECTING,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
} from '../constants/actionTypes';

describe('logoutSuccess', () => {
  it('should return a properly formatted action', () => {
    const expected = {
      type: LOGOUT_SUCCESS,
    };
    expect(logoutSuccess()).toEqual(expected);
  });
});

describe('logoutError', () => {
  it('should return a properly formatted action', () => {
    const message = 'error message';
    const expected = {
      type: LOGOUT_ERROR,
      payload: { message }, // TODO: Is this the format we want?
    };
    expect(logoutError(message)).toEqual(expected);
  });
});

describe('logout', () => {
  it('should return a properly formatted action', () => {
    const expected = {
      type: LOGOUT,
    };
    expect(logout()).toEqual(expected);
  });
});
describe('signup', () => {
  it('should return a properly formatted action', () => {
    const name = 'name';
    const organization = 'org';
    const email = 'email';
    const password = 'pass';
    const expected = {
      type: SIGNUP,
      payload: {
        name,
        organization,
        email,
        password,
      },
    };
    expect(signup(name, organization, email, password)).toEqual(expected);
  });
});

describe('signupRedirecting', () => {
  it('should return a properly formatted action', () => {
    const expected = {
      type: SIGNUP_REDIRECTING,
    };
    expect(signupRedirecting()).toEqual(expected);
  });
});

describe('signupSuccess', () => {
  it('should return a properly formatted action', () => {
    const expected = { type: SIGNUP_SUCCESS };
    expect(signupSuccess()).toEqual(expected);
  });
});

describe('signupError', () => {
  it('should return a properly formatted action', () => {
    const message = 'message';
    const expected = { type: SIGNUP_ERROR, payload: { message } };
    expect(signupError(message)).toEqual(expected);
  });
});

describe('login', () => {
  it('should return a properly formatted action', () => {
    const email = 'email';
    const password = 'password';
    const expected = { type: LOGIN, payload: { email, password } };
    expect(login(email, password)).toEqual(expected);
  });
});

describe('loginError', () => {
  it('should return a properly formatted action', () => {
    const message = 'message';
    const expected = { type: LOGIN_ERROR, payload: { message } };
    expect(loginError(message)).toEqual(expected);
  });
});

describe('loginSuccess', () => {
  it('should return a properly formatted action', () => {
    const role = 'role';
    const expected = { type: LOGIN_SUCCESS, payload: { role } };
    expect(loginSuccess(role)).toEqual(expected);
  });
});

describe('loginRedirecting', () => {
  const expected = { type: LOGIN_REDIRECTING };
  expect(loginRedirecting()).toEqual(expected);
});
