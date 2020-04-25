import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedUserList } from './UserList';
import { fetchUsers } from '../../../redux/actions/users';

it('renders correctly', () => {
  const tree = renderer
    .create(<UnconnectedUserList fetchUsers={fetchUsers} users={[]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
