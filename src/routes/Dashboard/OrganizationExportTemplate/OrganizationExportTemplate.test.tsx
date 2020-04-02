import React from 'react';
import renderer from 'react-test-renderer';
import OrganizationExportTemplate from './OrganizationExportTemplate';

it('renders correctly', () => {
  const tree = renderer.create(<OrganizationExportTemplate />).toJSON();
  expect(tree).toMatchSnapshot();
});
