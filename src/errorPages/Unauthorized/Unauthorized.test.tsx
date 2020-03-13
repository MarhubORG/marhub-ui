import React from 'react';
import renderer from 'react-test-renderer';
import Unauthorized from './Unauthorized';

it('renders correctly', () => {
  const tree = renderer.create(<Unauthorized />).toJSON();
  expect(tree).toMatchSnapshot();
});
