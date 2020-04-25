import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedNewOrganization } from './NewOrganization';
import {
  createOrganization,
  createOrganizationRedirect,
} from '../../../redux/actions/dashboard';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedNewOrganization
        createOrganization={createOrganization}
        createOrganizationRedirect={createOrganizationRedirect}
        redirectToVisibleFields=""
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
