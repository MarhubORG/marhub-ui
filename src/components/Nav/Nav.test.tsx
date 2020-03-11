import React from 'react';
import renderer from 'react-test-renderer';
import Nav, { Login } from './nav';

it('renders correctly', () => {
  const tree = renderer.create(<Nav />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('has a secondary element Login which renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
