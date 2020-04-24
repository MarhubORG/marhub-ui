import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedTemplateList } from './TemplateList';
import { fetchOrganizations } from '../../../redux/actions/dashboard';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedTemplateList
        organizations={[]}
        myOrganization="4"
        fetchOrganizations={fetchOrganizations}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
