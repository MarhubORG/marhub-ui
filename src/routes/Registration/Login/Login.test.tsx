import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedLogin } from './Login';
import { login } from '../../../redux/actions/index';
import { RegistrationState } from '../../../types/interfaces';

const initialState: RegistrationState = {
  loading: false,
  isLoggedIn: false,
  redirect: false,
  error: '',
};

it('renders correctly', () => {
  const tree = renderer
    .create(<UnconnectedLogin login={login} registration={initialState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
