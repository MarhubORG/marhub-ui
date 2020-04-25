import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedUserEdit } from './UserEdit';
import { fetchOrganizations } from '../../../redux/actions/dashboard';
import { editUser } from '../../../redux/actions/users';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedUserEdit
        fetchOrganizations={fetchOrganizations}
        users={[]}
        organizations={[]}
        id="1"
        message=""
        editUser={editUser}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
