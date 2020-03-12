import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedDashboard, mapStateToProps } from './Dashboard';
import { RegistrationState } from '../../types/interfaces';

it('renders correctly when logged in', () => {
  const tree = renderer.create(<UnconnectedDashboard isLoggedIn />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when not logged in', () => {
  const tree = renderer.create(<UnconnectedDashboard isLoggedIn />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapStateToProps', () => {
  it('contains registration state', () => {
    const initialState: RegistrationState = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      loginRedirect: false,
      error: '',
    };
    expect(mapStateToProps({ registration: initialState })).toBeDefined();
    expect(mapStateToProps({ registration: initialState }).isLoggedIn).toEqual(
      false
    );
  });
});
