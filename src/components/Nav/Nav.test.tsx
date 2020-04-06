import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedNav, Login, mapStateToProps } from './nav';
import { initialState } from '../../redux/reducers/registration';
import { logout } from '../../redux/actions/index';

it('renders correctly while logged in', () => {
  const tree = renderer
    .create(<UnconnectedNav isLoggedIn={true} logout={logout} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly while logged out', () => {
  const tree = renderer
    .create(<UnconnectedNav isLoggedIn={false} logout={logout} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('has a secondary element Login which renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapStateToProps', () => {
  it('contains registration state', () => {
    expect(mapStateToProps({ registration: initialState })).toBeDefined();
  });
});
