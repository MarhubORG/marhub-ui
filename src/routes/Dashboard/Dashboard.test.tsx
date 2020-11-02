import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {
  UnconnectedDashboard,
  mapStateToProps,
  hasPermission,
} from './Dashboard';
import { initialState } from '../../redux/reducers/registration';

const mockStore = configureMockStore();
const store = mockStore({ registration: initialState });

it('renders correctly when logged in', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <UnconnectedDashboard isLoggedIn />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when not logged in', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <UnconnectedDashboard isLoggedIn={false} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapStateToProps', () => {
  it('contains registration state', () => {
    expect(mapStateToProps({ registration: initialState })).toBeDefined();
    expect(mapStateToProps({ registration: initialState }).isLoggedIn).toEqual(
      false
    );
  });
});

describe('hasPermission', () => {
  it('should return true if a predefined role is within the permissions array', () => {
    const allowedRole = 'allowedRole';
    const allowedOrg = 'allowedOrd';
    const obj = {
      permissions: [allowedRole],
      orgPermissions: [allowedOrg],
    };
    expect(hasPermission(obj, allowedRole, allowedOrg)).toBeTruthy();
  });
  it('should return false if the role is not in the permissions array', () => {
    const allowedRole = 'allowedRole';
    const allowedOrg = 'allowedOrd';
    const myRole = 'myRole';
    const obj = {
      permissions: [allowedRole],
      orgPermissions: [allowedOrg],
    };
    expect(hasPermission(obj, myRole, allowedOrg)).toBeFalsy();
  });
});
