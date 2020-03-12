import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedLogin } from './Login';
import { login } from '../../../redux/actions/index';

it('renders correctly', () => {
  const tree = renderer.create(<UnconnectedLogin login={login} />).toJSON();
  expect(tree).toMatchSnapshot();
});
