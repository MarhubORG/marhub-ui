import React from 'react';
import renderer from 'react-test-renderer';
import OrganizationList from './OrganizationList';

it('renders correctly', () => {
  const tree = renderer.create(<OrganizationList />).toJSON();
  expect(tree).toMatchSnapshot();
});
