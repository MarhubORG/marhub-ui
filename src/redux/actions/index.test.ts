import { signup, signupRedirecting, signupSuccess, signupError } from './index';
import {
  SIGNUP,
  SIGNUP_REDIRECTING,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from '../constants/actionTypes';

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
