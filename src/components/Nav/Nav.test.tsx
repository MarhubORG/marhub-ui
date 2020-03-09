import React from 'react';
import renderer from 'react-test-renderer';
import Nav, { LoginAnchor } from './nav';

it('renders correctly', () => {
  const tree = renderer.create(<Nav />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('has a secondary element LoginAnchor which renders correctly', () => {
  const tree = renderer.create(<LoginAnchor />).toJSON();
  expect(tree).toMatchSnapshot();
});
