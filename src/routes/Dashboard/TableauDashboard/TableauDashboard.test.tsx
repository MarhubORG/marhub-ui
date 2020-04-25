import React from 'react';
import renderer from 'react-test-renderer';
import TableauDashboard from './TableauDashboard';
import { createTemplate } from '../../../redux/actions/dashboard';

it('renders correctly', () => {
  const tree = renderer.create(<TableauDashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
