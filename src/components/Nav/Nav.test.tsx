import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedNav, Login, mapStateToProps } from './nav';
import { RegistrationState } from '../../types/interfaces';

it('renders correctly while logged in', () => {
  const tree = renderer.create(<UnconnectedNav isLoggedIn={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly while logged out', () => {
  const tree = renderer.create(<UnconnectedNav isLoggedIn={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('has a secondary element Login which renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapStateToProps', () => {
  const initialState: RegistrationState = {
    loading: false,
    isLoggedIn: false,
    redirect: false,
    loginRedirect: false,
    error: '',
  };
  it('contains registration state', () => {
    expect(mapStateToProps({ registration: initialState })).toBeDefined();
  });
});
