import React from 'react';
import renderer from 'react-test-renderer';
import {
  UnconnectedUserNew,
  MapDispatchtoProps,
  mapDispatchToProps,
  mapStateToProps,
} from './UserNew';
import { fetchOrganizations } from '../../../redux/actions/dashboard';
import { createUser } from '../../../redux/actions/users';
import { initialState } from '../../../redux/reducers/dashboard';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedUserNew
        fetchOrganizations={fetchOrganizations}
        organizations={[]}
        createUser={createUser}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapDispatchToProps', () => {
  it('contains functions', () => {
    const dispatch = jest.fn();
    const dispatches: MapDispatchtoProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('fetchOrganizations')).toBeTruthy();
    expect(Object.keys(dispatches).includes('createUser')).toBeTruthy();
    expect(
      dispatches.createUser({
        email: 'email',
        name: 'name',
        selectedOrganization: '1',
        role: 'role',
        password: 'password',
        isDisabled: false,
      })
    ).toBeUndefined();
    expect(dispatches.fetchOrganizations()).toBeUndefined();
  });
});
