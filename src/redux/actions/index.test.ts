import { signup, signupRedirecting } from './index';
import { SIGNUP, SIGNUP_REDIRECTING } from '../constants/actionTypes';

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
