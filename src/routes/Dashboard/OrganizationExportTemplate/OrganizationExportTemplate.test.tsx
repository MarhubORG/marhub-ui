import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedOrganizationExportTemplate } from './OrganizationExportTemplate';

it('renders correctly', () => {
  const tree = renderer
    .create(<UnconnectedOrganizationExportTemplate organizations={[]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
