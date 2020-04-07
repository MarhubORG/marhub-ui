import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedOrganizationList } from './OrganizationList';
import { fetchOrganizations } from '../../../redux/actions/dashboard';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedOrganizationList fetchOrganizations={fetchOrganizations} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
